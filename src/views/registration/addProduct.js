import React, { useState, useEffect } from 'react';
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
    CFormSwitch,
    CRow,
    CTable,
    CTableBody,
    CCardTitle,
    CTableHead,
    CTableHeaderCell,
    CTableDataCell,
} from '@coreui/react';
import AddCategory from '../notUsed/addCategory'; // Import your AddCategory component here

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

const AddProduct = () => {
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
    const [isTableVisible, setIsTableVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [addModal, setModal] = useState(false);

    const handleModalCat = () => {
        setModal(!addModal);
    };

 

    async function fetchCategories() {
        try {
            const response = await fetch('/data/categories.json');
            const data = await response.json();
            setCategories(data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSwitchChange = (e) => {
        setIsTableVisible(e.target.checked);
    };

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
        <main className='d-flex flex-column align-items-center mt-2'>
            <CCard style={{ maxWidth: '800px', width: '100%' }}>
                <CCardHeader>Бараа нэмэх</CCardHeader>
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
                                <CCol>
                                    <CRow>
                                        <CCol xs={9}>
                                            <CFormSelect
                                                value={selectedCategory}
                                                onChange={handleCategoryChange}
                                            >
                                                <option value="">Сонгох</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </CFormSelect>
                                        </CCol>
                                        <CCol xs={2} className="d-flex align-items-center">
                                            <CButton color='primary' className="w-100" onClick={handleModalCat}>+</CButton>
                                        </CCol>
                                    </CRow>
                                </CCol>
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
            <CCard style={{ maxWidth: '800px', width: '100%', marginBottom: '1rem' }} className='mt-2'>
                <CCardHeader>Бараа</CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol>Бараа багцлах</CCol>
                        <CCol className='end-0'>
                            <CFormSwitch onChange={handleSwitchChange} size="xl" className='d-flex justify-content-end' />
                        </CCol>
                    </CRow>
                    {isTableVisible && (
                        <CTable>
                            <CTableHead>
                                <CTableHeaderCell>Баркод</CTableHeaderCell>
                                <CTableHeaderCell>Нэр</CTableHeaderCell>
                                <CTableHeaderCell>Тоо ширхэг</CTableHeaderCell>
                                <CTableHeaderCell>Үнэ</CTableHeaderCell>
                                <CTableHeaderCell></CTableHeaderCell>
                            </CTableHead>
                            <CTableBody>
                                <CTableDataCell>123456789</CTableDataCell>
                                <CTableDataCell>Сүү</CTableDataCell>
                                <CTableDataCell>10</CTableDataCell>
                                <CTableDataCell>1500₮</CTableDataCell>
                                <CTableDataCell>
                                    <CCloseButton />
                                </CTableDataCell>
                            </CTableBody>
                        </CTable>
                    )}
                </CCardBody>
            </CCard>
            {addModal && <AddCategory visibleCat={addModal} handleModalCat={handleModalCat} />} 
       
        </main>
    );
};

export default AddProduct;
