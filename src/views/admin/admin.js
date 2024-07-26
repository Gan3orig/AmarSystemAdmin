import React, { useState } from 'react';
import { CButton, CRow, CCol, CCollapse, CCard, CCardBody, CFormInput, CFormLabel, CInputGroup, CButtonGroup } from '@coreui/react';

const Admin = () => {
  const [regNo, setRegNo] = useState('');
  const [response, setResponse] = useState(null);
  const [secondResponse, setSecondResponse] = useState(null);
  const [error, setError] = useState(null);
  const [visibleA, setVisibleA] = useState(false);

  const handleInputChange = (event) => {
    setRegNo(event.target.value);
  };

  const handleCheckUser = async () => {
    const firstApiUrl = `https://api.ebarimt.mn/api/info/check/getTinInfo?regNo=${regNo}`;
    const firstApiOptions = {
      method: 'GET',
      headers: { Accept: 'application/json' },
    };

    try {
      const firstApiResponse = await fetch(firstApiUrl, firstApiOptions);
      const firstApiData = await firstApiResponse.json();
      setResponse(firstApiData);
      setError(null);

      const tin = firstApiData?.data; // Adjust this based on the actual response structure

      if (tin) {
        const secondApiUrl = `https://api.ebarimt.mn/api/info/check/getInfo?tin=${tin}`;
        const secondApiOptions = {
          method: 'GET',
          headers: { Accept: 'application/json' },
        };

        const secondApiResponse = await fetch(secondApiUrl, secondApiOptions);
        const secondApiData = await secondApiResponse.json();
        setSecondResponse(secondApiData);
      } else {
        setSecondResponse(null);
      }

      setVisibleA(true); // Show results
    } catch (error) {
      setResponse(null);
      setSecondResponse(null);
      setError(error.toString());
      setVisibleA(false); // Hide results
    }
  };

  const handleHideResults = () => {
    setVisibleA(false);
  };

  return (
    <CRow>
      <CCol xs="auto">
        <CFormLabel className="visually" htmlFor="autoSizingInput">
          Цахим баримт 3.0 TIN code ба ТТД Нэр авах
        </CFormLabel>
      </CCol>
      <CCol xs={12}>
        <CInputGroup className="mb-3">
          <CFormInput
            type="text"
            placeholder="Регистерийн дугаар"
            aria-describedby="button-addon2"
            value={regNo}
            onChange={handleInputChange}
          />
          <CButtonGroup role="group" aria-label="Basic example">
            <CButton
              type="button"
              color="primary"
              id="button-addon2"
              onClick={handleCheckUser}
            >
              Шалгах
            </CButton>
            <CButton color="primary" onClick={handleHideResults}>
              Хураах
            </CButton>
          </CButtonGroup>
        </CInputGroup>
      </CCol>
      <CCol xs={12}>
        <CCollapse visible={visibleA}>
          <CInputGroup className="mb-3">
            <CFormInput
              type="text"
              placeholder="Tin Code"
              aria-label="readonly input example"
              value={response?.data || ''}
              readOnly
            />
            <CFormInput
              type="text"
              placeholder="Merchant Name"
              aria-label="readonly input example"
              value={secondResponse?.data?.name || ''}
              readOnly
            />
          </CInputGroup>
        </CCollapse>
      </CCol>
      <CCol xs={12}>
        <CRow>
          <CCol>
            <CCollapse visible={visibleA}>
              <CCard className="mt-3">
                <CCardBody>
                  <div className="result">Анхны API-ийн хариу:</div>
                  <pre>{response ? JSON.stringify(response, null, 2) : 'No data'}</pre>
                </CCardBody>
                <CCardBody>
                  <div className="result">Хоёр дахь API-ийн хариу:</div>
                  <pre>{secondResponse ? JSON.stringify(secondResponse, null, 2) : 'No data'}</pre>
                </CCardBody>
              </CCard>
            </CCollapse>
          </CCol>
        </CRow>
      </CCol>
      {error && (
        <CCol xs={12}>
          <div className="error">
            <div>Алдаа:</div>
            <pre>{error}</pre>
          </div>
        </CCol>
      )}
    </CRow>
  );
};

export default Admin;
