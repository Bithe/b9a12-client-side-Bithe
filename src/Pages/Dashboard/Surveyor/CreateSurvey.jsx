import { useContext, useState } from "react";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

import { v4 as uuidv4 } from "uuid";

const CreateSurvey = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [questions, setQuestions] = useState([
    {
      qId: uuidv4(),
      question: "",
      description: "",
      // category: "",
      deadline: "",
      option: "",
      yesCount: 0,
      noCount: 0,
    },
  ]);
  const categories = [
    "Customer Service",
    "Product Quality",
    "Cleanliness",
    "Ambiance",
    "Pricing",
  ];

  const handleChange = (index, event) => {
    const values = [...questions];
    values[index][event.target.name] = event.target.value;
    setQuestions(values);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        qId: uuidv4(),
        question: "",
        description: "",
        // category: "",
        deadline: "",
        option: "",
        yesCount: 0,
        noCount: 0,
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const values = [...questions];
    values.splice(index, 1);
    setQuestions(values);
  };

  // TANSTACK QUERY FOR POST THE DATA
  const { mutateAsync } = useMutation({
    mutationFn: async (addSurvey) => {
      const { data } = await axiosSecure.post(`/surveys`, addSurvey);
      return data;
    },
    onSuccess: () => {
      console.log("saved data");
      toast("Survey created successfully");
    },
  });

  // HANDLE FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Survey Submitted", questions);
    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const deadline = e.target.deadline.value;

    const status = "publish";
    const currentDateTime = new Date().toISOString();
    const email = user.email;
    const userName = user.displayName;
    const userPhoto = user?.photoURL;

    const addSurvey = {
      title,
      description,
      category,
      deadline,
      status,
      questions,
      responseCount: 0,

      surveyor: {
        email,
        userName,
        userPhoto,
        dateTime: currentDateTime,
      },
    };
    console.table(addSurvey);

    await mutateAsync(addSurvey);
  };

  return (
    <div className="py-4 bg-white max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Surveyor | Create Survey</title>
      </Helmet>
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
          Create Survey
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
              >
                 Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
              {/* DESCRIPTION */}
              <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
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
        {/* DEADLINE */}
        <div className="mb-12">
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-gray-700"
          >
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        {questions.map((question, index) => (
          <div key={index} className="mb-6 border-b-2 pb-4">
            <div className="mb-4">
              <label
                htmlFor={`title-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Question
              </label>
              <input
                type="text"
                name="question"
                id={`question-${index}`}
                value={question.question}
                onChange={(event) => handleChange(index, event)}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>

          

            {/* OPTIONS */}
            {/* <div className="mb-4">
              <span className="block text-sm font-medium text-gray-700">
                Options
              </span>
              <div className="flex items-center">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name="option"
                    value="yes"
                    onChange={(event) => handleChange(index, event)}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="option"
                    value="no"
                    onChange={(event) => handleChange(index, event)}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div> */}

            {/* DEADLINE */}
            {/* <div className="mb-12">
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700"
              >
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                id="deadline"
                value={question.deadline}
                onChange={(event) => handleChange(index, event)}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div> */}

            {/* REMOVE QUESTION */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Remove Question
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mb-6">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit Survey
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSurvey;
