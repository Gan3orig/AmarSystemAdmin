import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCloseButton,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CImage,
    CModal,
    CRow
} from '@coreui/react';
import { useState } from 'react';
import dress from './photos/dress.png';
import jeans from './photos/jeans.png';
import meat from './photos/meat.png';
import milk from './photos/milk.png';
import socks from './photos/socks.png';
import drink from './photos/soft-drink.png';
import tshirt from './photos/tshirt.png';

const productOptions = [
    { value: 'other', label: 'Бусад', images: [] },
    { value: 'food', label: 'Хүнс', images: [drink, meat, milk] },
    { value: 'clothing', label: 'Хувцас', images: [jeans, dress, tshirt, socks] },
    { value: 'electronics', label: 'Электрон бараа', images: [] },
    { value: 'household', label: 'Гэр ахуй', images: [] },
    { value: 'beauty', label: 'Гоо сайхан', images: [] },
];

// eslint-disable-next-line react/prop-types
const AddCategory = ({ visibleCat, handleModalCat }) => {
    const [categoryName, setCategoryName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            categoryName: categoryName,
            productCategory: productCategory,
            selectedImage: selectedImage
        });

        // Clear form fields after submission
        setCategoryName('');
        setProductCategory('');
        setSelectedImage(null);
        handleModalCat(); // Close the modal after submission
    };

    const getImages = () => {
        const selectedOption = productOptions.find(option => option.value === productCategory);
        return selectedOption ? selectedOption.images : [];
    };

    const images = getImages();

    const handleImageClick = (img) => {
        setSelectedImage(img);
    };

    return (
        <CModal fullscreen="sm " visible={visibleCat} onClose={handleModalCat } alignment='center'>
            <CCard>
                <CCardHeader>
                    Категори нэмэх
                    <CCloseButton className='position-absolute end-0' onClick={handleModalCat} />
                </CCardHeader>
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <CRow className='mb-3'>
                            <CCol md={6}>
                                <CFormLabel>Категори Нэр</CFormLabel>
                                <CFormInput
                                    type='text'
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    placeholder='Категори нэрийг оруулна уу'
                                    required
                                />
                            </CCol>
                        </CRow>
                        <CRow className='mb-3'>
                            <CCol>
                                <CFormLabel>Барааны ангилал</CFormLabel>
                                <CFormSelect
                                    value={productCategory}
                                    onChange={(e) => setProductCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Сонгох</option>
                                    {productOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                        </CRow>

                        {images.length > 0 && (
                            <CRow className='mb-3'>
                                <CCol>
                                    {images.map((img, index) => (
                                        <CImage 
                                            key={index}
                                            src={img} 
                                            alt={`Option ${index}`} 
                                            style={{ 
                                                width: '60px', 
                                                marginRight: '10px',
                                                padding: '10px',
                                                cursor: 'pointer',
                                                border: selectedImage === img ? '2px solid blue' : 'none' 
                                            }} 
                                            onClick={() => handleImageClick(img)}
                                        />
                                    ))}
                                </CCol>
                            </CRow>
                        )}

                        <CButton type='submit' color='primary'>
                            Хадгалах
                        </CButton>
                    </CForm>
                </CCardBody>
            </CCard>
        </CModal>
    );
};

export default AddCategory;
