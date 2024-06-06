const Banner = () => {
  return (
    <div>
      {/* BANNER STARTS */}
      <section className="container mx-auto min-h-screen text-center">
        <div
          className="bg-cover bg-no-repeat w-full max-h-full bg-custom-banner rounded-xl"
        >
          <div className="lg:px-52 lg:py-32">
            <h1 className="text-white lg:text-5xl font-extrabold text-center p-8">
              Discover an exceptional cooking class tailored for you
            </h1>
            <p className="text-white text-center p-8">
              With countless pasta varieties available, essential to select the right type for your dish. Long, thin noodles like spaghetti or linguine pair perfectly with light sauces, while short pasta shapes such as penne or fusilli are ideal for hearty sauces that cling to every curve.
            </p>
            <div className="py-4 space-x-6">
              <button className="btn rounded-full lg:text-xl font-semibold bg-[#cdada5] px-8 border-none">
                Explore
              </button>
              {/* <button className="btn btn-outline lg:text-xl font-semibold rounded-full text-white px-8">
                Our Feedback
              </button> */}
            </div>
          </div>
        </div>
      </section>
      {/* BANNER ENDS */}
    </div>
  );
};

export default Banner;
