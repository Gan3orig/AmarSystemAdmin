import { useEffect, useState } from 'react';

import { cilAirplay, cilPen, cilSettings, cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSwitch
} from '@coreui/react';

const Settings = () => {
  const [visible, setVisible] = useState(false);
  const [showBarimt, setshowBarimt] = useState(false);
  const [posFormVisible, setPosFormVisible] = useState(false);
  const [branches, setBranches] = useState([]);
  const [subBranches, setSubBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [showAddBranchButton, setShowAddBranchButton] = useState(false);
  const [showOrderSection, setShowOrderSection] = useState(false); // State for order section
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [taxPayerName, setTaxPayerName] = useState('');
  const [taxpayerNo, setTaxpayerNo] = useState('');
  const [isVATPayer, setIsVATPayer] = useState(false);

  // State for new branch form
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchType, setNewBranchType] = useState('');
  const [newBranchLocation, setNewBranchLocation] = useState('');
  const [newBranchContact, setNewBranchContact] = useState('');

  // State for editing branch
  const [editingBranch, setEditingBranch] = useState(null);

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
  const handleToggleBarimtSection = () => {
    setshowBarimt(true);  // Always show the section when the button is clicked
  };

  const handleCheckRegistration = async () => {
    const firstApiUrl = `https://api.ebarimt.mn/api/info/check/getTinInfo?regNo=${registrationNumber}`;
    const firstApiOptions = {
      method: 'GET',
      headers: { Accept: 'application/json' },
    };

    try {
      const firstApiResponse = await fetch(firstApiUrl, firstApiOptions);
      const firstApiData = await firstApiResponse.json();


      const tin = firstApiData?.data; // Adjust this based on the actual response structure

      if (tin) {
        const secondApiUrl = `https://api.ebarimt.mn/api/info/check/getInfo?tin=${tin}`;
        const secondApiOptions = {
          method: 'GET',
          headers: { Accept: 'application/json' },
        };

        const secondApiResponse = await fetch(secondApiUrl, secondApiOptions);
        const secondApiData = await secondApiResponse.json();
        console.log(secondApiData)
        setTaxPayerName(secondApiData.data.name);
        setTaxpayerNo(tin);
        setIsVATPayer(secondApiData.data.vatPayer);
      }

    } catch (error) {
      console.error(error)
    }
  };
  const handleBranchChange = (event) => {
    const branchId = event.target.value;
    setSelectedBranch(branchId);
    const selectedBranchData = branches.find(branch => branch.branchCode === branchId);
    setSubBranches(selectedBranchData ? selectedBranchData.subBranches : []);
  };


  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setNewBranchName(branch.branchName);
    setNewBranchLocation(branch.location);
    setNewBranchContact(branch.contact);
    setVisible(true); // Open the modal to edit
  };

  const handleDeleteBranch = async (branchId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this branch?');
    if (confirmDelete) {

      const url = `https://api.ebarimt.mn/api/info/check/deleteBranch/${branchId}`;
      const options = {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {

          setBranches(branches.filter(branch => branch.branchCode !== branchId));
        } else {
          console.error('Failed to delete branch:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting branch:', error);
      }
    }
  };

  const handleEditPOS = (posId) => {

    console.log(`Edit POS with ID: ${posId}`);
  };

  const handleDeletePOS = (posId) => {

    console.log(`Delete POS with ID: ${posId}`);
  };

  const handleAddBranch = () => {
    const newBranch = {
      branchCode: Date.now(),
      branchName: newBranchName,
      location: newBranchLocation,
      contact: newBranchContact,
      subBranches: []
    };
    if (editingBranch) {

      setBranches(branches.map(branch =>
        branch.branchCode === editingBranch.branchCode ? newBranch : branch
      ));
      setEditingBranch(null);
    } else {

      setBranches([...branches, newBranch]);
    }
    setNewBranchName('');
    setNewBranchType('');
    setNewBranchLocation('');
    setNewBranchContact('');
    setVisible(false);
  };

  return (
    
    <div className="app-container d-flex flex-column">
      {/* <nav className="d-flex gap-5">
        <h3><CIcon icon={cilSettings} /> Тохиргоо</h3>
        <div className='d-flex gap-3'> 
        <CButton onClick={() => {
          setShowAddBranchButton(false);
          setShowOrderSection(true); // Show the order section
        }} color='primary'>Нэмэлт тохиргоо</CButton>
        <CButton onClick={() => {
          setShowAddBranchButton(true);
          setShowOrderSection(false); // Hide the order section
        }} color='primary' >Салбарууд</CButton>
      </div>
      </nav> */}
      <CNavbar expand="lg" className='border rounded-3'>
        <CContainer fluid>
          <CNavbarBrand > <h3><CIcon icon={cilSettings} /> Тохиргоо</h3></CNavbarBrand>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <CNavItem className={`${showOrderSection ? 'border-bottom fw-bold' : ''}`}>
                <CNavLink active onClick={() => {
                  setShowAddBranchButton(false);
                  setShowOrderSection(true);
                }}>
                  Нэмэлт тохиргоо
                </CNavLink>
              </CNavItem>
              <CNavItem className={`${showAddBranchButton ? 'border-bottom fw-bold' : ''} `}>
                <CNavLink onClick={() => {
                  setShowAddBranchButton(true);
                  setShowOrderSection(false); // Hide the order section
                }} className='cursour-pointer'>Салбарууд</CNavLink>
              </CNavItem>
              {/* <CNavItem>
              <CNavLink href="#" disabled>
                Disabled
              </CNavLink>
            </CNavItem> */}
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
      <main className="content">
        <CCardBody className='mt-2'>
          {showOrderSection && (
            <CCard >
              <CCardHeader>Нэмэлт тохиргоо</CCardHeader>
              <CCardBody>
                <CRow >
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column gap-0'>
                      <CFormLabel><b>Захиалга авах</b></CFormLabel>
                      <CFormLabel className='md-2'><i>Захиалга хадгалах, засварлах, зөвшөөрөх  Дэлгэрэнгүй</i></CFormLabel></div>
                    <CFormSwitch className='d-flex align-items-center' defaultChecked />
                  </div>
                </CRow>
                <CRow>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column gap-0'>
                      <CFormLabel><b>Касс хүлээлцэх</b></CFormLabel>
                      <CFormLabel><i>Кассын үлдэгдлийн хяналт, бүртгэлДэлгэрэнгүй</i></CFormLabel></div>
                    <CFormSwitch className='d-flex align-items-center' defaultChecked />
                  </div>
                </CRow>
                <CRow>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column gap-0'>
                      <CFormLabel><b>Цагийн тохиргоо</b></CFormLabel>
                      <CFormLabel><i>Ажилчдын цагийн бүртгэл, цагийн тохируулгын хяналтДэлгэрэнгүй</i></CFormLabel></div>
                    <CFormSwitch className='d-flex align-items-center' defaultChecked />
                  </div>
                </CRow>
                <CRow>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column gap-0'>
                      <CFormLabel><b>Гал тогооны Захиалга</b></CFormLabel>
                      <CFormLabel><i>Гал  тогооны захиалгыг баримт хэвлэгч болон дэлгэц рүү илгээхДэлгэрэнгүй</i></CFormLabel></div>
                    <CFormSwitch className='d-flex align-items-center' defaultChecked />
                  </div>
                </CRow>
                <CRow>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column gap-0'>
                      <CFormLabel><b>Хэрэглэгчийн дэлгэц</b></CFormLabel>
                      <CFormLabel><i>Худалдан авалт хийхэд захиалгын мэдээллийг үйлчлүүлэгчид харуулахДэлгэрэнгүй</i></CFormLabel></div>
                    <CFormSwitch className='d-flex align-items-center' defaultChecked />
                  </div>
                </CRow>
                <CRow>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column gap-0'>
                      <CFormLabel><b>Хоолны төлөв</b></CFormLabel>
                      <CFormLabel><i>Хоолны захиалгыг энд идэх, авч явах, хүргэлттэй гэсэн мөн бусад нэмэлт төлөвийг тэмдэглэх боломжтойДэлгэрэнгүй</i></CFormLabel></div>
                    <CFormSwitch className='d-flex align-items-center' defaultChecked />
                  </div>
                </CRow>
                <CRow>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column gap-0'>
                      <CFormLabel><b>Аюулгүй нөөцийн үлдэгдэл</b></CFormLabel>
                      <CFormLabel><i>Цөөн буюу нөөцгүй барааны мэдээлэл авахДэлгэрэнгүй</i></CFormLabel></div>
                    <CFormSwitch className='d-flex align-items-center' defaultChecked />
                  </div>
                </CRow>
                <CRow>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column gap-0'>
                      <CFormLabel><b>Хасах борлуулалтын мэдээлэл</b></CFormLabel>
                      <CFormLabel><i>Үлдэгдлээс их бараа зарагдах гэж байгааг касс дээр сануулахДэлгэрэнгүй</i></CFormLabel></div>
                    <CFormSwitch className='d-flex align-items-center' defaultChecked />
                  </div>
                </CRow>
                <CRow>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex flex-column gap-0'>
                      <CFormLabel><b>Бар кодоос жин оруулах</b></CFormLabel>
                      <CFormLabel><i>Жин оруулсан барааны бар кодыг уншихад жин бүртгэхДэлгэрэнгүй</i></CFormLabel></div>
                    <CFormSwitch className='d-flex align-items-center' defaultChecked />
                  </div>
                </CRow>
              </CCardBody>
            </CCard>)}

          <CCardBody className='mt-2'>
            {showOrderSection && (
              <CCard>
                <CCardHeader>Кассын төлбөрийн төрөл</CCardHeader>
                <CCardBody>
                  <CRow>
                    <div className='d-flex justify-content-between'>
                      <CButton color='primary'> +Төрөл нэмэх</CButton>
                    </div>
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell><CFormCheck defaultChecked /></CTableHeaderCell>
                          <CTableHeaderCell>Нэр</CTableHeaderCell>
                          <CTableHeaderCell>Ангилал</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableDataCell><CFormCheck defaultChecked /></CTableDataCell>
                          <CTableDataCell>Бэлэн мөнгө</CTableDataCell>
                          <CTableDataCell>Бэлэн мөнгө</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell><CFormCheck defaultChecked /></CTableDataCell>
                          <CTableDataCell>Дансаар</CTableDataCell>
                          <CTableDataCell>Бэлэн бус</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell><CFormCheck defaultChecked /></CTableDataCell>
                          <CTableDataCell>Картаар</CTableDataCell>
                          <CTableDataCell>Бэлэн бус</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell><CFormCheck defaultChecked /></CTableDataCell>
                          <CTableDataCell>Voucher</CTableDataCell>
                          <CTableDataCell>Бэлэн бус</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                          <CTableDataCell><CFormCheck defaultChecked /></CTableDataCell>
                          <CTableDataCell>GiftCard</CTableDataCell>
                          <CTableDataCell>Бусад</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                  </CRow>
                </CCardBody>
              </CCard>
            )}

            <CCardBody className='mt-2'>
              {showOrderSection && (
                <CCard>
                  <CCardHeader>НӨАТ-ын баримт хэвлэх</CCardHeader>
                  <CCardBody>
                    <div className="container mt-5">
                      {!showBarimt && (
                        <CButton color='primary' onClick={handleToggleBarimtSection}>
                          +Хүсэлт нэмэх
                        </CButton>
                      )}
                      {showBarimt && (

                        <div className='mt-2'>

                          <CFormLabel>Регистерийн дугаар</CFormLabel>
                          <CInputGroup className='mb-2'>
                            <CFormInput
                              id="registrationNumber"
                              placeholder="Регистрийн дугаар"
                              value={registrationNumber}
                              onChange={(e) => setRegistrationNumber(e.target.value)}
                            />
                            <CButton color="primary" onClick={handleCheckRegistration}>Шалгах</CButton>
                          </CInputGroup>
                          <CFormLabel>Татвар төлөгчийн нэр</CFormLabel>
                          <CFormInput
                            id="taxPayerName"
                            placeholder="Татвар төлөгчийн нэр"
                            value={taxPayerName}
                            readOnly
                          />
                          <CFormLabel>Татвар төлөгчийн дугаар</CFormLabel>
                          <CFormInput
                            id="taxpayerNo"
                            placeholder="Татвар төлөгчийн дугаар"
                            value={taxpayerNo}
                            readOnly
                          />
                          <CFormCheck
                            id="flexCheckDefault"
                            label="НӨАТ төлөгч эсэх"
                            checked={isVATPayer}
                            readOnly
                          />
                        </div>

                      )}
                    </div>
                    <CTable>

                      <CTableRow>

                        <CTableHeaderCell><CFormCheck /></CTableHeaderCell>
                        <CTableHeaderCell>Салбар</CTableHeaderCell>
                        <CTableHeaderCell>Дүүрэг/Аймаг</CTableHeaderCell>
                        <CTableHeaderCell>Хороо/Сум </CTableHeaderCell>
                        <CTableHeaderCell>Терминал</CTableHeaderCell>
                        <CTableHeaderCell>Системийн төрөл </CTableHeaderCell>


                      </CTableRow>
                      <CTableDataCell><CFormCheck /></CTableDataCell>
                      <CTableDataCell>hii</CTableDataCell>
                      <CTableDataCell><CFormSelect
                        value={selectedBranch}
                        onChange={handleBranchChange}
                      >
                        <option value="" disabled>Сонгоно уу...</option>
                        {branches.map((branch) => (
                          <option key={branch.branchCode} value={branch.branchCode}>
                            {branch.branchName}
                          </option>))}
                      </CFormSelect></CTableDataCell>
                      <CTableDataCell> <CFormSelect
                        value=""
                        onChange={(handleBranchChange) => { }}
                      >
                        <option value="" disabled>Сонгоно уу...</option>
                        {subBranches.map((subBranch) => (
                          <option key={subBranch.subBranchCode} value={subBranch.subBranchCode}>
                            {subBranch.subBranchName}
                          </option>
                        ))}
                      </CFormSelect>
                      </CTableDataCell>

                    </CTable>
                  </CCardBody>
                </CCard>
              )}
            </CCardBody>


            <div >
              {showAddBranchButton && (
                <div >
                  <div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton
                        color="primary"
                        className="position end-0"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent any default form or anchor behavior
                          setVisible(true);   // Show the modal
                        }}
                      >
                        Салбар нэмэх
                      </CButton>
                    </div>

                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>#</CTableHeaderCell>
                          <CTableHeaderCell>Нэр</CTableHeaderCell>
                          <CTableHeaderCell>Хаяг</CTableHeaderCell>
                          <CTableHeaderCell>Пос тоо</CTableHeaderCell>
                          <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {branches.map((branch, index) => (
                          <CTableRow key={branch.branchCode}>
                            <CTableDataCell>{index + 1}</CTableDataCell> {/* Order number */}
                            <CTableDataCell>{branch.branchName}</CTableDataCell>
                            <CTableDataCell>{branch.location || 'N/A'}</CTableDataCell>
                            <CTableDataCell>{branch.subBranches.length}</CTableDataCell>
                            <CTableDataCell>
                              <CButton color="warning" onClick={() => handleEditBranch(branch)}>
                                <CIcon icon={cilPen}></CIcon>
                              </CButton>
                              <CButton color="danger" onClick={() => handleDeleteBranch(branch.branchCode)}>
                                <CIcon icon={cilX} />
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </div>
                  <div>
                    <CButton color="primary" onClick={() => setPosFormVisible(true)}>
                      Пос төхөөрөмж
                    </CButton>
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>#</CTableHeaderCell>
                          <CTableHeaderCell>Нэр</CTableHeaderCell>
                          <CTableHeaderCell>Салбар</CTableHeaderCell>
                          <CTableHeaderCell>Төлөв</CTableHeaderCell>
                          <CTableHeaderCell>Систем</CTableHeaderCell>
                          <CTableHeaderCell>НӨАТ</CTableHeaderCell>
                          <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {/* Add data rows here */}
                        <CTableRow>
                          <CTableDataCell>1</CTableDataCell>
                          <CTableDataCell>POS Device 1</CTableDataCell>
                          <CTableDataCell>Branch A</CTableDataCell>
                          <CTableDataCell>Active</CTableDataCell>
                          <CTableDataCell>Type 1</CTableDataCell>
                          <CTableDataCell>VAT Included</CTableDataCell>
                          <CTableDataCell>
                            <CButton color="warning" onClick={() => handleEditPOS(1)}>
                              Edit
                            </CButton>
                            <CButton color="danger" onClick={() => handleDeletePOS(1)}>
                              Delete
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                        {/* Add more data rows as needed */}
                      </CTableBody>
                    </CTable>
                  </div>
                </div>
              )}
            </div>
          </CCardBody>

          <CModal
            visible={visible}
            onClose={() => setVisible(false)}
            aria-labelledby="LiveDemoExampleLabel"
          >
            <CModalHeader>
              <CModalTitle id="LiveDemoExampleLabel">
                {editingBranch ? 'Салбар засах' : 'Салбар бүртгүүлэх'}
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm className="row g-3">
                <CRow md={4}>
                  <CFormInput
                    type="text"
                    id="OrganizationName"
                    label="Салбарын нэр"
                    value={newBranchName}
                    onChange={(e) => setNewBranchName(e.target.value)}
                  />
                </CRow>
                <CRow md={4}>
                  <CFormSelect
                    id="OrganizationType"
                    label="Салбарын төрөл"
                    value={newBranchType}
                    onChange={(e) => setNewBranchType(e.target.value)}
                  >
                    <option value="" disabled>Сонгоно уу...</option>
                    <option value="store">Дэлгүүр</option>
                    <option value="restaurant">Ресторан</option>
                    <option value="fastfood">Түргэн хоол</option>
                    <option value="salon">Салон</option>
                    <option value="pharmacy">Эмийн сан</option>
                    <option value="hotel">Зочид Буудал</option>
                  </CFormSelect>
                </CRow>
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
                    label="Cум/Дүүрэг"
                    value=""
                    onChange={(handleBranchChange) => { }}
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
                  <CFormInput
                    type="text"
                    id="branchAddress"
                    label="Салбарын хаяг"
                    value={newBranchLocation}
                    onChange={(e) => setNewBranchLocation(e.target.value)}
                  />
                </CRow>
                <CRow md={3}>


                  <CIcon icon={cilAirplay}></CIcon>
                </CRow>

                <CRow md={3}>
                  <CFormInput
                    type="text"
                    id="branchPhoneNumber"
                    label="Утас"
                    value={newBranchContact}
                    onChange={(e) => setNewBranchContact(e.target.value)}
                  />
                </CRow>

                <CCol xs={12}>
                  <CButton color="primary" type="button" onClick={handleAddBranch}>
                    Save changes
                  </CButton>
                </CCol>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
              </CButton>
            </CModalFooter>
          </CModal>

          <CModal
            visible={posFormVisible}
            onClose={() => setPosFormVisible(false)}
            aria-labelledby="PosModalLabel"
          >
            <CModalHeader>
              <CModalTitle id="PosModalLabel">ПОС төхөөрөмж бүртгүүлэх</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm className="row g-3">
                <CRow md={4}>
                  <CFormInput
                    type="text"
                    id="posName"
                    label="ПОС нэр"
                  />
                </CRow>
                <CRow md={4}>
                  <CFormSelect
                    id="posBranch"
                    label="Салбар"
                    value=""
                    onChange={() => { }}
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
                    id="posSystemType"
                    label="Системийн төрөл"
                    value=""
                    onChange={() => { }}
                  >
                    <option value="" disabled>Сонгоно уу...</option>
                    <option value="type1">Төрөл 1</option>
                    <option value="type2">Төрөл 2</option>
                    <option value="type3">Төрөл 3</option>
                  </CFormSelect>
                </CRow>

              </CForm>
            </CModalBody>
            <CModalFooter>
            </CModalFooter>
          </CModal>

        </CCardBody>
      </main>
    </div >
  );
};




export default Settings;
