import requests

def get_station_metadata():
    line_lookup = {
        "Alewife": 'Red',
        'Ashmont/Braintree': 'Red'
    }

    params = {
        'filter[route_type]': 1,
        'fields[stop]': 'name,platform_name'
    }

    response = requests.get('https://api-v3.mbta.com/stops', params=params)
    data = response.json()['data']

    station_metadata = {}
    for station in data:
        directions = line_lookup.keys()
        id = station['id']
        direction = station['attributes']['platform_name']
        name = station['attributes']['name']
        parent_station = station['relationships']['parent_station']['data']['id']

        if direction in directions:
            line = line_lookup[direction]
            print(name, id, direction, line)

            station_metadata[id] = {"name": name, "direction": direction, "line": line, 'parent_station_id': parent_station}
    
    return station_metadata