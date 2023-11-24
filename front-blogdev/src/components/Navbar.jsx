import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import {  userAuthentication } from "../hooks/userAuthentication";

const Navbar = () => {
  const{auth,logout}=userAuthentication()
  const[user,setUser]=useState(null)
  const navigate=useNavigate()
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((user)=>{
      console.log('User state changed:', user), setUser(user)
    })
    return()=>unsubscribe()
  },[auth])
  const handleLogout=async()=>{await logout()
    navigate('/')}
    return (
      <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
          Blog <span>Dev</span>
        </NavLink>
        <ul className={styles.links_list}>

          {user ? (
            <>
              <li>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
                      <li>
            <NavLink to='/' className={({ isActive }) => (isActive ? styles.active : null)}>
              Home
            </NavLink>
          </li>
              <li>
                <NavLink to='/login' className={({ isActive }) => (isActive ? styles.active : null)}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to='/register' className={({ isActive }) => (isActive ? styles.active : null)}>
                  Register
                </NavLink>
              </li>
              <li>
            <NavLink to='/about' className={({ isActive }) => (isActive ? styles.active : null)}>
              About
            </NavLink>
          </li>
            </>
          )}
        </ul>
      </nav>
    );
  };

export default Navbar