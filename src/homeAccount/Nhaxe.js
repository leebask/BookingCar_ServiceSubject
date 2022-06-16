import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Headerfull from '../Headerfull';
import HeaderHomeAccount from './HeaderHomeAccount';
import './Nhaxe.css'
import Menu from '../header/Menu';

import Mapbox from '../mapbox/mapbox';
import Footer from '../footer/Footer';
import hinhlogo from '../images/DVKTLogo.png'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Nhaxe({ isMenuOpen, setIsMenuOpen }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Vị trí" {...a11yProps(0)} />
                        <Tab label="Thông tin" {...a11yProps(1)} />
                        <Tab label="Thành lập" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                {/* <TabPanel value={value} index={0}>
                    <Mapbox /> 
                </TabPanel> */}
                <div className="showTab">
                {value===0&&<Mapbox />}
                </div>
                <TabPanel value={value} index={1}>
                    <h1>
                        DVKT
                    </h1>
                    <h3>
                        "Chất lượng là danh dự"
                    </h3>
                    <img
                    src={hinhlogo}
                    alt=''
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <h1>
                        DVKT
                    </h1>
                    <h5>Được thành lập tháng 5/2022.</h5>
                </TabPanel>
            </Box>
            <Footer />
        </>
    );
}
