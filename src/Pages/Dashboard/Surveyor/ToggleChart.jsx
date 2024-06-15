import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // Assuming this is your preferred data fetching library
import { Bar } from 'react-chartjs-2';

const ToggleChart = () => {
  const { id } = useParams(); // Assuming you're using React Router for id parameter
  const [viewType, setViewType] = useState('table'); // State to toggle between table and chart view

  // Example data fetching with useQuery, adjust as per your actual setup
  const { data: surveyResponses, isLoading, isError, error } = useQuery({
    queryKey: ['surveyResponses', id],
    queryFn: async () => {
      // Fetch survey responses data from API endpoint
      const response = await fetch(`/dashboard/surveyor/surveys/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch survey responses');
      }
      return response.json();
    },
  });

  // Function to calculate yes and no counts
  const calculateCounts = () => {
    let yesCount = 0;
    let noCount = 0;
    if (surveyResponses) {
      surveyResponses.forEach((response) => {
        yesCount += response.yesCount;
        noCount += response.noCount;
      });
    }
    return { yesCount, noCount };
  };

  // Prepare chart data
  const chartData = {
    labels: ['Yes', 'No'],
    datasets: [
      {
        label: 'Votes',
        backgroundColor: ['#34D399', '#EF4444'],
        borderColor: ['#34D399', '#EF4444'],
        borderWidth: 1,
        hoverBackgroundColor: ['#22C292', '#DC2F2F'],
        hoverBorderColor: ['#22C292', '#DC2F2F'],
        data: [calculateCounts().yesCount, calculateCounts().noCount],
      },
    ],
  };

  // Toggle view type
  const toggleView = () => {
    setViewType((prev) => (prev === 'table' ? 'chart' : 'table'));
  };

  // Render based on view type
  const renderView = () => {
    if (viewType === 'table') {
      // Render table view
      return (
        <div className="table-view">
          <h3>Survey Responses Table View</h3>
          {/* Render your table here */}
          {/* Example: */}
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Yes Count</th>
                <th>No Count</th>
              </tr>
            </thead>
            <tbody>
              {surveyResponses.map((response) => (
                <tr key={response.id}>
                  <td>{response.question}</td>
                  <td>{response.yesCount}</td>
                  <td>{response.noCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (viewType === 'chart') {
      // Render chart view
      return (
        <div className="chart-view">
          <h3>Survey Responses Chart View</h3>
          <Bar data={chartData} />
        </div>
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="survey-responses">
      <div className="toggle-buttons">
        <button onClick={() => setViewType('table')} className={viewType === 'table' ? 'active' : ''}>
          Table View
        </button>
        <button onClick={() => setViewType('chart')} className={viewType === 'chart' ? 'active' : ''}>
          Chart View
        </button>
      </div>
      {renderView()}
    </div>
  );
};

export default ToggleChart;
