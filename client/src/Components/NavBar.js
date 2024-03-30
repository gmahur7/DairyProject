import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {

    const logout = () => {
        localStorage.removeItem('admin')
        window.location = '/'
    }

    return (
        <nav id="nav-bar">
            <div id="nav-left">
                <h2>Keshav Dairy</h2>
            </div>
            <div id="nav-right">
                <ul>
                    <li>
                        <Link class="nav-li" to='/'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM11 13V19H13V13H11Z"></path></svg><span> Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link class="nav-li" to='/milkentry'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M5 8V20H19V8H5ZM5 6H19V4H5V6ZM20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM7 10H11V14H7V10ZM7 16H17V18H7V16ZM13 11H17V13H13V11Z"></path></svg><span> MilkEntry</span>
                        </Link>
                    </li>
                    <li><Link class="nav-li" to='/vender'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z"></path></svg><span>Vendor</span></Link></li>
                    <li><Link class="nav-li" to='/details'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M5 3V19H21V21H3V3H5ZM19.9393 5.93934L22.0607 8.06066L16 14.1213L13 11.121L9.06066 15.0607L6.93934 12.9393L13 6.87868L16 9.879L19.9393 5.93934Z"></path></svg><span>Details</span></Link></li>
                    <li onClick={logout}><Link class="nav-li" to='/'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="currentColor"><path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM19 17.5858L21.1213 15.4645L22.5355 16.8787L20.4142 19L22.5355 21.1213L21.1213 22.5355L19 20.4142L16.8787 22.5355L15.4645 21.1213L17.5858 19L15.4645 16.8787L16.8787 15.4645L19 17.5858Z"></path></svg><span> Logout</span></Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar