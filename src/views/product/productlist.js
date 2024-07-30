import React from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CFormLabel,
    CImage,
} from '@coreui/react';

const ProductList = () => {
    return (
        <main className='mx-2 mt-5'>
            <CCard>
                <CCardHeader>Бараа</CCardHeader>
                
                <CCardBody className='text-center'>
                <CImage rounded thumbnail src="./photos/product.jpg" width={200} height={200} />
                    
                    <div className='d-flex flex-column align-items-center'>
                        <CFormLabel className='fs-2'>Бараа</CFormLabel>
                        <CFormLabel>Эндээс та бараагаа удирдах боломжтой</CFormLabel>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <CButton color='primary' className='my-2'>Бараа нэмэх</CButton>
                        <CButton className='my-2'>Импорт excel</CButton>
                    </div>
                </CCardBody>
            </CCard>
        </main>
    );
};

export default ProductList;
