
import ClientHome from "@/Component/Home/Client/ClientHome";
import FreelancerHome from "../../Component/Home/Freelancer/FreelancerHome";

function HomePages({ user }: { user: any }) {
  return (

    <div>
      {(user?.role === "FREELANCER") && <FreelancerHome />}
      {(user?.role == "CLIENT") && <ClientHome />}
    </div>
  );
}

export default HomePages;
