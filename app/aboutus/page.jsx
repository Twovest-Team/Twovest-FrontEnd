import About from "@/components/aboutus/About";
import Features from "@/components/aboutus/Features";
import FeedbackSticky from "@/components/aboutus/FeedbackSticky";
import Future from "@/components/aboutus/Future";
import Header from "@/components/aboutus/Header";
import Team from "@/components/aboutus/Team";

export default function Aboutus() {
    return (
        <main>
            <FeedbackSticky />
            <div className="container">
                <Header />
                <About />
            </div>
            <Team />
            <Features />
            <Future />
        </main>
    );
} 