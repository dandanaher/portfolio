import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.warn("Attempted to open missing route:", pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">The requested page is missing.</p>
        <Link to="/" className="font-semibold text-blue-500 underline hover:text-blue-700">
          Return to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
