import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../components/AuthProvider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Bar } from 'react-chartjs-2';

const SurveyDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [totalYesVotes, setTotalYesVotes] = useState(0);
  const [totalNoVotes, setTotalNoVotes] = useState(0);
  const [viewType, setViewType] = useState('table'); // State to toggle between table and chart view

  useEffect(() => {
    const fetchSurveyResponses = async () => {
      try {
        const { data } = await axiosSecure.get(`/dashboard/surveyor/surveys/${id}`);
        setSurveyResponses(data);

        // Calculate total votes
        let yesCount = 0;
        let noCount = 0;
        data.forEach(response => {
          response.responses.forEach(res => {
            if (res.option === "yes") {
              yesCount += 1;
            } else if (res.option === "no") {
              noCount += 1;
            }
          });
        });

        setTotalYesVotes(yesCount);
        setTotalNoVotes(noCount);
      } catch (error) {
        console.error("Error fetching survey responses:", error);
      }
    };

    fetchSurveyResponses();
  }, [id, axiosSecure]);

  // Function to calculate chart data
  const calculateChartData = () => ({
    labels: ['Yes', 'No'],
    datasets: [
      {
        label: 'Votes',
        backgroundColor: ['#34D399', '#EF4444'],
        borderColor: ['#34D399', '#EF4444'],
        borderWidth: 1,
        hoverBackgroundColor: ['#22C292', '#DC2F2F'],
        hoverBorderColor: ['#22C292', '#DC2F2F'],
        data: [totalYesVotes, totalNoVotes],
      },
    ],
  });

  // Toggle view type
  const toggleView = () => {
    setViewType((prev) => (prev === 'table' ? 'chart' : 'table'));
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Survey Responses</h2>
      <div className="mb-4 text-center">
        <p className="font-extrabold">Total Yes Votes: {totalYesVotes}</p>
        <p className="font-extrabold">Total No Votes: {totalNoVotes}</p>
      </div>

      {/* Toggle buttons */}
      <div className="flex justify-center mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            viewType === 'table' ? 'bg-gray-300' : 'bg-gray-100'
          }`}
          onClick={() => setViewType('table')}
        >
          Table View
        </button>
        <button
          className={`ml-2 px-4 py-2 rounded ${
            viewType === 'chart' ? 'bg-gray-300' : 'bg-gray-100'
          }`}
          onClick={() => setViewType('chart')}
        >
          Chart View
        </button>
      </div>

      {/* Conditional rendering based on viewType */}
      {viewType === 'table' && (
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
                <td className="py-2 px-4 border-b border-gray-200">
                  <ul>
                    {response.responses.map((res, index) => (
                      <li key={index}>{res.question}: {res.option}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {viewType === 'chart' && (
        <div className="chart-container">
          <h3 className="text-xl font-bold mb-2">Survey Responses Chart View</h3>
          <Bar data={calculateChartData()} />
        </div>
      )}
    </div>
  );
};

export default SurveyDetails;
