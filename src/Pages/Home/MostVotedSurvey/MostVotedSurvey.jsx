import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MostVotedSurvey = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all surveys
  const {
    data: surveys = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["most-voted-surveys"],
    queryFn: async () => {
      const response = await axiosSecure.get("/most-voted-surveys");
      console.log(response.data);
      return response.data;
    },
  });
  // Filter the queries to display only the most recent 6-8 posts
  const recentSurvey = surveys.slice(0, 6);

  if (isLoading) return <div>Loading surveys...</div>;
  if (error) return <div>Error loading surveys</div>;

  return (
    <div className="py-4 bg-white max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Zendesk | Home</title>
      </Helmet>
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
          Featured Surveys
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentSurvey.length === 0 ? (
          <div className=" flex justify-center items-center">
            <img
              src="https://i.ibb.co/xhL99SV/lastest.jpg"
              alt="No surveys available"
            />
          </div>
        ) : (
          recentSurvey.map((survey) => (
            <div key={survey.qId} className="bg-white shadow-md rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2">{survey.title}</h4>
              <p className="text-gray-600 mb-4">{survey.description}</p>
              <p className="text-gray-600 mb-4">
                <strong>Category:</strong> {survey.category}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Deadline:</strong> {survey.deadline}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Voted:</strong> {survey.responseCount}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default MostVotedSurvey;
