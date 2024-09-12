
import React, { useState, useEffect } from 'react';
import {
    CButton,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CFormInput,
    CFormLabel,
    CInputGroup,
    CNavbarToggler,
    CNavbarNav,
    CNavItem,
    CContainer,
    CNavbar,
    CNavbarBrand,
    CNavLink,
    CCardHeader,
    CFormSelect,
    CModal,

} from '@coreui/react';

import PropTypes from 'prop-types';

const Modal = (isVisible , handleClose) => {
    const [regNo, setRegNo] = useState('');
	//huvi hun register
	const [individualReg, setIndividualReg] = useState('');
	const [selectedBranch, setSelectedBranch] = useState('');
	const [selectedSubBranch, setSelectedSubBranch] = useState('');
	const [response, setResponse] = useState(null);
	const [secondResponse, setSecondResponse] = useState(null);
	const [error, setError] = useState(null);
    const [mmc, setMmc] = useState([]);
	const [visibleA, setVisibleA] = useState(false);
	const [individual, setIndividual] = useState(false);
	const [organization, setOrganization] = useState(false);
	const [subBranches, setSubBranches] = useState([]);
	const [branches, setBranches] = useState([]);
	const [selectedMmc, setSelectedMmc] = useState('');
	
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

	//Table data avah back api end bichigden


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
	const [loading, setLoading] = useState(true);


	//permission check
  useEffect(() => {
    const checkPermissions = () => {
      const userStatus = localStorage.getItem('userStatus'); // Assuming userStatus is stored in localStorage

      if (userStatus === 'admin') {
       
        setLoading(false);
      } 
    };

    checkPermissions();
  }, []);

    return (
        <CModal visible={isVisible} onClose={handleClose}>
            <CNavbar expand="lg" className="border rounded-3">
                <CContainer fluid>
                    <CNavbarBrand>
                        <h5>Qpay холболт</h5>
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
            {/* Хувь хүн */}
            {individual && (
                <CCol className='py-2 px-2' >
                    <CCard className="mt-3">
                        <CCardHeader>Хувь хүн</CCardHeader>
                        <CCardBody>
                            <CRow className='align-items-center'>
                                <CCol xs={6}>
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
                                </CCol>
                                <CCol xs={6}>
                                    <CFormLabel>Эзэмшигчийн Нэр</CFormLabel>
                                    <CFormInput className='LastName' value={secondResponse?.data.name || ''} disabled />
                                </CCol>
                            </CRow>

                            <CRow className='align-items-center'>
                                <CCol xs={6}>
                                    <CFormLabel>Эзэмшигчийн Овог</CFormLabel>
                                    <CFormInput className='FirstName' />
                                </CCol>
                                <CCol xs={6}>
                                    <CFormLabel>MCC code</CFormLabel>
                                    <CFormSelect></CFormSelect>
                                </CCol>
                            </CRow>

                            <CRow className='align-items-center'>
                                <CCol xs={6}>
                                    <CFormLabel>Аймаг/Xот</CFormLabel>
                                    <CFormSelect
                                        id="branchName"
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
                                </CCol>
                                <CCol xs={6}>
                                    <CFormLabel>Сум дүүрэг</CFormLabel>
                                    <CFormSelect
                                        id="subbranchName"
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
                                </CCol>
                            </CRow>

                            <CRow className='align-items-center'>
                                <CCol xs={6}>
                                    <CFormLabel>Хаяг</CFormLabel>
                                    <CFormInput />
                                </CCol>
                                <CCol xs={6}>
                                    <CFormLabel>Утас</CFormLabel>
                                    <CFormInput />
                                </CCol>
                            </CRow>

                            <CRow className='align-items-center'>
                                <CCol xs={12}>
                                    <CFormLabel>EMail</CFormLabel>
                                    <CFormInput />
                                </CCol>
                            </CRow>

                            <CButton color='primary' className='mt-4'>Хадгалах</CButton>
                        </CCardBody>
                    </CCard>
                </CCol>
            )}
            {/* Байгууллага */}
            {organization && (<>
                <CCol xs={12} className='py-2 px-2'>
                    <CCard>
                        <CCardHeader>Байгууллага</CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol md={6}>

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
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Хуулийн этгээдийн нэр</CFormLabel>
                                    <CFormInput className='mb-3' />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md={6}>
                                    <CFormLabel>Эзэмшигчийн регистр</CFormLabel>
                                    <CFormInput />
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Эзэмшигчийн Овог</CFormLabel>
                                    <CFormInput className='FirstName' />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol md={6}>
                                    <CFormLabel>Эзэмшигчийн Нэр</CFormLabel>
                                    <CFormInput />
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Бизнес нэр Монголоор</CFormLabel>
                                    <CFormInput className='busName' value={secondResponse?.data.name || ''} disabled />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol md={6}>
                                    <CFormLabel>Business Name (eng)</CFormLabel>
                                    <CFormInput />
                                </CCol>
                                <CCol md={6}>
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
                                        ))}
                                    </CFormSelect>
                                </CCol>
                            </CRow>
                            <CRow >
                                <CCol md={6}>
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
                                </CCol>
                                <CCol md={6}>
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

                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md={6}>
                                    <CFormLabel>Хаяг</CFormLabel>
                                    <CFormInput />
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Утас</CFormLabel>
                                    <CFormInput />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol md={6}>
                                    <CFormLabel>Майл</CFormLabel>
                                    <CFormInput />
                                </CCol>
                            </CRow>

                            <CButton color='primary' className='mt-4'>Хадгалах</CButton>

                        </CCardBody>
                    </CCard>
                </CCol>
            </>

            )}
        </CModal>
    )};
    Modal.propTypes = {
        onClose: PropTypes.func.isRequired
      };;
    
    export default Modal;
