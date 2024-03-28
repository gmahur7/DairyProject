import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'

const Home = () => {
    const navigate=useNavigate()
    return (
        <>
            <HomeNav />
            <div id="home">
                <div id="home-background">
                </div>
                <div id="home-content">
                    <div id="dairy-comp">
                        <div class="section-bg" style={{ backgroundImage: `url('https://source.unsplash.com/800x600/?dairy')` }}></div>
                        <div class="section-content">
                            <h2>Dairy Products</h2>
                            <p>Experience the freshness and quality of our dairy products, sourced from local farms and processed with care to bring you the best flavors.</p>
                            <button onClick={()=>navigate('/milkentry')}>Explore Dairy</button>
                        </div>
                    </div>
                    <div id="sell-purchase">
                        <div class="section-bg" style={{ backgroundImage: `url('https://source.unsplash.com/800x600/?farming')` }}></div>
                        <div class="section-content">
                            <h2>Sell & Purchase</h2>
                            <p>We offer a seamless platform for farmers to sell their produce and buyers to purchase high-quality goods directly from the source.</p>
                            <button>Sell or Purchase</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const HomeNav = () => {
    return (
        <div>
            <div id="homenav-heading"><h2>Asha Dairy</h2></div>
            <div id="homenav-list">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/contactus'>Contact Us</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Home