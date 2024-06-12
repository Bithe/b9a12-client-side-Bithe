import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const Comments = () => {
  const { user } = useContext(AuthContext);

  const {
    data: userComments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userComments", user.email],
    queryFn: async () => {
      if (!user.email) {
        throw new Error("User email is not available");
      }
      const { data } = await axiosSecure.get(`/pro-user/comments/${user.email}`);
      return data;
    },
    enabled: !!user.email,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Filter out comments with no content
  const filteredComments = userComments.filter(comment => comment.comment.trim() !== "");

  if (!filteredComments.length) {
    return <div>No valid comments found for this user.</div>;
  }

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            Explore Your <span className="text-blue-500">Comments</span>
          </h1>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2">
            {filteredComments.map((comment, index) => (
              <div key={index} className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
                <div className="md:flex md:items-start md:-mx-4">
                  <img className="w-8" src="https://i.ibb.co/J7FkDhq/comments.webp" alt="Comment Icon" />
                  <div className="mt-4 md:mx-4 md:mt-0">
                    <h1 className="text-xl font-medium text-gray-700 capitalize dark:text-white">
                     Tittle: {comment.title || "No Title"}
                    </h1>
                    <p className="mt-3 text-gray-500 dark:text-gray-300">
                     Comment: {comment.comment || "No Comment"}
                    </p>
                    <p className="mt-3 text-gray-500 dark:text-gray-300">
                      Description: {comment.description || "No Description"}
                    </p>
                    <p className="mt-3 text-gray-500 dark:text-gray-300">
                      Deadline: {comment.deadline || "No Deadline"}
                    </p>
                    <div className="mt-3 text-gray-500 dark:text-gray-300">
                      <h2 className="text-lg font-medium text-gray-700 capitalize dark:text-white">Responses:</h2>
                      <ul>
                        {comment.responses && comment.responses.length > 0 ? (
                          comment.responses.map((response, i) => (
                            <li key={i} className="mt-1">
                              Question: {response.question} - Answer: {response.option}
                            </li>
                          ))
                        ) : (
                          <li>No responses available</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Comments;
