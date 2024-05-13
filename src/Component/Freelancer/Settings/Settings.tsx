import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Profile from "./Profile";
import Payment from "./Payment";
import FreelancerSideBar from "@/Component/Home/Freelancer/FreelancerSideBar";


function Settings() {


    const [value, setValue] = useState('1');
    const { state, freelancerId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (state) {
            setValue(state);
        }
    }, [state])


    return (
        <FreelancerSideBar>
            <h1 className="text-2xl font-bold mb-8">Profile</h1>
            <Box sx={{ width: '100%', typography: 'body1', position: "sticky", top: "0", left: "0", zIndex: "9" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(_, newValue) => {
                            setValue(newValue);
                            navigate(`/settings/${newValue}/${freelancerId}`);
                        }}
                            aria-label="lab API tabs example">
                            <Tab label="Profile" value="1" />
                            <Tab label="Payments" value="2" />
                            {/* <Tab label="Subscription" value="3" /> */}
                        </TabList>
                    </Box>
                    <TabPanel value="1"><Profile /></TabPanel>
                    <TabPanel value="2"><Payment /></TabPanel>
                    {/* <TabPanel value="3"><Pricing /></TabPanel> */}
                </TabContext>
            </Box>
        </FreelancerSideBar>
    )
}

export default Settings