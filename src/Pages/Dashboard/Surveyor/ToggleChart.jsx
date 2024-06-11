import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ToggleChart = () => {
  const { id } = useParams();
  const [view, setView] = useState('table'); // table or chart
  const axiosSecure = useAxiosSecure();

  const { data: survey, isLoading, isError, error } = useQuery({
    queryKey: ['survey', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/survey/${id}`);
      return data;
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading survey: {error.message}</div>;
  if (!survey || !survey.questions) return <div>No survey data available</div>;

  const chartData = {
    labels: survey.questions.map((q) => q.question),
    datasets: [
      {
        label: 'Yes Votes',
        data: survey.questions.map((q) => q.yesCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'No Votes',
        data: survey.questions.map((q) => q.noCount),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div className="py-4 bg-white max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
          Survey Responses
        </h3>
        <button onClick={() => setView('table')} className="mr-2 p-2 bg-blue-500 text-white rounded">
          Table View
        </button>
        <button onClick={() => setView('chart')} className="p-2 bg-blue-500 text-white rounded">
          Chart View
        </button>
      </div>
      {view === 'table' ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Yes Votes
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No Votes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {survey.questions.map((q) => (
              <tr key={q.qId}>
                <td className="px-6 py-4 whitespace-nowrap">{q.question}</td>
                <td className="px-6 py-4 whitespace-nowrap">{q.yesCount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{q.noCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <Bar data={chartData} options={{ responsive: true }} />
          <Pie data={chartData} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
};

export default ToggleChart;
