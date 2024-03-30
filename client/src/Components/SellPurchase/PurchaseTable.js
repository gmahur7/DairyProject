import React, { useEffect, useState } from 'react'
import Api_Url from '../../env'
import { AdminState } from '../../Context/ContextApi'
import { useNavigate } from 'react-router-dom'
import SellPurchaseHome from './SellPurchaseHome'

const PurchaseTable = () => {
    const { token } = AdminState()
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState([])
    const [tokenError, setTokenError] = useState(false)
    const getdata = async () => {
        try {
            let result = await fetch(`${Api_Url}/api/sellpurchase/purchase`, {
                method: 'get',
                headers: {
                    'Content-Type': 'applicatopn/json',
                    Authorization: `Bearer ${token}`
                }
            })
            result = await result.json()
            if (result.length > 0) {
                setData(result)
                setFetchError(false)
                setTokenError(false)
            }
            else if (result.msg === "Not Authorized") {
                setData([])
                setFetchError(false)
                setTokenError(true)
                setTimeout(() => {
                    navigate('/adminlogin')
                }, 3000)
            }
            else throw new Error(result.msg)
        } catch (error) {
            setData([])
            setFetchError(true)
            setTokenError(false)
        }
    }

    useEffect(()=>{
        getdata()
    },[token])

    return (
        <>
        <SellPurchaseHome/>
        <div id="purchase-table">
            <div id="purchase-table-heading">
                <h2>Purchase Data Entries Table</h2>
            </div>
            <div id="purchase-table-tab-wrapper">
                {
                    data.length > 0 &&
                    <table id="purchase-table-main-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Net Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item,index) =>
                                    <tr key={item._id}>
                                        <td>{index+1}</td>
                                        <td>{item.ProductName}</td>
                                        <td>{item.Quantity}</td>
                                        <td>{item.Price}</td>
                                        <td>{item.NetAmount}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                }
            </div>
            <div id="purchase-table-fetch">
                {fetchError&&<p>Data Not Found</p>}
                {tokenError && <p>Not Authorized, Login Again</p>}
            </div>
        </div>
        </>
    )
}

export default PurchaseTable;