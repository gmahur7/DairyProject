import React from 'react'
import { Link} from 'react-router-dom'

const SellPurchaseHome = () => {
    return (
        <div id="sellnpurchase">
            <div id="sellnpurchase-navbar">
                <div id="sellnpurchase-navbar-logo"></div>
                <div id="sellnpurchase-navbar-links">
                    <Link to='/'>Home</Link>
                    <Link to='/sell/sellentry'>Sell Entry</Link>
                    <Link to='/purchase/purchaseentry'>Purchase Entry</Link>
                    <Link to='/sell/selltable'>Sell Table</Link>
                    <Link to='/purchase/purchasetable'>Purchase Table</Link>
                </div>
            </div>
        </div>
    )
}

export default SellPurchaseHome