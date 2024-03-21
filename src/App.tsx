import { Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/AuthPages/SignupPage";
import LoginPage from "./Pages/AuthPages/LoginPage";
import FreelancerReg from "./Components/Registration/FreelancerReg";
import Registration from "./Pages/Registration/Registration";
import VerifyEmail from "./Components/Authentication/VerifyEmail";
import { RootState } from "./Redux/Store";
import { useSelector } from "react-redux";
import ClientHomePage from "./Pages/HomePages/ClientHomePage";

function App() {


  const user = useSelector((state: RootState) => state.userDetails.user);
  console.log(user);
  
  return (
    <Routes>
      <Route path="/login" element={user ? <ClientHomePage /> : <LoginPage />} />
      <Route path="/signUp" element={user ? <ClientHomePage /> : <SignupPage />} />
      <Route path="/home" element={<ClientHomePage />} />
      <Route path="/selection" element={<FreelancerReg />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/page-1" element={<Registration />} />
    </Routes>

  );
}

export default App;
