import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import ButtonPrimary from './ButtonPrimary'
import ButtonSecondary from './ButtonSecondary'
import logo from '../images/logo.png'
import logoVN from '../images/vn.webp'
import logoAnh from '../images/anh.webp'
import './Signup.css'
import { auth } from '../firebase';
import { login } from '../features/userSlice';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault()
    if (!fName) {
      return (
        toast.info('Vui lòng nhập tên')
      )
    }
    if (!lName) {
      return (
      toast.info('Vui lòng nhập họ')
      )
    }

    auth.createUserWithEmailAndPassword(email, password).then(userAuth => {
      userAuth.user.updateProfile({
        displayName: lName + " " + fName
      }).then(() => {
        dispatch(login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: lName + " " + fName,
        }))
        navigate('/homeaccount')
      })

    }).catch((error) => { toast.info(error.message) })

  }

  return (
    <div className="signup">
      <div className='signup__language'>
        <div className='signup__nation'>
          <Link to='/'>
            <img className='signup__logolG' src={logoVN}></img>
            <span>Việt Nam</span>
          </Link>
          <Link to='/'>
            <img className='signup__logolG' src={logoAnh}></img>
            <span>English</span>
          </Link>
        </div>
      </div>
      <div className='signup__logo'>
        <img
          src={logo}
          alt=''
        />
      </div>
      <div className='signup__info'>
        <h1>Đăng Kí</h1>
        <form className='signup__form'>
          <label htmlFor='fName'>Tên</label>
          <input
            id='email'
            type='text'
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />
          <label htmlFor='lName'>Họ</label>
          <input
            id='email'
            type='text'
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Mật khẩu</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='btnCreat' type='submit' onClick={signUp}>
            Đăng kí
          </button>
        </form>
        <div className='signup__divider'>
          <hr /> <span style={{ margin: "-17px 0 -3px 0px" }}>Hoặc</span> <hr />
        </div>
        <Link to='/login'>
          <button className='btnLogin'>Đăng nhập</button>
        </Link>
      </div>
     
    </div>
  )
}

export default SignUp
