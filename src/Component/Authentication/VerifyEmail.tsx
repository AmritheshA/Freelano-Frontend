import { useDispatch } from "react-redux";
import { Loading } from 'react-loading-dot'
import { useEffect } from "react";
import { userRegisterAction } from "@/Redux/Actions/UserActions/userActions";
import { TypeDispatch } from "@/Redux/Store";




const VerifyEmail = () => {

  const url = window.location.href;
  const params = new URLSearchParams(new URL(url).search);
  const token = params.get("token");

  const dispatch: TypeDispatch = useDispatch();

  useEffect(() => {
    dispatch(userRegisterAction(String(token)));
  }, [dispatch, token]);




  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Loading margin="2rem" background="blue" size="2rem" />
      <div className="absolute top-0 left-0 p-10 sm:pl-36">
        <div className="text-white font-bold text-lg">
          <img
            className="h-16 xl:h-35 md:h-35 sm:h-22"
            src="/src/assets/logo.png"
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
