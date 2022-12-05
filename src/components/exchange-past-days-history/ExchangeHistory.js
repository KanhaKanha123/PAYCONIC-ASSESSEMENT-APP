import { useEffect, useState, Fragment } from "react";
import Table from "../table/Table";
import { formatDate, getDateAfterSubtract, formatHistoryData, getStatisticData } from '../../helper/FormatData';
import { RoutesConfig } from '../../constants/constant';
import { fetchExchangeRateData } from '../../hooks/api/fetchExchangeRateData';
import { CurrencyExchangeAppState } from '../../store/context/Context';
import Control from '../control/Control';
import Chart from '../chart/Chart';

const ExchangeHistory = () => {
    //custom columns data for past days
    const [columns, setColumns] = useState(['Date', 'Exchange Rate']);
    //column data for Statistics
    const [columnsStatistics, setcolumnsStatistics] = useState(['Statistics', '']);
    //state to keep past days
    const [pastDays, setPastDays] = useState(7);
    //Statistics data
    const [statisticsData, getStatisticsData] = useState([]);
    //get exchangeHistoryState data from global state
    const { exchangeHistoryState: { exchangeHistoryData, historyFilter }, dispatchExchangeHistory } = CurrencyExchangeAppState();

    useEffect(() => {
        const urlHistoryParam = {
            pastDays: pastDays - 1,
            base: historyFilter.base,
            convertTo: historyFilter.convertTo
        };
        if (historyFilter.base) {
            getData(urlHistoryParam);
        }

    }, [historyFilter, pastDays]);

    //change past days for history
    const controlOnChange = (e) => {
        setPastDays(e.target.value);
    }

    //fetch history
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

            result = await fetchExchangeRateData(url);

            //format to neccessary data only
            const formatResult = formatHistoryData(result, historyFilter.convertTo);

            const statisticsData = getStatisticData(formatResult);

            getStatisticsData(statisticsData);

            dispatchExchangeHistory({ type: "DATA_SUCCESS", payload: formatResult });
        } catch (err) {
            dispatchExchangeHistory({ type: "DATA_ERROR", payload: 'Error in Api ' + err });
        }
    };

    return (<Fragment>
        {exchangeHistoryData.length > 0 && statisticsData.length > 0 && <main className="history-main-container">
            <section className="history-dropdown-container">
                <div className="controls-col-align">
                    <label htmlFor="Duration" aria-label='label for duration' data-testid='duration-history' className='control-label'>Duration</label>
                    <Control
                        name="pastDays"
                        label='From'
                        controlOnChange={controlOnChange}
                        value={7}
                        ariaLabel="history duration"
                        dataTestId="history-duration"
                        className="control-style"
                        type="dropdowwn">
                    </Control>
                </div>
            </section>
            <section className="history-table-container">
                <div className="history-container-left">
                    <Table columns={columns} historyData={exchangeHistoryData}></Table>
                </div>
                <div className="history-container-right">
                    <Chart exchangeData={exchangeHistoryData}></Chart>
                    <Table columns={columnsStatistics} historyData={statisticsData}></Table>
                </div>
            </section>

        </main>}
    </Fragment>)
}

export default ExchangeHistory;