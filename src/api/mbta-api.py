import requests
from datetime import datetime
import pytz

predictions = 'https://api-v3.mbta.com/predictions'

red_line = {
    'sort': 'latitude',
    'filter[latitude]': '42.365486',
    'filter[longitude]': '-71.103802',
    'filter[radius]': '0.052',
    'filter[route]': 'Red'
}

params = {
    'filter[stop]': 'place-harsq',
    'sort': 'time',
    'filter[route_type]': 1
}

headers = {
    'accept': 'application/vnd.api+json'
}

response = requests.get(predictions, params=params, headers=headers)

data = response.json()

for d in data['data']:
    attrs = d['attributes']
    arrival_time = attrs['arrival_time']
    if arrival_time:
        arrival_time = datetime.fromisoformat(arrival_time)
        departure_time = datetime.fromisoformat(attrs['departure_time'])
        direction_id = attrs['direction_id']
        destination_id = d['relationships']['stop']['data']['id']
        
        now = datetime.now(pytz.timezone('US/Eastern'))
        time_diff = arrival_time - now
        seconds = time_diff.total_seconds()
        mins = round(seconds / 60)

        # if direction_id == 0:
        #     destination = "Alewife"
        # else:
        #     destination = 'South Station'

        # print(f"Train to {destination} arrives in {mins} mins")

