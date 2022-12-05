import React, { Fragment, useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Exchange History Chart',
        },
    },
};

const Chart = ({ exchangeData }) => {
    const [graphData, setGraphData] = useState();
    debugger
    //useEffect(() => {
    const data = {
        labels: exchangeData.map(item => item.column1),
        datasets: [
            {
                label: 'Exchange History',
                data: exchangeData.map(item => item.column2),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    // setGraphData(data);
    // }, [graphData])


    return <Fragment>{data && <Line options={options} data={data} />}</Fragment>;

}

export default Chart; 
