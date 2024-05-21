import { RootState } from "@/Redux/Store";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import ClientSideBar from "../Home/Client/ClientSideBar";
import axiosInstance from "@/Config/AxiosConfig/axiosConfig";
import { toast } from "react-toastify";

function ClientProject() {

    const user = useSelector((state: RootState) => state.userDetails.user);

    const { data: pendingProjects } = useQuery(GET_CLIENTSIDE_PROJECTS, { variables: { clientId: user.userId, status: "Pending", markAsCompleted: false } });
    const { data: postedProjects } = useQuery(GET_CLIENTSIDE_PROJECTS, { variables: { clientId: user.userId, status: "Posted", markAsCompleted: false } });
    const { data: acceptedProjects } = useQuery(GET_CLIENTSIDE_PROJECTS, { variables: { clientId: user.userId, status: "Accepted", markAsCompleted: false } });
    const { data: completedProjects } = useQuery(GET_CLIENTSIDE_PROJECTS, { variables: { clientId: user.userId, status: "Completed", markAsCompleted: false } })
    const { data: completedPendingProjects } = useQuery(GET_CLIENTSIDE_PROJECTS, { variables: { clientId: user.userId, status: "Accepted", markAsCompleted: true } })

    const [value, setValue] = React.useState('1');
    const [userInfo, setUserInfo] = useState<Client>();



    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleUserInfoChange = (userInfo: Client) => {
        setUserInfo(userInfo);
    }

    const handleConfromPayment = async (project: Project) => {
        try {

            const payload: IntentRequestObj = {
                amount: project.prize,
                name: userInfo?.clientName || " ",
                email: userInfo?.clientEmail || " ",
                projectTitle: project?.projectTitle,
                freelancerId: project?.freelancerId,
                projectId: project?.projectId,
                clientId: user.userId || "",
                commitedProjectId: project.freelancerId || "",
                clientName:user?.userName
            }

            const response = await axiosInstance.post('/api/v1/payment/create-intent', payload);
            window.location.href = response.data;

        } catch (error) {
            console.error('Error creating payment intent:', error);
            toast.info("Sorry Can't make payment now ")
        }
    }

    return (
        <ClientSideBar setUserInfoToChild={handleUserInfoChange}>
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
                                <Tab className="font-bold" label="Pending Completed Projects" value="4" />
                                <Tab className="font-bold" label="Completed Projects" value="5" />
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
                            {completedPendingProjects?.getPendingProject.map((project: Project) => (
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
                                                    <DialogContent className="w-full" >
                                                        <DialogHeader>
                                                            <DialogDescription >
                                                                {/*  Content Goes here */}
                                                                <div className="flex justify-center ">
                                                                    <video src={project.submittedVideoURL} controls className="h-60 mx-auto bg-transparent"></video>
                                                                </div>
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <Button variant="outlined">Contact </Button>
                                                            <Button variant="outlined" color="success" onClick={() => handleConfromPayment(project)}>Conform Payment </Button>
                                                        </DialogFooter>
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
                        <TabPanel value="5">
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
        </ClientSideBar>
    )
}

export default ClientProject