export const ExchangeHistoryReducer = (state, action) => {
    switch (action.type) {
        case "DATA_SUCCESS":
            return {
                ...state,
                exchangeHistoryData: action.payload,
                loading: false
            }
        case "DATA_ERROR":
            return {
                ...state,
                exchangeHistoryData: {},
                error: action.payload,
                loading: false
            }
        case "CURRENCY_EXCHANGE_INPUT":
            return {
                ...state,
                historyFilter: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export const InitialState = {
    exchangeHistoryData: {},
    error: '',
    historyFilter: {},
    loading: true
}