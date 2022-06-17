import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import logoVN from '../images/vn.webp'
import logoAnh from '../images/anh.webp'
import Car4 from '../images/4cho.png'
import Car16 from '../images/16cho.png'
import Car32 from '../images/xe32cho.png'



import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import LogoutIcon from '@material-ui/icons/ExitToApp'

import './HomeAccount.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../features/userSlice'
import { setCars, selectCars } from '../features/carsSlice'
import Cars from './Cars'
import { auth } from '../firebase'
import SelectTextFields from './SelectTextFields'
import { Pagination } from '@mui/material'
import Footer from '../footer/Footer'
//DB
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { selectCartour, setCartour } from '../features/cartourSlice'




function HomeAccount({ isMenuOpen, setIsMenuOpen, }) {

  const user = useSelector(selectUser)
  const cars = useSelector(selectCars)
  const tours = useSelector(selectCartour)


  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [DataCars, setDataCars] = useState(null);
  const [DataRoute, setDataRoute] = useState({});

  const [DataTour, setDataTour] = useState({});
  const [SelectedDataRoute, setSelectedDataRoute] = useState("");


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //get cars
  useEffect(() => {
    const getDataCars = async () => {
      try {

        const response = await fetch(
          `https://api-xe-khach.herokuapp.com/bus`);
        console.log('response', response)

        if (!response.ok) {
          console.log('not ok')
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        console.log('ok')

        let actualDataCars = await response.json();

        console.log("DataCarsa1 " + actualDataCars)
        dispatch(setCars(actualDataCars))
        setDataCars(actualDataCars);
        setError(null);
      } catch (err) {
        setError(err.message);
        setDataCars(null);
      } finally {
        setLoading(false);
      }
    }
    getDataCars()
  }, [])

  //get tour
  useEffect(() => {
    const getDataTour = async () => {
      try {

        const response = await fetch(
          `https://api-xe-khach.herokuapp.com/tour`);
        console.log('response', response)

        if (!response.ok) {
          console.log('not ok')
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        console.log('ok')

        let actualDataTour = await response.json();

        console.log("DataToura1 " + actualDataTour)
        dispatch(setCartour(actualDataTour))
        setDataTour(actualDataTour.reduce((obj, t) => ({
          ...obj,
          [t.maXe]: t
        }), {}));
        setError(null);
      } catch (err) {
        setError(err.message);
        setDataTour({});
      } finally {
        setLoading(false);
      }
    }
    getDataTour()
  }, [])


  //get lộ trình
  useEffect(() => {
    const getDataRoute = async () => {
      try {

        const response = await fetch(
          `https://api-xe-khach.herokuapp.com/route`);
        console.log('response', response)

        if (!response.ok) {
          console.log('not ok')
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        console.log('ok')

        let actualDataRoute = await response.json();

        console.log("DataRoutea1 " + actualDataRoute)
        // dispatch(setDataRoute(actualDataRoute))
        setDataRoute(actualDataRoute.reduce((obj, t) => ({
          ...obj,
          [t.ma]: t
        }), {}));
        setError(null);
      } catch (err) {
        setError(err.message);
        setDataRoute({});
      } finally {
        setLoading(false);
      }
    }
    getDataRoute()
  }, [])

  const logoutOfApp = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logout())
        navigate('/')
      })
      .catch((error) => alert(error.message))
  }

  const handleSelectRoute=e=>{
    setSelectedDataRoute(e.target.value)
  }

  return (
    <div className="homeAccount">
      {/* phonenumber */}


      <div className="homeAccount__header">
        <div className="homeAccount__logo">
          <Link to='/'>
            <img className='homeAccount__logoImg'
              src={logo}
              alt=''
            />
          </Link>
        </div>
        <div className='homeAccount__links'>
          <Link to='/homeaccount'>home</Link>
          <Link to='/nhaxe'>nhà xe</Link>
          <Link to='/cartour'>chuyến xe</Link>
          <Link to='/contact'>Liên hệ</Link>
          <Link to='/account'>Tài khoản</Link>
        </div>
        <div className='homeAccount__right'>

          <div className={isMenuOpen ? 'homeAccount_imgtrans--hidden' : ""}>
            <img className='homeAccount__logoNation'
              src={logoVN}
              alt='' />

            <img className='homeAccount__logoNation'
              src={logoAnh}
              alt='' onClick={() => console.log('a')} />
          </div>
          <div className={isMenuOpen ? 'homeAccount_imgtrans--hidden' : ""}>
            <Link to='/login' onClick={logoutOfApp}
              className='homeAccount__btnLogin'>Đăng xuất</Link>
          </div>
        </div>

        <div
          className='homeAccount__menu'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <CloseIcon className='homeAccount__closeMenu' /> : <MenuIcon />}
        </div>

      </div>
      <div className="homeAccount__info">
        <div className="homeAccount__person">
          <h4>{"Chào " + user?.displayName}</h4>
        </div>
        <div className="homeAccount__right">
          <Link to='/'> Lịch sử</Link>
          <Link to='/' className='logout'>
            thoát
            <LogoutIcon />
          </Link>
        </div>
      </div>
      <select className="cars__choose choosetour" defaultValue="" label="Chọn chuyến" onChange={handleSelectRoute}>
        <option value="" disabled>Chọn chuyến</option>
        {Object.keys(DataRoute).map(k => {
          const route=DataRoute[k];
          return (
            <option key={k} value={route.ma}>{route.noiDi} - {route.noiDen}</option>
          )
        })}


      </select>
      <div className="homeAccount__cars">
        {cars.filter(car => car.maXe in DataTour&&(!SelectedDataRoute|| DataTour[car.maXe]?.noiDi===DataRoute[SelectedDataRoute]?.noiDi&&DataTour[car.maXe]?.noiDen===DataRoute[SelectedDataRoute]?.noiDen)).map(car => (
          <Cars
            key={car.maXe}
           
           imgSrc={ car.soLuongGhe <28 ? "https://hyundaivn.com/library/module_new/hyundai-universe-40-giuong-g42-410_s1002.png" : "http://dulichviet.com.vn/images/2012/11/thue-xe-isuzu-samco-35-cho-di-long-ho-vinh-long_du-lich-viet.jpg" }
            maXe={car.maXe}
            bienSo={car.bienSo}
            loaiXe={car.loaiXe}
            soLuongGhe={car.soLuongGhe}
            gia={car.gia}
            tour={DataTour[car.maXe]}


          // typeCar={car.Name}
          // infoText={car.Desc}
          // bookCar4

          />
        ))}
        {/* <Cars
          imgSrc={Car4}
          typeCar='4 Ghế'
          infoText="Thích hợp di chuyển cặp đôi , tốc độ đưa khách rất nhanh"
          bookCar4
          
        />
        <Cars
          imgSrc={Car16}
          typeCar='16 Ghế'
          infoText="Thích hợp di chuyển gia đình với sự cơ động tiện lợi"

        />
        <Cars
          imgSrc={Car32}
          typeCar='32 Ghế'
          infoText="Thích hợp di chuyển cặp đôi , tốc độ đưa khách rất nhanh"
          
        /> */}
      </div>


      <Pagination count={10} color="primary" />





      {/* connect */}

      <Footer />


    </div>
  )
}

export default HomeAccount