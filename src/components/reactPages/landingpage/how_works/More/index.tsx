import Image from "next/image";
import React, { FC } from "react";
import SecondaryButton from "../../../../buttons/SecondaryButton";

const More: FC = () => {
    return (
        <div
            className="rounded-t-[50px] rounded-b-[50px] py-32"
            style={{
                background: "linear-gradient(180deg, #E1F6F7 0%, #F4FDF6 100%)",
            }}
        >
            <div className="font-austin text-[#0E150E] text-[95px] font-medium text-center w-full leading-none max-2xl:text-[80px] max-xl:text-[65px] max-lg:text-[50px] max-md:text-[45px] max-sm:text-[30px]">
                <div className="flex justify-center leading-none">
                    More
                    <Image
                        src={"/temp/coin.svg"}
                        width={100}
                        height={100}
                        alt="..."
                        className="mx-4 max-2xl:w-[90px] max-2xl:h-[90px] max-xl:w-[75px] max-xl:h-[75px] max-lg:w-[60px] max-lg:h-[60px] max-md:w-[45px] max-md:h-[45px] max-sm:w-[30px] max-sm:h-[30px]"
                    />
                    for
                </div>
                <div>buyers & sellers.</div>
                <div className="flex justify-center mt-12 max-sm:flex-col">
                <div className="leading-none">
                        <div>$0</div>
                        <div className="text-sm font-mint">to buy a home</div>
                    </div>
                    <div className="text-gray-300 mx-4 leading-none max-sm:hidden">
                        |
                    </div>
                    <div className="leading-none">
                        <div>$0</div>
                        <div className="text-sm font-mint">to list a home</div>
                    </div>
                    <div className="text-gray-300 mx-4 leading-none max-sm:hidden">
                        |
                    </div>
                    <div className="leading-none max-sm:mt-4">
                        <div>$1999</div>
                        <div className="text-sm font-mint">
                            when you sell your home
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-12">
                    <SecondaryButton
                        hasArrow
                        text="Get Started"
                        style={{ height: "3rem" }}
                        size="medium"
                        onClick={() => window.location.assign("/signup")}
                    />
                </div>
            </div>
        </div>
    );
};

export default More;
