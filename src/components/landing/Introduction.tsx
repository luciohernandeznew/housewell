import Link from "next/link";
import React, { FC, useRef } from "react";
import { AzeretMonoParagraph } from "../Typography/Typography";
import Transition from "./Transition";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const Introduction: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const homeArray = [
        "./temp/house1.svg",
        "./temp/house2.svg",
        "./temp/house3.svg",
    ];

    const swiperComponent = (addClass) => {
        return (
            <div className="w-1/6 bg-[length:100%_100%] inline-block max-lg:!w-[120px] max-lg:!h-[70px] max-md:!w-[95px] max-md:!h-[55px] max-sm:!w-[80px] max-sm:!h-[45px]">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    speed={1000}
                    slidesPerView={1}
                    spaceBetween={10}
                    observer={true}
                    observeParents={true}
                    // width={50}
                    // className="bg-no-repeat h-[90px] w-[180px] bg-[length:100%_100%] inline-block max-lg:!w-[120px] max-lg:!h-[70px] max-md:!w-[95px] max-md:!h-[55px] max-sm:!w-[80px] max-sm:!h-[45px]"
                >
                    {homeArray.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div key={index} className={`${addClass}`}>
                                    <img src={item} className="" />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        );
    };

    return (
        <>
            <Transition refElement={ref}>
                <div ref={ref} />
                <div className="max-lg:px-15 max-md:px-10 max-sm:px-5 p-20">
                    <div className="text-[124px] tracking-[-6.2px] leading-none font-austin max-lg:!text-[100px] max-lg:tracking-[-4.8px] max-md:!text-[80px] max-md:tracking-[-3px] max-sm:!text-[64px] max-sm:tracking-[-2.2px]">
                        <div className="max-2xl:hidden">
                            <div className="max-[1315px]:inline-block">
                                The new, best y to buy
                            </div>
                            <div className="max-[1315px]:inline-block flex">
                                <div className="mr-3">or sell</div>
                                {swiperComponent("mr-3 mt-3")}
                                <div>a home. Period.</div>
                            </div>
                        </div>
                        <div className="2xl:hidden">
                            The new, best way to buy or sell&nbsp;
                            {swiperComponent("mt-3")}
                            &nbsp;a home. Period.
                        </div>
                    </div>
                    <div className="text-2xl font-bold mt-16 max-lg:text-lg max-md:text-md font-mint">
                        List your home, make an offer, or get a mortgage in
                        minutes—no agent required.
                    </div>
                    <div className="text-xl max-lg:text-md max-md:text-sm">
                        No more 6% fees, no more waiting on someone to get
                        things done.&nbsp;
                        <Link
                            href="/how-it-works"
                            className="text-[#E0650D] text-xl max-lg:text-md max-md:text-sm hover:underline max-md:block max-md:mt-2"
                            onClick={() =>
                                window.location.assign("/how-it-works")
                            }
                        >
                            See how it works
                        </Link>
                    </div>
                    <div className="mt-12 font-bold border border-[#E0E5E0] p-4 w-fit max-md:hidden">
                        <AzeretMonoParagraph
                            weight="regular"
                            style={{
                                fontSize: "14px !important",
                                fontWeight: "bold",
                            }}
                        >
                            NOW AVAILABLE IN ATLANTA&nbsp;
{/*                             <Link
                                href="/buy/map"
                                className="hover:underline text-[#E0650D]"
                                onClick={() =>
                                    window.location.assign("/buy/map")
                                }
                            >
                                SEE LISTINGS
                            </Link> */}
                        </AzeretMonoParagraph>
                    </div>
                </div>
            </Transition>
        </>
    );
};

export default Introduction;
