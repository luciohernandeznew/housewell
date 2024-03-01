import React, { FC, useRef } from "react";
import SecondaryButton from "../../../../src/components/buttons/SecondaryButton";
import { motion } from "framer-motion";
import offerAnimation from "../../../../public/temp/offer.json";
import Lottie from "lottie-react";

const OfferAnimation: FC = () => {
    const offerRef = useRef(null);

    return (
        <div className="rounded-2xl bg-[#F0FFF7] font-austin mt-4">
            <div className="grid grid-cols-12 lg:gap-8">
                <div className="col-span-4 max-lg:col-span-12 max-lg:pt-5 px-10 py-10 z-30 max-lg:hidden">
                    <div className="font-austin text-5xl max-[1767px]:text-4xl max-lg:text-4xl max-md:text-3xl">
                        <div>Compare offers and</div>
                        <div>know you’re making</div>
                        <div>the best choice.</div>
                    </div>
                    <div className="border-[#B3B9B3] border-t-[1px] mt-16 w-1/4"></div>
                    <div className="font-mint text-lg mt-4 max-lg:text-md max-md:text-sm max-md:mt-5 max-[1767px]:text-sm">
                        When evaluating offers, there are a lot of variables to
                        consider. Housewell helps you quickly see which offer is
                        recommended based on financing, timing, and how much
                        money ends up in your pocket.
                    </div>
                    <SecondaryButton
                        hasArrow
                        text="Get Started"
                        style={{
                            height: "3rem",
                            marginTop: "2rem",
                        }}
                        size="medium"
                        onClick={() => window.location.assign("/signup")}
                    />
                </div>

                <motion.div
                    className="col-span-8 max-md:col-span-12 z-30"
                    ref={offerRef}
                >
                    <Lottie
                        animationData={offerAnimation}
                        loop={true}
                        height={30}
                        width={30}
                        interactivity={{
                            actions: [
                                {
                                    visibility: [0, 1],
                                    type: "loop",
                                    frames: [100],
                                },
                            ],
                            mode: "scroll",
                        }}
                    />
                </motion.div>
                <div className="hidden col-span-4 max-lg:col-span-12 max-lg:pt-5 px-10 py-10 z-30 max-lg:block">
                    <div className="font-austin text-5xl max-[1767px]:text-4xl max-lg:text-4xl max-md:text-3xl ">
                        <div>Compare offers and</div>
                        <div>know you’re making</div>
                        <div>the best choice.</div>
                    </div>
                    <div className="border-[#B3B9B3] border-t-[1px] mt-16 w-1/4"></div>
                    <div className="font-mint text-lg mt-4 max-lg:text-md max-md:text-sm max-md:mt-5 max-[1767px]:text-sm">
                        When evaluating offers, there are a lot of variables to
                        consider. Housewell helps you quickly see which offer is
                        recommended based on financing, timing, and how much
                        money ends up in your pocket.
                    </div>
                    <SecondaryButton
                        hasArrow
                        text="Get Started"
                        style={{
                            height: "3rem",
                            marginTop: "2rem",
                        }}
                        size="medium"
                        onClick={() => window.location.assign("/signup")}
                    />
                </div>
            </div>
        </div>
    );
};

export default OfferAnimation;
