// googleMapsInput.js
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const GoogleMapsInput = ({ setNewBranchLocation, setNewBranchZip }) => {
  useEffect(() => {
    const initAutocomplete = () => {
      const input = document.getElementById('location-input');
      const autocomplete = new window.google.maps.places.Autocomplete(input);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const address = place.formatted_address;
        const zipCode = place.address_components.find((component) =>
          component.types.includes('postal_code')
        )?.long_name;

        setNewBranchLocation(address);
        setNewBranchZip(zipCode);
      });
    };

    if (window.google) {
      initAutocomplete();
    }
  }, [setNewBranchLocation, setNewBranchZip]);

  return (
    <input
      id="location-input"
      type="text"
      placeholder="Enter a location"
      className="form-control"
    />
  );
};

GoogleMapsInput.propTypes = {
  setNewBranchLocation: PropTypes.func.isRequired,
  setNewBranchZip: PropTypes.func.isRequired,
};

export default GoogleMapsInput;
