
import { Link } from "react-router"; 

const ErrorPage = ({ message = "Something went wrong. Please try again later." }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 px-4">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <p className="text-xl text-red-700 mb-6">{message}</p>
      <Link to="/" className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
        Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
