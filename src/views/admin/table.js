import React, { useEffect, useState } from 'react';
import { 
  CTable, 
  CTableHead, 
  CTableRow, 
  CTableHeaderCell, 
  CTableBody, 
  CTableDataCell, 
  CSpinner, 
  CContainer, 
  CInputGroup, 
  CInputGroupText, 
  CFormInput ,
 
} from '@coreui/react';
import { cilSearch } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('https://api.majorsoft.mn/api/terminalMap', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const result = await response.json();
          setData(result); // Assume API returns an array of data
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtered data based on the search term
  const filteredData = data.filter(location => 
    location.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.phone1.includes(searchTerm) || 
    location.registerNo.includes(searchTerm)
  );

  return (
    <CContainer>
      {loading ? (
        <div className="text-center">
          <CSpinner />
        </div>
      ) : (
        <>
             <CInputGroup className="mb-3">
            <CFormInput
              type="text"
              placeholder="Хайх"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CInputGroupText>
              <CIcon icon={cilSearch} />
            </CInputGroupText>
          </CInputGroup>

          <CTable align="middle" hover responsive bordered>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell>*</CTableHeaderCell>
                <CTableHeaderCell>Нэр</CTableHeaderCell>
                <CTableHeaderCell>Байгууллагын нэр</CTableHeaderCell>
                <CTableHeaderCell>Утасны дугаар</CTableHeaderCell>
                <CTableHeaderCell>Регисртийн дугаар</CTableHeaderCell>
                <CTableHeaderCell>Дуусах огноо</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredData.map((location, index) => (
                <CTableRow key={location.terminalId}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{location.businessName}</CTableDataCell>
                  <CTableDataCell>{location.entityName}</CTableDataCell>
                  <CTableDataCell>{location.phone1}, {location.phone2}</CTableDataCell>
                  <CTableDataCell>{location.registerNo}</CTableDataCell>
                  <CTableDataCell>{new Date(location.createDate).toLocaleDateString()}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </>
      )}
    </CContainer>
  );
};

export default Table;
