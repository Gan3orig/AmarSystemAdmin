import React, { useState } from 'react';
import { CButton, CModal, CCard, CCardBody, CCardHeader, CFormLabel, CFormInput } from '@coreui/react';
import * as XLSX from 'xlsx';

// eslint-disable-next-line react/prop-types
const ImportExcel = ({ visible, onClose }) => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleFileUpload = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const binaryStr = e.target.result;
                const workbook = XLSX.read(binaryStr, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                setData(json);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <CModal size="sm" visible={visible} onClose={onClose}>
            <CCard>
                <CCardHeader>Импорт Excel</CCardHeader>
                <CCardBody>
                    <CFormLabel htmlFor="fileInput">Excel файл сонгох</CFormLabel>
                    <CFormInput 
                        type="file" 
                        id="fileInput"
                        accept=".xlsx, .xls"
                        onChange={handleFileChange}
                    />
                    {/* Adding an anchor tag for the download functionality */}
                    <a 
                        href="example/Жишээ файл.xlsx" 
                        // download="Жишээ файл.xlsx"
                        style={{ textDecoration: 'none' }}
                    >
                        <CButton color="link">
                            Жишээ файл
                        </CButton>
                    </a>
                    <CButton color="primary" className="mt-3" onClick={handleFileUpload}>
                        Файлыг Импортлох
                    </CButton>
                    
                    {data.length > 0 && (
                        <div className="mt-3">
                            <h5>Импортлогдсон өгөгдөл:</h5>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        {data[0].map((header, index) => (
                                            <th key={index}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.slice(1).map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((cell, cellIndex) => (
                                                <td key={cellIndex}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CCardBody>
            </CCard>
        </CModal>
    );
};

export default ImportExcel;
