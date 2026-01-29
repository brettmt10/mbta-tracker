import requests
from datetime import datetime
import constants as c
import os
from dotenv import load_dotenv
from ops import countdown_logic

from fastapi import FastAPI

load_dotenv()

app = FastAPI()

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