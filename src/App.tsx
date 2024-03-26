import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/AuthPages/SignupPage";
import LoginPage from "./Pages/AuthPages/LoginPage";
import FreelancerReg from "./Component/Registration/FreelancerReg";
import Registration from "./Pages/Registration/Registration";
import VerifyEmail from "./Component/Authentication/VerifyEmail";
import { RootState } from "./Redux/Store";
import { useSelector } from "react-redux";
import ClientHomePage from "./Pages/HomePages/FreelancerHomePage";
import LandingPage from "./Component/Home/LandingPage";
import "./App.css"

function App() {

  const user = useSelector((state: RootState) => state.userDetails.user);
  user ? console.log("user is authenticated") : console.log("user is not authenticated");




  return (

    <Routes>
      <Route path="/login" element={user ? <Navigate to={"/home"} /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to={"/home"} /> : <SignupPage />} />
      <Route path="/home" element={<ClientHomePage />} />
      <Route path="/selection" element={<FreelancerReg />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/page-1" element={<Registration />} />
      <Route path="/landingpage" element={<LandingPage />} />
    </Routes>

  );
}

export default App;
