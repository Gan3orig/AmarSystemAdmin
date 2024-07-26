import React, { useState, useEffect } from 'react';
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CRow,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CFormSelect,
  CFormCheck,
  CFormFeedback,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import CIcon from '@coreui/icons-react';

const Settings = () => {
  const [visible, setVisible] = useState(false);
  const [branches, setBranches] = useState([]);
  const [subBranches, setSubBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchBranches = async () => {
      const url = 'https://api.ebarimt.mn/api/info/check/getBranchInfo';
      const options = {
        method: 'GET',
        headers: { Accept: 'application/json' }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log('API Data:', data);

        const dataArray = Array.isArray(data) ? data : data.data || [];

        if (Array.isArray(dataArray)) {
          const groupedBranches = dataArray.reduce((acc, curr) => {
            const { branchCode, branchName, subBranchCode, subBranchName } = curr;
            if (!acc[branchCode]) {
              acc[branchCode] = { branchCode, branchName, subBranches: [] };
            }
            acc[branchCode].subBranches.push({ subBranchCode, subBranchName });
            return acc;
          }, {});

          setBranches(Object.values(groupedBranches));
        } else {
          console.error('Unexpected data format:', dataArray);
        }
      } catch (error) {
        console.error('Error fetching branch data:', error);
      }
    };

    fetchBranches();

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.onload = () => {
      if (window.google) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          document.getElementById('addressInput'),
          { types: ['address'] }
        );
        setAutocomplete(autocomplete);

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          setAddress(place.formatted_address || '');
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleBranchChange = (event) => {
    const branchId = event.target.value;
    setSelectedBranch(branchId);
    const selectedBranchData = branches.find(branch => branch.branchCode === branchId);
    setSubBranches(selectedBranchData ? selectedBranchData.subBranches : []);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted with address:', address);
  };

  return (
    <div className="app-container">
      <nav className="sidebar">
        <h2>Тохиргоо</h2>
        <h3>Салбарууд</h3>
        <ul>
          <li onClick={() => setVisible(true)}>Салбар</li>
          <li>Пос төхөөрөмж</li>
          <li>Захиалга авах байршил</li>
          <li>Реклам</li>
        </ul>
      </nav>
      <main className="content">
        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader>
            <CModalTitle id="LiveDemoExampleLabel">Салбар бүртгүүлэх</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CRow md={4}>
                <CFormInput
                  type="text"
                  id="OrganizationName"
                  label="Салбарын нэр"
                  defaultValue="Салбарын нэр бусад салбараас ялгаатай байх ёстой"
                  required
                />
              </CRow>
              <CRow md={4}>
                <CFormSelect
                  id="branchName"
                  label="Сум дүүрэг"
                  value={selectedBranch}
                  onChange={handleBranchChange}
                  required
                >
                  <option value="" disabled>Сонгоно уу...</option>
                  {branches.map((branch) => (
                    <option key={branch.branchCode} value={branch.branchCode}>
                      {branch.branchName}
                    </option>
                  ))}
                </CFormSelect>
              </CRow>
              <CRow md={4}>
                <CFormSelect
                  id="subbranchName"
                  label="Хороо"
                  required
                >
                  <option value="" disabled>Сонгоно уу...</option>
                  {subBranches.map((subBranch) => (
                    <option key={subBranch.subBranchCode} value={subBranch.subBranchCode}>
                      {subBranch.subBranchName}
                    </option>
                  ))}
                </CFormSelect>
              </CRow>
              <CRow md={4}>
                <CFormLabel htmlFor="addressInput">Байршил</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroup.Prepend>
                    <CInputGroup.Text>
                      <CIcon></CIcon>
                    </CInputGroup.Text>
                  </CInputGroup.Prepend>
                  <CFormInput
                    type="text"
                    id="addressInput"
                    value={address}
                    aria-describedby="inputGroupPrepend03"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </CInputGroup>
              </CRow>
              <CRow md={6}>
                <CFormLabel htmlFor="validationServer03">Салбар байршил</CFormLabel>
                <CFormInput
                  type="text"
                  id="validationServer03"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </CRow>
              <CRow md={3}>
                <CFormInput
                  type="text"
                  id="validationServer05"
                  label="Утасны дугаар"
                  required
                />
              </CRow>
              <CRow xs={12}>
                <CFormCheck
                  type="checkbox"
                  id="invalidCheck"
                  label="Agree to terms and conditions"
                  required
                />
                <CFormFeedback invalid>
                  You must agree before submitting.
                </CFormFeedback>
              </CRow>
              <CRow xs={12}>
                <CButton color="primary" type="submit">
                  Submit form
                </CButton>
              </CRow>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              Save changes
            </CButton>
          </CModalFooter>
        </CModal>
      </main>
    </div>
  );
};

export default Settings;
