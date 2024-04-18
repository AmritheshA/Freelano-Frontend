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
import { RootState, TypeDispatch } from "@/Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import userFullDetails from "@/Interfaces/userInterface";
import { userLogoutAction } from "@/Redux/Actions/UserActions/userActions";
import axiosInstance from "@/Config/AxiosConfig/axiosConfig";
import { toast } from "react-toastify";
import Modal1 from "./JobPostingModal/modal1";
import Modal2 from "./JobPostingModal/modal2";
import Modal3 from "./JobPostingModal/modal3";






export default function ClientHome() {

    const [open, setOpen] = useState(true);
    const dispatch: TypeDispatch = useDispatch();
    const [userInfo, setUserInfo] = useState<userFullDetails>();
    const user = useSelector((state: RootState) => state.userDetails.user);
    const [activeModal, setActiveModal] = useState("modal1");



    const handleActiveModal = (value: string) => {
        setActiveModal(value);
    }

    const Menus = [
        { title: "Home", src: <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path></svg>, to: "/home" },
        { title: "Projects", src: <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M9,15 L9,23 L1,23 L1,15 L9,15 Z M23,15 L23,23 L15,23 L15,15 L23,15 Z M9,1 L9,9 L1,9 L1,1 L9,1 Z M23,1 L23,9 L15,9 L15,1 L23,1 Z"></path></svg>, to: "/home" },
        { title: "Message ", src: <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M464 512a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm200 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm-400 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 0 0-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 0 0-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 0 0 112 714v152a46 46 0 0 0 46 46h152.1A449.4 449.4 0 0 0 510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 0 0 142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path></svg>, to: "/home" },
        { title: "Meeting", src: <svg stroke="currentColor" fill="black" stroke-width="0" viewBox="0 0 1024 1024" version="1.1" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M368 724H252V608c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v116H72c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h116v116c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V788h116c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M912 302.3L784 376V224c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64v352h72V232h576v560H448v72h272c35.3 0 64-28.7 64-64V648l128 73.7c21.3 12.3 48-3.1 48-27.6V330c0-24.6-26.7-40-48-27.7zM888 625l-104-59.8V458.9L888 399v226z" ></path><path d="M320 360c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H208c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h112z" ></path></svg>, to: "/home" },

    ];


    useEffect(() => {
        if (user) {
            axiosInstance.get(`/api/v1/user/getAllInfo?userId=${user.userId}`)
                .then((response) => {
                    if (response.status === 200) {
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
                <div className="flex gap-5">
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
                                    {activeModal === 'modal1' && (
                                        <Modal1 setActive={handleActiveModal} />
                                    )}
                                    {activeModal === 'modal2' && (
                                        <Modal2 setActive={handleActiveModal} />
                                    )}
                                    {activeModal === 'modal3' && (
                                        <Modal3 setActive={handleActiveModal} />

                                    )}
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div >
    );
}