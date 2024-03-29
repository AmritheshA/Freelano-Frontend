import { ChangeEvent, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Alert from "@mui/material/Alert";

function Details_1() {
  const [role, setRole] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleInputeChanges = (even: ChangeEvent<HTMLInputElement>) => {
    setRole(even.target.value);
    console.log(role);
  };

  const handleNextSubmit = () => {
    if (role.trim() === "") {
      setShowAlert(true);
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  };

  return (
    <div className="absolute bg-white w-full h-screen ">
      {showAlert && (
        <Alert
          severity="error"
          color="error"
          className="fixed top-10 left-0 right-0 mx-auto z-50 w-[50%]"
        >
          Please enter a valid role.
        </Alert>
      )}

      <div className="p-10 sm:pl-36">
        <div className="text-white font-bold text-lg">
          <img
            className="h-16 xl:h-35 md:h-35 sm:h-22"
            src="/src/assets/logo.png"
            alt="Logo"
          />
        </div>
      </div>
      {/* Text */}
      <div className="flex flex-col">
        <div className="p-10 sm:pl-36 font-bold text-xl">1/7</div>
        <div className="pr-10 pl-10 sm:pl-36 pb-0 font-bold text-xl sm:text-4xl">
          Add a title to tell the world what you do
        </div>
        <div className="pr-10 pl-10 pt-2 sm:pl-36 font-semibold text-sm">
          It’s the very first thing clients see, so make it count. Stand out by
          describing your expertise in your own words.
        </div>
        <div className="pl-10 pt-10 sm:pl-36 ">Your professional role</div>
        <div className="pr-10 pl-10 p-2 sm:pl-36">
          <input
            type="text"
            value={role}
            className="border-2 border-gray-300 rounded-md py-2 px-4 sm:w-[50%] max-w-[750px] focus:outline-none focus:border-blue-500"
            placeholder="Enter your professional role..."
            onChange={handleInputeChanges}
          />
        </div>
      </div>
      {/* Button */}
      <div className="absolute flex bottom-16 right-0">
        <button className="flex mr-5 sm:mr-10 justify-center items-center gap-2 border-2 border-black w-40 h-12 rounded-3xl">
          Back
        </button>
        <button
          onClick={handleNextSubmit}
          className="flex mr-5 sm:mr-10 justify-center items-center gap-2 bg-orange-500 w-40 h-12 rounded-3xl"
        >
          Next <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
}

export default Details_1;
