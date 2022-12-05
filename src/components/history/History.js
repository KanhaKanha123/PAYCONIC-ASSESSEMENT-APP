import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../helper/FormatData';
import Table from "../table/Table";
import { RoutesConfig } from '../../constants/constant';

const History = () => {
    //custom columns for history
    const [columns, setColumns] = useState(['Date', 'Event', 'Actions']);
    //store history
    const [history, setHistory] = useState([]);
    // make a formate string to show history data
    const renderEventTemplateString = (exchangeData) => `Converted an amount of ${exchangeData.value.urlParam.amount} from ${exchangeData.value.urlParam.currencyFrom} to ${exchangeData.value.urlParam.currencyTo}`;

    const navigate = useNavigate();

    useEffect(() => {
        getHistoryData(localStorage);
    }, []);

    //navigate to dashboard
    const viewHistory = (history) => {
        navigate(RoutesConfig.dashboard, { state: { historyData: history } });
    }

    //delete history from localstorage
    const deleteHistory = (id) => {
        const key = 'history';
        const historyItem = localStorage.getItem(key);
        const historyArray = JSON.parse(historyItem);
        const updatedHistory = historyArray.filter(item => item.id != id);
        localStorage.setItem(key, JSON.stringify(updatedHistory));
        getHistoryData(localStorage);
    }

    //get and format history data to pass into table
    const getHistoryData = (localStorage) => {
        let formatedHistory = [];
        const history = JSON.parse(localStorage.getItem('history'));
        if (history) {
            formatedHistory = history.map(data => ({
                ...data,
                column2: renderEventTemplateString(data),
                column1: formatDateTime(data)
            }));

            setHistory(formatedHistory);
        }
    }

    return (<main className="history-container">
        {history && <Table isAttachHandler={true} viewHistory={viewHistory} deleteHistory={deleteHistory} columns={columns} historyData={history}></Table>}
    </main>)
}

export default History;