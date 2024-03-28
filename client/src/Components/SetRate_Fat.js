import React, { useEffect, useState } from 'react'
import Api_Url from '../env'
import { AdminState } from '../Context/ContextApi'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from './NavBar'

const SetRateFat = () => {
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate()
    const { token } = AdminState()
    const [data, setData] = useState({})
    const [Name, setName] = useState('')
    const [Rate, setRate] = useState('')
    const [FatPass, setFatPass] = useState('')
    const [error, setError] = useState(false)
    const [fetchError, setFetchError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)

    function isEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }


    const getData = async () => {
        try {
            let result = await fetch(`${Api_Url}/api/vender/id/${id}`, {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            result = await result.json()

            if (result.Name) {
                setName(result.Name)
                setFatPass(result.FatPass)
                setRate(result.Rate)
                setData({ ...result })
                setFetchError(false)
            }
            else if (result.msg === 'Invalid Vendor ID') {
                setFetchError(true)
                setData({})
                setTimeout(() => {
                    reset()
                    navigate('/vendertable')
                }, 2000)
            }
            else throw new Error("Data Not Found")
        } catch (error) {
            setFetchError(true)
            setError(error.message)
            setData({})
            // setTimeout(() => {
            //     reset()
            //     navigate('/vendertable')
            // }, 2000)
        }
    }

    const update = async () => {
        if (!Name || !FatPass || !Rate) {
            setError(true)
        }
        else {
            try {
                let result = await fetch(`${Api_Url}/api/vender/update/${id}`, {
                    method: 'put',
                    body: JSON.stringify({ Name, FatPass, Rate }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                result = await result.json()
                if (result.msg === 'Successful') {
                    setSuccess(true)
                    setFail(false)
                    setTimeout(() => {
                        reset()
                        navigate('/vendertable')
                    }, 3000)
                }
                else {
                    throw new Error("Submit Failed.")
                }
            }
            catch (err) {
                setSuccess(false)
                setFail(true)
            }
        }
    }

    function reset() {
        setName('')
        setFatPass('')
        setSuccess(false)
        setFail(false)
        setError(false)
    }

    useEffect(() => {
        if (!id) navigate('/vendertable')
    })

    useEffect(() => {
        getData()
    }, [token, id, navigate])

    return (
        <>
            <NavBar />
            <div id="set-rate-comp">
                <div id="set-rate-heading">
                    <h2>Update Vender Details</h2>
                </div>
                {!isEmpty(data) &&
                    <div id="set-rate-form">
                        <div>
                            <label>Vender Name : </label>
                            <input type="text" value={Name} onChange={e => setName(e.target.value)} />
                            {error && !Name && <p className='error'>Please Enter Name </p>}
                        </div>
                        <div>
                            <label>Vender Fat Pass : </label>
                            <input type="number" value={FatPass} onChange={e => setFatPass(e.target.value)} />
                            {error && !FatPass && <p className='error'>Please Enter Fat Pass </p>}
                        </div>
                        <div>
                            <label>Vender Rate : </label>
                            <input type="number" value={Rate} onChange={e => setRate(e.target.value)} />
                            {error && !Rate && <p className='error'>Please Enter Rate </p>}
                        </div>
                        <div id="str-rate-form-btns">
                            <button onClick={() => update()}>Update</button>
                            <button onClick={reset}>Reset</button>
                        </div>
                    </div>}
                <div id="set-rate-fetch">
                    {success && <p>Submit Successfully</p>}
                    {fail && <p>Submit Failed</p>}
                    {fetchError && <p>Invalid Vendor ID</p>}
                </div>
            </div>
        </>
    )
}

export default SetRateFat