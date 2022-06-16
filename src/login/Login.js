import React, { Suspense, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import logoVN from '../images/vn.webp'
import logoAnh from '../images/anh.webp'
import './Login.css'
import ButtonPrimary from './ButtonPrimary'
import ButtonSecondary from './ButtonSecondary'
import { auth } from '../firebase'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import { signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth'

import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

import "../translate/Translate"

//login vs fb

// const translationEn = {
//   login: "Login",
//   password: "Password",
//   signup: "Signup",
//   or: "Or",
//   loginfb: "Login with Facebook",
//   logingg: "Login with Google",

// }
// const translationVi = {
//   login: "Đăng nhập",
//   password: "Mật khẩu",
//   signup: "Đăng kí",
//   or: "Hoặc",
//   loginfb: "Tiếp tục với Facebook",
//   logingg: "Tiếp tục với Google",

// }

// i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       En: { translation: translationEn },
//       Vi: { translation: translationVi }
//     },
//     lng: "Vi",
//     fallbackLng: "Vi",
//     interpolation: { escapeValue: false },
//   }
//   )

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { t } = useTranslation();
  const a = useRef()
  const b = useRef()


  const signIn = (e) => {
    e.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        )
        navigate('/homeaccount')
      })
      .catch((error) => alert(error.message))
  }
// coi lại phần dispatch
  const signInWithFacebook = () => {
    const providerFB = new FacebookAuthProvider();
    signInWithPopup(auth,providerFB)
    .then((re)=>{
      dispatch(
        login({
          email: re.user.email,
          uid: re.user.uid,
          displayName: re.user.displayName,
        })
      )
      navigate('/homeaccount')
    })
    .catch((err)=>console.log(err.message))
  }

  const signInWithGoogle = () => {
    const providerGG = new GoogleAuthProvider();
    signInWithPopup(auth,providerGG)
    .then((re)=>{
      dispatch(
        login({
          email: re.user.email,
          uid: re.user.uid,
          displayName: re.user.displayName,
        })
      )
      navigate('/homeaccount')
    })
    .catch((err)=>console.log(err.message))
  }


  return (

    <Suspense fallbackLng='Loading...'>
      <div className='login'>
        <div className='login__language'>
          <div className='login__nation'>
            <div onClick={() => { i18n.changeLanguage(a.current.textContent) }} ref={a}>
              <img className='login__logolG' src={logoVN}></img>
              <span>Vi</span>
            </div>
            <div onClick={() => { i18n.changeLanguage(b.current.textContent) }} ref={b} >

              <img className='login__logolG' src={logoAnh}></img>
              <span>En</span>
            </div>

          </div>
        </div>
        <Link to='/' className='login__logo'>
          <img
            src={logo}
            alt=''
          />
        </Link>
        <div className='login__info'>
          <h1>{t('login')}</h1>
          <form className='login__form'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='password'>{t('password')}</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonPrimary name={t('login')} type='submit' onClick={signIn} />
          </form>
          <div className='login__divider'>
            <hr /> <span style={{ margin: "-17px 0 -3px 0px" }}>{t('or')}</span> <hr />
          </div>
          <Link to='/signup'>
            <ButtonSecondary name={t('signup')} />
          </Link>
          <Link to='' className="fb btn" onClick={signInWithFacebook}>
            <div>{t('loginfb')}<FacebookIcon /></div>
          </Link>
          <Link to='' className="gg btn" onClick={signInWithGoogle}>
            <div>{t('logingg')}<GoogleIcon /></div>
          </Link>
        </div>
      </div>
    </Suspense>
  )
}

export default Login