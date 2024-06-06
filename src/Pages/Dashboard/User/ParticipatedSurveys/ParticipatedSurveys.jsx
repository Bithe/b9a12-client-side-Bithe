import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../components/AuthProvider/AuthProvider";

const ParticipatedSurveys = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
  
    // Fetch user responses surveys by email
    const {
      data: surveys = [],
      isLoading,
      error,
    } = useQuery({
      queryKey: ["surveys"],
      queryFn: async () => {
        const response = await axiosSecure.get(`my-responses/${user?.email}`);
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
          {surveys.length > 0 ? (
            surveys.map((survey) => (
              <div key={survey.id} className="bg-white shadow-md rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-2">
                  Title: {survey.title}
                </h4>
                <p className="text-gray-600 mb-4">
                  Description: {survey.description}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Deadline:</strong> {survey.deadline}
                </p>
                {survey.responses && survey.responses.length > 0 && (
                  survey.responses.map((question) => (
                    <div key={question.qId} className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Question: {question.question}
                      </label>
                    </div>
                  ))
                )}
              </div>
            ))
          ) : (
            <div>No surveys available</div>
          )}
        </div>
      </div>
    );
  };
  

export default ParticipatedSurveys;
