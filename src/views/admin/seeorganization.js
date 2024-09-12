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
  CButton,
  CCard,
} from '@coreui/react';
import EditModal from './editModal';
import PropTypes from 'prop-types';
import CIcon from '@coreui/icons-react';
import { cilX, cilPen } from '@coreui/icons';
import Modal from './qpayModal';
const SeeOrganization = ({ data }) => {
  const [showTable, setShowTable] = useState(null); // null, 'organization', or 'individual'
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [datas, setDatas] = useState([]);
  const [qpayModal, setQpayModal] = useState(false)

  useEffect(() => {
    setDatas(data);
  }, [data]);

  const handleModal = (item, type) => {
    setEditData(item);
    setShowTable(type);
    setEditModal(true);
  };
  function handleQpayModal() {
    setQpayModal(!qpayModal)
  }

  const handleDelete = (id) => {
    // Handle delete logic here
  };

  return (
    <>
      <CNavbar expand="lg" className="border rounded-3 mt-1">
        <CContainer fluid>
          <CNavbarBrand>
            <h4>Qpay холбогдсон байгууллагууд</h4>
          </CNavbarBrand>
          <CNavbarToggler aria-label="Toggle navigation" />
          <CNavbarNav>
            <CNavItem>
              <CButton color='primary' onClick={handleQpayModal}>Шинэ холболт</CButton>
            </CNavItem>
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
        <CCard>
          <div className="table-responsive">
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
                    <CButton onClick={() => handleModal(item, 'organization')}>
                      <CIcon icon={cilPen}></CIcon>
                    </CButton>
                    <CButton onClick={() => handleDelete(item.id)}>
                      <CIcon icon={cilX}></CIcon>
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTable>
          </div>
        </CCard>
      )}

      {showTable === 'individual' && (
        <CCard>
          <div className="table-responsive">
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
              {datas.map((item, index) => (
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
                    <CButton onClick={() => handleModal(item, 'individual')}>
                      <CIcon icon={cilPen}></CIcon>
                    </CButton>
                    <CButton onClick={() => handleDelete(item.id)}>
                      <CIcon icon={cilX}></CIcon>
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTable>
          </div>
        </CCard>
      )}

      {editModal && (
        <EditModal
          isVisible={editModal}
          handleClose={() => setEditModal(false)}
          data={editData}
          type={showTable}
        />
      )}
      {qpayModal && (
        <Modal
          isVisible={qpayModal}
          handleClose={handleQpayModal} />
      )

      }
    </>
  );
};

SeeOrganization.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      branchCode: PropTypes.string,
      legalEntityName: PropTypes.string,
      ownerReg: PropTypes.string,
      ownerSurname: PropTypes.string,
      ownerName: PropTypes.string,
      businessNameMN: PropTypes.string,
      businessNameENG: PropTypes.string,
      mccCode: PropTypes.string,
      province: PropTypes.string,
      district: PropTypes.string,
      address: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string.isRequired, // Add ID for delete functionality
    })
  ).isRequired,
};

export default SeeOrganization;
