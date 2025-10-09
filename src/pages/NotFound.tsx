import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.warn("Attempted to open missing route:", pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf8f4]">
      <div className="text-center text-[#3c3d3b]">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-[#3c3d3b]">The requested page is missing.</p>
        <Link to="/" className="font-semibold text-[#3c3d3b] underline">
          Return to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
