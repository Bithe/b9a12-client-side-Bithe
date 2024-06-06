import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  console.log(loginUser);

  // FOR ERROR
  const [error, setError] = useState("");

  // FOR SHOW PASSWORD
  const [showPassword, setShowPassword] = useState(false);

  //   NAVIGATION
  const navigate = useNavigate();
  const location = useLocation();
  const back = location?.state?.from || "/";

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast("Login Successful");

        if (result.user) {
          navigate(back);
        }
        return;
      })
      .catch((error) => {
        console.log(error.message);
        setError("Incorrect email or password");
      });
  };

  return (
    <div>
      <Helmet>
        <title>ProdSwap | Login</title>
      </Helmet>

      <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
        <div className="container h-full p-10">
          <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap justify-center items-center">
                  <div className=" px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      <div className="text-center rounded-full">
                        <img
                          className="mx-auto w-48 rounded-full"
                          src="/login.avif"
                          alt="logo"
                        />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          Login{" "}
                        </h4>
                      </div>

                      {/* <form onSubmit={handleLogin}> */}
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <p className="mb-4">Please login to your account</p>

                        <div
                          className="relative mb-6"
                          data-twe-input-wrapper-init
                        >
                          Email:{" "}
                          <input
                            name="email"
                            type="email"
                            className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear   dark:text-white dark:autofill:shadow-autofill"
                            placeholder="Email address"
                            {...register("email", { required: true })}
                          />
                          {errors.email && (
                            <span className="text-red-500 font-bold ">
                              Please give a valid email
                            </span>
                          )}
                        </div>

                        <div
                          className="relative mb-6"
                          data-twe-input-wrapper-init
                        >
                          Password:{" "}
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear   dark:text-white dark:autofill:shadow-autofill"
                              id="exampleFormControlInput22"
                              placeholder="Password"
                              {...register("password", { required: true })}
                            />
                            {/* SHOW PASSWORD ICON */}
                            <span
                              className="absolute inset-y-0 right-0 flex px-2 items-center justify-end "
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>

                            {errors.password && (
                              <span className="text-red-500 font-bold ">
                                Please give a valid password
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                            className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-bold text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
                            type="submit"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                            // style={{
                            //   background:
                            //     "linear-gradient(90deg, #020024 0%, #090979 35%, #00D4FF 100%)",
                            // }}
                          >
                            Log in
                          </button>
                        </div>
                        {error && (
                          <small className="text-red-600">{error}</small>
                        )}
                      </form>

                      <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                        <a
                          href="#"
                          className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                        >
                          or login with Social Media
                        </a>

                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                      </div>

                      <SocialLogin></SocialLogin>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mt-8 text-xs font-light text-center text-gray-400">
                          {" "}
                          Dont have an account?{" "}
                          <a
                            href="#"
                            className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
                          >
                            Create One
                          </a>
                        </p>
                        <NavLink to="/register">
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xl font-bold uppercase leading-normal text-black transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-teal-950 dark:focus:bg-teal-950"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                          >
                            Register
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>

                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
