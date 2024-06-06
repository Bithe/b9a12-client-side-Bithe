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
                    What could possibly be your first question?
                  </h4>
                </div>
              </div>

              <div className="flex flex-row items-start">
                <div className="bg-[#6F4E37] p-5 px-10 w-full flex items-center">
                  <p className="text-white text-sm">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maiores impedit perferendis suscipit eaque, iste dolor
                    cupiditate blanditiis ratione. Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit.
                  </p>
                </div>
                <div className="hidden sm:flex items-center justify-center p-3 ml-3 rounded-full text-white border-4 border-white text-xl font-semibold">
                  {/* Icon or content here */}
                  <img src={answer} className="rounded-full "  style={{ width: "60px", height: "40px" }}></img>
                </div>
              </div>
            </li>
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
                    What could possibly be your first question?
                  </h4>
                </div>
              </div>

              <div className="flex flex-row items-start">
                <div className="bg-[#6F4E37] p-5 px-10 w-full flex items-center">
                  <p className="text-white text-sm">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maiores impedit perferendis suscipit eaque, iste dolor
                    cupiditate blanditiis ratione. Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit.
                  </p>
                </div>
                <div className="hidden sm:flex items-center justify-center p-3 ml-3 rounded-full text-white border-4 border-white text-xl font-semibold">
                  {/* Icon or content here */}
                  <img src={answer} className="rounded-full "  style={{ width: "60px", height: "40px" }}></img>
                </div>
              </div>
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Faq;
