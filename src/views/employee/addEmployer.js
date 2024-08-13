import React from 'react';
import { CCard, CCardHeader, CCardBody, CButton, CFormLabel, CCardTitle, CFormInput, CCol, CRow } from '@coreui/react';

const AddEmployeeList = () => {
    return (
        <main className='d-flex justify-content-center mt-5'>
            <CCard style={{ maxWidth: '800px', width: '100%' }}>
                <CCardHeader>
                    <CCardTitle>Ажилчин нэмэх</CCardTitle>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol md="6">
                            <div className='mb-3'>
                                <CFormLabel>Нэр</CFormLabel>
                                <CFormInput />
                            </div>
                            <div className='mb-3'>
                                <CFormLabel>И-майл</CFormLabel>
                                <CFormInput />
                            </div>
                            <div className='mb-3'>
                                <CFormLabel>Нууц үг</CFormLabel>
                                <CFormInput type="password" />
                            </div>
                            <div className='mb-3'>
                                <CFormLabel>Утас</CFormLabel>
                                <CFormInput />
                            </div>
                            <div className='mb-3'>
                                <CFormLabel>Эрх</CFormLabel>
                                <CFormInput />
                            </div>
                        </CCol>
                        <CCol md="6" className='d-flex flex-column align-items-center justify-content-center'>
                            <CFormLabel>Зураг оруулах</CFormLabel>
                            <div style={{
                                border: '2px dashed #ccc',
                                borderRadius: '8px',
                                width: '200px',
                                height: '200px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}>
                                <label htmlFor="upload-photo" className="btn btn-primary m-0">
                                    Зураг нэмэх
                                </label>
                            </div>
                            <input
                                type="file"
                                id="upload-photo"
                                name="upload-photo"
                                style={{ display: 'none' }}
                            />
                        </CCol>
                    </CRow>
                    <div className='text-center'>
                        <CButton color='primary' className='mt-3'>
                            Ажилчин нэмэх
                        </CButton>
                    </div>
                </CCardBody>
            </CCard>
        </main>
    );
};

export default AddEmployeeList;
