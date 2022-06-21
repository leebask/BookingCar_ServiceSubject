import React, { useEffect, useRef, useState } from 'react'
import Menu from '../../header/Menu'
import HeaderHomeAccount from '../HeaderHomeAccount'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Modal } from '@mui/material';
import './CarTour.css'
import Mapbox from '../../mapbox/mapbox';
import Footer from '../../footer/Footer';
import MapboxDirection from '../../mapbox/mapboxdirection';







function CarTour() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const a = useRef()

    const [open, setOpen] = React.useState(false);
    const [namePlace, setNamePlace] = useState("")
    const handleOpen = (e) => {
        e.preventDefault()
        setOpen(true)
        setNamePlace(a.current.outerText)
    }
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWith: 600,
        minHeight: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    //test api
    //Get
    // const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // useEffect(() => {
    //     const getData = async () => {
    //       try {
            
    //         const response = await fetch(
    //           `https://api-xe-khach.herokuapp.com/bus`);
    //         console.log('response',response)
            
    //         // if (!response.ok) {
    //         //     console.log('not ok')
    //         //   throw new Error(
    //         //     `This is an HTTP error: The status is ${response.status}`
    //         //   );
    //         // }
    //         console.log('ok')
            
    //         let actualData = await response.json();
            
    //         console.log("dataa1 "+actualData)
    //         setData(actualData);
    //         setError(null);
    //       } catch(err) {
    //         setError(err.message);
    //         setData(null);
    //       } finally {
    //         setLoading(false);
    //       }  
    //     }
    //     getData()
    //   }, [])

    //post
    // const [postId, setPostId] = useState(null);

    // useEffect(() => {
    //     // POST request using fetch inside useEffect React hook
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    //     };
    //     fetch('https://api-xe-khach.herokuapp.com/bus',{ 
    //         mode: 'no-cors' // 'cors' by default
    //     }, requestOptions)
    //         .then(response => response.json())
    //         .then(data => {setPostId(data.id)});

    // // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, []);

    
    // {console.log("dataa1 "+data)}
    return (
        <div>
             
             {/* {console.log("test post "+postId)} */}
            <>
                <HeaderHomeAccount
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />
                {isMenuOpen && <Menu />}
            </>
            <div className="Card">
                <Card sx={{ maxWidth: 345 }} onClick={handleOpen} ref={a}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://cdn.baogiaothong.vn/files/dung.pham/2016/11/24/81-1604.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" >
                                Sài gòn - Đắk Lắk
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Từ 100.000 VND
                            </Typography>
                           
                        </CardContent>
                        
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 345 }} onClick={handleOpen}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://vinhomecentralpark.com/wp-content/uploads/2021/06/Phoi-canh-Landmark-81-Vinhomes-Central-Park.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Đắk Lắk - Sài gòn
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Từ 100.000 VND
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {namePlace}
                        </Typography>
                        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
                            <MapboxDirection />
                        {/* </Typography> */}
                    </Box>
                </Modal>
            </div>
            <Footer />
            {/* <ul>
        {data &&
          data.map(({ id, title ,body }) => (
            <li key={id}>
              <h3>{title}</h3>
              <h3>{body}</h3>
            </li>
          ))}
      </ul> */}
        </div>
    )
}

export default CarTour