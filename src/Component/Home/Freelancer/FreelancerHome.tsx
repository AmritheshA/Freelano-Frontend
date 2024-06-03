import { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { SiLevelsdotfyi } from "react-icons/si";
import { TechBox } from "../../Custom/TechBox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { useQuery } from "@apollo/client";
import { GET_RECOMMANDED_PROJECTS } from "@/Graphql/query";
import Project from "@/Interfaces/projectInterface";
import FreelancerSideBar from "./FreelancerSideBar";
import { FreelancerContext } from "@/Context/UserContext/FreelancerProvider";

export default function FreelancerHome() {



  const {freelancerDetails} = useContext(FreelancerContext);
  const user = useSelector((state: RootState) => state.userDetails.user);

  const [projects, setProjects] = useState<Project[]>([]);
  const { data } = useQuery(GET_RECOMMANDED_PROJECTS, { variables: { freelancerId: user.userId } });

  useEffect(() => {
    if (data && data.recommendedProject) {
      setProjects(data.recommendedProject);
    }
  }, [data]);

  
  return (
    <FreelancerSideBar >
      <div className="flex justify-center w-[75%] mt-20">
        <div className="flex justify-between w-full items-center ">
          <h1 className="font-semibold text-2xl ">Recommended Jobs</h1>
        </div>
      </div>
      {projects?.map((project: Project) => (
        <div key={project.projectId} className="flex justify-start mt-14">
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
                              backgroundImage: `url('${freelancerDetails
                                ? freelancerDetails.profileImgUrl
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
                                    backgroundImage: `url('${freelancerDetails
                                      ? freelancerDetails.profileImgUrl
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
    </FreelancerSideBar>
  );
}
