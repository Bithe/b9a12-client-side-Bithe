import { useContext, useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcManager, FcSettings } from "react-icons/fc";

import { AiOutlineBars } from "react-icons/ai";
import { NavLink } from "react-router-dom";
// import useAuth from '../../../hooks/useAuth'
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

import { PiHandTapDuotone, PiUsersThreeFill } from "react-icons/pi";
import { GoReport } from "react-icons/go";
import { FcSurvey } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import ToggleBtn from "../Shared/ToggleBtn";
import { FaUsers } from "react-icons/fa";
import { MdOutlineManageSearch } from "react-icons/md";
import { LiaComments } from "react-icons/lia";
import { RiSecurePaymentFill } from "react-icons/ri";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const { logout } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [isActive, setActive] = useState(false);
  const [role, isLoading] = useRole();
  console.log(role, isLoading);
  const [toggle, setToggle] = useState(true);

  // SIDEBAR HANDLE FOR RESPONSIVE
  const handleToggle = () => {
    setActive(!isActive);
  };

  // USER/SURVEYOR TOGGLE HANDLE
  const toggleHandler = (event) => {
    setToggle(event.target.checked);
  };

  // REQUESTING TO BE A SURVEYOR
  const handleRequestSurveyor = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure to sent the request?",
      text: "You won't be able to revert the request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sent my request!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const currentUser = {
            email: user?.email,
            role: "user",
            status: "Requested",
          };
          const { data } = await axiosSecure.put(`/user`, currentUser);
          console.log(data);
          if (data.modifiedCount > 0) {
            Swal.fire(
              "Request!",
              "Your request has been sent. Please wait for approval",
              "success"
            );
          }
        } catch (err) {
          Swal.fire(
            "Error!",
            "There was a problem for your surveyor request.",
            "error"
          );
          console.log(err.message);
        }
      }
    });
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <Helmet>
          <title>Zendesk | Dashboard</title>
        </Helmet>
        <div>
          <div className="block cursor-pointer p-4 font-bold ">
            <Link to="/" className=" flex">
              <img
                src="https://i.ibb.co/SwH272v/cologo.jpg"
                alt="Company Logo"
                className="h-8 w-auto mr-2 rounded-full"
              />{" "}
              <a className=" lg:text-xl font-bold text-black ">Zendesk</a>{" "}
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-[#834333] mx-auto">
              <Link to="/" className=" flex">
                {/* <img
                  // className='hidden md:block'
                  src='https://i.ibb.co/4ZXzmq5/logo.png'
                  alt='logo'
                  width='100'
                  height='100'
                /> */}
                <img
                  src="https://i.ibb.co/SwH272v/cologo.jpg"
                  alt="Company Logo"
                  className="h-8 w-auto mr-2 rounded-full"
                />{" "}
                <a className=" lg:text-xl font-bold text-white ">Zendesk</a>{" "}
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}
            {/* {role === "Surveyor" && (
              <ToggleBtn
                toggleHandler={toggleHandler}
                toggle={toggle}
              ></ToggleBtn>
            )} */}

            {/*  Menu Items */}
            <nav>
              {/* USER-------------------------------------------------------------- */}
              {(role === "user" ||
                role === "surveyor" ||
                role === "pro-user") &&
                toggle && (
                  <>
                    <NavLink
                      to="/dashboard/user/surveys"
                      end
                      className={({ isActive }) =>
                        `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                          isActive
                            ? "bg-gray-300 text-gray-700"
                            : "text-gray-600"
                        }`
                      }
                    >
                      <PiHandTapDuotone className="w-5 h-5" />
                      <span className="mx-4 font-medium">
                        My Participated Surveys
                      </span>
                    </NavLink>

                    <NavLink
                      to="my-reports"
                      className={({ isActive }) =>
                        `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                          isActive
                            ? "bg-gray-300 text-gray-700"
                            : "text-gray-600"
                        }`
                      }
                    >
                      <GoReport className="w-5 h-5" />
                      <span className="mx-4 font-medium">My Reports</span>
                    </NavLink>
                  </>
                )}

              {/* PRO-USER ------------------------------------------------ */}
              {role === "pro-user" && toggle && (
                <>
                  <NavLink
                    to="/dashboard/user/comments"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? "bg-gray-300 text-gray-700" : "text-gray-600"
                      }`
                    }
                  >
                    <LiaComments className="w-5 h-5" />
                    <span className="mx-4 font-medium">Comments</span>
                  </NavLink>
                </>
              )}

              {/* SURVEYOR STARTS---------------------------------------------------------------- */}
              {/* Create SURVEY */}

              {role === "surveyor" && toggle && (
                <>
                  <NavLink
                    to="/dashboard/surveyor/create"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? "bg-gray-300 text-gray-700" : "text-gray-600"
                      }`
                    }
                  >
                    <FcSurvey className="w-5 h-5" />
                    <span className="mx-4 font-medium">Create Survey</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard/surveyor/all-my-survey"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? "bg-gray-300 text-gray-700" : "text-gray-600"
                      }`
                    }
                  >
                    <HiOutlineDocumentReport className="w-5 h-5" />
                    <span className="mx-4 font-medium">Modify My Survey</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard/surveyor/surveys"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? "bg-gray-300 text-gray-700" : "text-gray-600"
                      }`
                    }
                  >
                    <FaUsers className="w-5 h-5" />
                    <span className="mx-4 font-medium">
                       My Survey Responses{" "}
                    </span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/surveyor/surveys/:id"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? "bg-gray-300 text-gray-700" : "text-gray-600"
                      }`
                    }
                  >
                    <FaUsers className="w-5 h-5" />
                    <span className="mx-4 font-medium">Toggle </span>
                  </NavLink>
                </>
              )}

              {/*SURVEYOR ENDS ------------------------------------------------------------------------------------- */}


              {/* ADMIN WILL SEE---------------------------------------------------------------------------- */}

              {/* MANAGE USERS  */}
              {role === "admin" && (
                <>
                  {" "}
                  <NavLink
                    to="/dashboard/admin/users"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <FcManager className="w-5 h-5" />

                    <span className="mx-4 font-medium">Manage Users</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/admin/surveys"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <MdOutlineManageSearch className="w-5 h-5" />

                    <span className="mx-4 font-medium">Manage Surveys</span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/admin/payments"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <RiSecurePaymentFill className="w-5 h-5" />

                    <span className="mx-4 font-medium">All Payments</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard/admin/responses"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                        isActive
                          ? "bg-gray-300  text-gray-700"
                          : "text-gray-600"
                      }`
                    }
                  >
                    <PiUsersThreeFill className="w-5 h-5" />

                    <span className="mx-4 font-medium">All Responses</span>
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu ----------------------------------------------------- */}
          {role === "user" ||
            (role === "pro-user" && (
              <NavLink
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <FcSettings className="w-5 h-5" />

                <span
                  onClick={handleRequestSurveyor}
                  className="mx-4 font-medium"
                >
                  Request to be a Surveyor
                </span>
              </NavLink>
            ))}

          <NavLink
            onClick={logout}
            to="/login"
            className=" text-white font-semibold text-lg hover:text-black"
            style={{
              background:
                "linear-gradient(90deg, bg-teal-500 0%, bg-blue-500 35%, bg-blue-500 100%)",
            }}
          >
            <button className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform">
              <GrLogout className="w-5 h-5" />

              <span className="mx-4 font-medium">Logout</span>
            </button>{" "}
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
