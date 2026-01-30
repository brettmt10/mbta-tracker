import requests

def get_station_metadata(station_ids):
    params = {
        'filter[route_type]': 1
    }
    
    response = requests.get('https://api-v3.mbta.com/stops', params=params)
    data = response.json()['data']

    station_metadata = {}
    for station_id in station_ids:
        station_metadata[station_id] = {
            'stop_ids': []
        }
        
        for station_data in data:
            parent_id = station_data['relationships']['parent_station']['data']['id']
            if parent_id == station_id:
                station_metadata[station_id]['stop_ids'].append(station_data['id'])
    
    return station_metadata