import '../HowItWorks/HowItworks.css';

const HowItWorks = () => {
  return (
    <div className="how-it-works-section bg-gray-100 py-12">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">
            How It Works
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Discover how to create and manage your surveys.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Create a Survey
            </h3>
            <p className="mt-2 text-base text-gray-600 text-center">
              Start by crafting your survey title, description, and selecting a
              category.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Add Questions
            </h3>
            <p className="mt-2 text-base text-gray-600 text-center">
              Include your survey questions with options for respondents to
              choose from.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Set Deadline
            </h3>
            <p className="mt-2 text-base text-gray-600 text-center">
              Specify the deadline for responses to your survey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
