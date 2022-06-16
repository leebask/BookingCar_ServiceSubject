import React from 'react'
import  { useState } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header'
import HeaderBlock from './header/HeaderBlock'
import Menu from './header/Menu'


function Headerfull() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
      <div><>
    <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
          {isMenuOpen && <Menu />}
          <HeaderBlock />
          </>
      </div>
  )
}

export default Headerfull