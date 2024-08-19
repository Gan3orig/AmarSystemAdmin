import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CFormLabel,
    CImage,
} from '@coreui/react';
import { useState } from 'react';
import AddCategory from './addCategory'; // Import the AddCategory component
import category from './photos/categories.png';

const Category = () => {
    const [addModal, setModal] = useState(false);

    const handleModalCat = () => {
        setModal(!addModal);
    };

    return (
        <main className='mx-2 mt-2'>
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
            {addModal && <AddCategory visibleCat={addModal} handleModalCat={handleModalCat} />} 
        </main>
    );
};

export default Category;
