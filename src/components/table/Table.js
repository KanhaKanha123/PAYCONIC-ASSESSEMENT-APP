import { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
//generic table components
const Table = ({ columns, historyData, deleteHistory, viewHistory, isAttachHandler }) => {
    const [hoverId, setHoverId] = useState(null);

    //show the button when hover one the row
    const onHoverChangeStyle = (id) => {
        setHoverId(id);
    }
    //hide the buttons when leave the table row
    const onRemoveChangeStyle = () => {
        setHoverId(null);
    }

    return <table {...(isAttachHandler && { onMouseLeave: () => onRemoveChangeStyle() })}>
        <tr>
            {columns.map((column, index) => <th key={index}>{column}</th>)}
        </tr>

        {historyData.map((history, index) => <tr {...(isAttachHandler && { onMouseEnter: () => onHoverChangeStyle(history.id) })} key={index}>
            {columns.length >= 1 && <td>{history.column1}</td>}
            {columns.length >= 2 && <td>{history.column2}</td>}
            {columns.length >= 3 && <td>{history.id === hoverId && <span className="action-buttons"><Button onClick={() => viewHistory(history)} className="button-table-view">View</Button><Button onClick={() => deleteHistory(history.id)} className="button-table-delete">Delete from history</Button></span>}</td>}
        </tr>)}
    </table>
};

export default Table;