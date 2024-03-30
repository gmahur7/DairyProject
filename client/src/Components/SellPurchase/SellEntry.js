import React, { useEffect, useState } from 'react'
import Api_Url from '../../env'
import { AdminState } from '../../Context/ContextApi'
import { useNavigate } from 'react-router-dom';
import SellPurchaseHome from './SellPurchaseHome';

const SellEntry = () => {
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
                let result = await fetch(`${Api_Url}/api/sellpurchase/sell`, {
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
            <SellPurchaseHome />
            <div id="sell-entry">
                <div id="sell-entry-heading">
                    <h2>Enter Sell Details : </h2>
                </div>
                <div id="sell-entry-form">
                    <div>
                        <input type="text" placeholder=" " value={ProductName} onChange={e => setProductName(e.target.value)} />
                        <label>Enter Product Name : </label>
                        {error && !ProductName && <p className="sellpurchaseerror">Enter Product Name</p>}
                    </div>
                    <div>
                        <input type="number" placeholder=" " value={Price} onChange={e => setPrice(e.target.value)} />
                        <label>Enter Product Price : </label>
                        {error && !Price && <p className="sellpurchaseerror">Enter Product Price</p>}
                    </div>
                    <div>
                        <input type="number" placeholder=" " value={Quantity} onChange={e => setQuantity(e.target.value)} />
                        <label>Enter Product Quantity : </label>
                        {error && !Quantity && <p className="sellpurchaseerror">Enter Product Quantity</p>}
                    </div>
                    <div>
                        <input type="number" placeholder=" " value={NetAmount} onChange={e => setNetAmount(e.target.value)} readOnly />
                        <label>Product NetAmount : </label>
                        {error && !NetAmount && <p className="sellpurchaseerror">Wait While NetAmount Is Calculating</p>}
                    </div>
                </div>
                <div id="sell-entry-btns">
                    <button onClick={submit}>Submit</button>
                    <button onClick={reset}>Reset</button>
                </div>
                <div id="sell-entry-msges">
                    {success && <p>Sell Entry Added SuccessFully</p>}
                    {fail && <p>Sell Entry Add Failed</p>}
                    {tokenError && <p>Not Authorized, Login Again</p>}
                </div>
            </div>
        </>
    )
}

export default SellEntry