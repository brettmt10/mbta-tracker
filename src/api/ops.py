from datetime import datetime
import pytz
import constants as c

def get_time_info(arrival_time):
    now = datetime.now(pytz.timezone('US/Eastern'))
    time_diff = arrival_time - now
    seconds = time_diff.total_seconds()
    mins = round(seconds / 60)

    return seconds, mins

def countdown_logic(station_id, prediction_data: dict):
    # return the countdown message based on MTBA best practices: https://www.mbta.com/developers/real-time-display-guidelines
    arrival_time = prediction_data['arrival_time']
    departure_time = prediction_data['departure_time']
    status = prediction_data['status']
    train_location = prediction_data['train_location']
    now = datetime.now(pytz.timezone('US/Eastern'))

    seconds, mins = get_time_info(arrival_time)

    
    at_station = (
        status == 'Stopped at station' 
        and train_location in c.station_metadata[station_id]['stop_ids']
    )
    boarding_timing = seconds <= 90 or (arrival_time < now and departure_time > now)

    if not at_station and seconds < 0:
        return

    if at_station and boarding_timing:
        countdown_message = 'Boarding'
    elif not at_station and seconds <= 30:
        countdown_message = 'Arriving'
    elif not at_station and seconds <= 60:
        countdown_message = '1 min'
    elif not at_station and mins > 60:
        hours = mins // 60
        remaining_mins = mins % 60
        countdown_message = f'{hours} hr {remaining_mins} mins'
    else:
        countdown_message = f'{mins} min'

    return countdown_message