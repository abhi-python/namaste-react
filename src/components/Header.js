import React, { useContext, useState } from 'react'
import { LOGO_URL } from '../utils/constants'
import { Link } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'
import userContext from '../utils/userContext'
import { useSelector } from 'react-redux'

const Header = () => {
  const [btnName, setBtnName] = useState("Login")
  const onlineStatus = useOnlineStatus();
  const {loggedInUser} = useContext(userContext);

  const cartItems = useSelector((store) => store.cart.items);

  console.log("abhi..", cartItems);

  return (
    <div className='flex justify-between bg-pink-100 shadow-lg'>
        <div className='logo-container'>
            <img className='w-56' src={LOGO_URL} alt='logo' />
        </div>
        <div className='flex items-center'>
            <ul className='flex p-4 m-4'>
                <li className='px-4'>
                  OnlineStatus: {onlineStatus ? "✅" : "🔴"}
                </li>
                <li className='px-4'>
                  <Link to="/">Home</Link>
                </li>
                <li className='px-4'>
                  <Link to="/about">About</Link>
                </li>
                <li className='px-4'>
                  <Link to="/contact">Contact</Link>
                </li>
                <li className='px-4'>
                  <Link to="/grocery">Grocery</Link>
                </li>
                <li className='px-4 font-bold'>
                  <Link to="/cart">Cart - ({cartItems.length} items)</Link>
                </li>
                <li className='px-4'><button className='login' onClick={() => {btnName === "Login" ? setBtnName("Logout") : setBtnName("Login")} }>{btnName}</button></li>
                <li className='px-4 font-bold'>{loggedInUser}</li>
            </ul>
        </div>
    </div>
  )
}

export default Header