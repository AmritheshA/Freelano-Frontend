import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";


function FreelancerReg() {
  const [selectedValue, setSelectedValue] = useState<boolean>(false);
  const [role, setRole] = useState<string>("CLIENT");


  const handleSelection = (value: string) => {

    setRole(value);
    setSelectedValue(!selectedValue);
  };

  return (
    <div className="bg-white h-screen">
      <div className="p-10 sm:pl-36">
        <div className="text-white font-bold text-lg">
          <img
            className="h-16 xl:h-35 md:h-35 sm:h-22"
            src={logo}
            alt="Logo"
          />
        </div>
      </div>
      <div className="">
        <div className="flex justify-center items-center">
          <h1
            className="font-serif font-semibold text-sm sm:text-3xl"
            style={{ fontFamily: "Georgia, serif", letterSpacing: "2px" }}
          >
            Join as a client or freelancer
          </h1>
        </div>

        <div className="sm:flex justify-center items-center">
          <div
            className={`relative m-auto h-[150px] mt-10 w-[250px] sm:m-12 border-2 border-black rounded-lg flex justify-between items-start`}
          >
            <div className="flex items-center">
              <FaUserAlt className="h-6 w-6 m-6 " />
            </div>
            <span className="  absolute bottom-7 left-[50%] text-xl w-48 font-medium translate-x-[-50%] ">
              I’m a ,
              <span className="font-semibold text-blue-800">client </span>hiring
              for a project
            </span>
            <div className="flex items-center">
              <input
                type="radio"
                value={"CLIENT"}
                checked={!selectedValue}
                className="h-6 w-6 m-2 cursor-pointer"
                onChange={(eve: any) => handleSelection(eve.target.value)}
              />
            </div>
          </div>
          <div
            className={`relative m-auto h-[150px] mt-10 w-[250px] sm:m-12 border-2 border-black rounded-lg flex justify-between items-start`}
          >
            <div className="flex items-center">
              <FaUserAlt className="h-6 w-6 m-6 " />
            </div>
            <span className="  absolute bottom-7 left-[50%] text-xl  w-48 font-medium translate-x-[-50%] ">
              I’m a{" "}
              <span className="font-semibold text-blue-800">freelancer</span>,
              looking for work
            </span>
            <div className="flex items-center">
              <input
                type="radio"
                checked={selectedValue}
                value={"FREELANCER"}
                className="h-6 w-6 m-2 cursor-pointer"
                onChange={(eve: any) => handleSelection(eve.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center m-5">
        <button
          className={` bg-orange-500 w-20 h-8 text-md rounded-xl sm:w-48 sm:h-12 `}
        >
          <Link to={`/signup?role=${role}`}>Create Account</Link>
        </button>
        <h1 className="m-5">
          Already a user?
          <span className="text-blue-700 font-bold">
            {" "}
            <Link to="/login">Login</Link>
          </span>
        </h1>
      </div>
    </div>
  );
}
export default FreelancerReg;
