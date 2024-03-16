import Navbar from "./Navbar";
import AuthForm from "./AuthForm";

function SingUp() {
  return (
    <div className="min-h-screen bg-blue-200">
      <Navbar />
      <AuthForm flag={false} />
    </div>
  );
}

export default SingUp;
