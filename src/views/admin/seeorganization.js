import React, { useEffect, useState } from 'react';
import {
  CTable,
  CTableRow,
  CTableDataCell,
  CTableHeaderCell,
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CButton
} from '@coreui/react';
import EditModal from './editModal';
import PropTypes from 'prop-types'; // Import PropTypes

// eslint-disable-next-line react/prop-types
const SeeOrganization = ({ data }) => {
  const [showTable, setShowTable] = useState(null); // null, 'organization', or 'individual'
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});
    const [datas,setDatas] = useState({})
    useEffect(()=>{
        console.log(data)
        setDatas(data)
    },[])
  const handleModal = (data) => {
    setEditData(data);
    setEditModal(true);
  };

  return (
    <>
      <CNavbar expand="lg" className="border rounded-3 mt-5">
        <CContainer fluid>
          <CNavbarBrand>
            <h4>Qpay холбогдсон байгууллагууд</h4>
          </CNavbarBrand>
          <CNavbarToggler aria-label="Toggle navigation" />
          <CNavbarNav>
            <CNavItem>
              <CNavLink onClick={() => setShowTable('organization')}>Байгууллагууд</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink onClick={() => setShowTable('individual')}>Хувь хүн</CNavLink>
            </CNavItem>
          </CNavbarNav>
        </CContainer>
      </CNavbar>

      {showTable === 'organization' && (
        <CTable className="mt-3 organization">
          <CTableRow>
            <CTableHeaderCell>Хуулийн этгээдийн регистр</CTableHeaderCell>
            <CTableHeaderCell>Хуулийн этгээдийн нэр</CTableHeaderCell>
            <CTableHeaderCell>Эзэмшигчийн регистр</CTableHeaderCell>
            <CTableHeaderCell>Эзэмшигчийн Овог</CTableHeaderCell>
            <CTableHeaderCell>Эзэмшигчийн Нэр</CTableHeaderCell>
            <CTableHeaderCell>Бизнес нэр Монголоор</CTableHeaderCell>
            <CTableHeaderCell>Business Name (eng)</CTableHeaderCell>
            <CTableHeaderCell>MCC code</CTableHeaderCell>
            <CTableHeaderCell>Аймаг/Хот</CTableHeaderCell>
            <CTableHeaderCell>Сум/Дүүрэг</CTableHeaderCell>
            <CTableHeaderCell>Хаяг</CTableHeaderCell>
            <CTableHeaderCell>Утас</CTableHeaderCell>
            <CTableHeaderCell>Майл</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
          {datas.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{item.branchCode}</CTableDataCell>
              <CTableDataCell>{item.legalEntityName}</CTableDataCell>
              <CTableDataCell>{item.ownerReg}</CTableDataCell>
              <CTableDataCell>{item.ownerSurname}</CTableDataCell>
              <CTableDataCell>{item.ownerName}</CTableDataCell>
              <CTableDataCell>{item.businessNameMN}</CTableDataCell>
              <CTableDataCell>{item.businessNameENG}</CTableDataCell>
              <CTableDataCell>{item.mccCode}</CTableDataCell>
              <CTableDataCell>{item.province}</CTableDataCell>
              <CTableDataCell>{item.district}</CTableDataCell>
              <CTableDataCell>{item.address}</CTableDataCell>
              <CTableDataCell>{item.phone}</CTableDataCell>
              <CTableDataCell>{item.email}</CTableDataCell>
              <CTableDataCell>
                <CButton onClick={() => handleModal(item)}>Edit</CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTable>
      )}

      {showTable === 'individual' && (
        <CTable className="mt-3 individual">
          <CTableRow>
            <CTableHeaderCell>Эзэмшигчийн регистр</CTableHeaderCell>
            <CTableHeaderCell>Эзэмшигчийн Нэр</CTableHeaderCell>
            <CTableHeaderCell>Эзэмшигчийн Овог</CTableHeaderCell>
            <CTableHeaderCell>MCC code</CTableHeaderCell>
            <CTableHeaderCell>Аймаг/Хот</CTableHeaderCell>
            <CTableHeaderCell>Сум/Дүүрэг</CTableHeaderCell>
            <CTableHeaderCell>Хаяг</CTableHeaderCell>
            <CTableHeaderCell>Утас</CTableHeaderCell>
            <CTableHeaderCell>Майл</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
          {/* {data.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{item.ownerReg}</CTableDataCell>
              <CTableDataCell>{item.ownerName}</CTableDataCell>
              <CTableDataCell>{item.ownerSurname}</CTableDataCell>
              <CTableDataCell>{item.mccCode}</CTableDataCell>
              <CTableDataCell>{item.province}</CTableDataCell>
              <CTableDataCell>{item.district}</CTableDataCell>
              <CTableDataCell>{item.address}</CTableDataCell>
              <CTableDataCell>{item.phone}</CTableDataCell>
              <CTableDataCell>{item.email}</CTableDataCell>
              <CTableDataCell>
                <CButton onClick={() => handleModal(item)}>Edit</CButton>
              </CTableDataCell>
            </CTableRow>
          ))} */}
        </CTable>
      )}

      {editModal && (
        <EditModal 
          isVisible={editModal} 
          handleClose={() => setEditModal(false)} 
          data={editData}
        />
      )}
    </>
  );
};
// Define PropTypes for the component
SeeOrganization.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        branchCode:PropTypes.string
      })
    ).isRequired,
  };

export default SeeOrganization;
