import React, { useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CFormLabel,
    CImage
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import product from '../registration/box.png';
import AddProduct from './addProduct';
import ImportExcel from './importExcel';

const ProductList = () => {
    const { t } = useTranslation();
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
            {!showAddProduct ? (
                <CCard>
                    <CCardHeader>{t('products')}</CCardHeader>
                    <CCardBody className='text-center'>
                        <CImage
                            src={product}
                            rounded
                            thumbnail
                            width={200}
                            height={200}
                            className="mb-2"
                            style={{ border: 'none' }}
                            alt={t('productImageAlt')} // Ensure image has alt text for accessibility
                        />
                        <div className='d-flex flex-column align-items-center'>
                            <CFormLabel className='fs-2'>{t('products')}</CFormLabel>
                            <CFormLabel>{t('manage_products')}</CFormLabel>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <CButton 
                                color='primary' 
                                className='my-2' 
                                onClick={handleAddProduct}
                                aria-label={t('r.addItem')} 
                            >
                                {t('r.addItem')}
                            </CButton>
                            <CButton 
                                className='my-2' 
                                onClick={toggleImportExcel}
                                aria-label={t('importExcel')}
                            >
                                {t('import_excel')}
                            </CButton>
                        </div>
                    </CCardBody>
                </CCard>
            ) : (
                <AddProduct />
            )}
        </main>
    );
};

export default ProductList;
