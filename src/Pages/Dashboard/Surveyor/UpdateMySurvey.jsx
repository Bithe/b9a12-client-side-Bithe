import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { v4 as uuidv4 } from "uuid";

const UpdateMySurvey = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const categories = [
    "Customer Service",
    "Product Quality",
    "Cleanliness",
    "Ambiance",
    "Pricing",
  ];

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    category: "",
    deadline: "",
    questions: [
      {
        qId: uuidv4(),
        question: "",
        option: "",
        yesCount: 0,
        noCount: 0,
      },
    ],
  });

  // Fetch specific survey data by id
  const {
    data: survey,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["survey", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/survey/${id}`);
      return data;
    },
    onSuccess: (data) => {
      // Set the initial form state with the fetched survey data
      setFormState(data);
    },
  });

  // Mutation for updating survey
  const { mutateAsync } = useMutation({
    mutationFn: async (updatedSurvey) => {
      try {
        const { data } = await axiosSecure.put(
          `/update/survey/${id}`,
          updatedSurvey
        );
        return data;
      } catch (error) {
        console.error("Error updating survey:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
      toast.success("Survey updated successfully!");
      navigate("/dashboard/surveyor/all-my-survey");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only include fields that are actually changed
    const updatedFields = {};
    if (formState.title !== survey.title) updatedFields.title = formState.title;
    if (formState.description !== survey.description)
      updatedFields.description = formState.description;
    if (formState.category !== survey.category)
      updatedFields.category = formState.category;
    if (formState.deadline !== survey.deadline)
      updatedFields.deadline = formState.deadline;

    await mutateAsync(updatedFields);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading survey: {error.message}</div>;

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
            defaultValue={survey.title}
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
            defaultValue={survey.description}
            name="description"
            id="description"
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

   
        {/* CATEGORY */}
        <div className="mb-4">
          <label className="block text-sm mb-4 font-medium text-gray-700">
            Category
          </label>
          <select
            defaultValue={survey.category}
            onChange={handleChange}

            name="category"
            id="category"
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
            defaultValue={survey.deadline}
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

export default UpdateMySurvey;
