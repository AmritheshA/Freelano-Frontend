// AdminRoutes.jsx
import { Route } from 'react-router-dom';
import { FreelancerManagement } from '@/Component/Admin/FreelancerManagement';
import { ClientManagement } from '@/Component/Admin/ClientManagement';
import AdminSubscription from '@/Component/Admin/Subscription';

const AdminRoutes = () => (
    <>
        <Route path="/freelancers" element={<FreelancerManagement />} />
        <Route path="/clients" element={<ClientManagement />} />
        <Route path="/subscription" element={<AdminSubscription />} />
    </>
);

export default AdminRoutes;