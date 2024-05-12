// FreelancerRoutes.jsx
import { Route } from 'react-router-dom';
import HomePages from '@/Pages/HomePages/HomePages';
import Chat from '@/Component/Freelancer/Chat/FreelancerChat';
import Project from '@/Component/Freelancer/Project';
import FreelancerReg from '@/Component/Registration/FreelancerReg';
import AddTasks from '@/Component/Freelancer/AddTasks';

const FreelancerRoutes = ({ user }:any) => (
    <>
        <Route path="/home" element={<HomePages user={user} />} />
        <Route path="/selection" element={<FreelancerReg />} />
        <Route path="/message" element={<Chat />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/projects/addTasks/:commitedProjectId" element={<AddTasks />} />
    </>
);

export default FreelancerRoutes;