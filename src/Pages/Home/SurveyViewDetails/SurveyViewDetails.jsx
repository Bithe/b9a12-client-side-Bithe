import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";

const SurveyViewDetails = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams(); // Get the survey ID from URL

  // Fetch the specific survey by ID
  const {
    data: survey,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["survey", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/survey/${id}`);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!survey || !survey.questions || survey.questions.length === 0) {
    return <div>No questions found for this survey.</div>;
  }
  return (
   
    <div className="container mx-auto lg:px-20 lg:py-8 text-center">
      <div className="mx-auto border mt-20">
        <Helmet>
          <title>Surveyor | Participate in Survey</title>
        </Helmet>
        <form className="bg-white shadow-md rounded px-8 py-6">
          {/* Display survey details */}
          <div className="mb-4">
            
            <div className="relative m-16">
             
              <span className="absolute -z-10  w-full h-full inset-1 bg-violet-500 rounded-xl"></span>
              <button className="absolute py-1 z-10 px-3 -left-8 -top-2 -rotate-[10deg] black_border bg-violet-500 text-white font-bold">
                PARTICIPATE!
              </button>

              <div className="p-8 border border-black purple_border bg-white rounded-xl z-20">
                <span className="font-mono text-purple-700 font-bold">
                  Total Vote: {survey.responseCount}
                </span>

                <div>
                  {" "}
                  <a
                    href="#"
                    className="inline-block mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600"
                  >
                    Deadline: {survey.deadline}{" "}
                  </a>
                  <p className="mb-4">Category: {survey.category}</p>
                  <a
                    href="#"
                    className="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600"
                  >
                    Title: {survey.title}
                  </a>
                  <p className="mb-4">Description: {survey.description}</p>

                </div>

              {/* Render questions */}
              {survey.questions.map((question) => (
                <div
                  key={question.qId}
                  className="mb-4 p-4 border rounded shadow w-full"
                >
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Question: {question.question}
                  </label>
                </div>
              ))}
            </div>
          </div>
          </div>
          {user ? (
          <Link to={`/user/surveys/survey-form/${survey._id}`}>
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Participate
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login to vote
            </button>
          </Link>
        )}
          
        </form>
      </div>
    </div>
  );
};

export default SurveyViewDetails;
