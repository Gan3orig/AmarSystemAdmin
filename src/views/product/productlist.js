import React, { useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CFormLabel,
    CImage
} from '@coreui/react';
import ImportExcel from './importExcel'; // Ensure this path is correct
import AddProduct from './addProduct';   // Import the AddProduct component
import product from '../product/photos/box.png'

const ProductList = () => {   const [importVisible, setImportVisible] = useState(false);
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
                <CCardHeader>Бараа</CCardHeader>
                <CCardBody className='text-center'>
                    <CImage
                        src={product}
                        rounded
                        thumbnail
                        width={200}
                        height={200}
                        className="mb-2"
                        style={{ border: 'none' }}
                    />
                    <div className='d-flex flex-column align-items-center'>
                        <CFormLabel className='fs-2'>Бараа</CFormLabel>
                        <CFormLabel>Эндээс та бараагаа удирдах боломжтой</CFormLabel>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <CButton color='primary' className='my-2' onClick={handleModal}>
                            Бараа нэмэх
                        </CButton>
                        <CButton className='my-2' onClick={toggleImportModal}>
                            Импорт excel
                        </CButton>
                    </div>
                    {importVisible && <ImportExcel visible={importVisible} onClose={toggleImportModal} />} 
                    {visible && <AddProduct visibleSm={visible} handleModal={handleModal} />}
                </CCardBody>
            </CCard>
        </main>
    );
};

export default ProductList;
