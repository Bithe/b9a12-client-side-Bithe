import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const AllMySurvey = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  //
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/surveys/${id}`);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
    },
  });

  const {
    data: surveys = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/surveys/${user.email}`);
      return data;
    },
  });
  console.log(surveys);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleDelete = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await mutateAsync(id);
          Swal.fire("Deleted!", "Your survey has been deleted.", "success");
        } catch (err) {
          Swal.fire(
            "Error!",
            "There was a problem deleting your survey.",
            "error"
          );
          console.log(err.message);
        }
      }
    });
  };

  return (
    <div className="py-4 bg-white max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Surveyor | All My Surveys</title>
      </Helmet>
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
          All My Surveys
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
                Description
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Questions
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey) =>
              // survey.questions.map((question, idx) => (
                <tr key={`${survey._id}`}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {survey.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {survey.description}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {survey.category}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(survey.deadline).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {survey.status}{" "}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <ul>
                      {survey.questions && survey.questions.map((question, idx) => (
                        <li key={idx}>{question?.question}</li>
                      ))}
                    </ul>
                  </td>

                  <td className="py-2 px-4 border-b border-gray-200">
                    {/* <Link
                      to={`/dashboard/surveyor/update/${question.qId}`}
                      key={question.qId}
                    >
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                        Update
                      </button>
                    </Link> */}

                    {/*  */}
                    <Link
                      to={`/dashboard/surveyor/update/${survey._id}`}
                      // key={question.qId}
                    >
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                        Update
                      </button>
                    </Link>
                    {/*  */}

                    <span>|</span>
                    <button
                      className="text-red-600 hover:text-red-900 ml-4"
                      onClick={() => handleDelete(survey._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              // ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMySurvey;
