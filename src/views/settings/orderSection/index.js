import { CCard, CCardBody, CCardHeader, CFormLabel, CFormSwitch, CRow } from '@coreui/react';

const OrderSection = () => {
    return (
        <div>
        <CCard className='mt-2'>
            <CCardHeader>Нэмэлт тохиргоо</CCardHeader>
            <CCardBody>
                <CRow >
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column gap-0'>
                            <CFormLabel><b>Захиалга авах</b></CFormLabel>
                            <CFormLabel className='md-2'><i>Захиалга хадгалах, засварлах, зөвшөөрөх  Дэлгэрэнгүй</i></CFormLabel></div>
                        <CFormSwitch className='d-flex align-items-center' defaultChecked />
                    </div>
                </CRow>
                <CRow>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column gap-0'>
                            <CFormLabel><b>Касс хүлээлцэх</b></CFormLabel>
                            <CFormLabel><i>Кассын үлдэгдлийн хяналт, бүртгэлДэлгэрэнгүй</i></CFormLabel></div>
                        <CFormSwitch className='d-flex align-items-center' defaultChecked />
                    </div>
                </CRow>
                <CRow>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column gap-0'>
                            <CFormLabel><b>Цагийн тохиргоо</b></CFormLabel>
                            <CFormLabel><i>Ажилчдын цагийн бүртгэл, цагийн тохируулгын хяналтДэлгэрэнгүй</i></CFormLabel></div>
                        <CFormSwitch className='d-flex align-items-center' defaultChecked />
                    </div>
                </CRow>
                <CRow>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column gap-0'>
                            <CFormLabel><b>Гал тогооны Захиалга</b></CFormLabel>
                            <CFormLabel><i>Гал  тогооны захиалгыг баримт хэвлэгч болон дэлгэц рүү илгээхДэлгэрэнгүй</i></CFormLabel></div>
                        <CFormSwitch className='d-flex align-items-center' defaultChecked />
                    </div>
                </CRow>
                <CRow>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column gap-0'>
                            <CFormLabel><b>Хэрэглэгчийн дэлгэц</b></CFormLabel>
                            <CFormLabel><i>Худалдан авалт хийхэд захиалгын мэдээллийг үйлчлүүлэгчид харуулахДэлгэрэнгүй</i></CFormLabel></div>
                        <CFormSwitch className='d-flex align-items-center' defaultChecked />
                    </div>
                </CRow>
                <CRow>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column gap-0'>
                            <CFormLabel><b>Хоолны төлөв</b></CFormLabel>
                            <CFormLabel><i>Хоолны захиалгыг энд идэх, авч явах, хүргэлттэй гэсэн мөн бусад нэмэлт төлөвийг тэмдэглэх боломжтойДэлгэрэнгүй</i></CFormLabel></div>
                        <CFormSwitch className='d-flex align-items-center' defaultChecked />
                    </div>
                </CRow>
                <CRow>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column gap-0'>
                            <CFormLabel><b>Аюулгүй нөөцийн үлдэгдэл</b></CFormLabel>
                            <CFormLabel><i>Цөөн буюу нөөцгүй барааны мэдээлэл авахДэлгэрэнгүй</i></CFormLabel></div>
                        <CFormSwitch className='d-flex align-items-center' defaultChecked />
                    </div>
                </CRow>
                <CRow>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column gap-0'>
                            <CFormLabel><b>Хасах борлуулалтын мэдээлэл</b></CFormLabel>
                            <CFormLabel><i>Үлдэгдлээс их бараа зарагдах гэж байгааг касс дээр сануулахДэлгэрэнгүй</i></CFormLabel></div>
                        <CFormSwitch className='d-flex align-items-center' defaultChecked />
                    </div>
                </CRow>
                <CRow>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-column gap-0'>
                            <CFormLabel><b>Бар кодоос жин оруулах</b></CFormLabel>
                            <CFormLabel><i>Жин оруулсан барааны бар кодыг уншихад жин бүртгэхДэлгэрэнгүй</i></CFormLabel></div>
                        <CFormSwitch className='d-flex align-items-center' defaultChecked />
                    </div>
                </CRow>
            </CCardBody>
        </CCard>
        <CCard className='mt-2'>
            <CCardHeader>Кассын төлбөрийн төрөл</CCardHeader>
            <CCardBody>
                <CRow>
                    <div className='d-flex justify-content-between'>
                        <CButton color='primary'> +Төрөл нэмэх</CButton>
                    </div>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell><CFormCheck defaultChecked /></CTableHeaderCell>
                                <CTableHeaderCell>Нэр</CTableHeaderCell>
                                <CTableHeaderCell>Ангилал</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow>
                                <CTableDataCell><CFormCheck defaultChecked /></CTableDataCell>
                                <CTableDataCell>Бэлэн мөнгө</CTableDataCell>
                                <CTableDataCell>Бэлэн мөнгө</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell><CFormCheck defaultChecked /></CTableDataCell>
                                <CTableDataCell>Дансаар</CTableDataCell>
                                <CTableDataCell>Бэлэн бус</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell><CFormCheck defaultChecked /></CTableDataCell>
                                <CTableDataCell>Картаар</CTableDataCell>
                                <CTableDataCell>Бэлэн бус</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell><CFormCheck defaultChecked /></CTableDataCell>
                                <CTableDataCell>Voucher</CTableDataCell>
                                <CTableDataCell>Бэлэн бус</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell><CFormCheck defaultChecked /></CTableDataCell>
                                <CTableDataCell>GiftCard</CTableDataCell>
                                <CTableDataCell>Бусад</CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </CRow>
            </CCardBody>
        </CCard>
        <CCard className='mt-2'>
            <CCardHeader>НӨАТ-ын баримт хэвлэх</CCardHeader>
            <CCardBody>
                <div className="container mt-2">
                    {!showBarimt && (
                        <CButton color='primary' onClick={handleToggleBarimtSection}>
                            +Хүсэлт нэмэх
                        </CButton>
                    )}
                    {showBarimt && (

                        <div className='mt-2'>

                            <CFormLabel>Регистерийн дугаар</CFormLabel>
                            <CInputGroup className='mb-2'>
                                <CFormInput
                                    id="registrationNumber"
                                    placeholder="Регистрийн дугаар"
                                    value={registrationNumber}
                                    onChange={(e) => setRegistrationNumber(e.target.value)}
                                />
                                <CButton color="primary" onClick={handleCheckRegistration}>Шалгах</CButton>
                            </CInputGroup>
                            <CFormLabel>Татвар төлөгчийн нэр</CFormLabel>
                            <CFormInput
                                id="taxPayerName"
                                placeholder="Татвар төлөгчийн нэр"
                                value={taxPayerName}
                                readOnly
                            />
                            <CFormLabel>Татвар төлөгчийн дугаар</CFormLabel>
                            <CFormInput
                                id="taxpayerNo"
                                placeholder="Татвар төлөгчийн дугаар"
                                value={taxpayerNo}
                                readOnly
                            />
                            <CFormCheck
                                id="flexCheckDefault"
                                label="НӨАТ төлөгч эсэх"
                                checked={isVATPayer}
                                readOnly
                            />
                        </div>

                    )}
                </div>
                <CTable>

                    <CTableRow>

                        <CTableHeaderCell><CFormCheck /></CTableHeaderCell>
                        <CTableHeaderCell>Салбар</CTableHeaderCell>
                        <CTableHeaderCell>Дүүрэг/Аймаг</CTableHeaderCell>
                        <CTableHeaderCell>Хороо/Сум </CTableHeaderCell>
                        <CTableHeaderCell>Терминал</CTableHeaderCell>
                        <CTableHeaderCell>Системийн төрөл </CTableHeaderCell>


                    </CTableRow>
                    <CTableDataCell><CFormCheck /></CTableDataCell>
                    <CTableDataCell>hii</CTableDataCell>
                    <CTableDataCell><CFormSelect
                        value={selectedBranch}
                        onChange={handleBranchChange}
                    >
                        <option value="" disabled>Сонгоно уу...</option>
                        {branches.map((branch) => (
                            <option key={branch.branchCode} value={branch.branchCode}>
                                {branch.branchName}
                            </option>))}
                    </CFormSelect></CTableDataCell>
                    <CTableDataCell> <CFormSelect
                        id="subbranchName"

                        value={selectedSubBranch}
                        onChange={(e) => setSelectedSubBranch(e.target.value)}
                    >
                        <option value="" >Сонгоно уу...</option>
                        {subBranches.map((subBranch) => (
                            <option key={subBranch.subBranchCode} value={subBranch.subBranchCode}>
                                {subBranch.subBranchName}
                            </option>
                        ))}
                    </CFormSelect>
                    </CTableDataCell>

                </CTable>
            </CCardBody>
        </CCard>
        <CModal
            visible={visible}
            onClose={() => setVisible(false)}
            aria-labelledby="LiveDemoExampleLabel"
        >
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">
                    {editingBranch ? 'Салбар засах' : 'Салбар бүртгүүлэх'}
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm className="row g-3">
                    <CRow md={4}>
                        <CFormInput
                            type="text"
                            id="OrganizationName"
                            label="Салбарын нэр"
                            value={newBranchName}
                            onChange={(e) => setNewBranchName(e.target.value)}
                        />
                    </CRow>
                    <CRow md={4}>
                        <CFormSelect
                            id="OrganizationType"
                            label="Салбарын төрөл"
                            value={newBranchType}
                            onChange={(e) => setNewBranchType(e.target.value)}
                        >
                            <option value="" disabled>Сонгоно уу...</option>
                            <option value="store">Дэлгүүр</option>
                            <option value="restaurant">Ресторан</option>
                            <option value="fastfood">Түргэн хоол</option>
                            <option value="salon">Салон</option>
                            <option value="pharmacy">Эмийн сан</option>
                            <option value="hotel">Зочид Буудал</option>
                        </CFormSelect>
                    </CRow>
                    <CRow md={4}>
                        <CFormSelect
                            id="branchName"
                            label="Аймаг/Xот"
                            value={selectedBranch}
                            onChange={handleBranchChange}
                        >
                            <option value="" disabled>Сонгоно уу...</option>
                            {branches.map((branch) => (
                                <option key={branch.branchCode} value={branch.branchCode}>
                                    {branch.branchName}
                                </option>
                            ))}
                        </CFormSelect>
                    </CRow>
                    <CRow md={4}>
                        <CFormSelect
                            id="subbranchName"
                            label="Cум/Дүүрэг"
                            value={selectedSubBranch}
                            onChange={(e) => setSelectedSubBranch(e.target.value)}
                        >
                            <option value="" >Сонгоно уу...</option>
                            {subBranches.map((subBranch) => (
                                <option key={subBranch.subBranchCode} value={subBranch.subBranchCode}>
                                    {subBranch.subBranchName}
                                </option>
                            ))}
                        </CFormSelect>

                    </CRow>
                    <CRow md={4}>
                        <CFormInput
                            type="text"
                            id="branchAddress"
                            label="Салбарын хаяг"
                            value={newBranchLocation}
                            onChange={(e) => setNewBranchLocation(e.target.value)}
                        />
                    </CRow>
                    <CRow md={3}>
                        <CIcon icon={cilAirplay}></CIcon>
                    </CRow>
                    <CRow md={3}>
                        <CFormInput
                            type="text"
                            id="branchPhoneNumber"
                            label="Утас"
                            value={newBranchContact}
                            onChange={(e) => setNewBranchContact(e.target.value)}
                        />
                    </CRow>

                    <CCol xs={12}>
                        <CButton color="primary" type="button" onClick={handleAddBranch}>
                            Save changes
                        </CButton>
                    </CCol>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                </CButton>
            </CModalFooter>
        </CModal>
        <CModal
            visible={posFormVisible}
            onClose={() => setPosFormVisible(false)}
            aria-labelledby="PosModalLabel"
        >
            <CModalHeader>
                <CModalTitle id="PosModalLabel">ПОС төхөөрөмж бүртгүүлэх</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm className="row g-3">
                    <CRow md={4}>
                        <CFormInput
                            type="text"
                            id="posName"
                            label="ПОС нэр"
                        />
                    </CRow>
                    <CRow md={4}>
                        <CFormSelect
                            id="posBranch"
                            label="Салбар"
                            value=""
                            onChange={() => { }}
                        >
                            <option value="" disabled>Сонгоно уу...</option>
                            {branches.map((branch) => (
                                <option key={branch.branchCode} value={branch.branchCode}>
                                    {branch.branchName}
                                </option>
                            ))}
                        </CFormSelect>
                    </CRow>
                    <CRow md={4}>
                        <CFormSelect
                            id="posSystemType"
                            label="Системийн төрөл"
                            value=""
                            onChange={() => { }}
                        >
                            <option value="" disabled>Сонгоно уу...</option>
                            <option value="type1">Төрөл 1</option>
                            <option value="type2">Төрөл 2</option>
                            <option value="type3">Төрөл 3</option>
                        </CFormSelect>
                    </CRow>

                </CForm>
            </CModalBody>
            <CModalFooter>
            </CModalFooter>
        </CModal>
    </div>
    );
};

export default OrderSection;
