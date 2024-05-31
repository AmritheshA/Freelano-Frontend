import "./App.css"
import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/AuthPages/SignupPage";
import LoginPage from "./Pages/AuthPages/LoginPage";
import FreelancerReg from "./Component/Registration/FreelancerReg";
import Registration from "./Pages/Registration/Registration";
import VerifyEmail from "./Component/Authentication/VerifyEmail";
import { RootState } from "./Redux/Store";
import { useSelector } from "react-redux";
import LandingPage from "./Component/Home/LandingPage";
import { useEffect, useState } from "react";
import HomePages from "./Pages/HomePages/HomePages";
import { toast } from "react-toastify";
import axiosInstance from "./Config/AxiosConfig/axiosConfig";
import Allworks from "./Component/Freelancer/Allworks";
import NotFoundPage from "./Pages/NotFoundPage";
import Project from "./Component/Freelancer/Project";
import AddTasks from "./Component/Freelancer/AddTasks";
import { ProjectProvider } from "./Context/ProjectContext/ProjectProvider ";
import Chat from "./Component/Freelancer/Chat/FreelancerChat";
import { MessageProvider } from "./Context/MessageContext/MessageProvider";
import ClientChat from "./Component/Client/ClientChat";
import VideoCallPage from "./Pages/VideoCallPage";
import ClientProject from "./Component/Client/ClientProject";
import Settings from "./Component/Freelancer/Settings/Settings";
import { FreelancerManagement } from "./Component/Admin/FreelancerManagement";
import { ClientManagement } from "./Component/Admin/ClientManagement";
import AdminSubscription from "./Component/Admin/Subscription";
import { FreelancerProvider } from "./Context/UserContext/FreelancerProvider";
import Complete from "./Component/Freelancer/Complete";
import { ClientProvider } from "./Context/UserContext/ClientProvider";
import ClientSettings from "./Pages/ClientPages/Settings/ClientSettings";
import ClientRegistration from "./Pages/Registration/ClientRegister";
import { requestPermission } from "./Config/FirebaseConfig/FirebaseConfig";


function App() {

  const user = useSelector((state: RootState) => state.userDetails.user);

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
            setIsProfileComplete(response?.data);
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

  useEffect(() => {

    console.log("token is called");

    requestPermission()
      .then((token) => {
        if (token) {
          console.log(token);

        } else {
          console.log('Failed to get token');
        }
      })
      .catch((err) => {
        console.error('Error requesting permission:', err);
      });
    console.log("for each refresh ...");

  }, [user,]);

  return (
    <ProjectProvider>
      <MessageProvider>
        <FreelancerProvider>
          <ClientProvider>
            <Routes>
              <Route path="/login" element={user ? <Navigate to={"/home"} /> : <LoginPage />} />
              <Route path="/signup" element={user ? <Navigate to={"/home"} /> : <SignupPage />} />
              <Route path="/home" element={user ? <HomePages user={user} /> : <Navigate to={"/login"} />} />
              <Route path="/selection" element={<FreelancerReg />} />
              <Route path="/verifyEmail" element={user ? <Navigate to={"/registration"} /> : <VerifyEmail />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/registration" element={isProfileComplete || user?.role == "CLIENT" ? <ClientRegistration /> : <Registration activeComponent={activeComponent} handleActiveComponent={handleActiveComponent} />} />
              <Route path="/jobs" element={user ? <Allworks /> : <Navigate to={"/home"} />} />
              <Route path="/projects" element={user ? user?.role == "FREELANCER" ? <Project /> : <ClientProject /> : <Navigate to={"/login"} />} />
              <Route path="/projects/addTasks/:commitedProjectId" element={user ? <AddTasks /> : <Navigate to={"/login"} />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/message" element={user ? user?.role == "CLIENT" ? <ClientChat /> : <Chat /> : <Navigate to={"/login"} />} />
              <Route path="/meeting" element={user ? <VideoCallPage /> : <Navigate to={"/login"} />} />
              {/* <Route path="/sample" element={user ? <Sample /> : <Navigate to={"/login"} />} /> */}
              <Route path="/settings/:state/:freelancerId" element={user ? (user.role == "FREELANCER" ? <Settings /> : <ClientSettings />) : <Navigate to={"/login"} />} />
              <Route path="/freelancers" element={user ? <FreelancerManagement /> : <Navigate to={"/login"} />} />
              <Route path="/clients" element={user ? <ClientManagement /> : <Navigate to={"/login"} />} />
              <Route path="/subscription" element={user ? <AdminSubscription /> : <Navigate to={"/login"} />} />
              {/* <Route path="/payment" element={<Payment />} /> */}
              <Route path="/complete" element={<Complete />} />
            </Routes>
          </ClientProvider>
        </FreelancerProvider>
      </MessageProvider>
    </ProjectProvider>
  );
}

export default App;
