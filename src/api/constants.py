predictions_api_url = 'https://api-v3.mbta.com/predictions'

# I got the station ids and destination ids from https://api-v3.mbta.com/stops with filter[route_type] = 1
# using these statically helps with api rate limits - extracted using utils/get_station_metadata.py
station_metadata = {
    '70078': {'name': 'Downtown Crossing', 'direction': 'Alewife', 'line': 'Red'},
    '70070': {'name': 'Central', 'direction': 'Alewife', 'line': 'Red'},
    '70080': {'name': 'South Station', 'direction': 'Alewife', 'line': 'Red'},
    '70071': {'name': 'Kendall/MIT', 'direction': 'Ashmont/Braintree', 'line': 'Red'},
    '70065': {'name': 'Porter', 'direction': 'Ashmont/Braintree', 'line': 'Red'},
    '70079': {'name': 'South Station', 'direction': 'Ashmont/Braintree', 'line': 'Red'},
    '70068': {'name': 'Harvard', 'direction': 'Alewife', 'line': 'Red'},
    '70066': {'name': 'Porter', 'direction': 'Alewife', 'line': 'Red'},
    '70067': {'name': 'Harvard', 'direction': 'Ashmont/Braintree', 'line': 'Red'},
    '70063': {'name': 'Davis', 'direction': 'Ashmont/Braintree', 'line': 'Red'},
    '70064': {'name': 'Davis', 'direction': 'Alewife', 'line': 'Red'},
    '70072': {'name': 'Kendall/MIT', 'direction': 'Alewife', 'line': 'Red'},
    '70073': {'name': 'Charles/MGH', 'direction': 'Ashmont/Braintree', 'line': 'Red'},
    '70075': {'name': 'Park Street', 'direction': 'Ashmont/Braintree', 'line': 'Red'},
    '70077': {'name': 'Downtown Crossing', 'direction': 'Ashmont/Braintree', 'line': 'Red'},
    '70069': {'name': 'Central', 'direction': 'Ashmont/Braintree', 'line': 'Red'},
    '70074': {'name': 'Charles/MGH', 'direction': 'Alewife', 'line': 'Red'},
    '70076': {'name': 'Park Street', 'direction': 'Alewife', 'line': 'Red'}
}