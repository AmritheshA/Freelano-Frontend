import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/AuthPages/SignupPage";
import LoginPage from "./Pages/AuthPages/LoginPage";
import FreelancerReg from "./Component/Registration/FreelancerReg";
import Registration from "./Pages/Registration/Registration";
import VerifyEmail from "./Component/Authentication/VerifyEmail";
import { RootState } from "./Redux/Store";
import { useSelector } from "react-redux";
import LandingPage from "./Component/Home/LandingPage";
import "./App.css"
import { useEffect, useState } from "react";
import HomePages from "./Pages/HomePages/HomePages";
import { toast } from "react-toastify";
import axiosInstance from "./Config/AxiosConfig/axiosConfig";
import Allworks from "./Component/Freelancer/Allworks";

function App() {

  const user = useSelector((state: RootState) => state.userDetails.user);
  user ? console.log("user is authenticated") : console.log("user is not authenticated");
  const [activeComponent, setActiveComponent] = useState("component1");
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>();

  const handleActiveComponent = (value: string) => {
    setActiveComponent(value);
  }

  useEffect(() => {
    if (user) {
      axiosInstance.get(`/api/v1/user/checkRegistrationCompleted?userId=${user.userId}`)
        .then((response) => {
          if (response.status === 200) {
            setIsProfileComplete(response.data);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          if (error.response && error.response.data) {
            toast(error.response.data);
          }
        });
    } else {
      console.log("user is null");
    }

  }, [user]);

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={"/home"} /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to={"/home"} /> : <SignupPage />} />
      <Route path="/home" element={user ? <HomePages user={user} /> : <Navigate to={"/login"} />} />
      <Route path="/selection" element={<FreelancerReg />} />
      <Route path="/verifyEmail" element={user ? <Navigate to={"/registration"} /> : <VerifyEmail />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/registration" element={isProfileComplete || user?.role == "CLIENT" ? <Navigate to={"/home"} /> : <Registration activeComponent={activeComponent} handleActiveComponent={handleActiveComponent} />} />
      <Route path="/jobs" element={user ? <Allworks /> : <Navigate to={"/home"} />} />
    </Routes>
  );
}

export default App;
