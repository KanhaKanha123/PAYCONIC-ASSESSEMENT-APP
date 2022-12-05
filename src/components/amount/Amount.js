import { Fragment } from "react";
import Control from '../control/Control';

const Amount = ({
    controlOnChange,
    value }) => {
    return (<Fragment>
        <section className="controls-col-align">
            <label htmlFor='Amount' aria-label='label for amount' data-testid='label-amount' className="control-label">Amount</label>
            <Control
                name="amount"
                placeHolder="Amount"
                controlOnChange={controlOnChange}
                value={value.amount}
                label='Amount'
                ariaLabel="add amount to exchange"
                dataTestId="amount-text-box"
                className="control-style"
                type='text'>
            </Control>
        </section>
    </Fragment >)
}

export default Amount;