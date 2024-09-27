//import React from 'react';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
//import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import markerIcon from 'src/assets/images/marker.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { CAlert, CContainer } from '@coreui/react'


// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [20, 20],
  shadowSize: [12, 12]
});

const TerminalMap = () => {
  //const position = [47.8914133262357,106.896511316299]; // Default position (latitude, longitude)
  const [locations, setLocations] = useState([]);
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [20, 20],
    iconAnchor: [21, 21],
    popupAnchor: [1, -34],
    shadowUrl: markerShadow,
    shadowSize: [12, 12]
  });
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fetchLocations = async () => {
      const token = localStorage.getItem('token'); // Retrieve the Bearer token from localStorage or another storage mechanism
      try {
        const response = await fetch('https://api.majorsoft.mn/api/terminalMap', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Attach the token to the Authorization header
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          setVisible(false);
          const data = await response.json();
          setLocations(data); // Update state with the fetched data
        } else {
          setVisible(true);
          console.error('Failed to fetch locations:', response.status);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchLocations(); // Call the async function to fetch data
  }, []);
  return (
    <CContainer>
      <CAlert color="warning" visible={visible} closeButton onShowChange={setVisible}>
        <strong>Анхааруулга!</strong> Хэрэглэгчээр нэвтрээгүй байна. <a href="/#/login" className="alert-link">Нэвтрэх</a>.
      </CAlert>
      <MapContainer center={[47, 106]} zoom={6} style={{ height: '80vh', width: '100%' }}>
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map(location => (
        <Marker key={location.terminalId} position={[location.locationLat, location.locationLng]} icon={customIcon} >
          <Popup>
            <strong>{location.businessName}</strong><br />
            {location.entityName}
            <br/>✆{location.phone1},{location.phone2}
            <br/>®{location.registerNo}
            <br/>{location.createDate}
          </Popup>
        </Marker>
      ))}
    </MapContainer></CContainer>
  );
};

export default TerminalMap;
