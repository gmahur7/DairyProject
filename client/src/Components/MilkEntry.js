import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api_Url from '../env'
import { AdminState } from '../Context/ContextApi'

const MilkEntry = () => {
    const { token } = AdminState()
    const navigate = useNavigate()
    const currentDate = new Date().toLocaleDateString()
    const [vender, setVender] = useState({})
    const [venderNames, setVenderNames] = useState([])
    const [Name, setName] = useState('')
    const [Shift, setShift] = useState('')
    const [DateDetail, setDateDetail] = useState('')
    const [Quantity, setQuantity] = useState('')
    const [Fat, setFat] = useState('')
    const [NetAmount, setNetAmount] = useState('')
    const [Vender_id, setVender_id] = useState('')
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
    const [error, setError] = useState(false)
    const [searchError, setSearchError] = useState(false)

    const getVenderNames = async (search) => {
        // if(!venderNames.length>0){
        try {
            let result = await fetch(`${Api_Url}/api/vender/names`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            result = await result.json()
            console.log(result)
            if (result.length > 0) {
                setVenderNames(result)
                setSearchError(false)
            }
            else throw new Error(result.msg)
        } catch (error) {
            setSearchError(error.message)
        }
        // }
    }

    const submit = async () => {
        if (!Vender_id || !DateDetail || !Quantity || !Fat || !Shift || !NetAmount) {
            setError(true)
        }
        else {
            try {
                let result = await fetch(`${Api_Url}/api/milkentry`, {
                    method: 'post',
                    body: JSON.stringify({ Vender: Vender_id, DateDetail, Fat, Quantity, NetAmount, Shift }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                result = await result.json()
                console.log(result)
                if (result.msg === 'Successful') {
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
        setDateDetail('')
        setShift('')
        setQuantity('')
        setFat('')
        setNetAmount('')
        setVender_id('')
        setSuccess(false)
        setFail(false)
        setError(false)
        setSearchError(false)
        setVender({})
        setNetAmount('')
    }

    function netAmountCalcualtion() {
        if (vender.FatPass > Fat) {
            let Fatless = vender.FatPass - Fat
            let result = (Quantity * Fatless * 1.5) / 10
            result = Quantity - result
            result = result * vender.Rate
            setNetAmount(Number.parseInt(result))
        }
        else {
            let Fatmore = Fat - vender.FatPass
            let result = (Quantity * Fatmore * 1.5) / 10
            result = Number.parseInt(Quantity) + Number.parseInt(result)
            result = result * vender.Rate
            setNetAmount(Number.parseInt(result))
        }
    }

    async function getVenderDetail(id) {
        let data = await fetch(`${Api_Url}/api/vender/id/${id}`, {
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        data = await data.json()
        setVender(data)
    }

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        return `${year}-${month}-${day}`;
    }

    const handleVenderSelection = (event) => {
        const selectedVenderName = event.target.value;
        const selectedVender = venderNames.find(vender => vender.Name === selectedVenderName);
        if (selectedVender) {
            setVender_id(selectedVender._id)
        }
    };

    useEffect(() => {
        getVenderDetail(Vender_id)
    }, [Vender_id])

    useEffect(() => {
        if (!Vender_id || !Fat || !Quantity) {
        }
        else {
            netAmountCalcualtion()
        }
    }, [Vender_id, Fat, Quantity, vender])

    useEffect(() => {
        getVenderNames()
        setDateDetail(getCurrentDate())
    }, [token])

    return (
        <div>
            <h2>Fill Milk Entry Details : </h2>
            {searchError && <p>Sorry, Unable To Fetch Vender Names  </p>}
            <div>
                <span>Enter Name : </span>
                <input type='text' onInput={handleVenderSelection} list='vendername' />
                {
                    venderNames.length > 0 &&
                    <datalist id="vendername">
                        {
                            venderNames.map((item, index) =>
                                <option key={index} value={item.Name}>{item.Name}</option>
                            )
                        }
                    </datalist>
                }
                {error && !Vender_id && <p className='error'>Please Enter Name </p>}
            </div>
            <div>
                <span>Enter Date : </span>
                <input value={DateDetail} onChange={(e) => setDateDetail(e.target.value)} type='date' />
                {error && !DateDetail && <p className='error'>Please Enter Date</p>}
            </div>
            <div>
                <span>Enter Shift : </span>
                <select onChange={e => setShift(e.target.value)}>
                    <option value={''}>Shift</option>
                    <option value={'M'}>Morning</option>
                    <option value={'E'}>Evening</option>
                </select>
                {error && !Shift && <p className='error'>Please Select Shift</p>}
            </div>
            <div>
                <span>Enter Quantity : </span>
                <input value={Quantity} onChange={(e) => setQuantity(e.target.value)} type='number' />
                {error && !Quantity && <p className='error'>Please Enter Quantity </p>}
            </div>
            <div>
                <span>Enter Fat : </span>
                <input value={Fat} onChange={(e) => setFat(e.target.value)} type='number' />
                {error && !Fat && <p className='error'>Please Enter Fat </p>}
            </div>
            <div>
                <span>Enter Net Amount : </span>
                <input value={NetAmount} type='number' readOnly />
                {!NetAmount && <p className='error'>Wait While NetAmount Is Calculating </p>}
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

export default MilkEntry;