import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Feedbacks = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: feedbacks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["feedbacks", user.email], // Pass an array as the queryKey
    queryFn: async () => {
      const response = await axiosSecure.get(`/dashboard/surveyor/feedbacks/${user.email}`);
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="py-4 bg-white max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Surveyor | Feedbacks</title>
      </Helmet>
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
          Survey Feedbacks
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Surveyor Email
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Feedback
              </th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td className="py-2 px-4 border-b border-gray-200">
                  {feedback.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {feedback.surveyor.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {feedback.category}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {feedback.feedback}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedbacks;
