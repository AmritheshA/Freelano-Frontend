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
import { useState } from "react";
import HomePages from "./Pages/HomePages/HomePages";

function App() {

  const user = useSelector((state: RootState) => state.userDetails.user);
  user ? console.log("user is authenticated") : console.log("user is not authenticated");

  const [activeComponent, setActiveComponent] = useState("component1");

  const handleActiveComponent = (value: string) => {
    setActiveComponent(value);
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={"/home"} /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to={"/home"} /> : <SignupPage />} />
      <Route path="/home" element={<HomePages user={user} />} />
      <Route path="/selection" element= {<FreelancerReg />} />
      <Route path="/verifyEmail" element={user ? <Navigate to={"/home"} /> : <VerifyEmail />} />
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/registration" element={<Registration activeComponent={activeComponent} handleActiveComponent={handleActiveComponent} />} />
    </Routes>
  );
}

export default App;
