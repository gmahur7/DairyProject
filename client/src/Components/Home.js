import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h2>
                Dairy WebSite
            </h2>
            <p><Link to='/adminlogin'>AdminLogin</Link></p>
            <p><Link to='/milkentry'>Milk Entry</Link></p>
            <p><Link to='/vendertable'>Vender Table</Link></p>
            <p><Link to='/newvender'>Add vender</Link></p>
            <p><Link to='/perdaydetail'>One Day Detail</Link></p>
            <p><Link to='/lastdaysdetailchart'>Last Days Detail Chart</Link></p>
        </div>
    )
}

export default Home