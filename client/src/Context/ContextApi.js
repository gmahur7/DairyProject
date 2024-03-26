import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode';

const adminContext = createContext()

const AdminInfo = ({ children }) => {
    const navigate = useNavigate()
    const [admin, setAdmin] = useState()
    const [token, setToken] = useState()
    const [toPaymentIds, setToPaymentIds] = useState([])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("admin"))
        const ticket = data?.token
        setAdmin(data)
        setToken(ticket)
        if (!data || !ticket) {
            navigate('/adminlogin')
        }

        const isTokenExpired = () => {
            if (!ticket) return true; // If no token, consider it expired
    
            try {
                const decodedToken = jwtDecode(ticket);
                const currentTime = Date.now() / 1000; // Convert to Unix timestamp (seconds)
    
                // Check if the token has expired
                return decodedToken.exp < currentTime;
            } catch (error) {
                // Handle invalid token or decoding error
                console.error('Error decoding token:', error);
                return true; // Consider the token expired if there's an error
            }
        };

        if (!data || isTokenExpired()) {
            navigate('/adminlogin');
        }

    }, [navigate])

    return (
        <adminContext.Provider value={{ admin, setAdmin, token, setToken,toPaymentIds, setToPaymentIds }}>{children}</adminContext.Provider>
    )
}

export const AdminState = () => {
    return useContext(adminContext)
}

export default AdminInfo;