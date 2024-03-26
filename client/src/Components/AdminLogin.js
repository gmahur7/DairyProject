import React, { useState } from 'react'
import Api_Url from '../env'
import { useNavigate } from 'react-router-dom'
import { AdminState } from '../Context/ContextApi'

const AdminLogin = () => {
    const navigate = useNavigate()
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState(false)

    const login = async () => {
        if (!id || !password) {
            setError(true)
            return
        }
        else {
            try {
                let auth=await fetch(`${Api_Url}/api/admin`,{
                    method:'post',
                    body:JSON.stringify({id,password}),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                auth=await auth.json()
                if(auth.id&&auth.token){
                    localStorage.setItem('admin',JSON.stringify({id:auth.id,token:auth.token}))
                    // setAdmin(auth)
                    // setToken(auth.token)
                    navigate('/')
                }  
                else{
                    throw new Error(auth.msg)
                } 
            } catch (error) {
                setMsg(error.message)
            }
        }
    }

    function reset() {
        setId('')
        setPassword('')
        setError(false)
        setMsg(false)
    }
    return (
        <div id='loginpage'>
            <div id="login-left"></div>
            <div id="login-right">
            <h2>Admin Login : </h2>
            <div class='floating-input'>
                <input type="text" value={id} onChange={e => setId(e.target.value)} />
                <label>Enter ID : </label>
                {error && !id && <p>Please Enter ID First </p>}
            </div>
            <div class='floating-input'>
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
                <label>Enter Password : </label>
                {error && !password && <p>Please Enter Password First </p>}
            </div>
            <div>
                <button onClick={login}>Log-In</button>
            </div>
            {
                msg && <p>{msg}</p>
            }
            </div>
        </div>
    )
}

export default AdminLogin