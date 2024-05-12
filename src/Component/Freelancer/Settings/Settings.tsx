import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ogLogo from '@/assets/ogLogo.png';
import toggle from "@/assets/freelancer/image.png";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Profile from "./Profile";
import Payment from "./Payment";
import Pricing from "./Pricing";


function Settings() {

    const Menus = [
        {
            title: "Home",
            src: (
                <svg
                    stroke="currentColor"
                    fill="black"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    height="1.5em"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
                </svg>
            ),
            to: "/home",
        },
        {
            title: "All Jobs",
            src: (
                <svg
                    stroke="currentColor"
                    fill="black"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    height="1.5em"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M280 752h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8zm192-280h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v184c0 4.4 3.6 8 8 8zm192 72h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v256c0 4.4 3.6 8 8 8zm216-432H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path>
                </svg>
            ),
            to: "/jobs",
        },
        {
            title: "Projects",
            src: (
                <svg
                    stroke="currentColor"
                    fill="black"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1.5em"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="none"
                        stroke="#000"
                        stroke-width="2"
                        d="M9,15 L9,23 L1,23 L1,15 L9,15 Z M23,15 L23,23 L15,23 L15,15 L23,15 Z M9,1 L9,9 L1,9 L1,1 L9,1 Z M23,1 L23,9 L15,9 L15,1 L23,1 Z"
                    ></path>
                </svg>
            ),
            to: "/projects",
        },
        {
            title: "Message ",
            src: (
                <svg
                    stroke="currentColor"
                    fill="black"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    height="1.5em"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M464 512a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm200 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm-400 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 0 0-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 0 0-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 0 0 112 714v152a46 46 0 0 0 46 46h152.1A449.4 449.4 0 0 0 510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 0 0 142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path>
                </svg>
            ),
            to: "/message",
        },
        {
            title: "Meeting",
            src: (
                <svg
                    stroke="currentColor"
                    fill="black"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    height="1.5em"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs></defs>
                    <path d="M368 724H252V608c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v116H72c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h116v116c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V788h116c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
                    <path d="M912 302.3L784 376V224c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64v352h72V232h576v560H448v72h272c35.3 0 64-28.7 64-64V648l128 73.7c21.3 12.3 48-3.1 48-27.6V330c0-24.6-26.7-40-48-27.7zM888 625l-104-59.8V458.9L888 399v226z"></path>
                    <path d="M320 360c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H208c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h112z"></path>
                </svg>
            ),
            to: "/videoCall",
        },
    ];

    const [open, setOpen] = useState(true);
    const [value, setValue] = useState('1');
    const { state, freelancerId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (state) {
            setValue(state);
        }
    }, [state])




    return (
        <div className="flex bg-white h-full ">
            <div
                className={` ${open ? "w-72" : "w-20 "
                    } bg-dark-purple h-full p-5  pt-8 sticky left-0 top-0 duration-300`}
            >
                <img
                    src={toggle}
                    className={`absolute cursor-pointer -right-3  top-9 w-7 border-dark-purple
border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center ">
                    <img
                        src={ogLogo}
                        className={`cursor-pointer sm:w-40 sm:h-30 duration-500 ${open && "rotate-[360deg]"
                            }`}
                    />
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <Link to={Menu.to}  >
                            <li
                                key={index}
                                className={`flex rounded-md p-2 cursor-pointer  hover:bg-gray-200 text-gray-300 mt-5 text-sm items-center gap-x-4 
"mt-2" ${index === 0 && "bg-light-white"
                                    } `}
                            >
                                {Menu.src}
                                <span className={`${!open && "hidden"} freelancerFont text-lg text-black origin-left duration-200`}>
                                    {Menu.title}
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="card  p-6 min-h-screen w-full ">
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
                                <Tab label="Subscription" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><Profile /></TabPanel>
                        <TabPanel value="2"><Payment /></TabPanel>
                        <TabPanel value="3"><Pricing /></TabPanel>
                    </TabContext>
                </Box>
            </div >
        </div >
    )
}

export default Settings