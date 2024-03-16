const VerifyEmail = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Verify Your Email</h2>
        <p className="text-gray-700 text-lg mb-6 text-center">Check your email and click the link to activate your account.</p>
        <div className="flex justify-center">
          <div className="animate-bounce w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-4 text-center">Didn't receive the email? <a href="#" className="text-blue-500">Resend</a></p>
      </div>
      <div className="absolute top-0 left-0 p-10 sm:pl-36">
        <div className="text-white font-bold text-lg">
          <img
            className="h-16 xl:h-35 md:h-35 sm:h-22"
            src="/src/assets/logo.png"
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
