# SurveyMaster README

Welcome to SurveyMaster, your ultimate survey management platform!

### Website Details

- **Website Name:** SurveyMaster
- **Admin Email:** farzana.hossain147@gmail.com
- **Admin Password:** [1234Rr]
- **Live Site URL:** [https://zendesk-survey-client.web.app/](https://zendesk-survey-client.web.app/)

### Main Features 📋

#### Pages

1. **Homepage** 📄🌟:
   - **Hero Section** 🚀:
     - Banner with website overview and explore button.
     - Background image.
   - **Featured Surveys Section** 🌟:
     - Display the 6 most voted surveys from the database.
   - **Latest Surveys Section** 📅:
     - Display 6 most recently created surveys from the database.
   - **How It Works Section** 🛠:
     - Content matching website theme.
   - **FAQ** ❓📚:
     - Meaningful FAQs about the website and features.

2. **Surveys Page (Public)**:
   - Display all surveys with title, short description, and total votes.
   - Filters for category and sort by vote count.

3. **Survey Details Page (Public)**:
   - Display detailed survey information.
   - Allow voting for logged-in users only.
     - Submit button to submit votes.
   - Public access; unauthenticated users cannot vote.
   - Pro-users can add comments.
   - Display survey results visually after voting or after the survey deadline.
   - Allow users to report inappropriate surveys.
   - Screenshots: image-1, image-2, image-3, image-4.

4. **Pricing Page (Public)**:
   - Integrate payment system for pro-user membership.
   - Pro-user nav link for navigation to the payment page.
   - Change user role to pro-user upon successful payment.

#### User Authentication 📤

- Email/password account creation.
- Social media authentication.

#### Role Management 󰳖

- User roles: user, surveyor, admin, pro-user.
- Default role for new users is user.

### Surveyor Dashboard: (/dashboard/surveyor)

- **Survey Creation:** Create surveys with questions, options (yes or no), category, and deadline.
- **Survey Update:** Edit survey details such as title, description, options, category, and deadline.
- **View Survey Responses:** See responses for individual surveys in tabular form.
- **Survey Responses Details:** Detailed view of individual survey responses with user information.
- **Feedback Required:** Admin feedback required when unpublishing a survey.
- **Survey Feedback:** View feedback provided by admin for unpublished surveys.
- **Toggle Survey Responses:** Switch between table and chart views for survey responses.

### Admin Dashboard: (/dashboard/admin)

- **Manage Users and Roles:** Admin can manage user accounts and assign roles.
- **Publish/Unpublish Surveys:** Admin can change the status of surveys between publish and unpublish.
- **View Payments and Survey Responses:** Access to all payment records and survey responses.

### User Dashboard: (/dashboard/user)

- **Participate in Surveys:** Users can participate in available surveys.
- **Reported Surveys:** View surveys reported by the user for review.

#### Pro-User Features: (only pro-users)

- **Comment on Surveys:** Pro-users can add comments to surveys.

### Technologies Used

- **Frontend:**
  - React.js
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - MongoDB

- **Authentication:**
  - JWT (JSON Web Tokens)

- **Query Management:**
  - React Query

- **UI Components:**
  - Ant Design


### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]





























# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
