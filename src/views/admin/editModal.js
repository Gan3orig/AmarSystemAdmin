import React, { useState, useEffect } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormLabel
} from '@coreui/react';
import PropTypes from 'prop-types';

const EditModal = ({ isVisible, handleClose, data, type }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save logic here (e.g., API call or state update)
    console.log('Saved data:', formData);
    handleClose(); // Close the modal after saving
  };

  const renderOrganizationForm = () => (
    <>
      <CFormLabel htmlFor="branchCode">Branch Code</CFormLabel>
      <CFormInput
        id="branchCode"
        name="branchCode"
        type="text"
        value={formData.branchCode || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="legalEntityName">Legal Entity Name</CFormLabel>
      <CFormInput
        id="legalEntityName"
        name="legalEntityName"
        type="text"
        value={formData.legalEntityName || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="ownerReg">Owner Reg</CFormLabel>
      <CFormInput
        id="ownerReg"
        name="ownerReg"
        type="text"
        value={formData.ownerReg || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="ownerSurname">Owner Surname</CFormLabel>
      <CFormInput
        id="ownerSurname"
        name="ownerSurname"
        type="text"
        value={formData.ownerSurname || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="ownerName">Owner Name</CFormLabel>
      <CFormInput
        id="ownerName"
        name="ownerName"
        type="text"
        value={formData.ownerName || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="businessNameMN">Business Name MN</CFormLabel>
      <CFormInput
        id="businessNameMN"
        name="businessNameMN"
        type="text"
        value={formData.businessNameMN || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="businessNameENG">Business Name ENG</CFormLabel>
      <CFormInput
        id="businessNameENG"
        name="businessNameENG"
        type="text"
        value={formData.businessNameENG || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="mccCode">MCC Code</CFormLabel>
      <CFormInput
        id="mccCode"
        name="mccCode"
        type="text"
        value={formData.mccCode || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="province">Province</CFormLabel>
      <CFormInput
        id="province"
        name="province"
        type="text"
        value={formData.province || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="district">District</CFormLabel>
      <CFormInput
        id="district"
        name="district"
        type="text"
        value={formData.district || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="address">Address</CFormLabel>
      <CFormInput
        id="address"
        name="address"
        type="text"
        value={formData.address || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="phone">Phone</CFormLabel>
      <CFormInput
        id="phone"
        name="phone"
        type="text"
        value={formData.phone || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="email">Email</CFormLabel>
      <CFormInput
        id="email"
        name="email"
        type="email"
        value={formData.email || ''}
        onChange={handleChange}
      />
    </>
  );

  const renderIndividualForm = () => (
    <>
      <CFormLabel htmlFor="ownerReg">Owner Reg</CFormLabel>
      <CFormInput
        id="ownerReg"
        name="ownerReg"
        type="text"
        value={formData.ownerReg || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="ownerName">Owner Name</CFormLabel>
      <CFormInput
        id="ownerName"
        name="ownerName"
        type="text"
        value={formData.ownerName || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="ownerSurname">Owner Surname</CFormLabel>
      <CFormInput
        id="ownerSurname"
        name="ownerSurname"
        type="text"
        value={formData.ownerSurname || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="mccCode">MCC Code</CFormLabel>
      <CFormInput
        id="mccCode"
        name="mccCode"
        type="text"
        value={formData.mccCode || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="province">Province</CFormLabel>
      <CFormInput
        id="province"
        name="province"
        type="text"
        value={formData.province || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="district">District</CFormLabel>
      <CFormInput
        id="district"
        name="district"
        type="text"
        value={formData.district || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="address">Address</CFormLabel>
      <CFormInput
        id="address"
        name="address"
        type="text"
        value={formData.address || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="phone">Phone</CFormLabel>
      <CFormInput
        id="phone"
        name="phone"
        type="text"
        value={formData.phone || ''}
        onChange={handleChange}
      />
      <CFormLabel htmlFor="email">Email</CFormLabel>
      <CFormInput
        id="email"
        name="email"
        type="email"
        value={formData.email || ''}
        onChange={handleChange}
      />
    </>
  );

  return (
    <CModal visible={isVisible} onClose={handleClose}>
      <CModalHeader>
        <CModalTitle>{type === 'organization' ? 'Edit Organization' : 'Edit Individual'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {type === 'organization' ? renderOrganizationForm() : renderIndividualForm()}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleClose}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSave}>
          Save
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

// Define PropTypes for the component
EditModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  type: PropTypes.oneOf(['organization', 'individual']).isRequired,
};

EditModal.defaultProps = {
  data: {},
};

export default EditModal;
