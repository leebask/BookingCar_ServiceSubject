import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Redirect, Navigate } from 'react-router-dom'
import { selectUser } from './features/userSlice'
import Menu from './header/Menu'
import HomeAccount from './homeAccount/HomeAccount'



function HomeAccountFull() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useSelector(selectUser)
  console.log("user đọc được " + user?.displayName)
  return (

    <div>
      {!user ? (
        <Navigate to='/login' />
      ) :
        (
          <>
            <HomeAccount
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
            {isMenuOpen && <Menu />}
          </>
        )}
    </div>

  )
}

export default HomeAccountFull