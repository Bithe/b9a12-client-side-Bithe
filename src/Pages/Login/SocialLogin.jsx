import { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SocialLogin = () => {
//   const { googleLogin, githubLogin, twitterLogin } = useContext(AuthContext);
  const { googleLogin } = useContext(AuthContext);

  //   NAVIGATION
  const navigate = useNavigate();
  const location = useLocation();
  const back = location?.state?.from || "/";

  const handleSocialLogin = async (socialProvider) => {
    try {
      const result = await socialProvider();
      if (result.user) {
        navigate(back);

        const { data } = await axios.post(
          'https://prod-swap-hub-server.vercel.app/jwt',
          { email: result?.user?.email },
          { withCredentials: true }
        );
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className="flex justify-around py-8 ">
     

      {/*  */}
      {/* <button
        onClick={() => handleSocialLogin(googleLogin)}
        className="btn bg-[#742437] text-white"
      >
        {" "}
        Google Login
      </button> */}

      <button
        onClick={() => handleSocialLogin(googleLogin)}
        type="button"
        className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
      >
        <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
          <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
        </svg>

        <span className="hidden mx-2 sm:inline">Sign in with Google</span>
      </button>


      {/* TWITTER LOGIN */}
      {/* <button
        onClick={() => handleSocialLogin(twitterLogin)}
        className="btn text-white bg-blue-500"
      >
        Twitter Login
      </button> */}
    </div>
  );
};

export default SocialLogin;
