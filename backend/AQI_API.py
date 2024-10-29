import openmeteo_requests

import requests_cache
import pandas as pd
from retry_requests import retry
from shared import get_location

# Setup the Open-Meteo API client with cache and retry on error
cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
openmeteo = openmeteo_requests.Client(session = retry_session)

url = "https://air-quality-api.open-meteo.com/v1/air-quality"

def get_aqi(city):
    [lat, long] = get_location(city)
    params = {
	"latitude": lat,
	"longitude": long,
	"hourly": ["pm2_5", "nitrogen_dioxide", "ozone"],
	"past_days": 0,
	"forecast_days": 1
    }

    responses = openmeteo.weather_api(url, params=params)

    response = responses[0]

    hourly = response.Hourly()
    hourly_pm2_5 = hourly.Variables(0).ValuesAsNumpy()
    hourly_nitrogen_dioxide = hourly.Variables(1).ValuesAsNumpy()
    hourly_ozone = hourly.Variables(2).ValuesAsNumpy()

    hourly_data = {"date": pd.date_range(
        start = pd.to_datetime(hourly.Time(), unit = "s", utc = True),
        end = pd.to_datetime(hourly.TimeEnd(), unit = "s", utc = True),
        freq = pd.Timedelta(seconds = hourly.Interval()),
        inclusive = "left"
    )}
    hourly_data["pm2_5"] = hourly_pm2_5
    hourly_data["nitrogen_dioxide"] = hourly_nitrogen_dioxide
    hourly_data["ozone"] = hourly_ozone

    hourly_dataframe = pd.DataFrame(data = hourly_data)

    data = hourly_dataframe.tail(1)

    return {
        #"AQI": data.values[0].tolist()[1],
        "pm25": data.values[0].tolist()[1],
        "no2": data.values[0].tolist()[2],
        "o3": data.values[0].tolist()[3],
    }