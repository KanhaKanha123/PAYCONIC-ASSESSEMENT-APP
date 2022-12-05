export const CurrencyExchangeReducer = (state, action) => {
    switch (action.type) {
        case "DATA_SUCCESS":
            return {
                ...state,
                exchangeData: action.payload,
                error: '',
                loading: false
            }
        case "DATA_ERROR":
            return {
                ...state,
                exchangeData: [],
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export const InitialState = {
    exchangeData: {},
    error: '',
    loading: true
}