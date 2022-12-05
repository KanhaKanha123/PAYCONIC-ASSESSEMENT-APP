import { useEffect, useReducer, useState } from 'react';
import { InitialState, ExchangeHistoryReducer } from '../store/reducers/ExchangeHistoryReducer';
import { fetchExchangeRateData } from './api/fetchExchangeRateData';
import { RoutesConfig } from '../constants/constant';
import { formatDate, getDateAfterSubtract } from '../helper/FormatData';

//custom hook to manage api call to get history data
const useGetExchangeHistory = ({ base }) => {

    const [exchangeHistoryState, dispatchExchangeHistory] = useReducer(ExchangeHistoryReducer, InitialState);

    const defaultState = {
        pastDays: 7,
        base: base,
        convertTo: 'INR'
    }

    const [urlHistoryParam, setUrlHistoryParam] = useState(defaultState);

    const getData = async (urlParam) => {

        try {
            let result = {};
            const startDate = getDateAfterSubtract(new Date(), urlParam.pastDays);
            const endDate = formatDate(new Date());

            const params = new URLSearchParams({
                start_date: startDate,
                end_date: endDate,
                base: urlParam.base
            }).toString();

            const url = `${RoutesConfig.apiExchangeHistory}?${params}`;
            console.log('api', url);
            result = await fetchExchangeRateData(url);

            dispatchExchangeHistory({ type: "DATA_SUCCESS", payload: { ...result, convertTo: urlParam.convertTo } });
        } catch (err) {
            dispatchExchangeHistory({ type: "DATA_ERROR", payload: 'Error in Api ' + err });
        }
    };

    useEffect(() => {
        try {
            // if (urlParam) {
            getData(urlHistoryParam);
            // }
        } catch (err) {
            console.error(err);
        }
    }, [urlHistoryParam]);

    return { exchangeHistoryState, setUrlHistoryParam };
}

export default useGetExchangeHistory;


