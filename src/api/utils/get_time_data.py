import asyncio
from datetime import datetime
import pytz
import httpx
from rich import print as rprint
from static import station_metadata

async def parse_predicition_data(prediction_data, parent_station, headers, client):

    async def process_prediction(t):
        attrs = t['attributes']
        if not attrs['departure_time']:
            return None
        if not attrs['arrival_time']:
            return None

        stop_id = t['relationships']['stop']['data']['id']
        arrival_time = datetime.fromisoformat(attrs['arrival_time'])
        departure_time = datetime.fromisoformat(attrs['departure_time'])
        status = attrs['status']
        vehicle_id = t['relationships']['vehicle']['data']['id']
        direction, line = '', ''

        for stop in station_metadata[parent_station]['stops']:
            if stop['id'] == stop_id:
                direction = stop['direction']
                line = stop['line']

        try:
            vehicles_res = await client.get(f'https://api-v3.mbta.com/vehicles/{vehicle_id}', headers=headers)
            train_current_stop_id = vehicles_res.json()['data']['relationships']['stop']['data']['id']
        except:
            train_current_stop_id = -1

        prediction_data_f = {
            "arrival_time": arrival_time,
            "departure_time": departure_time,
            "status": status,
            "train_current_stop_id": train_current_stop_id
        }

        countdown = countdown_logic(station_id=stop_id, prediction_data=prediction_data_f)
        if countdown:
            return {"countdown": countdown, "direction": direction, "line": line}
        return None

    results = await asyncio.gather(*[process_prediction(t) for t in prediction_data['data']])
    return [r for r in results if r is not None]


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
    train_current_stop_id = prediction_data['train_current_stop_id']
    now = datetime.now(pytz.timezone('US/Eastern'))

    seconds, mins = get_time_info(arrival_time)

    at_station = (
        status == 'Stopped at station'
        and train_current_stop_id == station_id
    )

    boarding_timing = seconds <= 90 or (arrival_time < now and departure_time > now)

    if not at_station and seconds < 0:
        return
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

    return countdown_message if countdown_message else None