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

# using these statically helps with api rate limits
destination_ids = {
    "70067": "Ashmont/Braintree",
    "70068": "Alewife"
}