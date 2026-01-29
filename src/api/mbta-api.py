import requests
from datetime import datetime
import pytz
import constants as c
import os
from dotenv import load_dotenv

from fastapi import FastAPI

load_dotenv()

app = FastAPI()

def get_time_info(arrival_time):
    now = datetime.now(pytz.timezone('US/Eastern'))
    time_diff = arrival_time - now
    seconds = time_diff.total_seconds()
    mins = round(seconds / 60)

    return seconds, mins

def countdown_logic(station_id, prediction_data: dict):
    # return the countdown message based on MTBA best practices: https://www.mbta.com/developers/real-time-display-guidelines
    arrival_time = prediction_data['arrival_time']
    departure_time = prediction_data['departure_time']
    status = prediction_data['status']
    train_location = prediction_data['train_location']
    now = datetime.now(pytz.timezone('US/Eastern'))

    seconds, mins = get_time_info(arrival_time)
    if seconds < 0:
        return
    
    at_station = (
        status == 'Stopped at station' 
        and train_location in c.station_metadata[station_id]['stop_ids']
    )
    boarding_timing = seconds <= 90 or (arrival_time < now and departure_time > now)

    if at_station and boarding_timing:
        countdown_message = 'Boarding'
    elif not at_station and seconds <= 30:
        countdown_message = 'Arriving'
    elif not at_station and seconds <= 60:
        countdown_message = '1 min'
    elif not at_station and mins > 60:
        hours = mins // 60
        remaining_mins = mins % 60
        countdown_message = f'{hours} hr {remaining_mins} mins'
    else:
        countdown_message = f'{mins} min'

    return countdown_message


@app.get("/times/{station_id}")
async def get_station_times(station_id: str):
    messages = []
    params = {
        'filter[stop]': station_id,
        'sort': 'time',
        'filter[route_type]': 1
    }

    headers = {
        'accept': 'application/vnd.api+json',
        'x-api-key': os.getenv('API_KEY')
    }

    response = requests.get(c.predictions_api_url, params=params, headers=headers)
    data = response.json()
    
    for d in data['data']:
        destination_id = d['relationships']['stop']['data']['id']

        attrs = d['attributes']
        if attrs['departure_time']: # only need to get times if train is boardable
            arrival_time = datetime.fromisoformat(attrs['arrival_time'])
            departure_time = datetime.fromisoformat(attrs['departure_time'])
            status = attrs['status']

            vehicle_id = d['relationships']['vehicle']['data']['id']
            vehicles_res = requests.get(f'https://api-v3.mbta.com/vehicles/{vehicle_id}')
            train_data = vehicles_res.json()
            train_location = train_data['data']['relationships']['stop']['data']['id']

            prediction_data = {
                "arrival_time": arrival_time,
                "departure_time": departure_time,
                "status": status,
                "train_location": train_location
            }

            message = countdown_logic(station_id=station_id, prediction_data=prediction_data)
            messages.append(message)

    return {"res": messages}