import React, { useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CImage,
    CFormLabel,
} from '@coreui/react';
import category from './photos/categories.png';
import AddCategory from './addCategory'; // Import the AddCategory component

const Category = () => {
    const [visibleCat, setVisibleCat] = useState(false);

    const handleModalCat = () => {
        setVisibleCat(prevVisibleCat => !prevVisibleCat); // Toggle modal visibility
    };

    return (
        <main className='mx-2 mt-5'>
            <CCard>
                <CCardHeader>Категори</CCardHeader>
                <CCardBody className='text-center'>
                    <CImage
                        src={category}
                        rounded
                        thumbnail
                        width={200}
                        height={200}
                        className="mb-2"
                        style={{ border: 'none' }}
                    />
                    <div className='d-flex flex-column align-items-center'>
                        <CFormLabel className='fs-2'>Категор</CFormLabel>
                        <CFormLabel>Категор бараа ангилахад тусална</CFormLabel>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <CButton color='primary' className='my-2' onClick={handleModalCat}>
                            Категори нэмэх
                        </CButton>
                    </div>
                </CCardBody>
            </CCard>

            {/* AddCategory modal component */}
            <AddCategory visibleCat={visibleCat} handleModalCat={handleModalCat} />
        </main>
    );
};

export default Category;
