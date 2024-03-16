import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/AuthPages/SignupPage";
import LoginPage from "./Pages/AuthPages/LoginPage";
import FreelancerReg from "./Components/Registration/FreelancerReg";
import Registration from "./Pages/Registration/Registration";
import VerifyEmail from "./Components/Authentication/VerifyEmail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignupPage />} />
        <Route path="/selection" element={<FreelancerReg />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/page-1" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
