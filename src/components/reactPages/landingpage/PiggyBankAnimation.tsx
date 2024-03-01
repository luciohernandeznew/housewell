import SecondaryButton from "../../../../src/components/buttons/SecondaryButton";
import animation from "../../../../public/temp/Coin Animation.json";
import { useLottie } from "lottie-react";
import React, { FC } from "react";

const PiggyBankAnimation: FC = () => {
  
    const defaultOptions: any = {
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
        <div className="relative grid grid-cols-12 lg:gap-8 z-30 mt-4 bg-[#FCFDF1]">
            <div className="col-span-8 max-[1026px]:col-span-11 max-[1026px]:min-h-[20rem] z-30 flex justify-center mt-5 max-[640px]:scale-90 max-[640px]:mt-0 max-[562px]:scale-80 max-[562px]:mt-[-10px] max-[500px]:mt-[-20px] max-[500px]:scale-70 max-[440px]:scale-60 max-[440px]:mt-[-25px]">
                <div className="absolute bg-[url('/temp/Group.svg')] bg-no-repeat bg-[length:100%_100%] w-[50rem] h-[33rem] flex justify-center"></div>

                <div className="w-[250px] mt-6 ml-[60px]">{lottie}</div>
            </div>

            <div className="col-span-4 max-lg:col-span-12 max-lg:pt-5 px-5 py-10 z-30 max-[1026px]:mt-[240px] max-[640px]:mt-[200px] max-[542px]:mt-[140px] max-[440px]:mt-[100px]">
                <div className="font-austin text-5xl max-[1767px]:text-4xl max-lg:text-4xl max-md:text-3xl z-30 ">
                    <div>No more realtor</div>
                    <div>fees—save up to 5%</div>
                    <div>on closing costs</div>
                </div>
                <div className="border-[#B3B9B3] border-t-[1px] mt-56 w-1/4 max-[1023px]:mt-16"></div>
                <div className="font-mint text-lg mt-4 max-lg:text-md max-md:text-sm max-md:mt-5 max-[1767px]:text-sm ">
                    In traditional real estate, 4 conversations need to happen
                    whenever there’s a question. That kind of delay can make or
                    break any real estate deal.
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
    );
};

export default PiggyBankAnimation;
