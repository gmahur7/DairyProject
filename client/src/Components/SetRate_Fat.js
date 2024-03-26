import React, { useState } from 'react'
import Api_Url from '../env'

const SetRateFat = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const getData = async () => {
        try {
            let result=await fetch(`${Api_Url}/api/setrate`)
            result= await result.json() 
            if(result.length>0) {
                setData(result)
                setError(false)
            }
            else throw new Error("Data Not Found")
        } catch (error) {
            setError(error.message)
            setData([])
        }
    }
    return (
        <div>
            <h1>Set Rate & Fat</h1>
            <div>
                {
                    data.length > 0 &&
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) =>
                                <tr key={item._id}>
                                    <td></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }{
                    error&&<h4>{error}</h4>
                }
            </div>
        </div>
    )
}

export default SetRateFat