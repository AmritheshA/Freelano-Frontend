import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RootState, TypeDispatch } from "@/Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import userFullDetails from "@/Interfaces/userInterface";
import { userLogoutAction } from "@/Redux/Actions/UserActions/userActions";
import axiosInstance from "@/Config/AxiosConfig/axiosConfig";

import { SelectOption } from "@/Component/Custom/Selects";
import { TechBox } from "@/Component/Custom/TechBox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";


export default function ClientHome() {

    const [open, setOpen] = useState(true);
    const dispatch: TypeDispatch = useDispatch();
    const [userInfo, setUserInfo] = useState<userFullDetails>();
    const user = useSelector((state: RootState) => state.userDetails.user);

    const [inputValue, setInputValue] = useState<string>('');
    const [description, setDescription] = useState<string>("");

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const [duration, setDuration] = useState("");
    const [experience, setExperience] = useState("");
    const [country, setCountry] = useState("");
    const [budgetType, setBudgetType] = useState("");
    const [price, setPrice] = useState("");

    const [showFirstModal, setShowFirstModal] = useState(true);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [showThirdModal, setShowThirdModal] = useState(false);

    const Menus = [
        { title: "Home", src: <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path></svg>, to: "/home" },
        { title: "Projects", src: <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M9,15 L9,23 L1,23 L1,15 L9,15 Z M23,15 L23,23 L15,23 L15,15 L23,15 Z M9,1 L9,9 L1,9 L1,1 L9,1 Z M23,1 L23,9 L15,9 L15,1 L23,1 Z"></path></svg>, to: "/home" },
        { title: "Message ", src: <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M464 512a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm200 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm-400 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 0 0-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 0 0-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 0 0 112 714v152a46 46 0 0 0 46 46h152.1A449.4 449.4 0 0 0 510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 0 0 142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path></svg>, to: "/home" },
        { title: "Meeting", src: <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 1024 1024" version="1.1" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M368 724H252V608c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v116H72c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h116v116c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V788h116c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M912 302.3L784 376V224c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64v352h72V232h576v560H448v72h272c35.3 0 64-28.7 64-64V648l128 73.7c21.3 12.3 48-3.1 48-27.6V330c0-24.6-26.7-40-48-27.7zM888 625l-104-59.8V458.9L888 399v226z" ></path><path d="M320 360c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H208c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h112z" ></path></svg>, to: "/home" },

    ];
    const countries: SelectOption[] = [
        { label: "India", value: "India" },
        { label: "United States", value: "United States" },
        { label: "Canada", value: "Canada" },
        { label: "United Kingdom", value: "United Kingdom" },
        { label: "Japan", value: "Japan" },
        { label: "Australia", value: "Australia" },
        { label: "Germany", value: "Germany" },
        { label: "France", value: "France" },
        { label: "Brazil", value: "Brazil" },
        { label: "China", value: "China" },
    ];

    const handleFirstNextButtonClick = () => {
        setShowFirstModal(false);
        setShowSecondModal(true);
    };

    // Function to handle clicking the "Next" button in the second modal
    const handleSecondNextButtonClick = () => {
        setShowSecondModal(false);
        setShowThirdModal(true);
    };


    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            if (!skills.some((skill) => skill === inputValue.trim())) {
                setSkills([...skills, inputValue.trim()]);
                setInputValue('');
            }
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };


    const handleJobPosting = () => {
    }

    useEffect(() => {
        if (user) {
            axiosInstance.get(`/api/v1/user/getAllInfo?userId=${user.userId}`)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data);
                        setUserInfo(response.data);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    if (error.response && error.response.data) {
                        toast(error.response.data);
                    } else {
                        toast("Something went wrong");
                    }
                });
        }

    }, [user]);

    const handleLogout = () => {
        dispatch(userLogoutAction())
    }



    return (
        <div className="flex bg-white h-full ">

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
            <div className="h-full flex-1 p-7">
                <div className="flex justify-end">
                    <div className="flex items-center sm:mr-48 gap-10">
                        <div className="relative">
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
                                <div className={`w-10 h-10 rounded-full bg-cover ${userInfo ? 'bg-center bg-no-repeat' : 'bg-center bg-no-repeat'}`} style={{ backgroundImage: `url('${userInfo ? userInfo.profileImgUrl : './src/assets/freelancer/profileImage.png'}')` }}>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className="cursor-pointer">Settings</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel onClick={handleLogout} className="cursor-pointer">Log Out</DropdownMenuLabel>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className={`w-10 h-10 rounded-full bg-cover bg-[url('https://cdn-icons-png.flaticon.com/512/3119/3119338.png')]`}>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-[75%] mt-20">
                    <div className="flex justify-between w-full items-center ">
                        <h1 className="font-semibold text-2xl ">Your Workspace</h1>
                    </div>
                </div>
                {/* First Modal */}
                <Dialog>
                    <DialogTrigger asChild >
                        <div className="flex flex-col cursor-pointer mt-10 shadow-sm px-9 py-20 text-lg font-medium leading-7 text-center bg-white rounded-2xl border-2  border-solid  border-gray-400 border-opacity-50 max-w-[226px] text-black text-opacity-90">
                            <svg className="self-center mt-2.5 w-7 aspect-square" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M20,2H8C6.897,2,6,2.897,6,4v12c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M8,16V4h12 l0.002,12H8z"></path><path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8zM15 6L13 6 13 9 10 9 10 11 13 11 13 14 15 14 15 11 18 11 18 9 15 9z"></path></svg>
                            <div className="mt-5 freelancerFont font-semibold">Start you next post</div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="min-w-[35%]">
                        <DialogHeader>
                            <DialogTitle className="text-gray-400 text-xl mt-5">Add Project</DialogTitle>
                            <DialogDescription>
                                {showFirstModal && (
                                    <div className="h-[450px]">
                                        <div className="mx-10 mt-8">
                                            <div className="flex justify-start items-end">
                                                <h1 className="pt-10 font-medium  clientFont text-2xl text-black">Write a title for your job post</h1>
                                            </div>
                                            <div className="mt-5 max-w-[450px]">
                                                <Input type="email" onChange={(e) => setTitle(e.target.value)} value={title} className="border-2 h-12 text-black border-gray-300" placeholder="Full Stack Web Application" />
                                                <h1 className="p-2 text-sm clientFont font-semibold" >We will match you with candidate that best for {title}</h1>
                                            </div>
                                            <div className="flex justify-start items-end">
                                                <h1 className="pt-10 font-medium  clientFont text-2xl text-black">Job Category</h1>
                                            </div>
                                            <div className="mt-3">
                                                <Select onValueChange={(value) => setCategory(value)}>
                                                    <SelectTrigger className="w-[400px] h-12 border-2 border-gray-300 text-black">
                                                        <SelectValue className="text-black" placeholder="Select your category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup className="text-black">
                                                            {countries.map((country) => (
                                                                <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-16 gap-5 mr-10">
                                            <button className="bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-900" onClick={handleFirstNextButtonClick}>Next</button>
                                        </div>
                                    </div>
                                )}
                                {showSecondModal && (<div className="h-[520px]">
                                    <div className="mx-10 mt-8">
                                        <div className="flex justify-start items-end">
                                            <h1 className="pt-10 font-medium  clientFont text-2xl text-black">Add up to 10 skills</h1>
                                        </div>
                                        <div className="my-3">
                                            <input
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={handleInputKeyDown}
                                                placeholder="Enter skills"
                                                className="p-2 mr-2 w-[350px] sm:w-[480px] h-12 focus:border-gray-400 rounded-md border-2 border-gray-300"
                                            />
                                            <div>
                                                {skills.map((skill, index) => (
                                                    <div key={index} className="relative inline-block mt-5 mr-5 rounded">
                                                        <TechBox badge={<svg onClick={() => handleRemoveSkill(skill)} cursor="pointer" stroke="currentColor" fill="red" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293 2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023 0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2.293 2.293 2.293-2.293c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-2.293 2.293 2.293 2.293z"></path></svg>} value={skill} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-start items-end">
                                            <h1 className="pt-10 font-medium  clientFont text-2xl text-black">Job Description</h1>
                                        </div>
                                        <div className="mt-3">
                                            <Textarea value={description} placeholder="Type your message here." onChange={(e) => setDescription(e.target.value)} className="w-[500px] sm:w-[500px] border-2 border-gray-300 focus:border-none min-h-[120px]" />
                                            <div className="flex justify-between sm:w-[500px] mt-2">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-16 gap-5 mr-10">
                                        <button className="bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-900" onClick={handleSecondNextButtonClick}>Next</button>
                                    </div>
                                </div>)}
                                {showThirdModal && (
                                    <div className="h-[380px]">
                                        <div className="mx-10 mt-8">
                                            <div className="flex gap-5 mt-5 ">
                                                <div className=" flex flex-col w-[50%]">
                                                    <label className="text-black font-medium clientFont" >Project Duration</label>
                                                    <Select onValueChange={(value) => setDuration(value)}>
                                                        <SelectTrigger className="w-full h-12 mt-2 border-2 border-gray-300 text-black">
                                                            <SelectValue className="text-black" placeholder="Select your category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup className="text-black">
                                                                <SelectItem value="more than 6 months">more than 6 months</SelectItem>
                                                                <SelectItem value="3 to 6 months">3 to 6 months</SelectItem>
                                                                <SelectItem value="1 to 3 months">1 to 3 months</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className=" flex flex-col w-[50%]">
                                                    <label className="text-black font-medium clientFont" >Expererience Level</label>
                                                    <Select onValueChange={(value) => setExperience(value)}>
                                                        <SelectTrigger className="w-full h-12 mt-2 border-2 border-gray-300 text-black">
                                                            <SelectValue className="text-black" placeholder="Select your category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup className="text-black">
                                                                <SelectItem value="more than 6 months">Entry</SelectItem>
                                                                <SelectItem value="3 to 6 months">Intermediate</SelectItem>
                                                                <SelectItem value="1 to 3 months">Expert</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="mt-5 flex">
                                                <div className="flex flex-col w-[50%]">
                                                    <label className="text-black font-medium clientFont" >Location</label>
                                                    <Select onValueChange={(value) => setCountry(value)}>
                                                        <SelectTrigger className="w-[260px] mt-2 h-12 border-2 text-black border-gray-300">
                                                            <SelectValue placeholder="Select your country" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {countries.map((country) => (
                                                                    <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="flex flex-col ml-4">
                                                    <label className="text-black font-medium clientFont" >Budget Type</label>
                                                    <RadioGroup defaultValue="option-one" onValueChange={(e) => setBudgetType(e)}>
                                                        <div className="mt-6 flex gap-10" >
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="Fixed" className="w-5 h-5" id="option-one" />
                                                                <Label htmlFor="option-one">Fixed</Label>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="Hourly" className="w-5 h-5" id="option-two" />
                                                                <Label htmlFor="option-two">Hourly</Label>
                                                            </div>
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                            </div>
                                            <div className="my-3 flex flex-col mt-5">
                                                <Label className="text-black">Prize</Label>
                                                <input
                                                    type="text"
                                                    value={price}
                                                    min={0}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    onKeyDown={handleInputKeyDown}
                                                    placeholder="Enter project prize"
                                                    className="p-2 mt-3 mr-2 w-[350px] sm:w-[350px] text-black h-12 focus:border-gray-400 rounded-md border-2 border-gray-300"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-16 gap-5 mr-10">
                                            <button className="bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-900" onClick={handleJobPosting}>Next</button>
                                        </div>
                                    </div>
                                )}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                {/* Second */}
                {/* <Dialog>
                    <DialogTrigger asChild >
                        <div className="flex flex-col cursor-pointer mt-10 shadow-sm px-9 py-20 text-lg font-medium leading-7 text-center bg-white rounded-2xl border-2  border-solid  border-gray-400 border-opacity-50 max-w-[226px] text-black text-opacity-90">
                            <svg className="self-center mt-2.5 w-7 aspect-square" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M20,2H8C6.897,2,6,2.897,6,4v12c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M8,16V4h12 l0.002,12H8z"></path><path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8zM15 6L13 6 13 9 10 9 10 11 13 11 13 14 15 14 15 11 18 11 18 9 15 9z"></path></svg>
                            <div className="mt-5 freelancerFont font-semibold">Start you next post</div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="min-w-[35%]">
                        <DialogHeader>
                            <DialogTitle className="text-gray-400 text-xl mt-5">Add Project</DialogTitle>
                            <DialogDescription>
                                <div className="h-[450px]">
                                    <div className="mx-10 mt-8">
                                        <div className="flex justify-start items-end">
                                            <h1 className="pt-10 font-medium  clientFont text-2xl text-black">Add up to 10 skills</h1>
                                        </div>
                                        <div className="my-3">
                                            <input
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={handleInputKeyDown}
                                                placeholder="Enter skills"
                                                className="p-2 mr-2 w-[350px] sm:w-[480px] h-12 focus:border-gray-400 rounded-md border-2 border-gray-300"
                                            />
                                            <div>
                                                {skills.map((skill, index) => (
                                                    <div key={index} className="relative inline-block mt-5 mr-5 rounded">
                                                        <TechBox badge={<svg onClick={() => handleRemoveSkill(skill)} cursor="pointer" stroke="currentColor" fill="red" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293 2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023 0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2.293 2.293 2.293-2.293c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-2.293 2.293 2.293 2.293z"></path></svg>} value={skill} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-start items-end">
                                            <h1 className="pt-10 font-medium  clientFont text-2xl text-black">Job Description</h1>
                                        </div>
                                        <div className="mt-3">
                                            <Textarea value={description} placeholder="Type your message here." onChange={(e) => setDescription(e.target.value)} className="w-[500px] sm:w-[500px] border-2 border-gray-300 focus:border-none min-h-[120px]" />
                                            <div className="flex justify-between sm:w-[500px] mt-2">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-16 gap-5 mr-10">
                                        <button className="bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-900">Next</button>
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog> */}
                {/* Third */}
                {/* <Dialog>
                    <DialogTrigger asChild >
                        <div className="flex flex-col cursor-pointer mt-10 shadow-sm px-9 py-20 text-lg font-medium leading-7 text-center bg-white rounded-2xl border-2  border-solid  border-gray-400 border-opacity-50 max-w-[226px] text-black text-opacity-90">
                            <svg className="self-center mt-2.5 w-7 aspect-square" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M20,2H8C6.897,2,6,2.897,6,4v12c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M8,16V4h12 l0.002,12H8z"></path><path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8zM15 6L13 6 13 9 10 9 10 11 13 11 13 14 15 14 15 11 18 11 18 9 15 9z"></path></svg>
                            <div className="mt-5 freelancerFont font-semibold">Start you next post</div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="min-w-[35%]">
                        <DialogHeader>
                            <DialogTitle className="text-gray-400 text-xl mt-5">Add Project</DialogTitle>
                            <DialogDescription>
                                <div className="h-[450px]">
                                    <div className="mx-10 mt-8">
                                        <div className="flex gap-5 mt-5 ">
                                            <div className=" flex flex-col w-[50%]">
                                                <label className="text-black font-medium clientFont" >Project Duration</label>
                                                <Select onValueChange={(value) => setDuration(value)}>
                                                    <SelectTrigger className="w-full h-12 mt-2 border-2 border-gray-300 text-black">
                                                        <SelectValue className="text-black" placeholder="Select your category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup className="text-black">
                                                            <SelectItem value="more than 6 months">more than 6 months</SelectItem>
                                                            <SelectItem value="3 to 6 months">3 to 6 months</SelectItem>
                                                            <SelectItem value="1 to 3 months">1 to 3 months</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className=" flex flex-col w-[50%]">
                                                <label className="text-black font-medium clientFont" >Expererience Level</label>
                                                <Select onValueChange={(value) => setExperience(value)}>
                                                    <SelectTrigger className="w-full h-12 mt-2 border-2 border-gray-300 text-black">
                                                        <SelectValue className="text-black" placeholder="Select your category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup className="text-black">
                                                            <SelectItem value="more than 6 months">Entry</SelectItem>
                                                            <SelectItem value="3 to 6 months">Intermediate</SelectItem>
                                                            <SelectItem value="1 to 3 months">Expert</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="mt-5 flex">
                                            <div className="flex flex-col w-[50%]">
                                                <label className="text-black font-medium clientFont" >Location</label>
                                                <Select onValueChange={(value) => setCountry(value)}>
                                                    <SelectTrigger className="w-[260px] mt-2 h-12 border-2 text-black border-gray-300">
                                                        <SelectValue placeholder="Select your country" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {countries.map((country) => (
                                                                <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex flex-col ml-4">
                                                <label className="text-black font-medium clientFont" >Budget Type</label>
                                                <RadioGroup defaultValue="option-one" onValueChange={(e) => setBudgetType(e)}>
                                                    <div className="mt-6 flex gap-10" >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="Fixed" className="w-5 h-5" id="option-one" />
                                                            <Label htmlFor="option-one">Fixed</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="Hourly" className="w-5 h-5" id="option-two" />
                                                            <Label htmlFor="option-two">Hourly</Label>
                                                        </div>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                        <div className="my-3 flex flex-col mt-5">
                                            <Label className="text-black">Prize</Label>
                                                <input
                                                    type="number"
                                                    value={price}
                                                    min={0}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    onKeyDown={handleInputKeyDown}
                                                    placeholder="Enter project prize"
                                                    className="p-2 mt-3 mr-2 w-[350px] sm:w-[350px] text-black h-12 focus:border-gray-400 rounded-md border-2 border-gray-300"
                                                />
                                        </div>
                                    </div>
                                     <div className="flex justify-end mt-16 gap-5 mr-10">
                                        <button className="bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-900">Next</button>
                                    </div> 
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog> */}

            </div>
        </div >
    );
}