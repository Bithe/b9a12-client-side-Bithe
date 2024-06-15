import { Helmet } from "react-helmet-async";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { v4 as uuidv4 } from "uuid";


const UpdateMySurvey = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    category: "",
    deadline: "",
    questions: [{
        qId: uuidv4(),
        question: "",
        option: "",
        yesCount: 0,
        noCount: 0,
      },],
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
        const { data } = await axiosSecure.put(`/update/survey/${id}`, updatedSurvey);
        return data;
      } catch (error) {
        console.error("Error updating survey:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
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

  // const handleQuestionChange = (index, e) => {
  //   const { name, value } = e.target;
  //   setFormState((prev) => {
  //     const newQuestions = [...prev.questions];
  //     newQuestions[index] = {
  //       ...newQuestions[index],
  //       [name]: value,
  //     };
  //     return { ...prev, questions: newQuestions };
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only include fields that are actually changed
    const updatedFields = {};
    if (formState.title !== survey.title) updatedFields.title = formState.title;
    if (formState.description !== survey.description) updatedFields.description = formState.description;
    if (formState.category !== survey.category) updatedFields.category = formState.category;
    if (formState.deadline !== survey.deadline) updatedFields.deadline = formState.deadline;
    // if (JSON.stringify(formState.questions) !== JSON.stringify(survey.questions)) updatedFields.questions = formState.questions;

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

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            defaultValue={survey.category}
            type="text"
            name="category"
            id="category"
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
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
        {/* <div className="mb-6">
        {survey.questions.map((surveyQuestion, index) => (
            <div key={surveyQuestion.qId} className="mb-4">
              <label
                htmlFor={`question-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Question {index + 1}
              </label>
              <input
                defaultValue={
                  formState.questions[index]?.question || surveyQuestion.question
                }
                type="text"
                name={`question-${index}`}
                id={`question-${index}`}
                onChange={(e) => handleQuestionChange(index, e)}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
          ))}
        </div> */}

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
