
import ClientHome from "@/Component/Home/Client/ClientHome";
import FreelancerHome from "../../Component/Home/Freelancer/FreelancerHome";
import AdminDashoBoard from "@/Component/Home/Admin/AdminDashBoard";

function HomePages({ user }: { user: any }) {

  

  return (

    <div>

      {(user?.role == "FREELANCER") && <FreelancerHome />}
      {(user?.role == "CLIENT") && <ClientHome />}
      {(user?.role == "ADMIN") && <AdminDashoBoard/>}

    </div>
  );
}

export default HomePages;
