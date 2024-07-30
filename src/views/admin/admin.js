import React, { useState, useEffect } from 'react';
import {
  CButton,
  CRow,
  CCol,
  CCollapse,
  CCard,
  CCardBody,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CButtonGroup,
  CNavbarToggler,
  CNavbarNav,
  CNavItem,
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavLink,
  CCardHeader,
  CFormSelect
} from '@coreui/react';

const Admin = () => {
  const [regNo, setRegNo] = useState('');
  const [individualReg, setIndividualReg] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSubBranch, setSelectedSubBranch] = useState('');
  const [response, setResponse] = useState(null);
  const [secondResponse, setSecondResponse] = useState(null);
  const [error, setError] = useState(null);
  const [visibleA, setVisibleA] = useState(false);
  const [individual, setIndividual] = useState(false);
  const [organization, setOrganization] = useState(false);
  const [subBranches, setSubBranches] = useState([]);
  const [branches, setBranches] = useState([]);
  const [mmc,setMmc]=useState([]);
  const [selectedMmc, setSelectedMmc]=useState('');

  const handleInputChange = (event) => {
    setRegNo(event.target.value);
  };

  const handleCheck = async (regValue) => {
    const apiUrl = `https://api.ebarimt.mn/api/info/check/getTinInfo?regNo=${regValue}`;
    const apiOptions = {
      method: 'GET',
      headers: { Accept: 'application/json' },
    };

    try {
      const apiResponse = await fetch(apiUrl, apiOptions);
      const apiData = await apiResponse.json();
      setResponse(apiData);
      setError(null);

      const tin = apiData?.data;

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

      setVisibleA(true);
    } catch (error) {
      setResponse(null);
      setSecondResponse(null);
      setError(error.toString());
      setVisibleA(false);
    }
  };
  // const mmcValue= async()=>{
  //   const mmcUrl='https://l.facebook.com/l.php?u=https%3A%2F%2Fapi.majorsoft.mn%2Fapi%2FQPay%2FmccCode%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR3C6XtqHOn7ITv42phBQvCA6Vu8vMbDYbCAbWRFbx-XTD3EMny2Hb4mNKw_aem_kIRjBJne7igKE6zvLG_njA&h=AT12ueg-BUusEa-xhzfkmmxRFSVHreZMgN-F9ZcwFiWxo2fY9a-zIsyin6KXO4cO9z7z4S4ZggK_8zFuIbuHgjpjMBDY-48PgPDdgU8BzmzdiDI5HvXF0Wcskfz989Q4T5SnKw';
  //   const option={
  //     method:'GET',
  //     header: { Accept: 'application/json' },
  //   }
  //   const mmcResponse=await fetch(mmcUrl,option);
  //   const mmcData=await mmcResponse.json();
  //   console.log(mmcData);
  //   setMmc(mmcData);
  // }
  //   useEffect(()=>{
  //    mmcValue();
  //   }, []);
   
  
  
  const handleCheckUser = () => {
    handleCheck(regNo);
  };

  const handleCheckInvidual = async () => {
    const apiUrl = `https://api.ebarimt.mn/api/info/check/getTinInfo?regNo=${individualReg}`;
    const apiOptions = {
      method: 'GET',
      headers: { Accept: 'application/json' },
    };

    try {
      const apiResponse = await fetch(apiUrl, apiOptions);
      const apiData = await apiResponse.json();
      setResponse(apiData);
      setError(null);

      const tin = apiData?.data;

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
    } catch (error) {
      setResponse(null);
      setSecondResponse(null);
      setError(error.toString());
    }
  };

  useEffect(() => {
    if (individualReg) {
      handleCheckInvidual();
    }
  }, [individualReg]);

  const handleBranchChange = (event) => {
    const branchId = event.target.value;
    setSelectedBranch(branchId);
    const selectedBranchData = branches.find(branch => branch.branchCode === branchId);
    setSubBranches(selectedBranchData ? selectedBranchData.subBranches : []);
  };

  const handleHideResults = () => {
    setVisibleA(false);
  };

  useEffect(() => {
    const fetchBranches = async () => {
      const url = 'https://api.ebarimt.mn/api/info/check/getBranchInfo';
      const options = {
        method: 'GET',
        headers: { Accept: 'application/json' },
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
              acc[branchCode] = { branchCode, branchName, subBranches: [], location: '', contact: '' };
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
  }, []);

  return (
    <CRow>
      <CCol xs="auto">
        <CFormLabel className="visually-hidden" htmlFor="autoSizingInput">
          Цахим баримт 3.0 TIN code ба ТТД Нэр авах
        </CFormLabel>
      </CCol>
      <CCol xs={12}>
        <CInputGroup className="mb-3">
          <CFormInput
            className='reg'
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

      <CNavbar expand="lg" className="border rounded-3">
        <CContainer fluid>
          <CNavbarBrand>
            <h4>Qpay холболт</h4>
          </CNavbarBrand>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visibleA}
            onClick={() => setVisibleA(!visibleA)}
          />
          <CNavbarNav>
            <CNavItem className={`${individual ? 'border-bottom fw-bold' : ''}`}>
              <CNavLink
                active
                onClick={() => {
                  setOrganization(false);
                  setIndividual(true);
                }}
              >
                Хувь хүн
              </CNavLink>
            </CNavItem>
            <CNavItem className={`${organization ? 'border-bottom fw-bold' : ''}`}>
              <CNavLink
                onClick={() => {
                  setIndividual(false);
                  setOrganization(true);
                }}
              >
                Байгууллага
              </CNavLink>
            </CNavItem>
          </CNavbarNav>
        </CContainer>
      </CNavbar>

      {error && (
        <CCol xs={12}>
          <div className="error">
            <div>Алдаа:</div>
            <pre>{error}</pre>
          </div>
        </CCol>
      )}

      {individual && (
        <CCol xs={12} className='mx-2 mt-5'>
          <CCard>
            <CCardHeader>Хувь хүн</CCardHeader>
            <CCardBody>
              <CRow>
                <div className='d-flex flex-column gap-0'>
                  <CFormLabel>Эзэмшигчийн регистр</CFormLabel>
                  <CInputGroup className='mb-3'>
                    <CFormInput
                      className='individualReg'
                      type="text"
                      placeholder="Регистерийн дугаар"
                      aria-describedby="button-addon2"
                      value={individualReg}
                      onChange={(e) => setIndividualReg(e.target.value)}
                    />
                  </CInputGroup>
                  <CFormLabel>Эзэмшигчийн Овог</CFormLabel>
                  <CFormInput className='FirstName' />
                  <CFormLabel>Эзэмшигчийн Нэр</CFormLabel>
                  <CFormInput className='LastName' value={secondResponse?.data.name || ''} disabled />
                  <CFormLabel>MCC code</CFormLabel> 
                  <CFormSelect></CFormSelect>
                 
                  <CRow md={4}>
                    <CFormSelect
                      id="branchName"
                      label="Аймаг/Xот"
                      value={selectedBranch}
                      onChange={handleBranchChange}
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
                      label="Сум дүүрэг"
                      value={selectedSubBranch}
                      onChange={(e) => setSelectedSubBranch(e.target.value)}
                    >
                      <option value="">Сонгоно уу...</option>
                      {subBranches.map((subBranch) => (
                        <option key={subBranch.subBranchCode} value={subBranch.subBranchCode}>
                          {subBranch.subBranchName}
                        </option>
                      ))}
                    </CFormSelect>
                  </CRow>
                </div>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      )}
      
      {organization && (
        <CCol xs={12} className='mx-2 mt-5'>
          <CCard>
            <CCardHeader>Байгууллага</CCardHeader>
            <CCardBody>
              <CRow>
                <div className='d-flex flex-column gap-0'>
                  <CFormLabel>Хуулийн этгээдийн регистр</CFormLabel>
                  <CInputGroup className='mb-3'>
                    <CFormInput
                      className='individualReg'
                      type="text"
                      placeholder="Регистерийн дугаар"
                      aria-describedby="button-addon2"
                      value={individualReg}
                      onChange={(e) => setIndividualReg(e.target.value)}
                    />
                  </CInputGroup>
                  <CFormLabel>Хуулийн этгээдийн нэр</CFormLabel>
                  <CFormInput />
                  <CFormLabel>байршил LAT</CFormLabel>
                  <CFormInput />
                  <CFormLabel>байршил LNG</CFormLabel>
                  <CFormInput />
                  <CFormLabel>Эзэмшигчийн регистр</CFormLabel>
                  <CFormInput />
                  <CFormLabel>Эзэмшигчийн Овог</CFormLabel>
                  <CFormInput className='FirstName' />
                  <CFormLabel>Эзэмшигчийн Нэр</CFormLabel>
                  <CFormInput />
                  <CFormLabel>Бизнес нэр Монголоор</CFormLabel>
                  <CFormInput className='busName' value={secondResponse?.data.name || ''} disabled />
                  <CFormLabel>Business Name (eng)</CFormLabel>
                  <CFormInput />

                  <CFormLabel>MCC code</CFormLabel> 
                  <CFormSelect
                      
                      value={selectedMmc}
                      onChange={(e) => setSelectedMmc(e.target.value)}
                    >
                      <option value="">Сонгоно уу...</option>
                      {mmc.map((subBranch) => (
                        <option key={subBranch.mcc_code} value={subBranch.name_mon}>
                          {subBranch.name_mon}
                        </option>
                      ))}</CFormSelect>
                 
                  <CRow md={4}>
                    <CFormSelect
                      id="branchName"
                      label="Аймаг/Xот"
                      value={selectedBranch}
                      onChange={handleBranchChange}
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
                      label="Сум дүүрэг"
                      value={selectedSubBranch}
                      onChange={(e) => setSelectedSubBranch(e.target.value)}
                    >
                      <option value="">Сонгоно уу...</option>
                      {subBranches.map((subBranch) => (
                        <option key={subBranch.subBranchCode} value={subBranch.subBranchCode}>
                          {subBranch.subBranchName}
                        </option>
                      ))}
                    </CFormSelect>
                  </CRow>
                  
                  <CFormLabel>Хаяг</CFormLabel>
                  <CFormInput />
                  <CFormLabel>Утас</CFormLabel>
                  <CFormInput />
                  <CFormLabel>Майл</CFormLabel>
                  <CFormInput />
                </div>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      )}
    </CRow>
  );
};

export default Admin;
