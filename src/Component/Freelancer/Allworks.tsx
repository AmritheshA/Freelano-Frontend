import { useContext, useEffect, useRef, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { TechBox } from "../Custom/TechBox";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowDown, IoMdTimer } from "react-icons/io";
import { SiLevelsdotfyi } from "react-icons/si";
import FreelanoFooter from "../FreelanoFooter";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FILTERED_PROJECTS } from "@/Graphql/query";
import Project from "@/Interfaces/projectInterface";
import { TableSortLabel } from "@mui/material";
import { APPLY_JOB } from "@/Graphql/mutation";
import FreelancerSideBar from "../Home/Freelancer/FreelancerSideBar";
import { FreelancerContext } from "@/Context/UserContext/FreelancerProvider";

interface City {
  name: string;
  code: string;
}

interface FilterVariables {
  experience: string[];
  jobType: string[];
  category: string[];
  projectLength: string[];
  clientLocation: string[];
}

export default function Allworks() {
  const cities: City[] = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const user = useSelector((state: RootState) => state.userDetails.user);
  const { freelancerDetails} = useContext(FreelancerContext);

  const [experienceToggle, setExperienceToggle] = useState(false);
  const [projectDurationToggle, setProjectDurationToggle] = useState(false);
  const [jobTypeToggle, setJobTypeToggle] = useState(false);
  const [hourlyType, setHourlyType] = useState(false);
  const [fixedType, setFixedType] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filterVariables, setFilterVariables] = useState<FilterVariables>({
    experience: [], jobType: [], category: [], projectLength: [], clientLocation: []
  });
  const { loading: filterLoading, error: filterError, data: filterData, } = useQuery(GET_FILTERED_PROJECTS, { variables: { ...filterVariables, page: currentPage }, });

  const [commitProject, { data: applyJobData }] = useMutation(APPLY_JOB);



  useEffect(() => {
    if (filterData && filterData.filteredProjects) {
      setProjects(filterData.filteredProjects);
    }
  }, [filterData]);

  useEffect(() => {
    const experience = searchParams.getAll("experience");
    const jobType = searchParams.getAll("jobType");
    const category = searchParams.getAll("category");
    const projectLength = searchParams.getAll("projectLength");
    const clientLocation = searchParams.getAll("clientLocation");

    setFilterVariables({
      experience,
      jobType,
      category,
      projectLength,
      clientLocation,
    });
  }, [searchParams]);

  const handleCheckBoxClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const value = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);
    const existingValues = newSearchParams.get(key)?.split(",") || [];

    const updatedValues = existingValues.includes(value)
      ? existingValues.filter((v) => v !== value)
      : [...existingValues, value];

    if (updatedValues.length > 0) {
      newSearchParams.set(key, updatedValues.join(","));
    } else {
      newSearchParams.delete(key);
    }

    const updatedFilterVariables: FilterVariables = {
      experience: [],
      jobType: [],
      category: [],
      projectLength: [],
      clientLocation: [],
    };
    for (const [paramKey, paramValue] of newSearchParams.entries()) {
      updatedFilterVariables[paramKey as keyof FilterVariables] = paramValue
        .split(",")
        .map((value) => value.trim());
    }

    setFilterVariables(updatedFilterVariables);
    setSearchParams(newSearchParams);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (projectId: string, clientId: string, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");
      try {
        const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });

        const responseData = await response.json();
        // const publicUrl = `https://res.cloudinary.com/${responseData.cloud_name}/image/upload/${responseData.public_id}.pdf`;

        const freelancerId = user.userId;
        await commitProject({
          variables: {
            commitedProjectId: projectId,
            commitedFreelancerId: freelancerId,
            resume: responseData.secure_url,
            clientId
          },
        });
        
        toast.success(applyJobData?.applyJob);

      } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
      }
      modalRef.current?.close();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const isDocumentFile = file?.type.startsWith("application/") ?? false;



  return (
    <FreelancerSideBar >

      <div className="">
        <div className="w-full h-full ">
          <div className="mt-28">
            {/* Search Bar */}
            <div className="w-[200px] sm:w-[300px] md:w-[500px] lg:w-[650px] border-2 rounded-full border-gray-300 h-12 flex items-center">
              <div className="flex items-center p-6 w-full">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 16 16"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <input
                  type="text"
                  className="w-full px-4 py-2 outline-none bg-background"
                  placeholder="Search..."
                />
              </div>
            </div>
            <div className="flex justify-end mr-32 outline-none ">
              <TableSortLabel active direction={"asc"}>
                Recent
              </TableSortLabel>
              {/* <Select>
                    <SelectTrigger className="w-[220px] border-2 outline-none border-gray-300">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select> */}
            </div>
            <div className="w-full h-full flex gap-10 p-5  ">
              {/* filter options */}
              <div className="sm:w-[15%] mt-4 h-10 ">
                <div className="mb-10">
                  <div className="flex justify-between items-center">
                    <h1 className="clientFont font-semibold text-md">
                      Experience level
                    </h1>
                    <IoIosArrowDown
                      className={`cursor-pointer ${experienceToggle && "rotate-180"
                        }`}
                      size={20}
                      onClick={() => setExperienceToggle(!experienceToggle)}
                    />
                  </div>
                  {experienceToggle && (
                    <div className="flex flex-col ">
                      <div className="flex items-center pl-2 mt-2">
                        <input
                          type="checkbox"
                          onChange={(event) =>
                            handleCheckBoxClick(event, "experience")
                          }
                          checked={searchParams
                            .get("experience")
                            ?.includes("Entry")}
                          value="Entry"
                          className="checkbox checkbox-warning border-black"
                        />
                        <label className="p-2 text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Beginner
                        </label>
                      </div>
                      <div className="flex items-center pl-2 mt-2">
                        <input
                          type="checkbox"
                          onChange={(event) =>
                            handleCheckBoxClick(event, "experience")
                          }
                          checked={searchParams
                            .get("experience")
                            ?.includes("Intermediate")}
                          value="Intermediate"
                          className="checkbox checkbox-warning border-black"
                        />
                        <label className="p-2 text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Intermediator
                        </label>
                      </div>
                      <div className="flex items-center pl-2 mt-2">
                        <input
                          type="checkbox"
                          onChange={(event) =>
                            handleCheckBoxClick(event, "experience")
                          }
                          checked={searchParams
                            .get("experience")
                            ?.includes("Expert")}
                          value="Expert"
                          className="checkbox checkbox-warning border-black"
                        />
                        <label className="p-2 text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Expert
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-10">
                  <div className="flex justify-between items-center">
                    <h1 className="clientFont font-semibold text-md">
                      Job type
                    </h1>
                    <IoIosArrowDown
                      className={`cursor-pointer ${jobTypeToggle && "rotate-180"
                        }`}
                      size={20}
                      onClick={() => setJobTypeToggle(!jobTypeToggle)}
                    />
                  </div>
                  {jobTypeToggle && (
                    <div className="flex flex-col ">
                      <div className="mt-4">
                        <div>
                          <div className="flex items-center pl-2 mt-2">
                            <input
                              type="checkbox"
                              onChange={(event) => {
                                setHourlyType(!hourlyType);
                                handleCheckBoxClick(event, "jobType");
                              }}
                              value="Hourly"
                              checked={hourlyType}
                              className="checkbox checkbox-warning border-black"
                            />
                            <label className="p-2 text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Hourly
                            </label>
                          </div>
                          <div className="flex items-center pl-6 mt-4 gap-2">
                            <input
                              type="checkbox"
                              onChange={(event) => {
                                setHourlyType(!hourlyType);
                                handleCheckBoxClick(event, "jobType");
                              }}
                              value="Hourly"
                              checked={hourlyType}
                              className="checkbox checkbox-sm checkbox-warning border-black"
                            />
                            <input
                              type="number"
                              className=" w-[72px] h-7 bg-background border-2 pl-2 border-gray-400 rounded-md overflow-hidden"
                              placeholder="$Min"
                            />{" "}
                            -
                            <input
                              type="number"
                              className=" w-[72px] h-7 bg-background border-2 pl-2 border-gray-400 rounded-md overflow-hidden"
                              placeholder="$Max"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex items-center pl-2 mt-2">
                            <input
                              type="checkbox"
                              onChange={(event) => {
                                setFixedType(!fixedType);
                                handleCheckBoxClick(event, "jobType");
                              }}
                              value="Fixed"
                              checked={fixedType}
                              className="checkbox checkbox-warning border-black"
                            />
                            <label className="p-2 text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Fixed
                            </label>
                          </div>
                          <div className="flex items-center pl-6 mt-4 gap-2">
                            <input
                              type="checkbox"
                              onChange={() => {
                                setFixedType(!fixedType);
                              }}
                              value="Hourly"
                              checked={fixedType}
                              className="checkbox checkbox-sm checkbox-warning border-black"
                            />
                            <input
                              type="number"
                              className=" w-[72px] h-7 bg-background border-2 pl-2 border-gray-400 rounded-md overflow-hidden"
                              placeholder="$Min"
                            />{" "}
                            -
                            <input
                              type="number"
                              className=" w-[72px] h-7 bg-background border-2 pl-2 border-gray-400 rounded-md overflow-hidden"
                              placeholder="$Max"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-10    ">
                  <h1 className="clientFont font-semibold text-md">
                    Category
                  </h1>
                  <Select>
                    <SelectTrigger className="w-[220px] mt-4 border-2 outline-none border-gray-300">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {cities.map((citie) => (
                          <SelectItem value={citie.name}>
                            {citie.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-10">
                  <div className="flex justify-between items-center">
                    <h1 className="clientFont font-semibold text-md">
                      Project length
                    </h1>
                    <IoIosArrowDown
                      className={`cursor-pointer ${projectDurationToggle && "rotate-180"
                        }`}
                      size={20}
                      onClick={() =>
                        setProjectDurationToggle(!projectDurationToggle)
                      }
                    />
                  </div>
                  {projectDurationToggle && (
                    <div className="flex flex-col ">
                      <div className="flex items-center pl-2 mt-2">
                        <input
                          type="checkbox"
                          onChange={(event) => {
                            handleCheckBoxClick(event, "projectLength");
                          }}
                          checked={searchParams
                            .get("projectLength")
                            ?.includes("less than one month")}
                          value="less than one month"
                          className="checkbox checkbox-warning border-black"
                        />{" "}
                        <label className="p-2 text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Less than one month
                        </label>
                      </div>
                      <div className="flex items-center pl-2 mt-2">
                        <input
                          type="checkbox"
                          onChange={(event) => {
                            handleCheckBoxClick(event, "projectLength");
                          }}
                          checked={searchParams
                            .get("projectLength")
                            ?.includes("1 to 3 months")}
                          value="1 to 3 months"
                          className="checkbox checkbox-warning border-black"
                        />
                        <label className="p-2 text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          1 to 3 months
                        </label>
                      </div>
                      <div className="flex items-center pl-2 mt-2">
                        <input
                          type="checkbox"
                          onChange={(event) => {
                            handleCheckBoxClick(event, "projectLength");
                          }}
                          checked={searchParams
                            .get("projectLength")
                            ?.includes("3 to 6 months")}
                          value="3 to 6 months"
                          className="checkbox checkbox-warning border-black"
                        />
                        <label className="p-2 text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          3 to 6 months
                        </label>
                      </div>
                      <div className="flex items-center pl-2 mt-2">
                        <input
                          type="checkbox"
                          onChange={(event) => {
                            handleCheckBoxClick(event, "projectLength");
                          }}
                          checked={searchParams
                            .get("projectLength")
                            ?.includes("more than 6 month")}
                          value="more than 6 month"
                          className="checkbox checkbox-warning border-black"
                        />
                        <label className="p-2 text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          more than 6 month
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-10    ">
                  <h1 className="clientFont font-semibold text-md">
                    Client location
                  </h1>
                  <Select>
                    <SelectTrigger className="w-[220px] mt-4 border-2 outline-none border-gray-300">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {cities.map((citie) => (
                          <SelectItem value={citie.name}>
                            {citie.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* listing options */}
              {filterError || projects.length == 0 ? (
                <div className="flex flex-col items-center justify-center h-[50%]]  w-[70%]">
                  <img
                    src={
                      "https://www.shabbirmedicalhall.com/assets/img/No_Product_Found.png"
                    }
                    alt="Product Not Found"
                    className="max-w-xs mb-8"
                  />
                </div>
              ) : filterLoading ? (
                <div className="flex justify-center w-2/3 items-center h-[500px]">
                  <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce mr-2"></div>
                  <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce delay-150 mr-2"></div>
                  <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                </div>
              ) : (
                <div className="sm:w-[75%] overflow-y-auto max-h-screen no-scrollbar">
                  {projects?.map((project: Project) => (
                    <div className="flex justify-start mt-14">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="relative w-[100%] h-[350px]  bg-slate-100  active:bg-slate-200 cursor-pointer border-2 rounded-md">
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
                                <h1 className="font-semibold">
                                  {project.location}
                                </h1>
                              </div>
                              <div className="flex items-center gap-3">
                                <IoMdTimer size={20} />
                                <h1 className="font-semibold">
                                  {project.projectDuration}
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
                                <div className="flex gap-8 mt-14 items-center">
                                  <Dialog>
                                    <DialogTrigger>
                                      <div
                                        className="w-20 h-20 p-10 rounded-full bg-cover "
                                        style={{
                                          backgroundImage: `url('${freelancerDetails
                                            ? freelancerDetails?.profileImgUrl
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
                                                  ? freelancerDetails?.profileImgUrl
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
                                  <button
                                    onClick={openModal}
                                    className="btn btn-outline btn-primary"
                                  >
                                    Apply Work
                                  </button>
                                  <dialog
                                    ref={modalRef}
                                    id="my_modal_2"
                                    className="modal"
                                  >
                                    <div className="modal-box">
                                      <form onSubmit={(eve) => { handleSubmit(project.projectId, project.clientId, eve) }}>
                                        <div className="mb-4">
                                          <label
                                            htmlFor="file-upload"
                                            className="block mb-2 text-sm font-medium text-gray-700"
                                          >
                                            Upload Your Resume
                                          </label>
                                          <div
                                            className="border-2 border-dashed border-gray-300 rounded-md h-64 flex justify-center items-center"
                                            onClick={() =>
                                              fileInputRef.current?.click()
                                            }
                                            onDragOver={(e) =>
                                              e.preventDefault()
                                            }
                                            onDrop={handleDrop}
                                          >
                                            <div className="text-center">
                                              {preview ? (
                                                <div>
                                                  {isDocumentFile ? (
                                                    <iframe
                                                      src={preview}
                                                      className="w-full h-52"
                                                      title="Document Preview"
                                                    />
                                                  ) : preview.startsWith(
                                                    "data:image/"
                                                  ) ? (
                                                    <img
                                                      src={preview}
                                                      alt="Preview"
                                                      className="max-h-48 mx-auto"
                                                    />
                                                  ) : (
                                                    <video
                                                      src={preview}
                                                      controls
                                                      className="max-h-48 mx-auto"
                                                    ></video>
                                                  )}
                                                </div>
                                              ) : (
                                                <p className="text-gray-500 mb-2">
                                                  Click or drag and drop
                                                  your file here
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                          <input
                                            id="file-upload"
                                            type="file"
                                            accept=".pdf,.doc,.docx,image/*,video/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            ref={fileInputRef}
                                          />
                                        </div>
                                        <button
                                          type="submit"
                                          disabled={!file}
                                          className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${!file
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                            }`}
                                        >
                                          Upload
                                        </button>
                                      </form>
                                    </div>
                                    <form
                                      method="dialog"
                                      className="modal-backdrop"
                                    >
                                      <button>Close</button>
                                    </form>
                                  </dialog>
                                </div>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-24">
        <Pagination
          count={10}
          onChange={(_, page) => setCurrentPage(page)}
        />
      </div>

      <div className="mt-32 mb-0">
        <FreelanoFooter />
      </div>

    </FreelancerSideBar>
  );
}
