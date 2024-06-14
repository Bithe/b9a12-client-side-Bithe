import  { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const SurveyAllResponses = () => {
  const axiosSecure = useAxiosSecure();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurveyResponses = async () => {
      try {
        const { data } = await axiosSecure.get('/dashboard/admin/survey-responses');
        setResponses(data);
      } catch (error) {
        setError(error.message);
        toast.error('Error fetching survey responses');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyResponses();
  }, [axiosSecure]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto lg:px-20 lg:py-8">
      <h1 className="text-2xl font-bold mb-4">All Survey Responses</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Email</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Survey ID</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Title</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Responses</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Comment</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Date</th>
          </tr>
        </thead>
        <tbody>
          {responses.map(response => (
            <tr key={response._id}>
              <td className="py-2 px-4 border-b border-gray-200">{response.email}</td>
              <td className="py-2 px-4 border-b border-gray-200">{response.surveyId}</td>
              <td className="py-2 px-4 border-b border-gray-200">{response.title}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <ul>
                  {response.responses.map((res, index) => (
                    <li key={index}>{res.question}: {res.option}</li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{response.comment}</td>
              <td className="py-2 px-4 border-b border-gray-200">{new Date(response.dateTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurveyAllResponses;
