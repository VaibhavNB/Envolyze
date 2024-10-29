import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const customIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const SensorMap = () => {
  const sensors = [
    { id: 1, position: [13.37541, 77.09684], name: 'Sensor 1', type: 'Air Quality' },
    { id: 2, position: [13.5, 77.0], name: 'Sensor 2', type: 'Water Quality' },
    { id: 3, position: [13, 77.1], name: 'Sensor 3', type: 'Temperature' }
  ];

  return (
    <div className="h-[400px] bg-white p-4 rounded-lg shadow-lg">
      <MapContainer center={[13.37541, 77.09684]} zoom={8} className="h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {sensors.map(sensor => (
          <Marker
            key={sensor.id}
            position={sensor.position}
            icon={customIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{sensor.name}</h3>
                <p className="text-sm text-gray-600">{sensor.type}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SensorMap;