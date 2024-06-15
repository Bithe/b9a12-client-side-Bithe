import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch feedbacks
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/dashboard/surveyor/feedbacks');
      setFeedbacks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setError('Error fetching feedbacks');
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
                <td className="py-2 px-4 border-b border-gray-200">{feedback.title}</td>
                <td className="py-2 px-4 border-b border-gray-200">{feedback.surveyor.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{feedback.category}</td>
                <td className="py-2 px-4 border-b border-gray-200">{feedback.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedbacks;
