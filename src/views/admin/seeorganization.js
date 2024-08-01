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

const SeeOrganization = ({ data }) => {
  const [showTable, setShowTable] = useState(null); // null, 'organization', or 'individual'
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    setDatas(data);
  }, [data]);

  const handleModal = (item, type) => {
    setEditData(item);
    setShowTable(type);
    setEditModal(true);
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    console.log(`Deleted item with ID: ${id}`);
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
                      Засах
                    </CButton>
                    <CButton onClick={() => handleDelete(item.id)}>
                      Утсгах
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
                      Засах
                    </CButton>
                    <CButton onClick={() => handleDelete(item.id)}>
                      Утсгах
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