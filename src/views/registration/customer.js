import React, { useState,useEffect } from 'react';
import {
    
    CCard,CCardHeader,
    CCardBody,
    CImage,
    CFormLabel,
    CButton
} from '@coreui/react';
import AddCustomer from './addCostumer';
import { useTranslation } from 'react-i18next';
import customerImg from '../registration/customer.png'
const Customer= () => {
    const { t } = useTranslation();
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [selectedCustomer,setSelectedCustomer]=useState([]);
    const [customer,setCustomer]=useState([]);
    const [edit,setEdit]=useState([]);
    const handleAddCustomer = (customer) => {
        if(customer){
            setSelectedCustomer(customer);
            setEdit(true);
        }
        else{
            setSelectedCustomer(null);
            setEdit(false);
        }
        setShowAddCustomer(!showAddCustomer);
    };
    //delete api
    const handleDeleteCustomer = (customerId) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const requestOptions = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            redirect: "follow"
        };

     
        fetch(`https://api.majorsoft.mn/api/branchService?branchId=${customerId}&userId=${userId}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                setCustomer(prevBranches => prevBranches.filter(branch => branch.branchId !== customerId));
                console.log(`Branch with id ${customerId} deleted successfully.`);
            })
            .catch((error) => {
                console.error("Error deleting branch:", error);
            });
    };
    //get datas api 
    const  getDatas = () => {
        const token = localStorage.getItem('token');
        const merchantId = localStorage.getItem("merchantId");

        const requestOptions = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            redirect: "follow"
        };

        fetch(`https://api.majorsoft.mn/api/branchService?merchantId=${merchantId}`, requestOptions)
            .then((response) => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log("Fetched branch data:", result);
                setCustomer(result.data);
            })
            .catch((error) => {
                console.error("Error fetching branch data:", error);
            });
    } 
    useEffect(() => {
       getDatas()
    }, []);
  
 

    return (
        <main className='mx-2 mt-1'>
        {!showAddCustomer? (
            <CCard>
                <CCardHeader>{t('customer')}</CCardHeader>
                <CCardBody className='text-center'>
                    <CImage
                        src={customerImg}
                        rounded
                        thumbnail
                        width={200}
                        height={200}
                        className="mb-2"
                        style={{ border: 'none' }}
                        alt={t('costumerImageAlt')} 
                    />
                    <div className='d-flex flex-column align-items-center'>
                        <CFormLabel className='fs-2'>{t('customer')}</CFormLabel>
                        <CFormLabel>{t('manage_costumer')}</CFormLabel>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <CButton 
                            color='primary' 
                            className='my-2' 
                            onClick={handleAddCustomer}
                            aria-label={t('addCostumer')} 
                        >
                            {t('addCostumer')}
                        </CButton>
                    
                    </div>
                </CCardBody>
            </CCard>
        ) : (
            <AddCustomer
            visible={showAddCustomer}
            setVisible={setShowAddCustomer}
            edit={edit}
            editCustomer={selectedCustomer}
            refresh = {getDatas}
            />
        )}
    </main>
    );
};

export default Customer;
