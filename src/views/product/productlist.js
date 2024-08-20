import { useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CFormLabel,
    CImage
} from '@coreui/react';
import product from '../product/photos/box.png';
import AddProduct from './addProduct';
import ImportExcel from './importExcel';

const ProductList = () => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showImportExcel, setShowImportExcel] = useState(false);

    const handleAddProduct = () => {
        setShowAddProduct(!showAddProduct);
    };

    const toggleImportExcel = () => {
        setShowImportExcel(!showImportExcel);
    };

    return (
        <main className='mx-2 mt-1'>
            {!showAddProduct?(
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
                        <CButton color='primary' className='my-2' onClick={handleAddProduct}>
                            Бараа нэмэх
                        </CButton>
                        <CButton className='my-2' onClick={toggleImportExcel}>
                            Импорт excel
                        </CButton>
                    </div>
                    
                </CCardBody>
            </CCard>
            ) :(
                <AddProduct  />
            
            )}

        </main>
    );
};

export default ProductList;
