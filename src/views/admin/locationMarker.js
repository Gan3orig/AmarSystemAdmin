import React, { useState, useEffect } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';

function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            {/* Add any additional content for the marker here */}
        </Marker>
    );
}

export default LocationMarker;
