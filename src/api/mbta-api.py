import requests

stops = "https://api-v3.mbta.com/stops"

red_line = {
    'sort': 'latitude',
    'filter[latitude]': '42.365486',
    'filter[longitude]': '-71.103802',
    'filter[radius]': '0.052',
    'filter[route]': 'Red',
    'fields[stop]': 'latitude,longitude,name'
}

headers = {
    'accept': 'application/vnd.api+json'
}

response = requests.get(stops, params=red_line, headers=headers)

data = response.json()
for stop in data['data']:
    attrs = stop['attributes']
    print(attrs)


