import React, { useRef } from 'react'
import  './Header.css'
import {Link} from 'react-router-dom'
import logo from '../images/logo.png'
import logoVN from '../images/vn.webp'
import logoAnh from '../images/anh.webp'

import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'

import "../translate/Translate"
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'

const clsx = (...classnames) => classnames.filter(c => !!c).map(c => c.trim()).join(' ').trim()

//header của trang home nonaccount
function Header({isMenuOpen,setIsMenuOpen}) {

    const { t } = useTranslation();
    const a = useRef()
    const b = useRef()

  return (
    <div className="header">
        <div className="header__logo">
            <Link to='/'>
                <img className='header__logoImg' 
                     src={logo}
                     alt=''
                />
            </Link>
        </div>
        <div className='header__links'>
            <Link to='/'>home</Link>
            <Link to='/'>{t('nhaxe')}</Link>
            <Link to='/'>{t('cartour')}</Link>
            <Link to='/contact'>{t('contact')}</Link>
            <Link to='/'></Link>
        </div>
        <div className='header__right'>
            
            <div className={clsx(isMenuOpen&&'header_imgtrans--hidden')}> 
                <img className='header__logoNation' 
                     src={logoVN}
                     alt='Vi'
                     value={3}
                     onClick={() => {i18n.changeLanguage(a.current.alt) }} ref={a}/>
                    
                     
            
                <img className='header__logoNation' 
                     src={logoAnh}
                     alt='En'
                     onClick={() => { i18n.changeLanguage(b.current.alt) }} ref={b}/>
            </div>
            <div className={clsx(isMenuOpen&&'header_imgtrans--hidden')}>
            <Link to='/login' 
            className='header__btnLogin'>{t('login')} </Link>
            </div>
           
        </div>
        <div 
            className='header__menu' 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
    </div>
  )
}

export default Header