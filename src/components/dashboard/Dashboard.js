import { Fragment, useState, useRef, useEffect } from "react";
import Amount from '../amount/Amount';
import Currency from '../currency/Currency';
import { Button } from "react-bootstrap";
import useFetchData from '../../hooks/useFetchData';
import RateDetail from '../rate-detail/RateDetail';
import { formatExchangeDetails } from '../../helper/FormatData';
import ExchangeHistory from '../exchange-past-days-history/ExchangeHistory';
import { CurrencyExchangeAppState } from '../../store/context/Context';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    //input filter data
    const [exchangeObj, setExchangeObj] = useState({ amount: '', currencyFrom: '', currencyTo: '' });
    //this will help when after history user 
    const [isTypingStart, setIsTypingStart] = useState(false);

    //custom hook to calculate exchange results on the base of different inputs.
    const { stateExchangeData, dispatch, setUrlParam } = useFetchData();

    //Global application state for exchange details results
    const { exchangeHistoryState, dispatchExchangeHistory } = CurrencyExchangeAppState();

    //state from history page
    const { state } = useLocation();
    //state to get inputs to calculate exchaange details
    const [currencyConvertedDedtails, setCurrencyConvertedDedtails] = useState([]);

    const [requiredFields, setrequiredFields] = useState('');

    useEffect(() => {
        //isTypingStart flag help not to run this when user want to calculate new results
        if (state && !isTypingStart) {
            //read data from history
            const { historyData } = state;
            const {
                value: {
                    urlParam: {
                        amount,
                        currencyFrom,
                        currencyTo }, state: { exchangeData: { result } }
                }
            } = historyData;

            if (amount && currencyFrom && currencyTo) {
                //update all input control values to history ones
                setExchangeObj({ amount: amount, currencyFrom: currencyFrom, currencyTo: currencyTo });

                //just get previously fethced data from local storage without making api request again
                dispatch({ type: "DATA_SUCCESS", payload: result });

                //update details to calculate exchange detail
                dispatchExchangeHistory({ type: "CURRENCY_EXCHANGE_INPUT", payload: { base: exchangeObj.currencyFrom, convertTo: exchangeObj.currencyTo } });
            }
        }

        //format data to pass detail component
        if (Object.keys(stateExchangeData.exchangeData).length > 0) {
            const formatedData = formatExchangeDetails(exchangeObj, stateExchangeData);
            setCurrencyConvertedDedtails(formatedData);
        }
    }, [stateExchangeData.exchangeData]);

    //Read value from input onchange
    const OnChange = (e) => {
        setIsTypingStart(true);
        setrequiredFields('');
        const { name, value } = e.target;
        setExchangeObj(prevState => ({ ...prevState, [name]: value }));
    }
    //On button convert click
    const getExchangeResult = () => {
        if (exchangeObj.amount !== '' && !isNaN(parseInt(exchangeObj.amount)) && exchangeObj.currencyFrom !== '' && exchangeObj.currencyTo !== '') {
            setUrlParam(exchangeObj);
            dispatchExchangeHistory({ type: "CURRENCY_EXCHANGE_INPUT", payload: { base: exchangeObj.currencyFrom, convertTo: exchangeObj.currencyTo } });
            setrequiredFields('');
        } else {
            setrequiredFields('Amount should not be empty and not less than 1. Amount, CurrencyFrom, CurrencyTo fields required');
        }
    }

    //on exchange icon click
    const onExchangeIconClick = () => {
        setIsTypingStart(true);
        const fromCurrency = exchangeObj.currencyFrom;
        setExchangeObj({ amount: exchangeObj.amount, currencyFrom: exchangeObj.currencyTo, currencyTo: fromCurrency });
    }

    return (<Fragment>
        <section className="input-control-container">
            <Amount
                controlOnChange={OnChange}
                value={exchangeObj}>
            </Amount>
            <Currency
                controlOnChange={OnChange}
                onExchangeIconClick={onExchangeIconClick}
                value={exchangeObj}>
            </Currency>
            <Button onClick={() => getExchangeResult()} className="button">Convert</Button>
        </section>
        {requiredFields && <section className="error-section"><span className="error-message">{requiredFields}</span></section>}
        <section>
            <RateDetail rateDetail={currencyConvertedDedtails}></RateDetail>
        </section>
        <section>
            {exchangeHistoryState.historyFilter && <ExchangeHistory></ExchangeHistory>}
        </section>
    </Fragment >)
}

export default Dashboard;