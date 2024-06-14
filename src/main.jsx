import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./Pages/Home/Home";
import Root from "./Root/Root";
import AuthProvider from "./components/AuthProvider/AuthProvider";

import ErrorPage from "./components/Error/ErrorPage";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Dashboard from "./Root/Dashboard";
import MyReports from "./Pages/Dashboard/User/MyReports";
import CreateSurvey from "./Pages/Dashboard/Surveyor/CreateSurvey";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllMySurvey from "./Pages/Dashboard/Surveyor/AllMySurvey";
// import UpdateSurvey from "./Pages/Dashboard/Surveyor/UpdateSurvey";
import ManageUsers from "./Pages/Dashboard/Admin/ManageUsers";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SurveyForm from "./Pages/Home/SurveyForm/SurveyForm";
import Surveys from "./Pages/Home/Surveys/Surveys";
import SurveyViewDetails from "./Pages/Home/SurveyViewDetails/SurveyViewDetails";
import ParticipatedSurveys from "./Pages/Dashboard/User/ParticipatedSurveys/ParticipatedSurveys";
import ProMembership from "./Pages/Home/ProMembership/ProMembership";
import SubmitSuccess from "./Pages/Home/SurveyForm/SubmitSuccess";
import UpdateMySurvey from "./Pages/Dashboard/Surveyor/UpdateMySurvey";
import SurveyResponses from "./Pages/Dashboard/Surveyor/SurveyResponses";
import ReportSuccess from "./Pages/Home/SurveyForm/ReportSuccess";
import Comments from "./Pages/Dashboard/ProUser/Comments";
import ManageSurveys from "./Pages/Dashboard/Admin/ManageSurveys/ManageSurveys";
import AllPayments from "./Pages/Dashboard/Admin/Payments/AllPayments";
import SurveyResults from "./Pages/Home/SurveyResults/SurveyResults";
import SurveyAllResponses from "./Pages/Dashboard/Admin/SurveyAllResponses/SurveyAllResponses";
import SurveyDetails from "./Pages/Dashboard/Surveyor/SurveyDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,

    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/surveys",
        element: <Surveys></Surveys>,
      },
      {
        path: "/survey/survey-view-details/:id",
        element: <SurveyViewDetails></SurveyViewDetails>,
      },
      {
        path: "/user/surveys/survey-form/:id",
        element: (
          <PrivateRoute>
            <SurveyForm></SurveyForm>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/survey-results/:id",
        element: (
          <PrivateRoute>
            <SurveyResults></SurveyResults>
          </PrivateRoute>
        ),
      },
      {
        path: "/submitSuccess",
        element: (
          <PrivateRoute>
            <SubmitSuccess></SubmitSuccess>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/reportSuccess",
        element: (
          <PrivateRoute>
            <ReportSuccess></ReportSuccess>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/pro-membership",
        element: (
          <PrivateRoute>
            <ProMembership></ProMembership>
          </PrivateRoute>
        ),
      },

      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },

  // DASHBOARD

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // USER
      {
        index: true,
        path: "/dashboard/user/surveys",
        element: (
          <PrivateRoute>
            <ParticipatedSurveys></ParticipatedSurveys>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "my-reports",
        element: <MyReports></MyReports>,
      },
      {
        path: "/dashboard/user/surveys/survey-form/:id",
        element: (
          <PrivateRoute>
            <SurveyForm></SurveyForm>
          </PrivateRoute>
        ),
      },
      // PRO-USER
      {
        path: "/dashboard/user/comments",
        element: (
          <PrivateRoute>
            <Comments></Comments>
          </PrivateRoute>
        ),
      },
      // SURVEYOR
      {
        path: "/dashboard/surveyor/create",
        element: (
          <PrivateRoute>
            {" "}
            <CreateSurvey></CreateSurvey>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/surveyor/all-my-survey",
        element: (
          <PrivateRoute>
            <AllMySurvey></AllMySurvey>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/surveyor/update/:id",
        element: (
          <PrivateRoute>
            {" "}
            {/* <UpdateSurvey></UpdateSurvey> */}
            <UpdateMySurvey></UpdateMySurvey>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/surveyor/surveys",
        element: (
          <PrivateRoute>
            <SurveyResponses></SurveyResponses>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/surveyor/surveys/:id",
        element: <PrivateRoute>
          <SurveyDetails></SurveyDetails>
        </PrivateRoute>,
      },

      // ADMIN
      {
        path: "/dashboard/admin/users",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/surveys",
        element: (
          <PrivateRoute>
            <ManageSurveys></ManageSurveys>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/payments",
        element: (
          <PrivateRoute>
            <AllPayments></AllPayments>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/responses",
        element: (
          <PrivateRoute>
            <SurveyAllResponses></SurveyAllResponses>{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
    <ToastContainer></ToastContainer>
  </AuthProvider>
);
