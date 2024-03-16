import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function AuthForm({ flag }: { flag: boolean }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex sm:px-[12%] flex-col-reverse sm:flex-row px-4">
      <div className="lg:w-[50%] w-full flex justify-center items-center py-20 sm:backdrop-blur-[15px] sm:h-[750px] sm:bg-white sm:bg-opacity-30 sm:max-w-[640px] sm:min-w-[550px] rounded-[25px]">
        <div className="flex flex-col mt-20 max-w-full w-[410px] max-md:mt-10">
          <div className="self-start ml-2.5 text-4xl font-bold text-slate-900">
            {flag ? "Login" : "SignUp"}
          </div>
          <label className="mt-7 text-sm text-slate-900">Email</label>
          <input
            type="text"
            className="justify-center h-14 items-start py-2 pr-2 pl-6 mt-2 text-sm whitespace-nowrap bg-white rounded-3xl text-stone-300 max-md:px-5 outline-none border-none"
            placeholder="username@gmail.com"
          />

          <label className="mt-8 text-sm text-slate-900">Password</label>
          <div className="relative flex">
            <input
              type={showPassword ? "text" : "password"}
              className="flex-1 px-6 py-4 pr-16 mt-2.5 text-sm whitespace-nowrap bg-white rounded-3xl text-stone-300 max-md:px-5 outline-none border-none"
              placeholder="Password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-9 right-0 flex items-center px-4 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex flex-col pl-2.5 mt-5">
            <div className="text-xs text-slate-900">
              <h1 className="text-blue-800 font-semibold">Forgot Password?</h1>
            </div>
            <div className="flex justify-center items-center px-16 py-3.5 mt-9 text-xl font-bold text-white whitespace-nowrap bg-orange-600 rounded-3xl max-md:px-5">
              <h1>Sign in</h1>
            </div>
            <div className="self-center mt-11 text-sm whitespace-nowrap text-slate-900 max-md:mt-10">
              or continue with
            </div>
            <div className="flex gap-10 sm:gap-24 justify-between self-center mt-4">
              <div className="text-4xl sm:bg-white w-24 rounded-[23px] h-12 flex justify-center items-center">
                <FcGoogle />
              </div>

              <div className="text-4xl sm:bg-white w-24 rounded-[23px] h-12 flex justify-center items-center">
                <FaGithub />
              </div>
            </div>
            <div className="self-start mt-8 ml-10 text-sm whitespace-nowrap text-slate-900 max-md:ml-2.5">
              <h1 className="flex">
                Don’t have an account yet ?
                <h1 className="text-blue-800 font-semibold">
                  {" "}
                  {flag ? "Register" : "Login"}
                </h1>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center lg:w-[50%] md:ml-[3%] ml-auto max-w-[700px]">
        <img
          src="/src/assets/loginImage.png"
          alt="Login Image"
          className="object-cover "
        />
      </div>
    </div>
  );
}

export default AuthForm;
