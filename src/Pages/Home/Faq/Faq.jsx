import answer from "../../../assets/images/answer.png";

const Faq = () => {
  return (
    <div className="py-4 bg-white">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
        <div className="text-center">
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
            Frequently Asked <span className="text-[#834333]">Questions</span>
          </h3>
        </div>

        <div className="mt-20">
          <ul className="">

            <li className="text-left mb-10">
              <div className="flex flex-row items-start mb-5">
                <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full text-white border-4 border-white text-xl font-semibold">
                  {/* Icon or content here */}
                  <img
                    src="https://i.ibb.co/CtH9sLr/question.jpg"
                    style={{ width: "50px", height: "45px" }}
                    alt="Question"
                  />
                </div>

                <div className="bg-gray-100 p-5 px-10 w-full flex items-center">
                  <h4 className="text-md leading-6 font-medium text-gray-900">
                    How can I provide feedback about my experience at your
                    coffee shop?
                  </h4>
                </div>
              </div>

              <div className="flex flex-row items-start">
                <div className="bg-[#6F4E37] p-5 px-10 w-full flex items-center">
                  <p className="text-white text-sm">
                    You can provide feedback about your experience by completing
                    our online survey. Your feedback is valuable to us and helps
                    us improve our service.
                  </p>
                </div>
                <div className="hidden sm:flex items-center justify-center p-3 ml-3 rounded-full text-white border-4 border-white text-xl font-semibold">
                  {/* Icon or content here */}
                  <img
                    src={answer}
                    className="rounded-full "
                    style={{ width: "60px", height: "40px" }}
                  ></img>
                </div>
              </div>
            </li>
{/* ----------------------------- */}
            <li className="text-left mb-10">
              <div className="flex flex-row items-start mb-5">
                <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full text-white border-4 border-white text-xl font-semibold">
                  {/* Icon or content here */}
                  <img
                    src="https://i.ibb.co/CtH9sLr/question.jpg"
                    style={{ width: "50px", height: "45px" }}
                    alt="Question"
                  />
                </div>

                <div className="bg-gray-100 p-5 px-10 w-full flex items-center">
                  <h4 className="text-md leading-6 font-medium text-gray-900">
                    How often can I participate in the survey?
                  </h4>
                </div>
              </div>

              <div className="flex flex-row items-start">
                <div className="bg-[#6F4E37] p-5 px-10 w-full flex items-center">
                  <p className="text-white text-sm">
                    You can participate in the survey as often as you visit our
                    coffee shop. We encourage frequent feedback to ensure we
                    consistently meet your expectations.
                  </p>
                </div>
                <div className="hidden sm:flex items-center justify-center p-3 ml-3 rounded-full text-white border-4 border-white text-xl font-semibold">
                  {/* Icon or content here */}
                  <img
                    src={answer}
                    className="rounded-full "
                    style={{ width: "60px", height: "40px" }}
                  ></img>
                </div>
              </div>
            </li>

{/* -------------------------------- */}

<li className="text-left mb-10">
              <div className="flex flex-row items-start mb-5">
                <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full text-white border-4 border-white text-xl font-semibold">
                  {/* Icon or content here */}
                  <img
                    src="https://i.ibb.co/CtH9sLr/question.jpg"
                    style={{ width: "50px", height: "45px" }}
                    alt="Question"
                  />
                </div>

                <div className="bg-gray-100 p-5 px-10 w-full flex items-center">
                  <h4 className="text-md leading-6 font-medium text-gray-900">
                  Will my responses be kept confidential?
                  </h4>
                </div>
              </div>

              <div className="flex flex-row items-start">
                <div className="bg-[#6F4E37] p-5 px-10 w-full flex items-center">
                  <p className="text-white text-sm">
                  Yes, your responses are completely confidential. We aggregate survey data to analyze trends and improve our services. Your individual responses are not shared with any third parties.
                  </p>
                </div>
                <div className="hidden sm:flex items-center justify-center p-3 ml-3 rounded-full text-white border-4 border-white text-xl font-semibold">
                  {/* Icon or content here */}
                  <img
                    src={answer}
                    className="rounded-full "
                    style={{ width: "60px", height: "40px" }}
                  ></img>
                </div>
              </div>
            </li>

{/* -------------------------------- */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Faq;
