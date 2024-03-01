import { useEffect } from "react";
import { NextPage } from "next";
import gsap from "gsap";
import MotionPathPlugin from "gsap/dist/MotionPathPlugin";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import Navbar from "../../src/components/reactPages/landingpage/Navbar";
import Sellers from "../../src/components/reactPages/landingpage/how_works/Sellers";
import Buyers from "../../src/components/reactPages/landingpage/how_works/Buyers";
import Listings from "../../src/components/reactPages/landingpage/how_works/Listings";
import More from "../../src/components/reactPages/landingpage/how_works/More";
import Footer from "../../src/components/reactPages/landingpage/how_works/Footer";
// @ts-ignore
gsap.config({ trialWarn: false });
gsap.registerPlugin(MotionPathPlugin, ScrollSmoother, ScrollTrigger);

const HowWorks: NextPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.normalizeScroll(true);
        ScrollSmoother.create({
            smooth: 1,
            effects: true,
            content: ".landing_container",
            normalizeScroll: true,
        });
        ScrollTrigger.create({
            pin: true,
            start: "bottom bottom",
            end: "+=300",
            markers: false,
        });
    }, []);

    return (
        <div className="landing_container text-[#0E150E]">
            <Navbar />
            <Sellers />
            <Buyers />
            <More />
            {/* <Listings /> */}
            <Footer removeUpperFooter={false}/>
        </div>
    );
};

export default HowWorks;
