import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const [theme, setTheme] = useState("light");

  //   SET THE THEME TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleTheme = (e) => {
    if (e.target.checked) {
      setTheme("synthwave");
    } else {
      setTheme("light");
    }
  };
  return (
    <div className="container mx-auto lg:px-20 lg:py-8">
      <div className="navbar bg-base-100 sticky z-10 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <img
                src="https://i.ibb.co/SwH272v/cologo.jpg"
                alt="Company Logo"
                className="h-8 w-auto mr-2"
              />{" "}
              <a className=" lg:text-3xl font-bold text-[#834333] ">Zendesk</a>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "dark:bg-white dark:text-gray-900 border rounded-lg p-4 text-lg font-bold border-[#1a3147] bg-white text-black"
                    : ""
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/surveys"
                data-tooltip-id="surveys"
                data-tooltip-content="Surveys"
                data-tooltip-place="top"
                className={({ isActive }) =>
                  isActive
                    ? "dark:bg-white dark:text-gray-900 border rounded-lg p-4 font-bold border-[#1a3147] bg-white text-black"
                    : "text-xl "
                }
              >
                Surveys
              </NavLink> 
              <NavLink
              to="/pro-membership"
              data-tooltip-id="surveys"
              data-tooltip-content="Surveys"
              data-tooltip-place="top"
              className={({ isActive }) =>
                isActive
                  ? "dark:bg-white dark:text-gray-900 border rounded-lg p-4 font-bold border-[#1a3147] bg-white text-black"
                  : "text-xl "
              }
            >
              Pro-Membership
            </NavLink>
              {/* PROTECTIVE ROUTE */}
              {user && (
                <div className=" flex flex-col lg: justify-center gap-8"></div>
              )}
            </ul>
          </div>
          <img
            src="logo.jpg"
            alt="Company Logo"
            className="h-8 w-auto mr-2 hidden sm:block"
          />{" "}
          <a className=" lg:text-3xl font-bold hidden sm:block text-[#834333] ">
            Zendesk
          </a>
        </div>

        {/* larger device */}
        <div className="navbar-center hidden lg:flex gap-2 md:px-8 md:hidden">
          <ul className=" menu-horizontal px-1 gap-8 justify-center items-center menu menu-sm">
            <Tooltip id="home" place="top" effect="solid"></Tooltip>
            <NavLink
              data-tooltip-id="home"
              data-tooltip-content="Home"
              data-tooltip-place="top"
              to="/"
              className={({ isActive }) =>
                isActive
                  ? " dark:bg-white dark:text-gray-900 border rounded-lg p-4 text-lg font-bold border-[#1a3147] bg-white text-black"
                  : "text-xl "
              }
            >
              Home
            </NavLink>

            <Tooltip id="surveys" place="top" effect="solid"></Tooltip>

            <NavLink
              to="/surveys"
              data-tooltip-id="surveys"
              data-tooltip-content="Surveys"
              data-tooltip-place="top"
              className={({ isActive }) =>
                isActive
                  ? "dark:bg-white dark:text-gray-900 border rounded-lg p-4 text-lg font-bold border-[#1a3147] bg-white text-black"
                  : "text-xl "
              }
            >
              Surveys
            </NavLink>
            <NavLink
              to="/pro-membership"
              data-tooltip-id="surveys"
              data-tooltip-content="Surveys"
              data-tooltip-place="top"
              className={({ isActive }) =>
                isActive
                  ? "dark:bg-white dark:text-gray-900 border rounded-lg p-4 text-lg font-bold border-[#1a3147] bg-white text-black"
                  : "text-xl "
              }
            >
              Pro-Membership
            </NavLink>

            {/* PROTECTIVE ROUTE */}

            {user && (
              <div className=" flex justify-center items-center gap-8"></div>
            )}
          </ul>
        </div>

        <div className="navbar-end lg:gap-8 flex gap-80">
          {user ? (
            <div className="flex justify-center items-center gap-8 ">
              {/* THEME */}
              <label className="flex cursor-pointer gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input
                  onChange={handleTheme}
                  type="checkbox"
                  value="synthwave"
                  className="toggle theme-controller"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </label>

              {/*  */}
              {/* image from daisy */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co/Zx54ws3/3dc7c8b92797cd36c8cf431401fc5daf.jpg"
                      }
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">{user.displayName}</a>
                  </li>

                  {/* DASHBOARD */}

                  <li>
                    <NavLink to="/dashboard" className="font-bold">
                      Dashboard
                    </NavLink>
                  </li>

                  <li>
                    <NavLink onClick={logout} to="/login">
                      Logout
                    </NavLink>
                  </li>
                </ul>

                {/*  */}
              </div>
              {/*  */}
              <NavLink
                onClick={logout}
                to="/login"
                className="btn bg-[#834333] text-white font-semibold text-lg hover:text-black"
                style={{
                  background:
                    "linear-gradient(90deg, bg-teal-500 0%, bg-blue-500 35%, bg-blue-500 100%)",
                }}
              >
                Logout
              </NavLink>
            </div>
          ) : (
            <div className="gap-4 flex">
              <NavLink
                to="/login"
                className="btn bg-[#834333] text-white font-semibold text-lg hover:text-black"
                style={{
                  background:
                    "linear-gradient(90deg, bg-teal-500 0%, bg-blue-500 35%, bg-blue-500 100%)",
                }}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn bg-[#834333] text-white font-semibold text-lg hover:text-black"
                style={{
                  background:
                    "linear-gradient(90deg, bg-teal-500 0%, bg-blue-500 35%, bg-blue-500 100%)",
                }}
              >
                Register
              </NavLink>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
