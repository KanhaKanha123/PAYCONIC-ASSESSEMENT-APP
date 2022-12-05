import { useEffect, useReducer, useRef, useState } from 'react';
// import { formatShowsData } from '../helpers/formatData';
import { InitialState, CurrencyExchangeReducer } from '../store/reducers/CurrencyExchangeReducer';
import { fetchExchangeRateData } from './api/fetchExchangeRateData';
import { RoutesConfig } from '../constants/constant';


//custom hook to manage api call to get data
const useFetchData = () => {
    const [state, dispatch] = useReducer(CurrencyExchangeReducer, InitialState);
    const [urlParam, setUrlParam] = useState('');

    const getData = async (urlParam) => {
        try {
            let result = {};
            const params = new URLSearchParams({
                from: urlParam.currencyFrom,
                to: urlParam.currencyTo
            }).toString();

            const url = `${RoutesConfig.apiExchangeRate}?${params}`;

            result = await fetchExchangeRateData(url);
            const key = 'history';
            const uniqueId = Math.random();

            const historyItem = localStorage.getItem(key);
            const historyData = {
                id: uniqueId,
                date: (new Date()).toLocaleString([], {
                    hour12: false,
                }),
                value: {
                    urlParam: urlParam,
                    state: {
                        exchangeData: {
                            result: result
                        }
                    }
                }
            };

            //store history
            if (historyItem) {
                const historyArray = JSON.parse(historyItem);
                historyArray.push(historyData);
                localStorage.setItem(key, JSON.stringify(historyArray));
            } else {
                // And save the new key-value pair to the cache
                localStorage.setItem(key, JSON.stringify([historyData]));
            }

            dispatch({ type: "DATA_SUCCESS", payload: result });
        } catch (err) {
            dispatch({ type: "DATA_ERROR", payload: 'Error in Api ' + err });
        }
    };

    useEffect(() => {
        try {
            if (urlParam) {
                getData(urlParam);
            }
        } catch (err) {
            console.error(err);
        }
    }, [urlParam]);

    return { stateExchangeData: state, dispatch, setUrlParam };
}

export default useFetchData;


