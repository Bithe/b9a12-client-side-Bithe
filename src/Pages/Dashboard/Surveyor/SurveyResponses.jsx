import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SurveyResponses = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const { data } = await axiosSecure.get(`/surveys/${user.email}`);
        setSurveys(data);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, [user.email, axiosSecure]);

  const handleDetailsClick = (id) => {
    navigate(`/dashboard/surveyor/surveys/${id}`);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Surveys</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Serial No</th>
            <th className="py-2 px-4 border-b border-gray-200">Title</th>
            <th className="py-2 px-4 border-b border-gray-200">Description</th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey, index) => (
            <tr key={survey._id}>
              <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
              <td className="py-2 px-4 border-b border-gray-200">{survey.title}</td>
              <td className="py-2 px-4 border-b border-gray-200">{survey.description}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDetailsClick(survey._id)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurveyResponses;
