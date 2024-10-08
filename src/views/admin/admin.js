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
	CFormSelect,
	CAccordion,
	CAccordionItem,
	CAccordionHeader,
	CModal,
	CAccordionBody
} from '@coreui/react';

//import checkAuth from 'src/checkAuth';
import SeeOrganization from './seeorganization';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
	// Register useState
	const [regNo, setRegNo] = useState('');
	//huvi hun register
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
	const [mmc, setMmc] = useState([]);
	const [selectedMmc, setSelectedMmc] = useState('');
	const [seeOrganization, setSeeOrganization] = useState('');
	
	//Table data useState 
	// const [tableOrganizationData, setTableOrganizationData] = useState({})
	const tableOrganizationData = [
		{
		  legalEntityReg: '1234567890',
		  legalEntityName: 'Example Organization Ltd.',
		  ownerReg: '0987654321',
		  ownerSurname: 'Doe',
		  ownerName: 'John',
		  businessNameMN: 'Жишээ БАЙГУУЛЛАГА ХХК',
		  businessNameENG: 'Example Organization LLC',
		  mccCode: '5411',
		  province: 'Ulaanbaatar',
		  district: 'Sukhbaatar',
		  address: '123 Example Street, Ulaanbaatar',
		  phone: '+976 12345678',
		  email: 'contact@example.com',
		},
		{
		  legalEntityReg: '2345678901',
		  legalEntityName: 'Another Company LLC',
		  ownerReg: '8765432109',
		  ownerSurname: 'Smith',
		  ownerName: 'Jane',
		  businessNameMN: 'Бусад Компани ХХК',
		  businessNameENG: 'Another Company LLC',
		  mccCode: '5812',
		  province: 'Ulaanbaatar',
		  district: 'Chingeltei',
		  address: '456 Another Street, Ulaanbaatar',
		  phone: '+976 23456789',
		  email: 'info@anothercompany.com',
		},
		// Add more entries as needed
	  ];
	
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

  if (loading) {
  
  


	return (		
		<CRow>
			<CAccordion alwaysOpen expanded>
			<CAccordionItem itemKey={1}>
				<CAccordionHeader>TinCode & Merchant names</CAccordionHeader>
				<CAccordionBody>
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
				</CAccordionBody>
			</CAccordionItem>
			<br></br>
			<CAccordionItem itemKey={2}>
				<CAccordionHeader>QPay Merchant register</CAccordionHeader>
				<CAccordionBody>
			{tableOrganizationData && (
					<SeeOrganization data={tableOrganizationData} />
				)}
				</CAccordionBody>
			</CAccordionItem>
			<br></br>
			<CAccordionItem itemKey={3}>
				<CAccordionHeader>Terminals Info</CAccordionHeader>
				<CAccordionBody>
				</CAccordionBody>
			</CAccordionItem>
			</CAccordion>
		</CRow>
	);
	
};
}

export default Admin;
