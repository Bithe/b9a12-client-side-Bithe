import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Faq from "./Faq/Faq";
import LastestSurvey from "./LastestSurvey/LastestSurvey";
import MostVotedSurvey from "./MostVotedSurvey/MostVotedSurvey";
import HowItWorks from "./HowItWorks/HowItWorks";

// import '../../components/Navbar/navbar.css';

const Home = () => {
  return (
    <div className="container mx-auto lg:px-20 lg:py-8">
      <Helmet>
        <title>Zendesk | Home</title>
      </Helmet>
      <section className="my-8">
        {/* <SwiperCarousel></SwiperCarousel> */}
        <Banner></Banner>{" "}
      </section>

      {/* Most voted Surveys Section */}

      <section className="my-10">
        <div className="text-center my-8"></div>
        <MostVotedSurvey></MostVotedSurvey>{" "}
      </section>

      {/* Latest Surveys Section */}
      <section className="my-10">
        <div className="text-center my-8"></div>
        <LastestSurvey></LastestSurvey>
      </section>

      {/* How It Works Section   */}

      <section className="my-10">
        <div className="text-center my-8"></div>
        <HowItWorks></HowItWorks>{" "}
      </section>

      {/* FAQ  */}

      <section className="my-10">
        <div className="text-center my-8"></div>
        <Faq></Faq>
      </section>
    </div>
  );
};

export default Home;
