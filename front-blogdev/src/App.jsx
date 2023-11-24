import './App.css'
import { BrowserRouter, Routes, Route, Navigate, Form } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { AuthProvider } from "./context/AuthContext";
import { useEffect, useState, useSyncExternalStore } from "react";
import { userAuthentication } from "./hooks/userAuthentication";
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
function App() {
  const[user,setUser]=useState(undefined)
  const{auth} = userAuthentication()
  useEffect(()=>{onAuthStateChanged(auth,user=>{setUser(user)})}, [auth])
const loadingUser=user===undefined
  return (
    <>
    <AuthProvider value={{user}}>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
