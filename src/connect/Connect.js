import React from 'react'
import { Link } from 'react-router-dom'
import './Connect.css'

function Connect() {
  return (
    <div>
        {/*End of Tawk.to Script*/}
        <div className="fab-wrapper">
          <input id="fabCheckbox" type="checkbox" className="fab-checkbox" />
          <label className="fab" htmlFor="fabCheckbox">
            <i className="icon-cps-fab-menu" />
            {/* <i class="icon-cps-close"></i> */}
          </label>
          <div className="fab-wheel">
            <Link to="/nhaxe" className="fab-action fab-action-1" rel="nofollow">
              <span className="fab-title">Tìm nhà xe</span>
              <div className="fab-button fab-button-1"><i className="icon-cps-local" /></div>
            </Link>
            <a className="fab-action fab-action-2" href="tel:0336103086" rel="nofollow">
              <span className="fab-title">Gọi trực tiếp</span>
              <div className="fab-button fab-button-2"><i className="icon-cps-phone" /></div>
            </a>
            {/* <a className="fab-action fab-action-3"  rel="nofollow" onClick={()=>alert("Chức năng chưa đi vào hoạt động")}>
              <span className="fab-title" >Chat ngay</span>
              <div className="fab-button fab-button-3"><i className="icon-cps-chat" /></div>
            </a> */}
            <a className="fab-action fab-action-4" href="https://zalo.me/0336103086" target="_blank" rel="nofollow">
              <span className="fab-title">Chat trên Zalo</span>
              <div className="fab-button fab-button-4"><i className="icon-cps-chat-zalo" /></div>
            </a>
          </div>
          <div className="suggestions-chat-box hidden" style={{display: 'none'}}>
            <div className="box-content d-flex justify-content-around align-items-center">
              <i className="fa fa-times-circle" aria-hidden="true" id="btnClose" onclick="jQuery('.suggestions-chat-box').hide()" />
              <p className="mb-0 font-14">Liên hệ ngay <i className="fa fa-hand-o-right" aria-hidden="true" /></p>
            </div>
          </div>
          <div className="devvn_bg" />
        </div>
        
      </div>
  )
}

export default Connect