import { useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CFormLabel,
    CImage
} from '@coreui/react';
import branch from '../settings/photos/branch.png';
import AddBranch from './addBranch'; // Ensure the correct path

const Branch = () => {
    const [showAddBranch, setShowAddBranch] = useState(false);

    const handleToggleAddBranch = () => {
        setShowAddBranch(prevState => !prevState);
    };

    return (
        <main className='mx-2 mt-1'>
            {!showAddBranch ? (
                <CCard>
                    <CCardHeader>Бараа</CCardHeader>
                    <CCardBody className='text-center'>
                        <CImage
                            src={branch}
                            rounded
                            thumbnail
                            width={200}
                            height={200}
                            className="mb-2"
                            style={{ border: 'none' }}
                        />
                        <div className='d-flex flex-column align-items-center'>
                            <CFormLabel className='fs-2'>Салбар</CFormLabel>
                            <CFormLabel>Эндээс та салбараа удирдах боломжтой</CFormLabel>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <CButton color='primary' className='my-2' onClick={handleToggleAddBranch}>
                                {showAddBranch ? 'Буцах' : 'Салбар нэмэх'}
                            </CButton>
                        </div>
                    </CCardBody>
                </CCard>
            ) : (
                <AddBranch visible={showAddBranch} setVisible={setShowAddBranch} />
            )}
        </main>
    );
};

export default Branch;
