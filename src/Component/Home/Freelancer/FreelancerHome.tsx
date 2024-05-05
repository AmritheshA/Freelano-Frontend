import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { SiLevelsdotfyi } from "react-icons/si";
import { Link } from "react-router-dom";
import { TechBox } from "../../Custom/TechBox";
import userFullDetails from "@/Interfaces/userInterface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSelector } from "react-redux";
import { RootState, TypeDispatch } from "@/Redux/Store";
import axiosInstance from "@/Config/AxiosConfig/axiosConfig";
import { toast } from "react-toastify";
import { userLogoutAction } from "@/Redux/Actions/UserActions/userActions";
import { useQuery } from "@apollo/client";
import { GET_RECOMMANDED_PROJECTS } from "@/Graphql/query";
import Project from "@/Interfaces/projectInterface";

export default function FreelancerHome() {
  const [open, setOpen] = useState(true);
  
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
      to: "/home",
    },
  ];
  const [userInfo, setUserInfo] = useState<userFullDetails>();
  const user = useSelector((state: RootState) => state.userDetails.user);
  const dispatch = useDispatch<TypeDispatch>();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const { data} = useQuery(GET_RECOMMANDED_PROJECTS, {
    variables: { freelancerId: user.userId },
  });
  
  useEffect(() => {
    if (data && data.recommendedProject) {
      setProjects(data.recommendedProject);
    }
  }, [data]);

  const handleLogout = () => {
    dispatch(userLogoutAction());
  };

  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/api/v1/user/getAllInfo?userId=${user.userId}&role=${user.role}`)
        .then((response) => {
          if (response.status === 200) {
            setUserInfo(response.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          if (error.response && error.response.data) {
            toast(error.response.data);
          } else {
            toast("Something went wrong");
          }
        });
    }
  }, [user]);

  return (
    <div className="flex bg-white min-h-screen">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
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
            className={`cursor-pointer sm:w-40 sm:h-30 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={Menu.to}>
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer  hover:bg-gray-200 text-gray-300 mt-5 text-sm items-center gap-x-4 
            "mt-2" ${index === 0 && "bg-light-white"} `}
              >
                {Menu.src}
                <span
                  className={`${
                    !open && "hidden"
                  } freelancerFont text-lg text-black origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="h-full flex-1 p-7">
        <div className="flex justify-end">
          <div className="flex items-center sm:mr-48 gap-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-40 h-10 sm:w-96 sm:h-14 px-4 py-2 pr-10 text-sm text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="absolute h-10 w-20 sm:w-28 sm:h-14  right-0 px-4 py-2  text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Search
              </button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div
                  className={`w-10 h-10 rounded-full bg-cover ${
                    userInfo
                      ? "bg-center bg-no-repeat"
                      : "bg-center bg-no-repeat"
                  }`}
                  style={{
                    backgroundImage: `url('${
                      userInfo
                        ? userInfo.profileImgUrl
                        : "./src/assets/freelancer/profileImage.png"
                    }')`,
                  }}
                ></div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="cursor-pointer">
                  Settings
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Log Out
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>

            <div
              className={`w-10 h-10 rounded-full bg-cover bg-[url('https://cdn-icons-png.flaticon.com/512/3119/3119338.png')]`}
            ></div>
          </div>
        </div>
        <div className="flex justify-center w-[75%] mt-20">
          <div className="flex justify-between w-full items-center ">
            <h1 className="font-semibold text-2xl ">Recommended Jobs</h1>
          </div>
        </div>

        {projects?.map((project: Project) => (
          <div key={project.projectId}  className="flex justify-start mt-14">
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative w-[80%] h-[350px]  bg-slate-100  active:bg-slate-200 cursor-pointer border-2 rounded-md">
                  <h1 className="m-5 font-semibold text-sm text-gray-400 flex justify-start ">
                    Posted Yesterday
                  </h1>
                  <h1 className=" freelancerFont  ml-8 text-xl flex justify-start ">
                    {project.projectTitle}
                  </h1>
                  <div className="flex gap-5">
                    <h1 className=" top-full left-3 mt-2 ml-8 font-semibold text-sm text-gray-400">
                      {project.budgetType}
                    </h1>
                    <h1 className=" top-full left-28 mt-2 ml-8 font-semibold text-sm text-gray-400">
                      {project.experienceLevel}
                    </h1>
                    <h1 className=" top-full left-56 mt-2 ml-8 font-semibold text-sm text-gray-400">
                      Est. Budget - ${project.prize}
                    </h1>
                  </div>
                  <p className="freelancerFont ml-8 mt-5 text-gray-900 max-w-\[95%\] text-start">
                    {project.jobDescription.slice(0, 250)}
                    {project.jobDescription.length > 250 && "..."}
                  </p>{" "}
                  <div className="ml-8 mt-8 flex gap-5">
                    {project.skills.map((skill) => (
                      <TechBox value={skill} />
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
              </DialogTrigger>
              <DialogContent className="min-w-[35%]">
                <DialogHeader>
                  <DialogTitle className="text-gray-400 text-xl">
                    Job Details
                  </DialogTitle>
                  <DialogDescription>
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
                              Experience : {project.experienceLevel}
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
                              <circle cx="12" cy="12" r="4"></circle>
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
                      <div className="flex gap-8 mt-14 items-center">
                        <Dialog>
                          <DialogTrigger>
                            <div
                              className="w-20 h-20 p-10 rounded-full bg-cover "
                              style={{
                                backgroundImage: `url('${
                                  userInfo
                                    ? userInfo.profileImgUrl
                                    : "./src/assets/freelancer/profileImage.png"
                                }')`,
                              }}
                            ></div>
                          </DialogTrigger>
                          <DialogContent className="min-w-[15%] min-h-[15%] bg-transparent border-none">
                            <DialogHeader>
                              <DialogDescription>
                                <div className="flex justify-center">
                                  <div
                                    className="w-36 h-24 p-36 rounded-full bg-cover"
                                    style={{
                                      backgroundImage: `url('${
                                        userInfo
                                          ? userInfo.profileImgUrl
                                          : "./src/assets/freelancer/profileImage.png"
                                      }')`,
                                    }}
                                  ></div>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <div>
                          <p className="text-start text-black font-medium">
                            Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown printer
                            took a galley of type and scraed{" "}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-14 gap-5 mr-10">
                        <button className="bg-orange-600 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-orange-800">
                          Save Work
                        </button>
                        <button className="bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-900">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
