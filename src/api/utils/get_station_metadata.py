import requests
import json
from rich import print as rprint

def get_station_metadata():
    params = {
        'filter[route_type]': '0,1'
    }

    response = requests.get('https://api-v3.mbta.com/stops', params=params)
    data = response.json()['data']

    station_metadata = {}
    for station in data:
        # get stop data
        parent_station = station['relationships']['parent_station']['data']['id']

        id = station['id']
        direction = station['attributes']['platform_name']

        description = station['attributes']['description']
        # extract line
        line = description.split(' - ')[1]
        name = description.split(' - ')[0]

        stop_data = {
            "line": line,
            "id": id,
            "direction": direction
        }

        # if no parent station, initialize it, then add data
        if parent_station not in station_metadata.keys():
            station_metadata[parent_station] = {}
            station_metadata[parent_station]['name'] = name
            coords = [station['attributes']['latitude'], station['attributes']['longitude']]
            station_metadata[parent_station]['coords'] = coords
            station_metadata[parent_station]['stops'] = [stop_data]
        else:
            station_metadata[parent_station]['stops'].append(stop_data)

    return station_metadata

# with open('output.json', 'w') as f:
#     json.dump(get_station_metadata(), f, indent=2)