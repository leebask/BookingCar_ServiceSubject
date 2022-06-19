import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { login, selectUser } from '../features/userSlice'
import Menu from '../header/Menu'
import HeaderHomeAccount from './HeaderHomeAccount'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { auth } from '../firebase'
import { Navigate } from 'react-router-dom'
import { Button } from '@mui/material'
import './Account.css'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Footer from '../footer/Footer';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// import { injectStyle } from "react-toastify/dist/inject-style";




function Account({ isMenuOpen, setIsMenuOpen }) {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const [fields, setFields] = React.useState({
    email: user?.email,
    name: user?.displayName,
    password: user?.password
  });

  const handleChange = field => (event) => setFields({
    ...fields,
    [field]: event.target.value
  })
  const loginAndUpdate = async (e) => {
    e.preventDefault()
    try {
      if(fields.password)await auth.currentUser.updatePassword(fields.password)
      
      await auth.currentUser.updateProfile({
        displayName: fields.name,

      })
      dispatch(login({
        ...user,
        email: fields.email,
        displayName: fields.name,
      }))
      // alert("Cập nhật thành công")
      toast.success("Cập nhật thành công!");
      
    }
    catch (e) {
      console.error(e)
      toast.warn("Cập nhật thất bại. Nhập mật khẩu trên 6 chữ số! ")
      // +e.message
    }

  }

  
  
  // const [disableType,setdisableType] = React.useState(typeof fields.password === "undefined")
 
  const a = undefined
const test = ()=>{
  console.log(a)
  

  
  return a 
}

  
    
  

  return (
    <>
      <>
        <HeaderHomeAccount
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        {isMenuOpen && <Menu />}
      </>
      <Stack direction="row" spacing={2}>
        <Avatar sx={{ bgcolor: deepOrange[500], width: 100, height: 100 }}>{fields?.name || ""}</Avatar>
      </Stack>
      <div className="account">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-name"
            label="Tên"
            value={fields.name}
            onChange={handleChange('name')}
          />
          <TextField
            disabled
            id="outlined-uncontrolled"
            label="Email"
            value={fields.email || ""}
            onChange={handleChange('email')}
            autoComplete="off"
          />
         
         <TextField
          //  disabled={!fields.password}
            id="outlined-uncontrolled"
            label="Password"
            type="password"
            // value={fields.password || ""}
            onChange={handleChange('password')}
            autoComplete="off"
          />
          <Button variant="contained" onClick={loginAndUpdate}>Cập nhật</Button>
          {/* loginAndUpdate */}
        </Box>
        <Footer />
        
      </div>
    </>
  )
}

export default Account