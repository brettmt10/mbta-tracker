import httpx
from datetime import datetime
import constants as c
import os
from dotenv import load_dotenv
from utils.countdown import countdown_logic
from utils.get_station_metadata import get_station_metadata_by_parent

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],  # Your live server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/stations")
def get_station_metadata():
    return get_station_metadata_by_parent()

@app.get("/times/{parent_station_id}")
async def get_station_times(parent_station_id: str):
    times = []
    params = {
        'filter[stop]': parent_station_id,
        'sort': 'time',
        'filter[route_type]': 1
    }

    headers = {
        'accept': 'application/vnd.api+json',
        'x-api-key': os.getenv('API_KEY')
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(c.predictions_api_url, params=params, headers=headers)
        data = response.json()
        
        for d in data['data']:
            attrs = d['attributes']
            stop_id = d['relationships']['stop']['data']['id']

            if attrs['departure_time']: # only need to get times if train is boardable
                arrival_time = datetime.fromisoformat(attrs['arrival_time'])
                departure_time = datetime.fromisoformat(attrs['departure_time'])
                status = attrs['status']

                vehicle_id = d['relationships']['vehicle']['data']['id']

                try:
                    vehicles_res = await client.get(f'https://api-v3.mbta.com/vehicles/{vehicle_id}', headers=headers)

                    train_data = vehicles_res.json()
                    train_current_stop_id = train_data['data']['relationships']['stop']['data']['id']
                except:
                    train_current_stop_id = -1

                prediction_data = {
                    "arrival_time": arrival_time,
                    "departure_time": departure_time,
                    "status": status,
                    "train_current_stop_id": train_current_stop_id
                }

                stops = [key for key, value in c.station_metadata.items() if value['parent_station_id'] == parent_station_id]
                
                for stop_id_i in stops:
                    if stop_id_i == stop_id:
                        countdown = countdown_logic(station_id=stop_id, prediction_data=prediction_data)
                        direction = c.station_metadata[stop_id]['direction']

                        if countdown:
                            time_info = {
                                "countdown": countdown,
                                "train_destination": direction
                            }
                            times.append(time_info)
    return {"res": times}