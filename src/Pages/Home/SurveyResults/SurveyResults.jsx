import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SurveyResults = () => {
  const { id } = useParams();
  const [chartData, setChartData] = useState(null);

  // Fetch survey results
  const { data: surveyResults, isLoading, isError, error } = useQuery({
    queryKey: ["surveyResults", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/survey-results/${id}`);
      return data;
    },
  });

  useEffect(() => {
    if (surveyResults) {
      const labels = surveyResults.questions.map((q) => q.question);
      const yesData = surveyResults.questions.map((q) => q.responses.filter(r => r.option === "yes").length);
      const noData = surveyResults.questions.map((q) => q.responses.filter(r => r.option === "no").length);

      setChartData({
        labels,
        datasets: [
          {
            label: "Yes",
            data: yesData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "No",
            data: noData,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      });
    }
  }, [surveyResults]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!surveyResults) {
    return <div>No survey results found.</div>;
  }

  return (
    <div className="container mx-auto lg:px-20 lg:py-8">
      <h2 className="text-2xl font-bold mb-4">Survey Results</h2>
      {chartData && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Survey Results' } } }} />
        </div>
      )}
    </div>
  );
};

export default SurveyResults;
