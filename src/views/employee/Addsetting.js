import React, { useState } from 'react';
import { CCard, CCardHeader, CCardBody, CButton, CImage, CFormLabel, CCardTitle, CFormInput, CCol, CRow, CFormSwitch, CFormCheck } from '@coreui/react';
import phone from './photos/icons8-phone-50.png';
import graph from './photos/icons8-graph-50.png';

const Addsetting = () => {
    const [isPostChecked, setIsPostChecked] = useState(false);
    const [isBackOfficeChecked, setIsBackOfficeChecked] = useState(false);

    // Handle the change in the ПОС toggle
    const handlePostToggleChange = (e) => {
        setIsPostChecked(e.target.checked);
    };

    // Handle the change in the Back office toggle
    const handleBackOfficeToggleChange = (e) => {
        setIsBackOfficeChecked(e.target.checked);
    };

    return (
        <main className='d-flex justify-content-center mt-5'>
            <CCard style={{ maxWidth: '800px', width: '100%' }}>
                <CCardHeader>
                    <CCardTitle>Эрхийн тохиргоо нэмэх</CCardTitle>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol md="6">
                            <div className='mb-3'>
                                <CFormLabel>Нэр</CFormLabel>
                                <CFormInput />
                            </div>

                            {/* ПОС Section */}
                            <CRow className='align-items-center mb-3'>
                                <CCol xs="auto">
                                    <CImage
                                        src={phone}
                                        rounded
                                        thumbnail
                                        className="mb-2"
                                        style={{ border: 'none' }}
                                    />
                                </CCol>
                                <CCol className='d-flex justify-content-between '>
                                    <div>
                                        <CFormLabel className='fs-2'>ПОС</CFormLabel>
                                        <CFormLabel className='mt-2'>Ажилтнууд ПИН код ашиглан програм руу нэвтэрнэ</CFormLabel>
                                    </div>
                                    <CFormSwitch id="toggle1" checked={isPostChecked} onChange={handlePostToggleChange} />
                                </CCol>
                            </CRow>

                            {isPostChecked && (
                                <div>
                                    <CFormCheck id="flexCheckDefault1" label="Бүх борлуулатыг харах" />
                                    <CFormCheck id="flexCheckDefault2" label="Хөнгөлөлт ашиглах" />
                                    <CFormCheck id="flexCheckDefault3" label="Борлуулалт болон татвар өөрчлөх" />
                                    <CFormCheck id="flexCheckDefault4" label="Буцаалт авах" />
                                    <CFormCheck id="flexCheckDefault5" label="Бүх нээлттэй захиалгыг удирдах" />
                                    <CFormCheck id="flexCheckDefault6" label="Нээлттэй захиалгыг хүчингүй болгох" />
                                    <CFormCheck id="flexCheckDefault7" label="Ээлжийн тайлан харах" />
                                    <CFormCheck id="flexCheckDefault8" label="Мөнгөний шургуулга нээх" />
                                    <CFormCheck id="flexCheckDefault9" label="Баримт дахин хэвлэх" />
                                    <CFormCheck id="flexCheckDefault10" label="Баримт бүртгэх" />
                                    <CFormCheck id="flexCheckDefault11" label="Тохиргоо өөрчлөх" />
                                    <CFormCheck id="flexCheckDefault12" label="Чатад хандах" />
                                    <CFormCheck id="flexCheckDefault13" label="Чатад хариу өгөх" />
                                </div>
                            )}

                            {/* Back office Section */}
                            <CRow className='align-items-center mb-3'>
                                <CCol xs="auto">
                                    <CImage
                                        src={graph}
                                        rounded
                                        thumbnail
                                        className="mb-2"
                                        style={{ border: 'none' }}
                                    />
                                </CCol>
                                <CCol className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <CFormLabel className='fs-2'>Back office</CFormLabel>
                                        <CFormLabel className='mt-2'>Ажилтнууд мэйл хаяг болон нэвтрэх нууц үгээ ашиглан системд нэвтэрнэ</CFormLabel>
                                    </div>
                                    <CFormSwitch id="toggle2" checked={isBackOfficeChecked} onChange={handleBackOfficeToggleChange} />
                                </CCol>
                            </CRow>

                            {isBackOfficeChecked && (
                                <div>
                                    <CFormCheck id="flexCheckDefault14" label="Борлуулалтын тайлан харах " />
                                    <CFormCheck id="flexCheckDefault15" label="Борлуулалт хүчингүй болгох" />
                                    <CFormCheck id="flexCheckDefault16" label="Бараа бүртгэх" />
                                    <CFormCheck id="flexCheckDefault17" label="Ажилтан бүртгэх" />
                                    <CFormCheck id="flexCheckDefault18" label="Харилцагч бүртгэх" />
                                    <CFormCheck id="flexCheckDefault19" label="Тохиргоо өөрчлөх " />
                                    <CFormCheck id="flexCheckDefault20" label="Тооцоог бүртгэх" />
                                    <CFormCheck id="flexCheckDefault21" label="Төлбөрийн төрөл бүртгэх" />
                                    <CFormCheck id="flexCheckDefault22" label="Хөнгөлөлт бүртгэх " />
                                    <CFormCheck id="flexCheckDefault23" label="Татвар бүртгэх" />
                                    <CFormCheck id="flexCheckDefault24" label="Kitchen принтер бүртгэх" />
                                    <CFormCheck id="flexCheckDefault25" label="Хоолны сонголт бүртгэх" />
                                    <CFormCheck id="flexCheckDefault26" label="Пос бүртгэх" />
                                </div>
                            )}
                        </CCol>
                    </CRow>
                    <div className='text-center'>
                        <CButton color='primary' className='mt-3'>
                            Эрхийн тохиргоо нэмэх
                        </CButton>
                    </div>
                </CCardBody>
            </CCard>
        </main>
    );
};

export default Addsetting;
