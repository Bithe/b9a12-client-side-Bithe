import { NavLink } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Register = () => {
  const { registerUser, setUser } = useContext(AuthContext);

  console.log(registerUser);

  // FOR ERROR
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // FOR SHOW PASSWORD
  const [showPassword, setShowPassword] = useState(false);

  //   NAVIGATION
  const navigate = useNavigate();
  const location = useLocation();
  const back = location?.state?.from || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    console.log(name, email, photo, password);

    // PASSWWORD VARIFICATION
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      setError(
        "Password should be 6 character, must have an Uppercase letter, a lower letter"
      );
      toast(
        "Password should be 6 character, must have an Uppercase letter, a lower letter"
      );
      return;
    }

    //  EMAIL VARIFICATION
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    setError("");
    setSuccess("");

    registerUser(email, password, photo, name)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });

        if (result.user) {
          navigate(back);
        }

        setSuccess("Registration Successful");
        toast("Registration Successful");
        setUser(result.user);
        return;
      })
      .catch((error) => {
        console.log(error.message);
        toast("Email already used");
      });
  };

  return (
    <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <Helmet>
          <title>Zendesk | Register</title>
        </Helmet>

        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12 rounded-lg">
                  <img
                    src="/registe.gif"
                    className="w-full"
                    alt="Sample image"
                  />
                </div>

                <div className="flex items-center rounded-b-lg lg:w-6/12 py-8 lg:rounded-e-lg lg:rounded-bl-none justify-center ">
                  <div className="px-4 py-6 md:mx-6 md:p-12 border rounded-lg lg:w-full">
                    <form onSubmit={handleRegister}>
                      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                        <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                          Register Now
                        </p>
                      </div>

                      <div
                        className="relative mb-6"
                        data-twe-input-wrapper-init
                      >
                        User Name:
                        <input
                          name="name"
                          type="text"
                          required
                          className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear   dark:text-white dark:autofill:shadow-autofill"
                          placeholder="User Name"
                        />
                      </div>

                      <div
                        className="relative mb-6"
                        data-twe-input-wrapper-init
                      >
                        Email:{" "}
                        <input
                          name="email"
                          type="email"
                          required
                          className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear   dark:text-white dark:autofill:shadow-autofill"
                          placeholder="Email address"
                        />
                      </div>

                      <div
                        className="relative mb-6"
                        data-twe-input-wrapper-init
                      >
                        Photo:{" "}
                        <input
                          type="url"
                          name="photo"
                          className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear   dark:text-white dark:autofill:shadow-autofill"
                          placeholder="photo"
                        />
                      </div>

                      <div className="relative" data-twe-input-wrapper-init>
                        Password:{" "}
                        <div className="relative ">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear dark:text-white dark:autofill:shadow-autofill"
                            id="exampleFormControlInput22"
                            placeholder="Password"
                            style={{ paddingRight: "2.5rem" }}
                          />
                          {/* SHOW PASSWORD ICON */}
                          <span
                            className="absolute inset-y-0 right-0 flex px-2 items-center justify-end "
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </span>
                        </div>
                      </div>

                      {/*  */}

                      <div className="text-center py-8 lg:text-left">
                        <button
                          type="submit"
                          className=" pb-2 pt-3
                          
                          flex items-center justify-center w-full mx-2 text-sm font-bold text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
                         
                        >
                          Register
                        </button>

                        {error && (
                          <small className="text-red-600">{error}</small>
                        )}

                        {success && (
                          <small className="text-green-600 font-semibold">
                            {success}
                          </small>
                        )}

                        <div className="flex items-center justify-between pb-6 mb-0 mt-2 pt-1">
                          <p className="mb-0 me-2 font-semibold ">
                            Already have and account?
                          </p>

                          <NavLink to="/login">
                            <button
                              type="button"
                              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xl font-bold uppercase leading-normal text-black transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                              data-twe-ripple-init
                              data-twe-ripple-color="light"
                            >
                              Login
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
