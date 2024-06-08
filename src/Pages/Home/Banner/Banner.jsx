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
            Get valuable feedback from customers at your coffee shop
            </h1>
            <p className="text-white text-center p-8">
            Life begins after coffee. Once you wake up and smell the coffee, it’s hard to go back to sleep. Just brewed happiness in a cup!
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
