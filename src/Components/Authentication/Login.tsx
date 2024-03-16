import Navbar from "./Navbar";
import AuthForm from "./AuthForm";

function Login() {
  return (
    <div className="min-h-screen bg-blue-200">
      <Navbar />
      <AuthForm flag={true} />
    </div>
  );
}

export default Login;
