from flask import Flask
from flask_cors import CORS
from AQI_API import *
from Temp_API import get_temp

app = Flask(__name__)

cors = CORS(app, origins="*")

@app.route("/")
def hello_world():
    return "Hello World!"

@app.route("/air")
def GetAQIMetrics():
    data = get_aqi("City")
    return {
        "AQI": 45,
        "pollutants": {
        "pm25": round(data["pm25"], 4),
        "nox": round(data["no2"], 4),
        "o3": round(data["o3"]),
        }
    }
    
@app.route("/airdf")
def GetAQIMetricsDF():
    data = get_aqi_df("City")
    labels = [x.strftime("%m-%d %H:%M") for x in data["date"]]
    return {
        "labels": labels,
        "pm25": data["pm2_5"].to_list(),
        "nox": data["nitrogen_dioxide"].to_list(),
        "o3": data["ozone"].to_list(),
    }

@app.route("/water")
def GetWQIMetrics():
    return {
        "WQI": 92, 
        "parameters": {
        "ph": 7.2,
        "do": 8.5,
        "turbidity": 2.1,
        },
    }
    
@app.route("/temp")
def GetTempMetrics():
    data = get_temp("City")
    return {
        "Temp": round(data["temp"]),
        "humidity": round(data["humidity"]), 
    }

@app.route("/Sensors")
def GetSensorInfo():
    return {
        "AS": 24
    }

@app.route("/allmetrics")
def AllMetrics():
    return {
        "AQI": GetAQIMetrics()["AQI"],
        "WQI": GetWQIMetrics()["WQI"],
        "Temp": GetTempMetrics()["Temp"],
        "AS": GetSensorInfo()["AS"]
    }

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    processed_data = preprocess_data(data)
    wqi = model.predict(processed_data)
    quality_status = water_quality_status(wqi[0])
    return jsonify({'WQI': wqi[0], 'Quality_Status': quality_status})
