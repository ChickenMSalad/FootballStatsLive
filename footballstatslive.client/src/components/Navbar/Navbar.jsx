import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <div className='navbar'>
       <Link to={'/'}>
         <img src={logo} alt="" className='logo' />
        </Link>
        <ul>
        <Link to={'/'}> <li>Home</li></Link>
            <li>Documentation</li>
            <li>About</li>
        </ul>
        <div className="nav-right">
            <button>Real Stats<img src={arrow_icon} alt="" /></button>
        </div>
    </div>
  )
}

export default Navbar
