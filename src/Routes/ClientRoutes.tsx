// ClientRoutes.jsx
import { Route } from 'react-router-dom';
import HomePages from '@/Pages/HomePages/HomePages';
import ClientChat from '@/Component/Client/ClientChat';
import ClientProject from '@/Component/Client/ClientProject';

const ClientRoutes = ({ user }: any) => (
    <>
        <Route path="/home" element={<HomePages user={user} />} />
        <Route path="/message" element={<ClientChat />} />
        <Route path="/projects" element={<ClientProject />} />
    </>
);

export default ClientRoutes;