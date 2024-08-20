import React, { useState } from 'react';
import { CCard, CCardHeader, CCardBody, CImage, CButton, CFormLabel, CRow, CCol, CFormInput, CFormSelect, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react';
import time from './photos/time.png';
import AddTimeList from './AddTimeList';

const TimeSettings = () => {
    const [showTimeSetting, setShowTimeSetting] = useState(false);

    const handleModal = () => {
        setShowTimeSetting(!showTimeSetting);
    };

    return (
        <main className='mx-2 mt-2'>
            <CCard>
                <CCardHeader>Цагийн тохиргоо</CCardHeader>
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
                        src={time}
                        rounded
                        thumbnail
                        width={200}
                        height={200}
                        className="mb-2"
                        style={{ border: 'none' }}
                    />
                    <div className='d-flex flex-column align-items-center'>
                        <CFormLabel className='fs-2'>Цагын тохиргоо</CFormLabel>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <CButton color='primary' className='my-2' onClick={handleModal}>
                            +Тохиргоо нэмэх
                        </CButton>
                    </div>
                </CCardBody>
            </CCard>

            <CModal
                visible={showTimeSetting}
                onClose={handleModal}
                size="lg"
            >
                <CModalHeader>
                    <CModalTitle>Цагын тохиргоо нэмэх</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <AddTimeList />
                </CModalBody>
            </CModal>
        </main>
    );
};

export default TimeSettings;
