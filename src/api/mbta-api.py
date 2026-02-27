import httpx
from datetime import datetime
import os
from dotenv import load_dotenv
from utils.get_time_data import parse_predicition_data
from utils.get_station_metadata import get_station_metadata
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/stations")
def get_stations():
    return get_station_metadata()

@app.get("/times/{parent_station_id}")
async def get_station_times(parent_station_id: str):
    params = {
        'filter[stop]': parent_station_id,
        'sort': 'time',
        'filter[route_type]': '0,1'
    }

    headers = {
        'accept': 'application/vnd.api+json',
        'x-api-key': os.getenv('API_KEY')
    }

    async with httpx.AsyncClient() as client:
        print(f"getting times for {parent_station_id}")
        response = await client.get('https://api-v3.mbta.com/predictions', params=params, headers=headers)
        data = response.json()
        times = await parse_predicition_data(prediction_data=data, parent_station=parent_station_id, headers=headers, client=client)

    return {"res": times}