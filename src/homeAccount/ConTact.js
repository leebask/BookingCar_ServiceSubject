import React, { useRef } from 'react'
import Menu from '../header/Menu'
import HeaderHomeAccount from './HeaderHomeAccount'
import './ConTact.css'
import { TextareaAutosize } from '@mui/material'

import emailjs from '@emailjs/browser'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import Footer from '../footer/Footer'

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function ConTact({ isMenuOpen, setIsMenuOpen }) {

    const user = useSelector(selectUser)

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_mw4ev0r', 'template_t6cc65d', form.current, 'kwEpKn3vb4yA1pDW5')
            .then((result) => {
                console.log(result.text);
                toast.success("Gửi thành công!");
            }, (error) => {
                console.log(error.text);
                toast.error("Gửi thất bại!");
            });
        e.target.reset();
    };

    return (
        <>
            <>
                <HeaderHomeAccount
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />
                {isMenuOpen && <Menu />}
            </>
            <div id="contact" className="content-section">
                <h2 className="section-heading">LIÊN HỆ</h2>
                <p className="section-sub-heading">Viết mail cho chúng tôi!</p>
                <div className="text-input-contact row">
                    <div className="col col-half col-full-mobile">
                        <p className="text-contact-line"><i className="ti-location-pin icon-contact" />Quận 9, TP.HCM / TP. Buôn Mê Thuột </p>
                        <p className="text-contact-line"><i className="ti-mobile icon-contact" />Phone:   <a href="tel:0336103086">0336103086</a> </p>
                        <p className="text-contact-line"><i className="ti-email icon-contact" />Mail: <a href="mailto:Khanhkissyou123@gmail.com">Khanhkissyou123@gmail.com</a> </p>
                    </div>
                    <div className="col col-half col-full-mobile">
                        <form action className="mt16-mobile fix-tablet-contact" ref={form} onSubmit={sendEmail}>
                            <div className="row">
                                <div className="col col-half col-full-mobile">
                                    <input className="input-contact" required type="text" name="name"  defaultValue={user?.displayName} id placeholder="Enter Name" />
                                </div>
                                <div className="col col-half col-full-mobile">
                                    <input className="input-contact" required type="email" name="email" defaultValue={user?.email}  id placeholder="Enter Email..." />
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col col-full">
                                    <TextareaAutosize
                                        className="textArena"
                                        aria-label="minimum height"
                                        minRows={3}
                                        name="message"
                                        placeholder="Message..."
                                        style={{ width: 500}}
                                    />
                                    <Stack spacing={1}>
                                        {/* update temlpate send mail {{half-rating}} */}
                                        <Rating name="rating" defaultValue={2.5} precision={0.5} />
                                    </Stack>

                                </div>
                            </div>
                            <input type="submit" defaultValue="SEND" className="button-contact js-button-contact" />
                        </form>
                    </div>
                </div>
                <Footer />
                
            </div>
        </>
    )
}

export default ConTact