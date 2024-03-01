"use client";
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import gsap from "gsap";
import MotionPathPlugin from "gsap/dist/MotionPathPlugin";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import ScrollSmoother from "gsap/ScrollSmoother";
import Navbar from "./Navbar";

const Introduction = dynamic(() => import("./Introduction"));
const ContentLandingPage = dynamic(() => import("./ContentLandingPage"));
const More = dynamic(() => import("./how_works/More"));
const Footer = dynamic(() => import("./how_works/Footer"));

// @ts-ignore
gsap.registerPlugin(MotionPathPlugin, ScrollSmoother);
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const LandingAnimation: NextPage = () => {
    const [shouldShow, setShouldShow] = useState<boolean>(false);

    useEffect(() => {
        ScrollTrigger.normalizeScroll(false);
        ScrollSmoother.create({
            smooth: 1,
            effects: true,
            normalizeScroll: false,
        });
        ScrollTrigger.create({
            pin: true,
            start: "bottom bottom",
            end: "+=300",
            markers: false,
        });

        const handleScroll = () => {
            setShouldShow(true);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="max-w-[2000px] container m-auto">
            <div className="landing_container text-[#0E150E] ">
                <Navbar />
                <Introduction />

                
                {shouldShow && <ContentLandingPage />}

                <More />
                <Footer removeUpperFooter={false} />
            </div>
        </div>
    );
};

export default LandingAnimation;
