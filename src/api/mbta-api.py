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

@app.get("/times/{station_id}")
async def get_station_times(station_id: str):
    predictions = []
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
        attrs = d['attributes']
        if attrs['arrival_time']:
            arrival_time = datetime.fromisoformat(attrs['arrival_time'])
            departure_time = datetime.fromisoformat(attrs['departure_time'])
            destination_id = d['relationships']['stop']['data']['id']
            destination_name = c.destination_ids[destination_id]
            seconds, mins = get_time_info(arrival_time)

            curr = {
                "arrival_time": arrival_time,
                "departure_time": departure_time,
                "destination_name": destination_name,
                "seconds": seconds,
                "mins": mins
            }
            predictions.append(curr)

    return {"res": predictions}