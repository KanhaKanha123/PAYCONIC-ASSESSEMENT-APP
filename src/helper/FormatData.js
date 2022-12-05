export const formatExchangeDetails = (exchangeObj, state) => {
    let { amount, currencyFrom, currencyTo } = exchangeObj;
    const { exchangeData: { info: { rate } } } = state;
    amount = parseFloat(amount);
    return [
        [`${amount} ${currencyFrom}`, `${convertToSixDigit(amount * rate)} ${currencyTo}`],
        [`1 ${currencyFrom}`, `${convertToSixDigit(rate)} ${currencyTo}`],
        [`1 ${currencyTo}`, `${convertToSixDigit((1 / (rate)))} ${currencyFrom}`]
    ];
}

export const formatAmount = (amount) => {
    return formatAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const convertToSixDigit = (amount) => {
    return parseFloat(amount).toFixed(6);
}

export const formatDateTime = (data) => {
    const dateObject = new Date(data.date);
    let day = dateObject.getDate();
    let month = dateObject.getMonth() + 1;
    let year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    if (month.toString().length < 2)
        month = '0' + month;
    if (day.toString().length < 2)
        day = '0' + day;

    return `${day}/${month}/${year} @ ${hours}:${minutes}`;
}

export const formatDate = (date) => {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.toString().length < 2)
        month = '0' + month;
    if (day.toString().length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


export const getDateAfterSubtract = (date, days) => {

    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);

    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export const formatHistoryData = (exchangeHistoryData, convertTo) => {
    let { rates } = exchangeHistoryData;

    const result = [];

    for (const [date, currencyRates] of Object.entries(rates)) {
        result.push({ column1: date, column2: currencyRates[convertTo] });
    }

    return result;
}

export const getStatisticData = (historyArr) => {
    const flatArrayPrices = historyArr.filter(item => item.column2 !== undefined).map(item => item.column2);
    const sum = flatArrayPrices.reduce((acc, item) => acc + item, 0);
    const max = Math.max(...flatArrayPrices);
    const min = Math.min(...flatArrayPrices);
    const avrg = convertToSixDigit(sum / flatArrayPrices.length);

    return [
        { column1: 'Lowest', column2: min },
        { column1: 'Highest', column2: max },
        { column1: 'Average', column2: avrg }
    ]

}