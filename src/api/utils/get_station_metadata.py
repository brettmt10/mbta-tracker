import requests

station_ids = [
    'place-sstat',
    'place-dwnxg',
    'place-pktrm',
    'place-chmnl',
    'place-knncl',
    'place-cntsq',
    'place-harsq',
    'place-portr',
    'place-davis'
]

params = {
    'filter[route_type]': 1
}

response = requests.get('https://api-v3.mbta.com/stops', params=params)
res_json = response.json()

data = res_json['data']
print(data)
exit()

station_metadata = {}
for station_id in station_ids:
    station_metadata[station_id] = {
        'stop_ids': []
    }

    for station_data in data:
        if station_data['relationships']['parent_station']['data']['id'] == station_id:
            station_metadata[station_id]['stop_ids'].append(station_data['id'])

print(station_metadata)

