import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = () => {
    let token = JSON.parse(localStorage.getItem('admin'))
    return token ? <Outlet /> : <Navigate to='/adminlogin' />
}

export default Protected