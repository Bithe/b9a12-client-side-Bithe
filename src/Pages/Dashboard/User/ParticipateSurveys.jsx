import { Helmet } from "react-helmet-async";
import SurveyCard from "./SurveyCard";
import { useContext } from "react";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const ParticipateSurveys = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
  
   // Fetch all surveys
   const { data: surveys = [], isLoading, error } = useQuery({
    queryKey: ['surveys'],
    queryFn: async () => {
      const response = await axiosSecure.get('/surveys');
      console.log(response.data);
      return response.data;
    },
  });
  
    if (isLoading) return <div>Loading surveys...</div>;
    if (error) return <div>Error loading surveys</div>;
  
    return (
      <div className="py-4 bg-white max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
        <Helmet>
          <title>User Dashboard</title>
        </Helmet>
        <div className="text-center mb-6">
          <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
            Available Surveys
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveys.map((survey) => (
            <div key={survey.qId} className="bg-white shadow-md rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2">{survey.title}</h4>
              <p className="text-gray-600 mb-4">{survey.description}</p>
              <p className="text-gray-600 mb-4"><strong>Category:</strong> {survey.category}</p>
              <p className="text-gray-600 mb-4"><strong>Deadline:</strong> {survey.deadline}</p>
              <Link to={`/dashboard/user/surveys/survey-form/${survey._id}`} className="text-blue-500">
                Participate
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default ParticipateSurveys;
