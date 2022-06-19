import React, { useEffect } from 'react'
import ButtonPrimary from '../login/ButtonPrimary'
import ButtonSecondary from '../login/ButtonSecondary'
import './Cars.css'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { MobiledataOffOutlined } from '@mui/icons-material';
import { Modal } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
//radio
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { TextareaAutosize } from '@mui/material'
//form

import TextField from '@mui/material/TextField';
import { selectUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setticket } from '../features/ticketSlice';

const clsx = (...classNames)=> classNames.filter(c => !!c).join(' ')

const steps = ['Chọn chỗ', 'Điểm đón', 'Điền thông tin'];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '800px',
  minHeight: '300px',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

function Cars({ imgSrc, maXe, bienSo, loaiXe, soLuongGhe, gia, tour ,DataTicket}) {

  const user = useSelector(selectUser)

  const [open, setOpen] = React.useState(false);
  const [layMaGhe, setlayMaGhe] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setlayMaGhe([]);
    setOpen(false);
  }

  //modal custom
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    
    return completedSteps() === totalSteps();
  };
  // const allStepsCompletedHandleticket = () => {
  //  return completedSteps() === totalSteps() ? toast.success("đặt thành công"): ""
  // }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});

  };

  //ghế

  const addMaGhe = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const a = DataTicket.filter((ticket)=> ticket.maCX == tour.maCX)
    console.log(a.map(t=>t.maGhe))
    // console.log(a.filter(magheticket =>magheticket == e.target.id ).length >0 )
    if(a.filter((ticket)=>ticket.maGhe.split(',').map(g=>g.trim()).includes(e.target.id)).length<=0) {
      setlayMaGhe([
        ...layMaGhe, e.target.id
      ])
    }
    else {
  
      toast.warn("Ghế đã được đặt! Mời chọn ghế khác.")
    }
    console.log([
      ...layMaGhe, e.target.id
    ])
  }
  // useEffect(() => {
  //   addMaGhe()
  // },[])


  const getSoLuongGheRender = soLuongGhe => {
    let content = [];
    let j = 1;
    for (let i = 0; i < soLuongGhe; i = i + 3) {
      // const item = animals[i];

      content.push(<li className="row row--1">
        <ol className="seats" type="A">
          <li className="seat">
            <input className={clsx(DataTicket.some(t=>t.maCX == tour.maCX&&t.maGhe.split(',').map(g=>g.trim()).includes(`${j}A`))&&'unavailable')} type="checkbox" id={`${j}A`} onClick={addMaGhe} />
            <label for={`${j}A`}>{j}A</label>
          </li>
          <li className="seat">
            <input className={clsx(DataTicket.some(t=>t.maCX == tour.maCX&&t.maGhe.split(',').map(g=>g.trim()).includes(`${j}B`))&&'unavailable')} type="checkbox" id={`${j}B`} onClick={addMaGhe} />
            <label for={`${j}B`}>{j}B</label>
          </li>
          <li className="seat">
            <input className={clsx(DataTicket.some(t=>t.maCX == tour.maCX&&t.maGhe.split(',').map(g=>g.trim()).includes(`${j}C`))&&'unavailable')} type="checkbox" id={`${j}C`} onClick={addMaGhe} />
            <label for={`${j}C`}>{j}C</label>
          </li>
        </ol>
      </li>)
      j++
    }
    return content;
  };
  //date 
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  // post ticket 

  const [postId, setPostId] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState(null);
  const [ghiChu, setGhiChu] = React.useState();
  const [chonDiaDiem, setChonDiaDiem] = React.useState();




  const PostTicket =() => {
   
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        
        maCX: tour.maCX,
        tenKH: user.displayName,
        email: user.email,
        sdt: phoneNumber,
        ngayDat: date,
        maGhe: layMaGhe.join(','),
        trangThai: 1,
        ghiChu: "Đón tại"+" "+chonDiaDiem +", " + " Ghi chú"+" "+ ghiChu
      })
    };
    fetch('https://api-xe-khach.herokuapp.com/ticket',requestOptions)
      .then(response => response.json())
      .then(data => { 
        setlayMaGhe([]) 
        setPhoneNumber(null)
        toast.success("Đặt thành công!")
        setActiveStep(0);
        setCompleted({});
        setGhiChu()
        setChonDiaDiem()
      });
    

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }

  
  return (
    <div className="cars">
     
      <div>
        <Modal
          style={{ overflow: "scroll" }}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Đặt vé
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box sx={{ width: '100%' }}>
                <Stepper nonLinear activeStep={activeStep}>
                  {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                      <StepButton color="inherit" onClick={handleStep(index)}>
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  {allStepsCompleted() ? (
                    <React.Fragment>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        Xác nhận đặt vé!
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                        <Button  onClick={PostTicket}>Đặt vé</Button>

                      </Box>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {/* <Typography sx={{ mt: 2, mb: 1 }}>Bước {activeStep + 1}:</Typography> */}

                      {(activeStep + 1) == 1 ?
                        <div className="step1">
                          <div className="step1_desc">
                            <Typography sx={{ mt: 2, mb: 1 }}>Tuyến:</Typography>
                            <Timeline>
                              <TimelineItem>
                                <TimelineSeparator>
                                  <TimelineDot variant="outlined" color="primary" />
                                  <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>{tour?.noiDi}</TimelineContent>
                              </TimelineItem>

                              <TimelineItem>
                                <TimelineSeparator>
                                  <TimelineDot variant="outlined" color="secondary" />
                                </TimelineSeparator>
                                <TimelineContent>{tour?.noiDen}</TimelineContent>
                              </TimelineItem>
                            </Timeline>
                            <div>Tổng giá:{tour.gia*layMaGhe.length} VNĐ</div>
                          </div>
                          <div className="step1_desc">
                            <div>
                              <div className="plane">

                                <div className="exit exit--front fuselage">

                                </div>
                                <ol className="cabin fuselage">
                                  {/* test từ đây */}
                                  {getSoLuongGheRender(soLuongGhe)}

                                  {/* test trên */}
                                  {/* <li className="row row--1">
                                    <ol className="seats" type="A">
                                      <li className="seat">
                                        <input type="checkbox" id="1A" />
                                        <label for="1A">1A</label>
                                      </li>
                                      <li className="seat">
                                        <input type="checkbox" id="1B" />
                                        <label for="1B">1B</label>
                                      </li>
                                      <li className="seat">
                                        <input type="checkbox" id="1C" />
                                        <label for="1C">1C</label>
                                      </li>
                                    </ol>
                                  </li>
                                  <li className="row row--2">
                                    <ol className="seats" type="A">
                                      <li className="seat">
                                        <input type="checkbox" id="2A" />
                                        <label for="2A">2A</label>
                                      </li>
                                      <li className="seat">
                                        <input type="checkbox" id="2B" />
                                        <label for="2B">2B</label>
                                      </li>
                                      <li className="seat">
                                        <input type="checkbox" id="2C" />
                                        <label for="2C">2C</label>
                                      </li>

                                    </ol>
                                  </li>
                                  <li className="row row--3">
                                    <ol className="seats" type="A">
                                      <li className="seat">
                                        <input type="checkbox" id="3A" />
                                        <label for="3A">3A</label>
                                      </li>
                                      <li className="seat">
                                        <input type="checkbox" id="3B" />
                                        <label for="3B">3B</label>
                                      </li>
                                      <li className="seat">
                                        <input type="checkbox" id="3C" />
                                        <label for="3C">3C</label>
                                      </li>

                                    </ol>
                                  </li> */}
                                </ol>
                                <div className="exit exit--back fuselage">

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        : ""}
                      {(activeStep + 1) == 2 ?
                        <>
                          <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Đón tại :</FormLabel>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue="female"
                              name="radio-buttons-group"
                            >
                              {
                                tour.noiDi == "SaiGon" ? (
                                  <FormControlLabel onClick={(e)=>setChonDiaDiem(e.target.value)} value="Bến Xe Miền Đông" control={<Radio />} label={
                                    <><div style={{ fontSize: 'large' }}>Bến Xe Miền Đông</div>
                                      <span style={{ fontSize: 'small', opacity: 0.8 }}>
                                        <LocationOnIcon />
                                        số 292 đường Đinh Bộ Lĩnh, Phường 26, Quận Bình Thạnh, thành phố Hồ Chí Minh
                                      </span>
                                    </>
                                  } />
                                ) : (<FormControlLabel onClick={(e)=>setChonDiaDiem(e.target.value)} value="Bến Xe Đắk Lắk" control={<Radio />} label={
                                  <><div style={{ fontSize: 'large' }}>Bến Xe Đắk Lắk</div>
                                    <span style={{ fontSize: 'small', opacity: 0.8 }}>
                                      <LocationOnIcon />
                                      Km 4, Đường Nguyễn Chí Thanh, Phường Tân An, Buôn Ma Thuột, Đắk Lắk
                                    </span>
                                  </>
                                } />)
                              }

                              <FormControlLabel onClick={(e)=>setChonDiaDiem(e.target.value)} value="Nhà xe liên hệ để đón" control={<Radio />} label={
                                <><div style={{ fontSize: 'large' }}>Nhà xe liên hệ để đón</div>
                                  <span style={{ fontSize: 'small', opacity: 0.8 }}>
                                    <LocationOnIcon />
                                    Địa điểm người đặt trao đổi
                                  </span>
                                </>
                              } />
                            </RadioGroup>
                          </FormControl>
                        </>
                        : ""}

                      {(activeStep + 1) == 3 ?
                        <>
                          <Box
                            component="form"
                            sx={{
                              '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <div>
                              <TextField
                                // error
                                id="outlined-error"
                                label="Họ tên"
                                defaultValue={user.displayName}
                              />
                              <TextField
                                // error
                                id="outlined-error-helper-text"
                                label="Email"
                                defaultValue={user.email}
                              // helperText="Incorrect entry."
                              />

                            </div>
                            <div>
                              <TextField
                                // error
                                id="outlined-error"
                                label="Số điện thoại"
                                defaultValue=""
                                onChange={e=>setPhoneNumber(e.target.value)}
                              />
                              <TextField
                                // error
                                id="outlined-error-helper-text"
                                label="Date"
                                disabled
                                defaultValue={date}
                              // helperText="Incorrect entry."
                              />
                              <br />
                              <TextareaAutosize
                                // error
                                className="textArenaa"
                                aria-label="minimum height"
                                minRows={3}
                                id="outlined-error-helper-text"
                                label="Ghi chú"
                                placeholder="Ghi chú..."
                                defaultValue=""
                                style={{ width: 500 }}
                                onChange={(e)=>{setGhiChu(e.target.value)}}
                              // helperText="Incorrect entry."
                              />

                            </div>
                          </Box>
                        </>

                        : ""
                      }
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                          Next
                        </Button> */}
                        {activeStep !== steps.length &&
                          (completed[activeStep] ? (<Button onClick={handleComplete}>
                            {completedSteps() === totalSteps() - 1
                              ? 'Finish'
                              : 'Next'}
                          </Button>
                            // <Typography variant="caption" sx={{ display: 'inline-block' }}>
                            //   Bước {activeStep + 1} đã hoàn thành!
                            // </Typography>
                          ) : (
                            <Button onClick={handleComplete}>
                              {completedSteps() === totalSteps() - 1
                                ? 'Finish'
                                : 'Next'}
                            </Button>
                          ))}
                      </Box>
                    </React.Fragment>
                  )}
                </div>
              </Box>
            </Typography>
          </Box>
        </Modal>
      </div>
      <div className="cars__image">
        <img src={imgSrc} alt={loaiXe} />
      </div>
      <div className="cars__storage">
        <div className="cars__typeCar">
          <h2>{loaiXe}</h2>
        </div>
        <div className="cars__actions">
          <ButtonPrimary onClick={handleOpen} name='Đặt vé' />
          {/* <button className="cars__choose">Chọn tuyến</button> */}
          <div className="cars__choose" >
            {/* Sài Gòn-Đắk Lắk */}
            {tour?.noiDi} - {tour?.noiDen}
            {/* <option value="saab">Đắk Lắk-Sài Gòn</option> */}
          </div>

        </div>
        <p className='cars__info'>
          <span>{bienSo}</span> <br />
          <span>{soLuongGhe}Ghế</span> <br />

          <span>{gia}VNĐ</span> <br />
          <span>Ngày đi : {tour?.ngayDi}</span>

        </p>
      </div>
      
    </div>
  )
}

export default Cars