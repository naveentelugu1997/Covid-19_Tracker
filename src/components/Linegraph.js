import React, {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2';
import "./Linegraph.css";

const options = {
    legend: {
        display:false,
    },

    elements:{
        point:{
            radius:0
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: "MM/DD/YY",
                    tooltipsFormat: 'll',
                },
            },
        ],
        yAxes: [
            {
                // gridLines: {
                //     display: false,
                // },
                ticks: {
                    beginAtZero: true,
                },
            },
        ],

    },
};


const builChartData = (data, casesType)=> {
    let chartData = [];
    let lastDatapoint;

    for(let date in data.cases){
        if(lastDatapoint){
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDatapoint
            }
            chartData.push(newDataPoint);
        }
        lastDatapoint = data[casesType][date];  
    }

    return chartData;
}

function Linegraph({casesType}) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async ()=>{
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                let chartData = builChartData(data, casesType);
                setData(chartData);
            });
        };
        fetchData();
    },[casesType]);


    return (
        <div className='chart-container'>
         {data?.length > 0 && (
            <Line
                data={
                    {
                        datasets: [
                            {
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "#CC1034",
                                data: data,
                            }
                        ]
                    }
                }
                options = {options}
            />
         )}
        </div>
    )
}

export default Linegraph
