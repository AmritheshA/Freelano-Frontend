import { Navigate } from "react-router-dom";
import FreelancerHome from "../../Component/Home/Freelancer/FreelancerHome";

function HomePages({ user }: { user: any }) {
  return (
    <div>
      {user?.role === "FREELANCER" ? <Navigate to={"/registration"} />: <FreelancerHome />}
    </div>
  );
}

export default HomePages;
