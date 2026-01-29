predictions_api_url = 'https://api-v3.mbta.com/predictions'

# I got the station ids and destination ids from https://api-v3.mbta.com/stops with filter[route_type] = 1
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

direction_ids = {
    "red": {
        0: 'Ashmont/Braintree',
        1: 'Alewife'
    }
}

# using these statically helps with api rate limits
station_metadata = {
    'place-harsq': {
        'stop_ids': ['70067', '70068'],
        'line': 'red'
    }
}