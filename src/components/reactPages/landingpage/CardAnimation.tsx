import React, { FC, useRef } from "react";
import SecondaryButton from "../../buttons/SecondaryButton";
import Transition from "./Transition";
import animation from "../../../../public/temp/card-animation.json";
import { useLottie } from "lottie-react";

const CardAnimation: FC = () => {
    const ref = useRef<HTMLDivElement>(null);

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
    return (
        <>
            <div className="bg-[#FDF6F1] rounded-2xl">
                <div className="grid grid-cols-12 gap-8 max-lg:flex max-lg:justify-center max-lg:flex-col">
                    <div className="col-span-1"></div>
                    <div className="col-span-5 scale-[150%] max-lg:col-span-4 flex justify-center mb-5 max-lg:mb-2 max-md:mb-4 max-sm:mb-4 px-[20px]">
                        {lottie}
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-5 p-10 max-lg:col-span-12 max-md:p-5">
                        <Transition refElement={ref}>
                            <div ref={ref} />
                            <div className="font-austin text-5xl max-[1767px]:text-4xl max-lg:text-4xl max-md:text-3xl">
                                <div>List on every major</div>
                                <div>real-estate marketplace,</div>
                                <div>with no restrictions.</div>
                            </div>
                            <div className="border-[#B3B9B3] border-t-[1px] mt-36 w-1/4 max-[1023px]:mt-16 max-[1767px]:mt-52"></div>
                            <div className="font-mint text-lg mt-4 max-lg:text-md max-md:text-sm max-md:mt-5 max-[1767px]:text-sm">
                            Maximize the number of buyers who see your property by listing on every major real-estate marketplace, including the MLS, Zillow, Trulia, Redfin, Realtor.com, and more.

                            </div>
                            <SecondaryButton
                                hasArrow
                                text="Get Started"
                                style={{ height: "3rem", marginTop: "2rem" }}
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

export default CardAnimation;
