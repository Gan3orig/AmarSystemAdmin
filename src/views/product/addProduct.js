import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCloseButton,
    CCol,
    CContainer,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CModal,
    CRow
} from '@coreui/react';
import { useState } from 'react';

const timeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const hourStr = hour.toString().padStart(2, '0');
            const minuteStr = minute.toString().padStart(2, '0');
            options.push(`${hourStr}:${minuteStr}`);
        }
    }
    return options;
};

const ageOptions = [
    { value: '16', label: '16 дээш' },
    { value: '18', label: '18 дээш' },
    { value: '21', label: '21 дээш' },
];

const importOptions = [
    { value: 'ApuTraiding', label: 'АПУ Трейдинг ХХК' },
    { value: 'ApuDairy', label: 'АПУ Дэйри ХХК' },
    { value: 'SSB', label: 'ССБ Трейдинг ХХК' },
    { value: 'MCS', label: 'MCS Coca Cola ХХК' },
    { value: 'CVV', label: 'СҮҮ ХХК' },
    { value: 'UGUUj', label: 'ӨГӨӨЖ ХХК' },
    { value: 'TACHI', label: 'ТАЛХ ЧИХЭР ХХК' },
];

// eslint-disable-next-line react/prop-types
const AddProduct = ({ visibleSm, handleModal }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productType, setProductType] = useState('butarhai');
    const [packageCount, setPackageCount] = useState('');
    const [isService, setIsService] = useState(false);
    const [serviceTime, setServiceTime] = useState('');
    const [ageLimit, setAgeLimit] = useState('');
    const [importValue, setImport] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            name: productName,
            price: productPrice,
            description: productDescription,
            category: productCategory,
            type: productType,
            packageCount: packageCount,
            isService: isService,
            serviceTime: serviceTime,
            ageLimit: ageLimit,
            importValue: importValue,
        });

        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setProductCategory('');
        setProductType('butarhai');
        setPackageCount('');
        setIsService(false);
        setServiceTime('');
        setAgeLimit('');
        setImport('');
    };

    return (
        <CModal fullscreen="sm" visible={visibleSm} onClose={handleModal}>
            <CCard>
                <CCardHeader>
                    Бараа нэмэх
                    <CCloseButton className='position-absolute end-0' onClick={handleModal} />
                </CCardHeader>
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <CRow className='mb-3'>
                            <CCol md={6}>
                                <CFormLabel>Баркод</CFormLabel>
                                <CFormInput
                                    type='number'
                                    placeholder='Баркод'
                                    required
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel>Категори</CFormLabel>
                                <CFormInput
                                    type='text'
                                    value={productCategory}
                                    onChange={(e) => setProductCategory(e.target.value)}
                                    placeholder='Барааны категори оруулна уу'
                                />
                            </CCol>
                        </CRow>
                        <CRow className='mb-3'>



                            <CCol>
                                <CFormLabel>Барааны нэр</CFormLabel>
                                <CFormInput
                                    type='text'
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    placeholder='Барааны нэрийг оруулна уу'
                                    required
                                />
                            </CCol>
                        </CRow>
                        <CContainer>
                            <CRow className='mb-3'>
                                <CCol>
                                    <CFormLabel>Барааны төрөл</CFormLabel>
                                    <CFormCheck
                                        type='radio'
                                        name='productType'
                                        id='shirheg'
                                        label='Ширхэг'
                                        checked={productType === 'shirheg'}
                                        onChange={() => setProductType('shirheg')}
                                    />
                                    <CFormCheck
                                        type='radio'
                                        name='productType'
                                        id='butarhai'
                                        label='Бутархай'
                                        checked={productType === 'butarhai'}
                                        onChange={() => setProductType('butarhai')}
                                    />
                                    {productType === 'butarhai' && (
                                        <CFormInput
                                            type='number'
                                            value={packageCount}
                                            onChange={(e) => setPackageCount(e.target.value)}
                                            placeholder='Багцын тоог оруулна уу'
                                        />
                                    )}
                                </CCol>
                            </CRow>
                        </CContainer>
                        <CRow className='mb-3'>
                            <CCol>
                                <CFormCheck
                                    type='checkbox'
                                    id='service'
                                    label="Үйлчилгээ эсэх"
                                    checked={isService}
                                    onChange={(e) => setIsService(e.target.checked)}
                                />
                            </CCol>
                            {isService && (
                                <CCol md={6}>
                                    <CFormLabel>Цаг сонгох</CFormLabel>
                                    <CFormSelect
                                        value={serviceTime}
                                        onChange={(e) => setServiceTime(e.target.value)}
                                    >
                                        <option value="">Сонгох</option>
                                        {timeOptions().map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                </CCol>
                            )}
                        </CRow>
                        <CRow className='mb-3'>
                            <CCol>
                                <CFormLabel>Тайлбар</CFormLabel>
                                <CFormInput
                                    type='text'
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    placeholder='Барааны тайлбарыг оруулна уу'
                                />
                            </CCol>
                        </CRow>
                        <CRow className='mb-3'>
                            <CCol md={6}>
                                <CFormLabel>Үнэ</CFormLabel>
                                <CFormInput
                                    type='number'
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    placeholder='Үнийг оруулна уу'
                                    required
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel>Өртөг</CFormLabel>
                                <CFormInput
                                    type='number'
                                    placeholder='Өртөг'
                                    required
                                />
                            </CCol>
                        </CRow>

                        <CRow className='mb-3'>
                            <CCol md={6}>
                                <CFormLabel>Насны хязгаар</CFormLabel>
                                <CFormSelect
                                    value={ageLimit}
                                    onChange={(e) => setAgeLimit(e.target.value)}
                                >
                                    <option value="">Сонгох</option>
                                    {ageOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel>Нийлүүлэгч</CFormLabel>
                                <CFormSelect
                                    value={importValue}
                                    onChange={(e) => setImport(e.target.value)}
                                >
                                    <option value="">Сонгох</option>
                                    {importOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                        </CRow>
                        <CButton type='submit' color='primary'>
                            Хадгалах
                        </CButton>
                    </CForm>
                </CCardBody>
            </CCard>
        </CModal>
    );
};

export default AddProduct;
