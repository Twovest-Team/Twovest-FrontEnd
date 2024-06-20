import AboutUs from "../../components/aboutus/AboutUs";
import Features from "../../components/aboutus/Features";
import FeedbackSticky from "../../components/aboutus/FeedbackSticky";
import Future from "../../components/aboutus/Future";
import Header from "../../components/aboutus/Header";
import Team from "../../components/aboutus/Team";

export default function Landpage() {
    return (
        <>
            <FeedbackSticky />
            <Header />
            <AboutUs />
            <Team />
            <Features />
            <Future />
        </>
      );
} 