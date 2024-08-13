import React from 'react';
import { CCard, CCardHeader, CCardBody, CButton, CFormLabel, CImage, CCardTitle, CFormInput, CCol, CRow, CFormSelect } from '@coreui/react';
import time from './photos/icons8-time-50.png';

const AddTimeList = () => {
    return (
        <CCard style={{ maxWidth: '800px', width: '100%' }}>
         
            <CCardBody>
                <CRow>
                    <CCol md="6">
                        <CImage
                            src={time}
                            rounded
                            thumbnail
                            className="mb-2"
                            style={{ border: 'none' }}
                        />
                        <div className='mb-3'>
                            <CFormLabel>Ажилчин</CFormLabel>
                            <CFormSelect>
                                <option>Ажилчин 1</option>
                                <option>Ажилчин 2</option>
                                <option>Ажилчин 3</option>
                                {/* Add more options as needed */}
                            </CFormSelect>
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Салбар</CFormLabel>
                            <CFormSelect>
                                <option>Салбар 1</option>
                                <option>Салбар 2</option>
                                <option>Салбар 3</option>
                                {/* Add more options as needed */}
                            </CFormSelect>
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Эхлэх огноо</CFormLabel>
                            <CFormInput type="date" />
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Дуусах огноо</CFormLabel>
                            <CFormInput type="date" />
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Өдөрт ажиллах цаг</CFormLabel>
                            <CFormInput />
                        </div>
                        <div className='mb-3'>
                            <CFormLabel>Нийт ажиллах цаг</CFormLabel>
                            <CFormInput />
                        </div>
                    </CCol>
                </CRow>
                <div className='text-center'>
                    <CButton color='secondary' className='mt-3' onClick={() => window.history.back()}>
                        Болих
                    </CButton>
                    <CButton color='primary' className='mt-3'>
                        Хадгалах
                    </CButton>
                </div>
            </CCardBody>
        </CCard>
    );
};

export default AddTimeList;
