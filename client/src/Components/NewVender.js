import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api_Url from '../env'
import { AdminState } from '../Context/ContextApi'

const NewVender = () => {
    const {token} =AdminState()
    const navigate = useNavigate()
    const [Name, setName] = useState('')
    const [Fat, setFat] = useState('')
    const [Rate, setRate] = useState('')
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
    const [error, setError] = useState(false)
    const [searchError, setSearchError] = useState(false)

    
    const submit = async () => {
        if (!Name || !Fat || !Rate ) {
            setError(true)
        }
        else {
            try {
                let result = await fetch(`${Api_Url}/api/vender`, {
                    method: 'post',
                    body: JSON.stringify({ Name, FatPass:Fat, Rate }),
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                     }
                })
                result = await result.json()
                if (result.msg === 'Successfull') {
                    setSuccess(true)
                    setFail(false)
                    setTimeout(() => {
                        reset()
                        navigate(0)
                    }, 2000)
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
        setFat('')
        setSuccess(false)
        setFail(false)
        setError(false)
    }

    return (
        <div>
            <h2>Enter Vender Details To Add : </h2>
            <div>
                <span>Enter Name : </span>
                <input value={Name} onChange={(e)=>{setName(e.target.value)}} type='text'/>
                {error && !Name && <p className='error'>Please Enter Name </p>}
            </div>
            <div>
                <span>Enter Rate : </span>
                <input value={Rate} onChange={(e) => setRate(e.target.value)} type='number' />
                {error && !Rate && <p className='error'>Please Enter Rate </p>}
            </div>
            <div>
                <span>Enter Fat : </span>
                <input value={Fat} onChange={(e) => setFat(e.target.value)} type='number' />
                {error && !Fat && <p className='error'>Please Enter Fat </p>}
            </div>
            <div>
                <button onClick={submit}>Submit</button>
                <button onClick={reset}>Reset</button>
                {success && <p>Submit Successfully</p>}
                {fail && <p>Submit Failed</p>}
            </div>
        </div>
    )
}

export default NewVender;