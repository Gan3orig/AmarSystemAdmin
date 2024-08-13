import React, { useState } from 'react';
import { CCard, CCardHeader, CCardBody, CImage, CButton, CFormLabel,CRow,CCol,CFormInput,CFormSelect } from '@coreui/react';
import timeList from './photos/timelist.png'
const EmployeeList = () => {
    const [importVisible, setImportVisible] = useState(false);
    const [visible, setVisible] = useState(false);

    const toggleImportModal = () => {
        setImportVisible(!importVisible);
    };

    const handleModal = () => {
        setVisible(!visible);
    };

    return (
        <main className='mx-2 mt-5'>
            <CCard>
                <CCardHeader>Цагийн жагсаалт</CCardHeader>
                <CCardBody className='text-center'>
               
                <CRow className='mb-3'>
                        <CCol xs="auto">
                            <CFormLabel htmlFor="startDate">Эхлэх огноо</CFormLabel>
                            <CFormInput type="date" id="startDate" name="startDate" />
                        </CCol>
                        <CCol xs="auto">
                            <CFormLabel htmlFor="endDate">Дуусах огноо</CFormLabel>
                            <CFormInput type="date" id="endDate" name="endDate" />
                        </CCol>
                        <CCol xs="auto">
                            <CFormLabel htmlFor="employeeSelect">Ажилчин</CFormLabel>
                            <CFormSelect id="employeeSelect" name="employee">
                                <option value="employee1">Ажилчин 1</option>
                                <option value="employee2">Ажилчин 2</option>
                                <option value="employee3">Ажилчин 3</option>
                            </CFormSelect>
                        </CCol>
                        <CCol xs="auto">
                            <CFormLabel htmlFor="branchSelect">Салбар</CFormLabel>
                            <CFormSelect id="branchSelect" name="branch">
                                <option value="branch1">Салбар 1</option>
                                <option value="branch2">Салбар 2</option>
                                <option value="branch3">Салбар 3</option>
                            </CFormSelect>
                        </CCol>
                    </CRow>
                    <CImage
                        src={timeList} // Ensure `product` is imported or defined
                        rounded
                        thumbnail
                        width={200}
                        height={200}
                        className="mb-2"
                        style={{ border: 'none' }}
                    />
                    <div className='d-flex flex-column align-items-center'>
                        <CFormLabel className='fs-2'>Цагын жагсаалт</CFormLabel>
                       
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <CButton color='primary' className='my-2' onClick={handleModal}>
                            +Жагсаалт нэмэх
                        </CButton>
                    
                    </div>
                </CCardBody> 
            </CCard>
        </main>
    );
};

export default EmployeeList;
