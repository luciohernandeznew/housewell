import React, { FC, useState, useRef, useEffect, useCallback } from "react";
import { motion, useAnimate, useInView } from "framer-motion";
import SecondaryButton from "../buttons/SecondaryButton";
import Transition from "./Transition";

const CloudAnimation: FC = () => {
    const tempRef = useRef<HTMLDivElement>(null);
    const ref = useRef(null);
    const isInView = useInView(ref);
    const [rescheduleRef, rescheduleRefAnimate] = useAnimate();
    const [newShowingRef, newShowingRefAnimate] = useAnimate();
    const [stageWidth, setStageWidth] = useState<number>(0);
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        setStageWidth(
            document.getElementsByClassName("cloudSection")[0].clientWidth
        );
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
            setStageWidth(
                document.getElementsByClassName("cloudSection")[0].clientWidth
            );
        });
    }, [stageWidth]);

    const rescheduleAnimation = useCallback(() => {
        rescheduleRefAnimate(
            rescheduleRef.current,
            { opacity: 1, x: -100 },
            { type: "spring", bounce: 0.4, duration: 1 }
        );
    }, [rescheduleRef, rescheduleRefAnimate]);

    const newShowingAnimation = useCallback(() => {
        newShowingRefAnimate(
            newShowingRef.current,
            { opacity: 1, x: 210 },
            { type: "spring", bounce: 0.4, duration: 1 }
        );
    }, [newShowingRef, newShowingRefAnimate]);

    useEffect(() => {
        if (isInView) {
            rescheduleAnimation();
            newShowingAnimation();
        }
    }, [rescheduleAnimation, isInView, newShowingAnimation]);

    return (
        <>
            <div className="rounded-2xl bg-[#F1FEFE] font-austin mt-4">
                <div className="grid grid-cols-12">
                    <div className="col-span-4 py-10 px-5 sm:px-10 max-lg:col-span-12 bg-[#F1FEFE] z-[31] mr-4 rounded-l-2xl">
                        <Transition refElement={tempRef}>
                            <div ref={tempRef} />
                            <div className="font-austin text-5xl max-[1767px]:text-4xl max-lg:text-4xl max-md:text-3xl">
                                <div>You still own your</div>
                                <div>home, you should own</div>
                                <div>your showings.</div>
                            </div>

                            <div className="font-mint text-lg mt-36 max-md:mt-5 max-lg:text-md max-md:text-sm max-[1767px]:text-sm">
                                You have full control over who’s coming to see
                                your home and at what time—and when something comes up,
                                no more contacting an agent to reschedule.
                            </div>
                            <SecondaryButton
                                hasArrow
                                text="Get Started"
                                style={{ height: "3rem", marginTop: "2rem" }}
                                size="medium"
                            />
                        </Transition>
                    </div>

                    <div className="col-span-8 max-lg:col-span-12 flex z-30 justify-center ml-4 h-[35rem] cloudSection max-lg:ml-0">
                        <div className="bg-[url('/temp/cloud_frame.svg')] bg-no-repeat bg-[length:100%_100%] absolute w-[57rem] h-[35rem]">
                            <motion.div
                                className="bg-[url('/temp/reschedule.svg')] bg-no-repeat absolute w-60 h-52 z-30 bg-contain ml-56 mt-48 max-md:ml-72 max-[550px]:ml-[23rem] max-[390px]:ml-[27.5rem]"
                                initial={{
                                    opacity: 0,
                                }}
                                ref={rescheduleRef}
                            />
                            <motion.div
                                className="bg-[url('/temp/new_showing.svg')] bg-no-repeat absolute w-60 h-36 z-30 bg-contain mt-12 ml-[22rem] max-md:ml-[17rem] max-[550px]:ml-[12rem] max-[390px]:ml-32"
                                initial={{
                                    opacity: 0,
                                }}
                                ref={newShowingRef}
                            />

                            <motion.div
                                className="bg-[url('/temp/cloud1.svg')] w-[110px] h-[53px] bg-contain bg-no-repeat absolute -z-30"
                                initial={{ x: 25, y: 9 }}
                                animate={{
                                    x: 770,
                                }}
                                transition={{
                                    duration: 15,
                                    ease: "linear",
                                    repeat: Infinity,
                                }}
                            />
                            <motion.div
                                className="bg-[url('/temp/cloud2.svg')] w-[130px] h-[70px] bg-contain bg-no-repeat absolute -z-30"
                                initial={{ x: 10, y: 50 }}
                                animate={{
                                    x: 770,
                                }}
                                transition={{
                                    duration: 15,
                                    ease: "linear",
                                    delay: 2.5,
                                    repeat: Infinity,
                                }}
                            />
                            <motion.div
                                className="bg-[url('/temp/cloud3.svg')] w-[140px] h-[75px] bg-contain bg-no-repeat absolute -z-30"
                                initial={{ x: 7, y: 90 }}
                                animate={{
                                    x: 770,
                                }}
                                transition={{
                                    duration: 15,
                                    ease: "linear",
                                    delay: 6,
                                    repeat: Infinity,
                                }}
                                exit={{ opacity: 0 }}
                            />
                            <motion.div
                                className="bg-[url('/temp/cloud1.svg')] w-[100px] h-[48px] bg-contain bg-no-repeat absolute -z-30"
                                initial={{ x: 25, y: 9 }}
                                animate={{
                                    x: 770,
                                }}
                                transition={{
                                    duration: 15,
                                    ease: "linear",
                                    delay: 7.5,
                                    repeat: Infinity,
                                }}
                                exit={{ opacity: 0 }}
                            />
                            <motion.div
                                className="bg-[url('/temp/cloud3.svg')] w-[105px] h-[57px] bg-contain bg-no-repeat absolute -z-30"
                                initial={{ x: 25, y: 45 }}
                                animate={{
                                    x: 770,
                                }}
                                transition={{
                                    duration: 15,
                                    ease: "linear",
                                    delay: 10,
                                    repeat: Infinity,
                                }}
                            />
                            <motion.div
                                className="bg-[url('/temp/cloud2.svg')] w-[125px] h-[67px] bg-contain bg-no-repeat absolute -z-30"
                                initial={{ x: 17, y: 90 }}
                                animate={{
                                    x: 770,
                                }}
                                transition={{
                                    duration: 15,
                                    ease: "linear",
                                    delay: 12.5,
                                    repeat: Infinity,
                                }}
                            />
                        </div>

                        <div className="absolute mt-[30rem]" ref={ref}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CloudAnimation;
