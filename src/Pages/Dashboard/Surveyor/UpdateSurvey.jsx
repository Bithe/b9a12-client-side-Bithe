import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateSurvey = () => {
  const { user } = useContext(AuthContext);
  const { qId } = useParams(); // Get the question ID from URL
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch survey data by question qID
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["surveys", qId],
    queryFn: async () => {
      const response = await axiosSecure.get(`/survey/questions/${qId}`);
      console.log(response);
      return response.data;
    },
    onSuccess: (data) => {
      // Set the fetched question data to state
      setQuestion(data);
    },
  });

  const [question, setQuestion] = useState({});
  console.log(question);

  const categories = [
    "Customer Service",
    "Product Quality",
    "Cleanliness",
    "Ambiance",
    "Pricing",
  ];

  // Update survey mutation
  const mutation = useMutation({
    mutationFn: async (updatedQuestion) => {
      try {
        // Fetch the existing question data to retain all fields
        const response = await axiosSecure.get(`/survey/questions/${qId}`);
        const existingQuestionData = response.data;

        // Merge existing and updated question data to retain existing values
        const mergedQuestionData = {
          ...existingQuestionData,
          ...updatedQuestion,
        };

        // Update the question with merged data
        const updateResponse = await axiosSecure.put(
          `/survey/question/${qId}`,
          mergedQuestionData
        );

        return updateResponse.data;
      } catch (error) {
        throw new Error("Error updating survey question");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["surveys", qId]);
      toast.success("Survey updated successfully");
    },
    onError: (error) => {
      console.error("Error updating survey:", error);
      toast.error("Error updating survey");
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(question);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading survey</div>;

  return (
    <div className="py-4 bg-white max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Surveyor | Update Survey</title>
      </Helmet>
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
          Update Survey
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            defaultValue={data?.title}
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            defaultValue={data?.description}
            name="description"
            id="description"
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            defaultValue={data?.category}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-gray-700"
          >
            Deadline
          </label>
          <input
            defaultValue={data?.deadline}
            type="date"
            name="deadline"
            id="deadline"
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Update Survey
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSurvey;
