import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("myToken");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing token:", error);
        localStorage.removeItem("myToken");
      }
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("myToken");
    setUser(null);
    navigate('/');
  };

  return (
    <div className="text-white text-xl flex flex-col md:flex-row md:justify-between h-[80px] items-center px-4 font-light ">
      <div className=" z-10 md:w-1/3 text-lg md:text-base md:pl-48 mb-2 md:mb-0">
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="md:w-2/3 text-3xl flex flex-col md:flex-row md:justify-center md:gap-10">
        {user ? (
          <div className="flex items-center ml-6 md:ml-48">
            <NavLink to="/addPage" className="text-white mr-12 hover:text-yellow-200">
              Add Location
            </NavLink>
            <div className="text-white mr-3">Welcome, {user.firstName}</div>
            <NavLink to="/profile" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                id="profile"
                className="ml-2 h-12 w-12 text-blue-500"
              >
                <circle cx="16" cy="16" r="15" fill="#96d7ff"></circle>
                <path
                  fill="#86c3ef"
                  d="M2.35,17A15,15,0,0,1,25.59,4.48a15,15,0,1,0-17.83,24A15,15,0,0,1,2.35,17Z"
                ></path>
                <path
                  fill="#bf9e99"
                  d="M16,6.09a7.31,7.31,0,0,0-7.3,7.3v15.1a1,1,0,0,0,.55.89,14.87,14.87,0,0,0,13.5,0,1,1,0,0,0,.55-.89V13.39A7.31,7.31,0,0,0,16,6.09Z"
                ></path>
                <path
                  fill="#ff9797"
                  d="M16,31a14.88,14.88,0,0,0,10.09-3.94.62.62,0,0,0,0-.23,6.65,6.65,0,0,0-6.3-4.54h-7.5A6.65,6.65,0,0,0,6,26.83a.62.62,0,0,0,0,.23A14.88,14.88,0,0,0,16,31Z"
                ></path>
                <path
                  fill="#e47979"
                  d="M6.51,27.39a6.67,6.67,0,0,1,6.3-4.54h7.51a6.62,6.62,0,0,1,4.38,1.68,6.65,6.65,0,0,0-4.95-2.24h-7.5A6.65,6.65,0,0,0,6,26.83a.62.62,0,0,0,0,.23c.18.17.38.32.57.48A.8.8,0,0,1,6.51,27.39Z"
                ></path>
                <path
                  fill="#ecc5b4"
                  d="M18.7,15.83H13.3a1,1,0,0,0-1,1V23.3a1,1,0,0,0,.45.83l2.7,1.8a1,1,0,0,0,1.1,0l2.7-1.8a1,1,0,0,0,.45-.83V16.83A1,1,0,0,0,18.7,15.83Z"
                ></path>
                <path
                  fill="#ecc5b4"
                  d="M21.5,12.77h-11a3,3,0,0,0,0,6h11a3,3,0,0,0,0-6Z"
                ></path>
                <path
                  fill="#f4dab7"
                  d="M18.46,9H13.54a3.49,3.49,0,0,0-3.49,3.49v3.36a5.95,5.95,0,0,0,11.9,0V12.46A3.49,3.49,0,0,0,18.46,9Z"
                ></path>
                <path
                  fill="#d6b5b0"
                  d="M23.2,12.66l.06,0A7.28,7.28,0,0,0,12.88,6.8a1.08,1.08,0,0,0,.06.77,9.75,9.75,0,0,0,2.94,3.58,8.84,8.84,0,0,0,5.28,1.76A9,9,0,0,0,23.2,12.66Z"
                ></path>
                <path
                  fill="#d6b5b0"
                  d="M19,6.76A7.29,7.29,0,0,0,8.7,13.39v.39a7.85,7.85,0,0,0,1.19.09,9.26,9.26,0,0,0,7-3.21A10.45,10.45,0,0,0,19,6.8Z"
                ></path>
              </svg>
            </NavLink>
            <button onClick={handleLogout} class="relative ml-5 bg-red-100 inline-flex items-center px-6 py-1 overflow-hidden text-base font-medium text-red-600 border-2 border-red-600 rounded-full hover:text-white group hover:bg-gray-50">
                <span class="absolute left-0 block w-full h-0 transition-all bg-red-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span class="absolute right-0 flex items-center justify-start w-5 h-5 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    class="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span class="relative">Logout</span>
              </button>
            {/* Adjusted margins for smaller screens */}
          </div>
        ) : (
          <>
            <NavLink to="/login">
              <button class="relative bg-red-100 inline-flex items-center px-6 py-1 overflow-hidden text-base font-medium text-red-600 border-2 border-red-600 rounded-full hover:text-white group hover:bg-gray-50">
                <span class="absolute left-0 block w-full h-0 transition-all bg-red-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span class="absolute right-0 flex items-center justify-start w-5 h-5 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    class="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span class="relative">Login / Sign Up</span>
              </button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
