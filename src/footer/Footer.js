import React from 'react'
import './Footer.css'
import Connect from '../connect/Connect'
function Footer() {
  return (
    <div>
        <div className="footer">
        <div className="text-contact-line icon-social">
          <a href="https://www.facebook.com/Leebask.KP" className><i className="ti-facebook " /></a>
          <a href="https://www.instagram.com/leebask.kp/" className><i className="ti-instagram " /></a>
          <a href="https://github.com/leebask" className><i className="ti-github " /></a>
        </div>
        <p className="copyright">Powered by<a className href="https://www.facebook.com/Leebask.KP/">Lê Khánh</a></p>
      </div>
      <Connect/> 
    </div>
  )
}

export default Footer