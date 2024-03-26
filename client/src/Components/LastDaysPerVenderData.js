import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart } from 'recharts';
import Api_Url from '../env'
import { AdminState } from '../Context/ContextApi'

const LastDaysPerVenderData = () => {
    const { token } = AdminState()
    const [days, setDays] = useState(1)
    const [data, setData] = useState([])
    const [displayChart, setDisplayChart] = useState(false)
    const [fetchError, setFetchError] = useState(false)

    const getData = async (days) => {
        try {
            let result = await fetch(`${Api_Url}/api/milkentry/vendersdata/${days}`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            result = await result.json()
            console.log(result)
            if (result.length > 0) {
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

    useEffect(() => {
        getData(days)
    }, [token])

    return (
        <div>
            <div>
                <h2>Last {days} Days Per Vender Data</h2>
            </div>
            <div>
                <input type='number' onChange={e => setDays(e.target.value)} />
                <button onClick={() => getData(days)}>Enter</button>
            </div>
            <div>
                {data.length > 0 && <button onClick={() => displayChart ? setDisplayChart(false) : setDisplayChart(true)}>{displayChart ? 'Remove Chart' : 'Generate Chart'}</button>}
            </div>
            <div>
                {
                    data && data.length > 0 &&
                    <table>
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
    )
}

const VendorDataChart = ({ data }) => {
    const [based, setBased] = useState('')

    return (
        <div>
            <div>
                <select onChange={(e)=>setBased(e.target.value)}>
                    <option value='Quantity'>Quantity Based Chart</option>
                    <option value='Amount'>Amount Based Chart</option>
                    <option value='Both'>Both</option>
                </select>
            </div>
            {   
                (based === 'Quantity' || based === 'Both') && 
                <div>
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
                <div>
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