import { Fragment } from "react";

const Control = ({
    name,
    controlOnChange,
    value,
    type,
    placeHolder,
    ariaLabel,
    dataTestId,
    className
}) => {

    const renderDropDown = () => (
        <select className={className} name={name} onChange={(e) => controlOnChange(e)}>
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="30">30 Days</option>
        </select>);

    const renderTextBox = () => (<input
        name={name}
        aria-label={ariaLabel}
        data-testid={dataTestId}
        className={className}
        type={type}
        placeholder={placeHolder}
        onChange={(e) => controlOnChange(e)}
        value={value}
        required>
    </input>);

    return (<Fragment>
        {type === "text" ? renderTextBox() : renderDropDown()}
    </Fragment >)
}

export default Control;