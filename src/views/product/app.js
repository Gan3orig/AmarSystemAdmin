import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './productlist';
import ImportExcelPage from './ImportExcelPage'; // New page for importing Excel

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/import-excel" element={<ImportExcelPage />} />
            </Routes>
        </Router>
    );
}

export default App;
