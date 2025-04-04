import React, { useEffect } from 'react'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'
import axios from 'axios';
import dayjs from 'dayjs';

const DeveloperHistory = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [historyData, setHistoryData] = React.useState([]);

    useEffect(() => {
        if (isLoading) {
            axios.get('https://templateapi.xyz/online/api/v1/log')
                .then((e) => setHistoryData(e.data.data))
                .catch((e) => console.log(e))
                .finally(() => setIsLoading(false))
        }
    }
        , [isLoading]);
    if (isLoading) {
        return <div className='loader'></div>;
    }

    return (
        <div>
            <h3>Хөгжүүлэгчийн түүх</h3>
            <CTable striped hover>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Хөгжүүлэгчийн нэр</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Төслийн нэр</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Тэмдэглэл</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Өөрчлөлт</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Огноо</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {historyData.map((item, index) => (
                        <CTableRow key={item._id}>
                            <CTableDataCell>{index + 1}</CTableDataCell>
                            <CTableDataCell>{item.author}</CTableDataCell>
                            <CTableDataCell>{item.repository}</CTableDataCell>
                            <CTableDataCell>{item.commitMessage}</CTableDataCell>
                            <CTableDataCell><a href={item.compareUrl}>Өөрчлөлтийг харах</a></CTableDataCell>
                            <CTableDataCell>{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    )
}

export default DeveloperHistory
