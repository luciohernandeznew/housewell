import React, { FC, useEffect, useRef, useState } from "react";
import SecondaryButton from "../../buttons/SecondaryButton";
import { useInView } from "framer-motion";
import Transition from "./Transition";
import animation from "../../../../public/temp/slot-animation.json";
import { useLottie } from "lottie-react";

const SlotMachineAnimation: FC = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        width: "30px",
        height: "30px",
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const { View: lottie } = useLottie(defaultOptions);

    const tempRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDivElement>(null);

    return (
        <>
            <div className="rounded-2xl bg-[#F1FEFE]">
                <div className="grid grid-cols-12 lg:gap-8">
                    <div className="col-span-1 max-lg:col-span-0"></div>
                    <div
                        className={`col-span-5 max-lg:col-span-12 flex justify-center z-30 w-full`}
                    >
                        <div ref={ref} />
                        {lottie}
                    </div>
                    <div className="col-span-2"></div>
                    <div className="col-span-4 py-20 max-lg:col-span-12 max-lg:p-5 z-30 ">
                        <Transition refElement={tempRef}>
                            <div ref={tempRef} />
                            <div className="font-austin text-5xl max-[1767px]:text-4xl max-lg:text-4xl max-md:text-3xl">
                                <div>Get pre-approved</div>
                                <div>for a mortgage in 5</div>
                                <div>minutes or less</div>
                            </div>
                            <div className="border-[#B3B9B3] border-t-[1px] mt-44 w-1/4 max-[1023px]:mt-16"></div>
                            <div className="font-mint text-lg mt-4 max-lg:text-md max-md:text-sm max-md:mt-5 max-[1767px]:text-sm">
                                <div>
                                    Apply 100% online and get pre-approved with
                                    competitive rates in minutes—a pre-approval
                                    is a must for many sellers. Receive a
                                    generous rebate at closing (0.6% of the
                                    loan) with no origination fee.
                                </div>
                            </div>
                            <SecondaryButton
                                hasArrow
                                text="Get Started"
                                style={{
                                    height: "3rem",
                                    marginTop: "2rem",
                                }}
                                size="medium"
                                onClick={() =>
                                    window.location.assign("/signup")
                                }
                            />
                        </Transition>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SlotMachineAnimation;
