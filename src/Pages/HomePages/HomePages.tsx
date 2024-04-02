
import FreelancerHome from "../../Component/Home/Freelancer/FreelancerHome";

function HomePages({ user }: { user: any }) {
  return (
    
    <div>
      {(user?.role === "FREELANCER") && <FreelancerHome />}
    </div>
  );
}

export default HomePages;
