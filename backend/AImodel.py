import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import Ridge, Lasso
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error
from sklearn.externals import joblib  # or `import joblib` for newer versions

# Load your data
water_data = pd.read_csv(r"C:\Users\badig\MyJupyteNotebooks\water_data.csv", encoding='ISO-8859-1')

# Convert columns to numeric
numeric_columns = ["Temp", "D.O. (mg/l)", "PH", "CONDUCTIVITY (µmhos/cm)", "B.O.D. (mg/l)",
                   "NITRATENAN N+ NITRITENANN (mg/l)", "FECAL COLIFORM (MPN/100ml)", 
                   "TOTAL COLIFORM (MPN/100ml)Mean"]

for column in numeric_columns:
    water_data[column] = pd.to_numeric(water_data[column], errors='coerce')

# Fill missing values
water_data[numeric_columns] = water_data[numeric_columns].fillna(water_data[numeric_columns].mean())

# Weights for each parameter
weights = {
    'D.O. (mg/l)': 0.3,
    'PH': 0.2,
    'B.O.D. (mg/l)': 0.2,
    'CONDUCTIVITY (µmhos/cm)': 0.1,
    'NITRATENAN N+ NITRITENANN (mg/l)': 0.1,
    'TOTAL COLIFORM (MPN/100ml)Mean': 0.1
}

# Function to calculate WQI
def calculate_wqi(data):
    wqi = sum(data[param] * weights.get(param, 0) for param in weights.keys() if param in data)
    return wqi

# Apply WQI calculation
water_data['WQI'] = water_data.apply(calculate_wqi, axis=1)

# Function to determine water quality status
def water_quality_status(wqi):
    if wqi <= 50:
        return 'Good'
    elif 50 < wqi <= 70:
        return 'Moderate'
    elif 70 < wqi <= 100:
        return 'Poor'
    else:
        return 'Very Poor'

# Apply water quality status determination
water_data['Quality_Status'] = water_data['WQI'].apply(water_quality_status)

# Prepare data for machine learning
X = water_data[numeric_columns]
y = water_data['WQI']

# Split the dataset into training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Initialize and train the Random Forest model
rf_model = RandomForestRegressor(random_state=42)
rf_model.fit(X_train_scaled, y_train)

# Predict and calculate MSE on the test set
rf_predictions = rf_model.predict(X_test_scaled)
rf_mse = mean_squared_error(y_test, rf_predictions)
print("Random Forest MSE:", rf_mse)

# Save the model
joblib.dump(rf_model, 'water_quality_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

# Display updated DataFrame with the new WQI and Quality_Status columns
print(water_data[['WQI', 'Quality_Status']].head())
