import React, { useEffect, useState } from 'react'
import { AdminState } from '../Context/ContextApi';
import NavBar from './NavBar'
import Api_Url from '../env';
import { Bar, Line, Pie } from 'react-chartjs-2';
import BarChartComponent from './VenderLastDaysChart';
import { Colors } from 'chart.js';

const LastDaysDetailChart = () => {
    const { token } = AdminState();
    const [data, setData] = useState([]);
    const [days, setDays] = useState(7)
    const [displayChart, setDisplayChart] = useState(false)
    const [fetchError, setFetchError] = useState();
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [error, setError] = useState(false)

    const getData = async (days) => {
        try {
            let result = await fetch(`${Api_Url}/api/perday/lastdaysdata`, {
                method: 'post',
                body: JSON.stringify({ days: days }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            result = await result.json();
            if (result) {
                setData(result);
            } else {
                setData([{}]);
                setFetchError(false);
                throw new Error(result.msg);
            }
        } catch (error) {
            setFetchError(error.message);
        }
    };

    const dateToDate = async () => {
        if (!startDate || !endDate) setError(true)
        else {
            try {
                let result = await fetch(`${Api_Url}/api/perday/fromdatetodate`, {
                    method: 'post',
                    body: JSON.stringify({ startDate, endDate }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                result = await result.json()
                if (result.length > 0) {
                    setFetchError(false)
                    setData(result)
                }
                else throw new Error(result.msg)
            } catch (error) {
                setData([{}])
                setFetchError(error.message)
            }
        }
    }

    const getDateQuantities = () => {
        const dateQuantities = {};

        if (Array.isArray(data)) {
            data.forEach((dayData) => {
                const { Date, TotalQuantity, Shift } = dayData;

                if (!dateQuantities[Date]) {
                    dateQuantities[Date] = { M: 0, E: 0 };
                }

                dateQuantities[Date][Shift] += TotalQuantity;
            });
        } else {
            console.warn('Data is not an array');
        }

        return Object.entries(dateQuantities).map(([date, quantities]) => ({
            date,
            totalQuantity: quantities.M + quantities.E,
            morningQuantity: quantities.M,
            eveningQuantity: quantities.E,
        }));
    };

    const chartData = {
        labels: getDateQuantities().map((dateData) => dateData.date),
        datasets: [
            {
                label: 'Total Quantity',
                data: getDateQuantities().map((dateData) => dateData.totalQuantity),
                backgroundColor: 'rgba(242, 37, 37, 0.5)',
                borderColor: 'rgba(242, 37, 37, 1)',
                borderWidth: 1,
                barThickness: 30,
                hoverBackgroundColor: 'rgba(242, 37, 37, 0.8)',
            },
            {
                label: 'Morning Quantity',
                data: getDateQuantities().map((dateData) => dateData.morningQuantity),
                backgroundColor: 'rgba(0, 151, 10, 0.5)',
                borderColor: 'rgba(0, 151, 10, 1)',
                borderWidth: 1,
                barThickness: 30,
                hoverBackgroundColor: 'rgba(0, 151, 10, 0.8)',
            },
            {
                label: 'Evening Quantity',
                data: getDateQuantities().map((dateData) => dateData.eveningQuantity),
                backgroundColor: 'rgba(13, 0, 255, 0.5)',
                borderColor: 'rgba(13, 0, 255, 1)',
                borderWidth: 1,
                barThickness: 30,
                hoverBackgroundColor: 'rgba(13, 0, 255, 0.8)',
            },
        ],
    };

    useEffect(() => {
        getData(days)
    }, [token, days]);

    return (
        <>
            <NavBar />
            <div id="last-days-detail">
                <div id="last-days-detail-heading">
                    <h2>Last {days} Days Detail Chart :</h2>
                </div>
                <div id="last-days-detail-fetch">
                    <button onClick={() => setDays(7)}>Last 7 days</button>
                    <button onClick={() => setDays(15)}>Last 15 days</button>
                    <button onClick={() => setDays(30)}>Last 30 days</button>
                </div>
                <div id="last-days-date-fetch">
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    <button onClick={dateToDate}>Get Entries</button>
                </div>
                <div>
                    <p className='last-days-detail-fetch-error'>
                        {error && !startDate && <>Please Select Starting Date</>}
                    </p>
                    <p className='last-days-detail-fetch-error'>
                        {error && !endDate && <>Please Select End Date</>}
                    </p>
                </div>
                <div id="last-days-detail-tab-div">
                    <h2>Milk Data</h2>
                    <table id="last-days-detail-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Date</th>
                                <th>Total Amount</th>
                                <th>Total Quantity</th>
                                <th>Shift</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.Date}</td>
                                    <td>{item.TotalAmount}</td>
                                    <td>{item.TotalQuantity}</td>
                                    <td>{item.Shift}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="last-days-display-chart">
                    {data.length > 0 && <button onClick={() => displayChart ? setDisplayChart(false) : setDisplayChart(true)}>{displayChart ? 'Remove Chart' : 'Generate Chart'}</button>}
                </div>
                {data.length > 0 &&
                    displayChart &&
                    <div id="last-days-Bar-chart">
                        <Bar data={chartData} />
                    </div>
                }
            </div >
        </>
    )
}

export default LastDaysDetailChart