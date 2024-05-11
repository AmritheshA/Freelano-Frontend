
import { userLogoutAction } from "@/Redux/Actions/UserActions/userActions";
import { RootState, TypeDispatch } from "@/Redux/Store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TechBox } from "../Custom/TechBox";
import { FaLocationDot } from "react-icons/fa6";
import { useQuery } from "@apollo/client";
import Project from "@/Interfaces/projectInterface";
import { Button, IconButton } from "@mui/material";
import { FaInfoCircle } from "react-icons/fa";
import { SiLevelsdotfyi } from "react-icons/si";

import { IoIosDocument, IoIosGlobe, IoIosSettings } from "react-icons/io";
import { GET_CLIENTSIDE_PROJECTS } from "@/Graphql/query";


function ClientProject() {

    const Menus = [
        { title: "Home", src: <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path></svg>, to: "/home" },
        { title: "Projects", src: <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M9,15 L9,23 L1,23 L1,15 L9,15 Z M23,15 L23,23 L15,23 L15,15 L23,15 Z M9,1 L9,9 L1,9 L1,1 L9,1 Z M23,1 L23,9 L15,9 L15,1 L23,1 Z"></path></svg>, to: "/clientProject" },
        { title: "Message ", src: <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M464 512a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm200 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm-400 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 0 0-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 0 0-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 0 0 112 714v152a46 46 0 0 0 46 46h152.1A449.4 449.4 0 0 0 510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 0 0 142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path></svg>, to: "/clientMessage" },
        { title: "Meeting", src: <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 1024 1024" version="1.1" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M368 724H252V608c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v116H72c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h116v116c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V788h116c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M912 302.3L784 376V224c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64v352h72V232h576v560H448v72h272c35.3 0 64-28.7 64-64V648l128 73.7c21.3 12.3 48-3.1 48-27.6V330c0-24.6-26.7-40-48-27.7zM888 625l-104-59.8V458.9L888 399v226z" ></path><path d="M320 360c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H208c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h112z" ></path></svg>, to: "/videoCall" },
    ];

    const [open, setOpen] = useState(true);
    const dispatch: TypeDispatch = useDispatch();

    const user = useSelector((state: RootState) => state.userDetails.user);


    const { data: pendingProjects } = useQuery(GET_CLIENTSIDE_PROJECTS, { variables: { clientId: user.userId, status: "Pending" } });
    const { data: postedProjects } = useQuery(GET_CLIENTSIDE_PROJECTS, { variables: { clientId: user.userId, status: "Posted" } });
    const { data: acceptedProjects } = useQuery(GET_CLIENTSIDE_PROJECTS, { variables: { clientId: user.userId, status: "Accepted" } });
    const { data: completedProjects } = useQuery(GET_CLIENTSIDE_PROJECTS, { variables: { clientId: user.userId, status: "Completed" } })

    const [value, setValue] = React.useState('1');

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className="flex bg-white min-h-screen ">
            <div
                className={` ${open ? "w-72" : "w-20 "
                    } bg-dark-purple h-full p-5  pt-8 sticky left-0 top-0 duration-300`}
            >
                <img
                    src="./src/assets/freelancer/image.png"
                    className={`absolute cursor-pointer -right-3  top-9 w-7 border-dark-purple
     border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center ">
                    <img
                        src="./src/assets/ogLogo.png"
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
            <div className="h-full flex-1 px-7">
                <div className="flex justify-end sticky top-0 left-0  py-5 bg-background z-10">
                    <div className="flex items-center sm:mr-48 gap-10">
                        <div className="relative ">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-40 h-10 sm:w-96 sm:h-14 px-4 py-2 pr-10 text-sm text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                            />
                            <button type="submit" className="absolute h-10 w-20 sm:w-28 sm:h-14  right-0 px-4 py-2  text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Search
                            </button>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className={`w-10 h-10 rounded-full bg-cover`} style={{ backgroundImage: `url('https://4.img-dpreview.com/files/p/TS600x600~sample_galleries/3002635523/4971879462.jpg')` }}>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className="cursor-pointer">Settings</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel onClick={() => dispatch(userLogoutAction())} className="cursor-pointer">Log Out</DropdownMenuLabel>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className={`w-10 h-10 rounded-full bg-cover bg-[url('https://cdn-icons-png.flaticon.com/512/3119/3119338.png')]`}>
                        </div>
                    </div>
                </div>
                <div className="justify-center w-[100%] mt-20">
                    <div className="flex justify-between w-full items-center">
                        <h1 className="font-semibold text-2xl ">Your Projects</h1>
                    </div>
                    <Box sx={{ width: '100%', typography: 'body1', }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList className="mt-10" onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab className="font-bold" label="Pending Request" value="1" />
                                    <Tab className="font-bold" label="Posted Projects" value="2" />
                                    <Tab className="font-bold" label="Accepted Projects" value="3" />
                                    <Tab className="font-bold" label="Completed Projects" value="4" />

                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                {pendingProjects?.getPendingProject.map((project: Project) => (
                                    <div
                                        key={project.projectId}
                                        className=" relative w-[80%] h-[350px] mt-4 bg-slate-100 active:bg-slate-200 cursor-pointer border-2 rounded-md"
                                    >
                                        <div className="flex justify-between">
                                            <h1 className="m-5 font-semibold text-sm text-gray-400 flex justify-start">
                                                Posted Yesterday
                                            </h1>
                                            <div className="flex items-center gap-5">
                                                <IconButton>
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <IoIosDocument color="black" /></DialogTrigger>
                                                        <DialogContent className="min-w-[38%]" >
                                                            <DialogHeader>
                                                                <DialogDescription >
                                                                    {/*  Content Goes here */}
                                                                    <div className="flex justify-center">
                                                                        <div className="w-full max-w-screen-lg">
                                                                            <iframe
                                                                                src={`https://res.cloudinary.com/duktwv58k/image/upload/v1715146376/Resume_iqbvrx.pdf#view=FitH`}
                                                                                className="w-full h-[800px] max-h-screen"
                                                                                title="Resume PDF Viewer"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                        </DialogContent>
                                                    </Dialog>
                                                </IconButton>

                                                <IconButton>
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <FaInfoCircle color="black" /></DialogTrigger>
                                                        <DialogContent className="min-w-[38%]" >
                                                            <DialogHeader>
                                                                <DialogTitle>Freelancer Details</DialogTitle>
                                                                <DialogDescription >
                                                                    <div className=" flex gap-8 mt-14 items-cente">
                                                                        <Dialog>
                                                                            <DialogTrigger>
                                                                                <div
                                                                                    className="w-20 h-20 p-10 rounded-full bg-cover"
                                                                                    style={{ backgroundImage: "url('https://4.img-dpreview.com/files/p/TS600x600~sample_galleries/3002635523/4971879462.jpg')", backgroundSize: "cover" }}
                                                                                ></div>
                                                                            </DialogTrigger>
                                                                            <DialogContent className="min-w-[15%] min-h-[15%] bg-transparent border-none">
                                                                                <DialogHeader>
                                                                                    <DialogDescription>
                                                                                        <div className="flex justify-center">
                                                                                            <div className="w-36 h-24 p-36 rounded-full bg-cover"
                                                                                                style={{ backgroundImage: "url('https://4.img-dpreview.com/files/p/TS600x600~sample_galleries/3002635523/4971879462.jpg')", backgroundSize: "cover" }}
                                                                                            ></div>
                                                                                        </div>
                                                                                    </DialogDescription>
                                                                                </DialogHeader>
                                                                            </DialogContent>
                                                                        </Dialog>
                                                                        <div className="">
                                                                            <p className="text-start text-black font-medium overflow-y-auto max-h-[80px] no-scrollbar">
                                                                                Lorem Ipsum has been the industry's
                                                                                standard dummy text ever since the
                                                                                1500s, when an unknown printer took a
                                                                                galley of type and scraedLorem Ipsum
                                                                                has been the industry's
                                                                                standard dummy text ever since the
                                                                                1500s, when an unknown printer took a
                                                                                galley of type and scraedLorem Ipsum has been the industry's
                                                                                standard dummy text ever since the
                                                                                1500s, when an unknown printer took a
                                                                                galley of type and scraed
                                                                            </p>
                                                                            <div className="flex mt-4 gap-5">
                                                                                <div className="flex items-center gap-3">
                                                                                    <FaLocationDot size={22} />
                                                                                    <h1 className="font-semibold">
                                                                                        location
                                                                                    </h1>
                                                                                </div>
                                                                                <div className="flex gap-2 items-center">
                                                                                    <SiLevelsdotfyi size={20} />
                                                                                    <h1 className="font-semibold">
                                                                                        Experience
                                                                                    </h1>
                                                                                </div>
                                                                                <div className="flex gap-2 items-center">
                                                                                    <IoIosGlobe size={22} />
                                                                                    <h1 className="font-semibold">
                                                                                        Language
                                                                                    </h1>
                                                                                </div>
                                                                                <div className="flex gap-2 items-center">
                                                                                    <IoIosSettings size={22} />
                                                                                    <h1 className="font-semibold">
                                                                                        Service
                                                                                    </h1>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-10 flex gap-5 min-h-[100px] max-w-[90%] flex-wrap">
                                                                        {project.skills.map((skill) => (
                                                                            <TechBox value={skill} />
                                                                        ))}
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-black text-lg font-medium">Profile Matches :<span className="font-bold text-black">67%</span></span>
                                                                    </div>
                                                                    <div className="flex justify-end gap-3">
                                                                        <div>
                                                                            <Button variant="outlined">Reject </Button>
                                                                        </div>
                                                                        <div>
                                                                            <Button variant="outlined">Accept Request</Button>
                                                                        </div>
                                                                    </div>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                        </DialogContent>
                                                    </Dialog>
                                                </IconButton>
                                            </div>
                                        </div>
                                        <h1 className="freelancerFont ml-8 text-xl flex justify-start">
                                            {project.projectTitle}
                                        </h1>
                                        <div className="flex gap-5">
                                            <h1 className="top-full left-3 mt-2 ml-8 font-semibold text-sm text-gray-400">
                                                {project.budgetType}
                                            </h1>
                                            <h1 className="top-full left-28 mt-2 ml-8 font-semibold text-sm text-gray-400">
                                                {project.experienceLevel}
                                            </h1>
                                            <h1 className="top-full left-56 mt-2 ml-8 font-semibold text-sm text-gray-400">
                                                Est. Budget - ${project.prize}
                                            </h1>

                                        </div>
                                        <p className="freelancerFont ml-8 mt-5 text-gray-900 max-w-[95%] text-start">
                                            {project.jobDescription.slice(0, 250)}
                                            {project.jobDescription.length > 250 && "..."}
                                        </p>
                                        <div className="ml-8 mt-8 flex gap-5">
                                            {project.skills.map((skill) => (
                                                <TechBox key={skill} value={skill} />
                                            ))}
                                        </div>
                                        <div className="flex gap-10 ml-10 mt-8">
                                            <div className="flex items-center gap-3">
                                                <FaLocationDot size={20} />
                                                <h1 className="font-semibold">{project.location}</h1>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="black"
                                                    strokeWidth="0"
                                                    viewBox="0 0 24 24"
                                                    height="1.5em"
                                                    width="1.5em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"></path>
                                                    <path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path>
                                                </svg>
                                                <h1 className="freelancerFont text-black font-medium text-lg">
                                                    Length: {project.projectDuration}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </TabPanel>
                            <TabPanel value="2">
                                {postedProjects?.getPendingProject.map((project: Project) => (
                                    <div
                                        key={project.projectId}
                                        className=" relative w-[80%] h-[350px] mt-4 bg-slate-100 active:bg-slate-200 cursor-pointer border-2 rounded-md"
                                    >
                                        <div className="flex justify-between">
                                            <h1 className="m-5 font-semibold text-sm text-gray-400 flex justify-start">
                                                Posted Yesterday
                                            </h1>
                                            <div className="flex items-center gap-5">
                                                <IconButton>
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <FaInfoCircle color="black" /></DialogTrigger>
                                                        <DialogContent className="min-w-[38%]" >
                                                            <DialogHeader>
                                                                <DialogTitle>Freelancer Details</DialogTitle>
                                                                <DialogDescription >
                                                                    <div className="h-[700px]">
                                                                        <div>
                                                                            <div className="flex justify-between items-end">
                                                                                <h1 className="pt-10 font-extrabold freelancerFont text-xl text-black">
                                                                                    {project.projectTitle}
                                                                                </h1>
                                                                                <h1 className="m-5 font-semibold text-sm text-gray-400 flex justify-start">
                                                                                    Posted Yesterday
                                                                                </h1>
                                                                            </div>
                                                                            <p className="mt-5 freelancerFont overflow-y-scroll font-medium text-black h-[100px] max-w-[700px]">
                                                                                {project.jobDescription}
                                                                            </p>
                                                                        </div>
                                                                        <div className="mt-10 flex gap-5 min-h-[100px] max-w-[90%] flex-wrap">
                                                                            {project.skills.map((skill) => (
                                                                                <TechBox value={skill} />
                                                                            ))}
                                                                        </div>
                                                                        <div>
                                                                            <div className="mt-10 flex gap-16">
                                                                                <div className="flex gap-2 items-center">
                                                                                    <svg
                                                                                        stroke="currentColor"
                                                                                        fill="black"
                                                                                        stroke-width="0"
                                                                                        viewBox="0 0 288 512"
                                                                                        height="1.5em"
                                                                                        width="1.5em"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                        <path d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"></path>
                                                                                    </svg>
                                                                                    <h1 className="freelancerFont text-black font-medium text-lg">
                                                                                        Cost : {project.prize}
                                                                                    </h1>
                                                                                </div>
                                                                                <div className="flex gap-2 items-center">
                                                                                    <SiLevelsdotfyi color="black" />
                                                                                    <h1 className="freelancerFont text-black font-medium text-lg">
                                                                                        Experience :{" "}
                                                                                        {project.experienceLevel}
                                                                                    </h1>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mt-8 flex gap-12">
                                                                                <div className="flex gap-2 items-center">
                                                                                    <svg
                                                                                        stroke="currentColor"
                                                                                        fill="black"
                                                                                        stroke-width="0"
                                                                                        viewBox="0 0 24 24"
                                                                                        height="1.5em"
                                                                                        width="1.5em"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                        <circle
                                                                                            cx="12"
                                                                                            cy="12"
                                                                                            r="4"
                                                                                        ></circle>
                                                                                        <path d="M13,4.069V2h-2v2.069C7.389,4.522,4.523,7.389,4.069,11H2v2h2.069c0.454,3.611,3.319,6.478,6.931,6.931V22h2v-2.069 c3.611-0.453,6.478-3.319,6.931-6.931H22v-2h-2.069C19.478,7.389,16.611,4.522,13,4.069z M12,18c-3.309,0-6-2.691-6-6s2.691-6,6-6 s6,2.691,6,6S15.309,18,12,18z"></path>
                                                                                    </svg>
                                                                                    <h1 className="freelancerFont text-black font-medium text-lg">
                                                                                        Location : {project.location}
                                                                                    </h1>
                                                                                </div>
                                                                                <div className="flex gap-2 items-center">
                                                                                    <svg
                                                                                        stroke="currentColor"
                                                                                        fill="black"
                                                                                        stroke-width="0"
                                                                                        viewBox="0 0 24 24"
                                                                                        height="1.5em"
                                                                                        width="1.5em"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                        <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"></path>
                                                                                        <path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path>
                                                                                    </svg>
                                                                                    <h1 className="freelancerFont text-black font-medium text-lg">
                                                                                        Legnth : {project.projectDuration}
                                                                                    </h1>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex gap-8 mt-14 items-center"><div
                                                                            className="w-20 h-20 p-10 rounded-full bg-cover "
                                                                            style={{
                                                                                backgroundImage: `url('./src/assets/freelancer/profileImage.png')`,
                                                                            }}>
                                                                        </div>
                                                                            <div>
                                                                                <p className="text-start text-black font-medium">
                                                                                    Lorem Ipsum has been the industry's
                                                                                    standard dummy text ever since the
                                                                                    1500s, when an unknown printer took a
                                                                                    galley of type and scraed{" "}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex justify-end mt-14 gap-5 mr-4">
                                                                            <button className="btn btn-outline btn-primary">
                                                                                Save Work
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                        </DialogContent>
                                                    </Dialog>
                                                </IconButton>
                                            </div>
                                        </div>
                                        <h1 className="freelancerFont ml-8 text-xl flex justify-start">
                                            {project.projectTitle}
                                        </h1>
                                        <div className="flex gap-5">
                                            <h1 className="top-full left-3 mt-2 ml-8 font-semibold text-sm text-gray-400">
                                                {project.budgetType}
                                            </h1>
                                            <h1 className="top-full left-28 mt-2 ml-8 font-semibold text-sm text-gray-400">
                                                {project.experienceLevel}
                                            </h1>
                                            <h1 className="top-full left-56 mt-2 ml-8 font-semibold text-sm text-gray-400">
                                                Est. Budget - ${project.prize}
                                            </h1>

                                        </div>
                                        <p className="freelancerFont ml-8 mt-5 text-gray-900 max-w-[95%] text-start">
                                            {project.jobDescription.slice(0, 250)}
                                            {project.jobDescription.length > 250 && "..."}
                                        </p>
                                        <div className="ml-8 mt-8 flex gap-5">
                                            {project.skills.map((skill) => (
                                                <TechBox key={skill} value={skill} />
                                            ))}
                                        </div>
                                        <div className="flex gap-10 ml-10 mt-8">
                                            <div className="flex items-center gap-3">
                                                <FaLocationDot size={20} />
                                                <h1 className="font-semibold">{project.location}</h1>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="black"
                                                    strokeWidth="0"
                                                    viewBox="0 0 24 24"
                                                    height="1.5em"
                                                    width="1.5em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"></path>
                                                    <path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path>
                                                </svg>
                                                <h1 className="freelancerFont text-black font-medium text-lg">
                                                    Length: {project.projectDuration}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </TabPanel>
                            <TabPanel value="3">
                                {acceptedProjects?.getPendingProject.map((project: Project) => (
                                    <div
                                        key={project.projectId}
                                        className=" relative w-[80%] h-[350px] mt-4 bg-slate-100 active:bg-slate-200 cursor-pointer border-2 rounded-md"
                                    >
                                        <div className="flex justify-between">
                                            <h1 className="m-5 font-semibold text-sm text-gray-400 flex justify-start">
                                                Posted Yesterday
                                            </h1>
                                            <div className="flex items-center gap-5">
                                                <IconButton>
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <IoIosDocument color="black" /></DialogTrigger>
                                                        <DialogContent className="min-w-[38%]" >
                                                            <DialogHeader>
                                                                <DialogDescription >
                                                                    {/*  Content Goes here */}
                                                                    <div className="flex justify-center">
                                                                        <div className="w-full max-w-screen-lg">
                                                                            <iframe
                                                                                src={`https://res.cloudinary.com/duktwv58k/image/upload/v1715146376/Resume_iqbvrx.pdf#view=FitH`}
                                                                                className="w-full h-[800px] max-h-screen"
                                                                                title="Resume PDF Viewer"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                        </DialogContent>
                                                    </Dialog>
                                                </IconButton>

                                                <IconButton>
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <FaInfoCircle color="black" /></DialogTrigger>
                                                        <DialogContent className="min-w-[38%]" >
                                                            <DialogHeader>
                                                                <DialogTitle>Freelancer Details</DialogTitle>
                                                                <DialogDescription >
                                                                    <div className=" flex gap-8 mt-14 items-cente">
                                                                        <Dialog>
                                                                            <DialogTrigger>
                                                                                <div
                                                                                    className="w-20 h-20 p-10 rounded-full bg-cover"
                                                                                    style={{ backgroundImage: "url('https://4.img-dpreview.com/files/p/TS600x600~sample_galleries/3002635523/4971879462.jpg')", backgroundSize: "cover" }}
                                                                                ></div>
                                                                            </DialogTrigger>
                                                                            <DialogContent className="min-w-[15%] min-h-[15%] bg-transparent border-none">
                                                                                <DialogHeader>
                                                                                    <DialogDescription>
                                                                                        <div className="flex justify-center">
                                                                                            <div className="w-36 h-24 p-36 rounded-full bg-cover"
                                                                                                style={{ backgroundImage: "url('https://4.img-dpreview.com/files/p/TS600x600~sample_galleries/3002635523/4971879462.jpg')", backgroundSize: "cover" }}
                                                                                            ></div>
                                                                                        </div>
                                                                                    </DialogDescription>
                                                                                </DialogHeader>
                                                                            </DialogContent>
                                                                        </Dialog>
                                                                        <div className="">
                                                                            <p className="text-start text-black font-medium overflow-y-auto max-h-[80px] no-scrollbar">
                                                                                Lorem Ipsum has been the industry's
                                                                                standard dummy text ever since the
                                                                                1500s, when an unknown printer took a
                                                                                galley of type and scraedLorem Ipsum
                                                                                has been the industry's
                                                                                standard dummy text ever since the
                                                                                1500s, when an unknown printer took a
                                                                                galley of type and scraedLorem Ipsum has been the industry's
                                                                                standard dummy text ever since the
                                                                                1500s, when an unknown printer took a
                                                                                galley of type and scraed
                                                                            </p>
                                                                            <div className="flex mt-4 gap-5">
                                                                                <div className="flex items-center gap-3">
                                                                                    <FaLocationDot size={22} />
                                                                                    <h1 className="font-semibold">
                                                                                        location
                                                                                    </h1>
                                                                                </div>
                                                                                <div className="flex gap-2 items-center">
                                                                                    <SiLevelsdotfyi size={20} />
                                                                                    <h1 className="font-semibold">
                                                                                        Experience
                                                                                    </h1>
                                                                                </div>
                                                                                <div className="flex gap-2 items-center">
                                                                                    <IoIosGlobe size={22} />
                                                                                    <h1 className="font-semibold">
                                                                                        Language
                                                                                    </h1>
                                                                                </div>
                                                                                <div className="flex gap-2 items-center">
                                                                                    <IoIosSettings size={22} />
                                                                                    <h1 className="font-semibold">
                                                                                        Service
                                                                                    </h1>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-10 flex gap-5 min-h-[100px] max-w-[90%] flex-wrap">
                                                                        {project.skills.map((skill) => (
                                                                            <TechBox value={skill} />
                                                                        ))}
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-black text-lg font-medium">Profile Matches :<span className="font-bold text-black">67%</span></span>
                                                                    </div>
                                                                    <div className="flex justify-end gap-3">
                                                                        <div>
                                                                            <Button color="error" variant="outlined">Report</Button>
                                                                        </div>
                                                                        <div>
                                                                            <Button variant="outlined">Mark As Completed </Button>
                                                                        </div>
                                                                    </div>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                        </DialogContent>
                                                    </Dialog>
                                                </IconButton>
                                            </div>
                                        </div>
                                        <h1 className="freelancerFont ml-8 text-xl flex justify-start">
                                            {project.projectTitle}
                                        </h1>
                                        <div className="flex gap-5">
                                            <h1 className="top-full left-3 mt-2 ml-8 font-semibold text-sm text-gray-400">
                                                {project.budgetType}
                                            </h1>
                                            <h1 className="top-full left-28 mt-2 ml-8 font-semibold text-sm text-gray-400">
                                                {project.experienceLevel}
                                            </h1>
                                            <h1 className="top-full left-56 mt-2 ml-8 font-semibold text-sm text-gray-400">
                                                Est. Budget - ${project.prize}
                                            </h1>

                                        </div>
                                        <p className="freelancerFont ml-8 mt-5 text-gray-900 max-w-[95%] text-start">
                                            {project.jobDescription.slice(0, 250)}
                                            {project.jobDescription.length > 250 && "..."}
                                        </p>
                                        <div className="ml-8 mt-8 flex gap-5">
                                            {project.skills.map((skill) => (
                                                <TechBox key={skill} value={skill} />
                                            ))}
                                        </div>
                                        <div className="flex gap-10 ml-10 mt-8">
                                            <div className="flex items-center gap-3">
                                                <FaLocationDot size={20} />
                                                <h1 className="font-semibold">{project.location}</h1>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="black"
                                                    strokeWidth="0"
                                                    viewBox="0 0 24 24"
                                                    height="1.5em"
                                                    width="1.5em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"></path>
                                                    <path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path>
                                                </svg>
                                                <h1 className="freelancerFont text-black font-medium text-lg">
                                                    Length: {project.projectDuration}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </TabPanel>
                            <TabPanel value="4">
                                {completedProjects?.getPendingProject.map((project: Project) => (
                                    <div
                                        key={project.projectId}
                                        className=" relative w-[80%] h-[350px] mt-4 bg-slate-100 active:bg-slate-200 cursor-pointer border-2 rounded-md"
                                    >
                                        <div className="flex justify-between">
                                            <h1 className="m-5 font-semibold text-sm text-gray-400 flex justify-start">
                                                Posted Yesterday
                                            </h1>
                                            <div className="flex items-center gap-5">
                                                <IconButton>
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <IoIosDocument color="black" /></DialogTrigger>
                                                        <DialogContent className="min-w-[38%]" >
                                                            <DialogHeader>
                                                                <DialogDescription >
                                                                    {/*  Content Goes here */}
                                                                    <div className="flex justify-center">
                                                                        <div className="w-full max-w-screen-lg">
                                                                            <iframe
                                                                                src={`https://res.cloudinary.com/duktwv58k/image/upload/v1715146376/Resume_iqbvrx.pdf#view=FitH`}
                                                                                className="w-full h-[800px] max-h-screen"
                                                                                title="Resume PDF Viewer"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                        </DialogContent>
                                                    </Dialog>
                                                </IconButton>

                                                <IconButton>
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <FaInfoCircle color="black" /></DialogTrigger>
                                                        <DialogContent className="min-w-[38%]" >
                                                            <DialogHeader>
                                                                <DialogTitle>Freelancer Details</DialogTitle>
                                                                <DialogDescription >
                                                                    <div className=" flex gap-8 mt-14 items-cente">
                                                                        <Dialog>
                                                                            <DialogTrigger>
                                                                                <div
                                                                                    className="w-20 h-20 p-10 rounded-full bg-cover"
                                                                                    style={{ backgroundImage: "url('https://4.img-dpreview.com/files/p/TS600x600~sample_galleries/3002635523/4971879462.jpg')", backgroundSize: "cover" }}
                                                                                ></div>
                                                                            </DialogTrigger>
                                                                            <DialogContent className="min-w-[15%] min-h-[15%] bg-transparent border-none">
                                                                                <DialogHeader>
                                                                                    <DialogDescription>
                                                                                        <div className="flex justify-center">
                                                                                            <div className="w-36 h-24 p-36 rounded-full bg-cover"
                                                                                                style={{ backgroundImage: "url('https://4.img-dpreview.com/files/p/TS600x600~sample_galleries/3002635523/4971879462.jpg')", backgroundSize: "cover" }}
                                                                                            ></div>
                                                                                        </div>
                                                                                    </DialogDescription>
                                                                                </DialogHeader>
                                                                            </DialogContent>
                                                                        </Dialog>
                                                                        <div className="">
                                                                            <p className="text-start text-black font-medium overflow-y-auto max-h-[80px] no-scrollbar">
                                                                                Lorem Ipsum has been the industry's
                                                                                standard dummy text ever since the
                                                                                1500s, when an unknown printer took a
                                                                                galley of type and scraedLorem Ipsum
                                                                                has been the industry's
                                                                                standard dummy text ever since the
                                                                                1500s, when an unknown printer took a
                                                                                galley of type and scraedLorem Ipsum has been the industry's
                                                                                standard dummy text ever since the
                                                                                1500s, when an unknown printer took a
                                                                                galley of type and scraed
                                                                            </p>
                                                                            <div className="flex mt-4 gap-5">
                                                                                <div className="flex items-center gap-3">
                                                                                    <FaLocationDot size={22} />
                                                                                    <h1 className="font-semibold">
                                                                                        location
                                                                                    </h1>
                                                                                </div>
                                                                                <div className="flex gap-2 items-center">
                                                                                    <SiLevelsdotfyi size={20} />
                                                                                    <h1 className="font-semibold">
                                                                                        Experience
                                                                                    </h1>
                                                                                </div>
                                                                                <div className="flex gap-2 items-center">
                                                                                    <IoIosGlobe size={22} />
                                                                                    <h1 className="font-semibold">
                                                                                        Language
                                                                                    </h1>
                                                                                </div>
                                                                                <div className="flex gap-2 items-center">
                                                                                    <IoIosSettings size={22} />
                                                                                    <h1 className="font-semibold">
                                                                                        Service
                                                                                    </h1>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-10 flex gap-5 min-h-[100px] max-w-[90%] flex-wrap">
                                                                        {project.skills.map((skill) => (
                                                                            <TechBox value={skill} />
                                                                        ))}
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-black text-lg font-medium">Profile Matches :<span className="font-bold text-black">67%</span></span>
                                                                    </div>
                                                                    <div className="flex justify-end gap-3">
                                                                        <div>
                                                                            <Button color="success" variant="outlined">Post Review</Button>
                                                                        </div>
                                                                    </div>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                        </DialogContent>
                                                    </Dialog>
                                                </IconButton>
                                            </div>
                                        </div>
                                        <h1 className="freelancerFont ml-8 text-xl flex justify-start">
                                            {project.projectTitle}
                                        </h1>
                                        <div className="flex gap-5">
                                            <h1 className="top-full left-3 mt-2 ml-8 font-semibold text-sm text-gray-400">
                                                {project.budgetType}
                                            </h1>
                                            <h1 className="top-full left-28 mt-2 ml-8 font-semibold text-sm text-gray-400">
                                                {project.experienceLevel}
                                            </h1>
                                            <h1 className="top-full left-56 mt-2 ml-8 font-semibold text-sm text-gray-400">
                                                Est. Budget - ${project.prize}
                                            </h1>

                                        </div>
                                        <p className="freelancerFont ml-8 mt-5 text-gray-900 max-w-[95%] text-start">
                                            {project.jobDescription.slice(0, 250)}
                                            {project.jobDescription.length > 250 && "..."}
                                        </p>
                                        <div className="ml-8 mt-8 flex gap-5">
                                            {project.skills.map((skill) => (
                                                <TechBox key={skill} value={skill} />
                                            ))}
                                        </div>
                                        <div className="flex gap-10 ml-10 mt-8">
                                            <div className="flex items-center gap-3">
                                                <FaLocationDot size={20} />
                                                <h1 className="font-semibold">{project.location}</h1>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="black"
                                                    strokeWidth="0"
                                                    viewBox="0 0 24 24"
                                                    height="1.5em"
                                                    width="1.5em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10c5.514,0,10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"></path>
                                                    <path d="M13 7L11 7 11 13 17 13 17 11 13 11z"></path>
                                                </svg>
                                                <h1 className="freelancerFont text-black font-medium text-lg">
                                                    Length: {project.projectDuration}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div>
        </div >
    )
}

export default ClientProject