import React, { useEffect, useState } from 'react'
import Api_Url from '../../env'
import { AdminState } from '../../Context/ContextApi'
import { useNavigate } from 'react-router-dom';
import SellPurchaseHome from './SellPurchaseHome';

const PurchaseEntry = () => {
    const { token } = AdminState();
    const navigate = useNavigate();
    const [ProductName, setProductName] = useState('')
    const [Price, setPrice] = useState('')
    const [Quantity, setQuantity] = useState('')
    const [NetAmount, setNetAmount] = useState('')
    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
    const [tokenError, setTokenError] = useState(false)

    const submit = async () => {
        if (!NetAmount || !Price || !Quantity || !ProductName) setError(true)
        else {
            try {
                let result = await fetch(`${Api_Url}/api/sellpurchase/purchase`, {
                    method: 'post',
                    body: JSON.stringify({ ProductName, Price, Quantity, NetAmount }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                result = await result.json()
                if (result.msg === "Successfull") {
                    setSuccess(true)
                    setFail(false)
                    setTokenError(false)
                    setTimeout(() => {
                        reset()
                    }, 3000)
                }
                else if (result.msg === "Not Authorized") {
                    setSuccess(false)
                    setFail(false)
                    setTokenError(true)
                    setTimeout(() => {
                        navigate('/adminlogin')
                    }, 3000)
                }
                else {
                    throw new Error(result.msg)
                }
            } catch (error) {
                setSuccess(false)
                setFail(true)
                setTokenError(false)
            }
        }
    }

    function reset() {
        setPrice('')
        setQuantity('')
        setProductName('')
        setNetAmount('')
        setError(false)
        setSuccess(false)
        setFail(false)
        setTokenError(false)
    }

    function calculation() {
        if (Price && Quantity) {
            setNetAmount(() => {
                return Number.parseFloat(Price) * Number.parseFloat(Quantity)
            })
        }
    }

    useEffect(() => {
        calculation()
    }, [Quantity, Price])

    return (
        <>
        <SellPurchaseHome/>
        <div id="purchase-entry">
            <div id="purchase-entry-heading">
                <h2>Enter Purchase Details : </h2>
            </div>
            <div id="purchase-entry-form">
                <div>
                    <input type="text" value={ProductName} onChange={e => setProductName(e.target.value)} />
                    <label>Enter Product Name : </label>
                    {error && !ProductName && <p className="purchasepurchaseerror">Enter Product Name</p>}
                </div>
                <div>
                    <input type="number" value={Price} onChange={e => setPrice(e.target.value)} />
                    <label>Enter Product Price : </label>
                    {error && !Price && <p className="purchasepurchaseerror">Enter Product Price</p>}
                </div>
                <div>
                    <input type="number" value={Quantity} onChange={e => setQuantity(e.target.value)} />
                    <label>Enter Product Quantity : </label>
                    {error && !Quantity && <p className="purchasepurchaseerror">Enter Product Quantity</p>}
                </div>
                <div>
                    <input type="number" value={NetAmount} readOnly />
                    <label>Product NetAmount : </label>
                    {error && !NetAmount && <p className="purchasepurchaseerror">Wait While NetAmount Is Calculating</p>}
                </div>
            </div>
            <div id="purchase-entry-btns">
                <button onClick={submit}>Submit</button>
                <button onClick={reset}>Reset</button>
            </div>
            <div id="purchase-entry-msges">
                {success && <p>Purchase Entry Added SuccessFully</p>}
                {fail && <p>Purchase Entry Add Failed</p>}
                {tokenError && <p>Not Authorized, Login Again</p>}
            </div>
        </div>
        </>
    )
}

export default PurchaseEntry;