import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";

const SurveyForm = () => {
  const { user } = useContext(AuthContext);
  const [role] = useRole();

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
      const { data } = await axiosSecure.post(
        `/user-response`,
        addUserResponse
      );
      return data;
    },
    onSuccess: () => {
      console.log("Saved data");
      toast("Thank you for your response");
      navigate("/submitSuccess");
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
      navigate("/reportSuccess");
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
    const comment = e.target.comment.value;
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
      comment,
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
      reportedSurveyTitle: survey.title, 
      reportedSurveyDescription: survey.description,
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
        <title>Zendesk | Participate in Survey</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6"
      >
        {/* Display survey details */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-4">
            Title: {survey.title}
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-4">
            Description: {survey.description}
          </label>
          {/* Render questions */}
          {survey.questions.map((question) => (
            <div
              key={question.qId}
              className="mb-4 p-4 border rounded shadow w-full"
            >
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {question.question}
              </label>
              {/* OPTIONS */}
              <div className="mb-4">
                <div className="flex items-center">
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      name="yes"
                      value="yes"
                      checked={
                        questionsResponse[question.qId]?.option === "yes"
                      }
                      onChange={() =>
                        handleQuestionResponse(
                          question.qId,
                          question.question,
                          "yes"
                        )
                      }
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="no"
                      value="no"
                      checked={questionsResponse[question.qId]?.option === "no"}
                      onChange={() =>
                        handleQuestionResponse(
                          question.qId,
                          question.question,
                          "no"
                        )
                      }
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ADD COMMENT---------------------------------------------------------- */}

        {role === "pro-user" && (
          <div className="flex mb-8">
            <div className="h-80 px-7 w-full rounded-[12px] bg-white p-4 shadow-md border">
              <p className="text-xl font-semibold text-blue-900 cursor-pointer transition-all hover:text-black">
                Add Comment
              </p>
              <textarea
                name="comment"
                id="comment"
                className="h-40 px-3 text-sm py-1 mt-5 outline-none border-gray-300 w-full resize-none border rounded-lg placeholder:text-sm"
                placeholder="Add your comments here"
              ></textarea>

              {/* <div className="flex justify-between mt-2"> 
                <p className="text-sm text-blue-900 ">Enter atleast 8 characters</p>
                <button className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600">
                    Submit comment
                </button>
            </div>    */}
            </div>
          </div>
        )}
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
