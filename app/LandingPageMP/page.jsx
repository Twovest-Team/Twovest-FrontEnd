import AboutUs from "./componentsMP/AboutUs";
import Features from "./componentsMP/Features";
import FeedbackSticky from "./componentsMP/FeedbackSticky";
import Future from "./componentsMP/Future";
import Header from "./componentsMP/Header";
import Team from "./componentsMP/Team";

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