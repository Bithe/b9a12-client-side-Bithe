import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const MyReports = () => {
  const { user } = useContext(AuthContext);

  const {
    data: userReports = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userReports", user.email],
    queryFn: async () => {
      if (!user.email) {
        throw new Error("User email is not available");
      }
      const { data } = await axiosSecure.get(`/user/my-reports/${user.email}`);
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

  if (!userReports.length) {
    return <div>No reports found for this user.</div>;
  }

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            My <span className="text-blue-500">Reports</span>
          </h1>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2">
            {userReports.map((report, index) => (
              <div key={index} className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
                <div className="md:flex md:items-start md:-mx-4">
                  <img className="w-8" src="https://i.ibb.co/J7FkDhq/reports.webp" alt="Report Icon" />
                  <div className="mt-4 md:mx-4 md:mt-0">
                    <h1 className="text-xl font-medium text-gray-700 capitalize dark:text-white">
                      Reported Survey Tittle: {report.reportedSurveyTitle}
                    </h1>
                    <p className="mt-3 text-gray-500 dark:text-gray-300">
                    Reported Survey Description: {report.reportedSurveyDescription}
                    </p>
                    <p className="mt-3 text-gray-500 dark:text-gray-300">
                      Report Date: {new Date(report.reportDateTime).toLocaleString()}
                    </p>
                    
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

export default MyReports;
