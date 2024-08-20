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
	CAccordionBody,
	CTable,
	CTableRow,
	CTableHead,
	CTableDataCell,
	CTableHeaderCell,
	CTableBody
} from '@coreui/react';

//import checkAuth from 'src/checkAuth';
import SeeOrganization from './seeorganization';
import { useNavigate } from 'react-router-dom/dist';

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
	  
	//const [tableIndividualData, setTableIndvidualData] = useState({})

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

	return (		
		<CRow>
			<CAccordion alwaysOpen >
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
					{/* Хувь хүн */}
			{individual && (
				<CCol >
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
				<CCol xs={12} className='mx-2 mt-5'>
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
			{tableOrganizationData && (
					<SeeOrganization data={tableOrganizationData} />
				)}
				</CAccordionBody>
			</CAccordionItem>
			<br></br>
			<CAccordionItem itemKey={3}>
				<CAccordionHeader>Terminals Info</CAccordionHeader>
				<CAccordionBody>
					<CTable responsive>
					<CTableHead>
						<CTableRow>
						<CTableHeaderCell scope="col">#</CTableHeaderCell>
						<CTableHeaderCell scope="col">Class</CTableHeaderCell>
						<CTableHeaderCell scope="col">Heading</CTableHeaderCell>
						<CTableHeaderCell scope="col">Heading</CTableHeaderCell>
						</CTableRow>
					</CTableHead>
					<CTableBody>
						<CTableRow>
						<CTableHeaderCell scope="row">1</CTableHeaderCell>
						<CTableDataCell>Mark</CTableDataCell>
						<CTableDataCell>Otto</CTableDataCell>
						<CTableDataCell>@mdo</CTableDataCell>
						</CTableRow>
						<CTableRow>
						<CTableHeaderCell scope="row">2</CTableHeaderCell>
						<CTableDataCell>Jacob</CTableDataCell>
						<CTableDataCell>Thornton</CTableDataCell>
						<CTableDataCell>@fat</CTableDataCell>
						</CTableRow>
						<CTableRow>
						<CTableHeaderCell scope="row">3</CTableHeaderCell>
						<CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
						<CTableDataCell>@twitter</CTableDataCell>
						</CTableRow>
					</CTableBody>
					</CTable>
				</CAccordionBody>
			</CAccordionItem>
			</CAccordion>
		</CRow>
	);
};

export default Admin;
