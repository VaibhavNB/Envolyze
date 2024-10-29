from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app, origins="*")

@app.route("/")
def hello_world():
    return "Hello World!"

@app.route("/air")
def GetAQIMetrics():
    return {
        "AQI": 32,
        "pollutants": {
        "pm25": 12.5,
        "pm10": 25.3,
        "nox": 21.2,
        "o3": 48.1,
        }
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
    return {
        "Temp": 24,
        "humidity": 65,
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
