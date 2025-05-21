import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    // link out to ESPN's College Football page
    const url = 'https://www.espn.com/college-football/teams';
    const handleClick = () => {
        window.open(url, '_blank');
    };

  return (
    <div className='navbar'>
       <Link to={'/'}>
         <img src={logo} alt="" className='logo' />
        </Link>
        <ul>
            <Link to={'/'}> <li>Home</li></Link>
            <li>Documentation</li>
            <Link to={'/about'}> <li>About</li></Link>
        </ul>
        <div className="nav-right">
            <button onClick={handleClick}>Real Stats<img src={arrow_icon} alt="" /></button>
        </div>
    </div>
  )
}

export default Navbar
