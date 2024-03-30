import React from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'

const VenderMain = () => {
    const naviagte = useNavigate()
    return (
        <>
            <NavBar />
            <div id="vender-main">
                <div id="vender-main-newvender">
                    <h2>New Vendor</h2>
                    <p>Add a new vendor to your list of sellers.</p>
                    <button onClick={() => naviagte('/newvender')}>Add Vender</button>
                </div>
                <div id="vender-main-table">
                    <h2>All Vender Table</h2>
                    <p>View all the vendors in one place and manage them easily.</p>
                    <button onClick={() => naviagte('/vendertable')}>Vender Table</button>
                </div>
            </div>
        </>
    )
}

export default VenderMain