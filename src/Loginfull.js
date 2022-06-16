import React from 'react'
import {BrowserRouter as  Redirect, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import Login from './login/Login'

function Loginfull() {
    const user = useSelector(selectUser)
    console.log("user đọc được "+user?.displayName)
  return (
    <div>
        {user !== null ? <Navigate to='/homeaccount'/> : <Login/> }
    </div>
  )
}

export default Loginfull