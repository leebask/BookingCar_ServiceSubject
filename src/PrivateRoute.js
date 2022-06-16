import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate,Redirect, Route} from 'react-router-dom'
import { selectUser } from './features/userSlice'

function PrivateRoute(props) {
    const user = useSelector(selectUser)
    if(!user) return <Route path={props.path} element={<Navigate to='/login'/>} />
    return (
        <Route {...props} />
    )
}

export default PrivateRoute