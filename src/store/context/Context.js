import { createContext, useContext, useReducer } from 'react';
import { InitialState, ExchangeHistoryReducer } from '../reducers/ExchangeHistoryReducer';

const CartContext = createContext(null);

export const Context = ({ children }) => {
    //get state from custome hook
    const [exchangeHistoryState, dispatchExchangeHistory] = useReducer(ExchangeHistoryReducer, InitialState);

    return <CartContext.Provider value={{ exchangeHistoryState, dispatchExchangeHistory }}>{children}</CartContext.Provider>
}

//hook which will provide application wise
export const CurrencyExchangeAppState = () => {
    return useContext(CartContext);
}
