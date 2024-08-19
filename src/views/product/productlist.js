import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CFormLabel,
    CImage
} from '@coreui/react';
import { useState } from 'react';
import product from '../product/photos/box.png';
import AddProduct from './addProduct'; // Ensure the correct path
import ImportExcel from './importExcel'; // Ensure the correct path

const ProductList = () => {
    const [importVisible, setImportVisible] = useState(false);
    const [visible, setVisible] = useState(false);

    const toggleImportModal = () => {
        setImportVisible(!importVisible);
    };

    const handleModal = () => {
        setVisible(!visible);
    };

    return (
        <main className='mx-2 mt-1'>
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
