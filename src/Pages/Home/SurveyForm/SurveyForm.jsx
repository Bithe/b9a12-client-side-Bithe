import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "@tanstack/react-query";
import {  useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const SurveyForm = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); 
  const navigate = useNavigate(); 


  const [questionsResponse, setQuestionsResponse] = useState({});
  
  // Fetch the specific survey by ID
  const {
    data: survey,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["survey", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/survey/${id}`);
      return data;
    },
  });

  // TanStack Query for posting the data
  const { mutateAsync } = useMutation({
    mutationFn: async (addUserResponse) => {
      const { data } = await axiosSecure.post(`/user-response`, addUserResponse);
      return data;
    },
    onSuccess: () => {
      console.log("Saved data");
      toast("Thank you for your response");
      navigate('/submitSuccess'); 
    },
  });


  // TanStack Query for reporting the survey---------------------------------------------
  const { mutateAsync: reportSurvey } = useMutation({
    mutationFn: async (reportDetails) => {
      const { data } = await axiosSecure.post(`/report-survey`, reportDetails);
      return data;
    },
    onSuccess: () => {
      console.log("Reported survey");
      toast("Survey has been reported");
      navigate('/reportSuccess'); 

    },
  });
  // ---------------------------------------------------------

  // Function to capture user's response for a question
  const handleQuestionResponse = (questionId, questionTitle, option) => {
    setQuestionsResponse((prevResponse) => ({
      ...prevResponse,
      [questionId]: { questionTitle, option },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const surveyId = id;
    const title = survey.title;
    const description = survey.description;
    const deadline = survey.deadline;
    const currentDateTime = new Date().toISOString();
    const email = user.email;
    const userName = user.displayName;
    const userPhoto = user?.photoURL;

    // Construct the user response object
    const userResponse = {
      surveyId,
      title,
      description,
      deadline,
      email,
      userName,
      userPhoto,
      dateTime: currentDateTime,
      responses: Object.entries(questionsResponse).map(
        ([questionId, { questionTitle, option }]) => ({
          questionId,
          question: questionTitle,
          option,
          
        })
      ),
    };

    console.table(userResponse);

    await mutateAsync(userResponse);
  };


  // HANDLE REPORT------------------------------------------------------
  const handleReport = async () => {
    const reportDetails = {
      surveyId: id,
      email: user.email,
      userName: user.displayName,
      userPhoto: user?.photoURL,
      reportDateTime: new Date().toISOString(),
    };

    await reportSurvey(reportDetails);
  };
  // -------------------------------------------


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!survey || !survey.questions || survey.questions.length === 0) {
    return <div>No questions found for this survey.</div>;
  }

  return (
    <div className="container mx-auto lg:px-20 lg:py-8">
      <Helmet>
        <title>Surveyor | Participate in Survey</title>
      </Helmet>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6">
        {/* Display survey details */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title: {survey.title}
          </label>
          {/* Render questions */}
          {survey.questions.map((question) => (
            <div key={question.qId} className="mb-4 p-4 border rounded shadow w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {question.question}
              </label>
              {/* OPTIONS */}
              <div className="mb-4">
                <div className="flex items-center">
                <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      value="yes"
                      checked={questionsResponse[question.qId]?.option === 'yes'}
                      onChange={() =>
                        handleQuestionResponse(question.qId, question.question, "yes")
                      }
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="no"
                      checked={questionsResponse[question.qId]?.option === 'no'}
                      onChange={() =>
                        handleQuestionResponse(question.qId, question.question, "no")
                      }
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
       <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-12"
        >
          Submit
        </button>
        <button
          type="button" 
          onClick={handleReport} 
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Report
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
