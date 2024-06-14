import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SurveyDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [surveyResponses, setSurveyResponses] = useState([]);

  useEffect(() => {
    const fetchSurveyResponses = async () => {
      try {
        const { data } = await axiosSecure.get(`/dashboard/surveyor/surveys/${id}`);
        setSurveyResponses(data);
      } catch (error) {
        console.error("Error fetching survey responses:", error);
      }
    };

    fetchSurveyResponses();
  }, [id, axiosSecure]);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Survey Responses</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Serial No</th>
            <th className="py-2 px-4 border-b border-gray-200">User Email</th>
            <th className="py-2 px-4 border-b border-gray-200">User Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Vote</th>
          </tr>
        </thead>
        <tbody>
          {surveyResponses.map((response, index) => (
            <tr key={response._id}>
              <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
              <td className="py-2 px-4 border-b border-gray-200">{response.email}</td>
              <td className="py-2 px-4 border-b border-gray-200">{response.userName}</td>
              <td className="py-2 px-4 border-b border-gray-200">{response.option}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurveyDetails;
