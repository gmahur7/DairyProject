import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart } from 'recharts';
import Api_Url from '../env'
import { AdminState } from '../Context/ContextApi'
import NavBar from './NavBar';

const LastDaysPerVenderData = () => {
    const { token } = AdminState()
    const [days, setDays] = useState(1)
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [displayChart, setDisplayChart] = useState(false)
    const [fetchError, setFetchError] = useState(false)
    const [showDate, setShowDate] = useState(false)
    const [error, setError] = useState(false)

    const getData = async (days) => {
        try {
            let result = await fetch(`${Api_Url}/api/milkentry/vendersdata/${days}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            result = await result.json()
            // console.log(result)
            if (result.length > 0) {
                setShowDate(false)
                setData(result)
                setFetchError(false)
            }
            else {
                throw new Error(result.msg);
            }
        } catch (error) {
            setFetchError(error.message)
        }
    }

    const dateToDate = async () => {
        if (!startDate || !endDate) setError(true)
        else {
            try {
                let result = await fetch(`${Api_Url}/api/milkentry/vendersdata/`, {
                    method: 'post',
                    body:JSON.stringify({startDate,endDate}),
                    headers: {
                        'Content-Type':'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                result = await result.json()

                if (result.length > 0) {
                    setData(result)
                    setFetchError(false)
                    setShowDate(true)
                }
                else {
                    throw new Error(result.msg);
                }
            } catch (error) {
                setData([])
                setFetchError(error.message)
            }
        }
    }

    useEffect(() => {
        getData(days)
    }, [token])

    return (
        <>
            <NavBar />
            <div id="last-days-vender-data">
                <div id="last-days-heading">
                    <h2>{showDate?
                    `From ${startDate} to ${endDate} Data Per Vender`
                    :`Last ${days} Days Per Vender Data`
                    }</h2>
                </div>
                <div id="last-days-filter">
                    <input type='number' onChange={e => setDays(e.target.value)} />
                    <button onClick={() => getData(days)}>Enter</button>
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
                <div id="last-days-chart-display">
                    {data.length > 0 && <button onClick={() => displayChart ? setDisplayChart(false) : setDisplayChart(true)}>{displayChart ? 'Remove Chart' : 'Generate Chart'}</button>}
                </div>
                <div id="last-days-tab-div">
                    {
                        data && data.length > 0 &&
                        <table id="last-days-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Vender Name</th>
                                    <th>Total Quantity</th>
                                    <th>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, index) =>
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.Name}</td>
                                            <td>{item.totalQuantity}</td>
                                            <td>{item.totalNetAmount}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    }
                </div>
                {displayChart && <VendorDataChart data={data} />}
            </div>
        </>
    )
}

const VendorDataChart = ({ data }) => {
    const [based, setBased] = useState('')

    return (
        <div id="chart-last-days-wrapper">
            <div id="chart-last-days-filter">
                <select onChange={(e) => setBased(e.target.value)}>
                    <option value='Quantity'>Quantity Based Chart</option>
                    <option value='Amount'>Amount Based Chart</option>
                    <option value='Both'>Both</option>
                </select>
            </div>
            {
                (based === 'Quantity' || based === 'Both') &&
                <div className="chart-details-last-days">
                    <h2>Total Quantity</h2>
                    <BarChart
                        width={800}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalQuantity" fill="#8884d8" name="Total Quantity" />
                    </BarChart>
                </div>}

            {
                (based === 'Amount' || based === 'Both') &&
                <div className="chart-details-last-days">
                    <h2>Total Net Amount</h2>
                    <BarChart
                        width={800}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalNetAmount" fill="#82ca9d" name="Total Net Amount" />
                    </BarChart>
                </div>}
        </div>
    );
};

export default LastDaysPerVenderData