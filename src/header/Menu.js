import React from 'react'
import {Link} from 'react-router-dom'
import './Menu.css'
import MenuItem from './MenuItem'

function Menu() {
  return (
    <div className='menu'>
        <Link to='/contact'>
        <MenuItem title='Hỗ trợ'/>
        </Link> 
        <Link to='/nhaxe'>
        <MenuItem title='Thông tin'/>
        </Link> 
        <Link to='/'>
          <MenuItem title='Thoát'/>
        </Link> 
    </div>
  )
}

export default Menu