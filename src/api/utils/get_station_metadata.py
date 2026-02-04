import requests
line_lookup = {
    "Alewife": 'Red',
    'Ashmont/Braintree': 'Red'
}

def get_station_metadata_by_id():
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

def get_station_metadata_by_parent():
    params = {
        'filter[route_type]': 1,
        'fields[stop]': 'name,platform_name,latitude,longitude'
    }

    response = requests.get('https://api-v3.mbta.com/stops', params=params)
    data = response.json()['data']

    station_metadata = {}
    for station in data:
        directions = line_lookup.keys()
        id = station['id']
        direction = station['attributes']['platform_name']
        coords = {'latitude': station['attributes']['latitude'], 'longitude': station['attributes']['longitude']}
        name = station['attributes']['name']
        parent_station = station['relationships']['parent_station']['data']['id']
        if direction in directions and parent_station not in station_metadata.keys():
            line = line_lookup[direction]
            station_metadata[parent_station] = {"name": name, "line": line, "coords": coords}
    return station_metadata