
const RateDetail = ({ rateDetail }) => {
    return (<div className="rate-detail-container">
        {rateDetail.map((data, index) => <div key={index}>
            <span
                className={`rate-detail-label-left 
                ${index > 0 ? 'rate-detail--label-small-font' : ''}`}>
                {(data[0])}</span> : <span
                    className={`${index > 0 ? 'rate-detail--label-small-font' : 'rate-detail-label-right'}`}>
                {data[1].replace('.', ',')}</span>
        </div>)}
    </div>)
}

export default RateDetail;