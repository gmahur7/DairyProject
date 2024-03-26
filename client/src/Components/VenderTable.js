import React, { useEffect, useState } from 'react'
import Api_Url from '../env'
import { AdminState } from '../Context/ContextApi'
import { Link } from 'react-router-dom'

const VenderTable = () => {
    const { token } = AdminState()
    const [data, setData] = useState([])

    const getData = async () => {
        let result = await fetch(`${Api_Url}/api/vender`, {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        result = await result.json()
        // console.log(result)
        if (result.length > 0) setData(result)
    }

    useEffect(() => {
        getData()
    }, [token])

    return (
        <div>
            <div>
                <h2>Vender Detail : </h2>
            </div>
            <div>
                <button><Link to='/lastdayspervenderdata'>Last Days Per Vender Data</Link></button>
            </div>
            {
                data.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <td>S.No</td>
                            <td>Vender Name</td>
                            <td>FatPass</td>
                            <td>Rate</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><Link to={`/vender/${item._id}`}>{item.Name}</Link></td>
                                    <td>{item.FatPass}</td>
                                    <td>{item.Rate}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}

export default VenderTable