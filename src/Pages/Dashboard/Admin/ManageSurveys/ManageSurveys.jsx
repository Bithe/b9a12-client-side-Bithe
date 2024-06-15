import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ManageSurveys = () => {
  const axiosSecure = useAxiosSecure();

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Mutation for updating survey status
  const { mutateAsync } = useMutation({
    mutationFn: async (surveyData) => {
      const { data } = await axiosSecure.patch(`/admin/survey/update/${surveyData._id}`, {
        status: surveyData.status,
        feedback: surveyData.feedback, // Send feedback along with status update
      });
      return data;
    },
    onSuccess: (data) => {
      refetch();
      console.log(data);
      toast.success('Survey status updated successfully!');
    },
  });

  // Fetch all surveys
  const { data: surveys = [], isLoading, error, refetch } = useQuery({
    queryKey: ['surveys'],
    queryFn: async () => {
      const response = await axiosSecure.get('/surveys');
      console.log(response.data);
      return response.data;
    },
  });

  // Function to handle survey status update
  const handleStatus = async (selectedSurvey) => {
    console.log('Selected survey:', selectedSurvey);

    const { value: selectedStatus } = await Swal.fire({
      title: 'Manage survey status',
      text: 'You won\'t be able to revert this!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Update!',
      html: `
        <div class="mb-4">
          <select
            name="status"
            id="selectedStatus"
            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          >
            <option value="publish">publish</option>
            <option value="unpublish">unpublish</option>
          </select>
        </div>
        <textarea
          id="feedback"
          class="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your feedback..."
          rows="4"
        ></textarea>
      `,
      preConfirm: () => {
        const status = document.getElementById('selectedStatus').value;
        const feedback = document.getElementById('feedback').value;
        if (!status) {
          Swal.showValidationMessage('Please select a status');
        }
        return { status, feedback };
      },
    });

    if (selectedStatus) {
      const surveyStatus = {
        _id: selectedSurvey._id,
        status: selectedStatus.status,
        feedback: selectedStatus.feedback,
      };

      console.log('Updating survey status:', surveyStatus);

      try {
        await mutateAsync(surveyStatus);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
  };

  if (isLoading) return <div>Loading surveys...</div>;
  if (error) return <div>Error loading surveys</div>;

  return (
    <div className="py-4 bg-white max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Admin | Manage Surveys</title>
      </Helmet>
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
          Surveys
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
                Status
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey) => (
              <tr key={survey._id}>
                <td className="py-2 px-4 border-b border-gray-200">{survey.title}</td>
                <td className="py-2 px-4 border-b border-gray-200">{survey.surveyor.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{survey.category}</td>
                <td className="py-2 px-4 border-b border-gray-200">{survey.status}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {new Date(survey.deadline).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => handleStatus(survey)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Change Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSurveys;
