//import React from 'react';
import React, { useEffect, useState } from 'react';
import { CAlert, CContainer,CFormLabel,CFormInput } from '@coreui/react'

const Terminal = () => {
    const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false)
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
 
  const fields = ['name', 'category', 'otherField']; // Define table columns
  useEffect(() => {
    const fetchLocations = async () => {
      const token = localStorage.getItem('token'); // Retrieve the Bearer token from localStorage or another storage mechanism
      try {
        const response = await fetch('https://api.majorsoft.mn/api/terminalMap', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Attach the token to the Authorization header
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          setVisible(false);
          const data = await response.json();
          setData(data); // Update state with the fetched data
        } else {
          setVisible(true);
          console.error('Failed to fetch locations:', response.status);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
      const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        filterData(searchTerm, filterCategory);
      };
      // Filter functionality
      const handleFilter = (event) => {
        const category = event.target.value;
        setFilterCategory(category);
        filterData(searchTerm, category);
      };

    fetchLocations(); // Call the async function to fetch data
    // Search functionality
  
   // Function to filter data based on search term and category
   const filterData = (searchTerm, category) => {
    let filtered = data;
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm) // Adjust based on API structure
      );
    }
    if (category) {
      filtered = filtered.filter((item) => item.category === category); // Adjust based on API structure
    }
    setFilteredData(filtered);
    };
  };
  }, []);
  return (
    <CContainer>
      <CAlert color="warning" visible={visible} closeButton onShowChange={setVisible}>
        <strong>Анхааруулга!</strong> Хэрэглэгчээр нэвтрээгүй байна. <a href="/#/login" className="alert-link">Нэвтрэх</a>.
      </CAlert>
      <CFormLabel htmlFor="search">Search by name</CFormLabel>
        <CFormInput
          id="search"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </CContainer>
  );
};

export default Terminal;
