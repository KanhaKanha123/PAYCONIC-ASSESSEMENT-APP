import { Fragment } from "react";
import Control from '../control/Control';
import { CgArrowsExchange } from 'react-icons/cg';

const Currency = ({
    controlOnChange,
    value,
    onExchangeIconClick }) => {
    return (<Fragment>
        <section className="controls-col-align">
            <label htmlFor="From" aria-label='label for from currency' data-testid='from-currency' className='control-label'>From</label>
            <Control
                name="currencyFrom"
                placeHolder="From"
                label='From'
                controlOnChange={controlOnChange}
                value={value.currencyFrom}
                ariaLabel="currency from exchange"
                dataTestId="currency-from"
                className="control-style"
                type="text">
            </Control>
        </section>
        <CgArrowsExchange onClick={() => onExchangeIconClick()} fontSize="30px" color="#008073"></CgArrowsExchange>
        <section className="controls-col-align">
            <label htmlFor="To" aria-label='label for to currency' data-testid='to-currency' className='control-label'>To</label>
            <Control
                name="currencyTo"
                placeHolder="To"
                label='To'
                controlOnChange={controlOnChange}
                value={value.currencyTo}
                ariaLabel="currency from exchange"
                dataTestId="currency-to"
                className="control-style"
                type="text">
            </Control>
        </section>
    </Fragment >)
}

export default Currency;