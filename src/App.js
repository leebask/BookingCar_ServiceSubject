import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom'
import Headerfull from './Headerfull';
import SignUp from './login/Signup';
import Loginfull from './Loginfull';
import HomeAccountFull from './HomeAccountFull';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/userSlice';
import { auth } from './firebase';
import PrivateRoute from './PrivateRoute';
import Nhaxe from './homeAccount/Nhaxe';
import ConTact from './homeAccount/ConTact';
import Account from './homeAccount/Account';
import CarTour from './homeAccount/carTour/CarTour';
import Footer from './footer/Footer';
import { ToastContainer } from 'react-toastify';







function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User is signed in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        )
      } else {
        // User is signed out
        dispatch(logout())
      }
    })
  }, [dispatch])

  return (
    <Router>
      <></>
      <div className='app'>
        <Routes>
          <Route path="/" element={<Headerfull />} />
          <Route path="/login" element={<Loginfull />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <PrivateRoute path="/homeaccount" element={<HomeAccountFull/>} /> */}
          {PrivateRoute({
            path: "/homeaccount",
            element: <HomeAccountFull />
          })}

          <Route path="/nhaxe" element={
            <Nhaxe isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen} />} />

          <Route path="/contact" element={
            <ConTact isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen} />} />

          {/* <Route path="/account" element={
            <Account  isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen} />} /> */}
          {PrivateRoute({
            path: "/account",
            element: <Account isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen} />
          })}

          <Route path="/cartour" element={
            <CarTour />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
