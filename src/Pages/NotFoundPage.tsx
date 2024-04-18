import { Link } from 'react-router-dom';
import sadImage from '../assets/sad-emoji.svg';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="text-white text-center">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-4xl font-semibold mb-8">Oops! Page not found</h2>
        <p className="text-lg mb-12">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/home"
          className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-indigo-100 transition duration-300"
        >
          Go Home
        </Link>
      </div>
      <div className="mt-20">
        <img
          src={sadImage}
          alt="Sad Image"
          className="w-32 h-32 animate-bounce"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;