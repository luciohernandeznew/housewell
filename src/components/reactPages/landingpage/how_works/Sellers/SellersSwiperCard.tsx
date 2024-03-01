import React, { FC, useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";

const SellersSwiperCard: FC = () => {
    const swiperRef = useRef<any>(null);
    const [sellerPrevDisable, setSellerPrevDisable] = useState<boolean>(true);
    const [sellerNextDisable, setSellerNextDisable] = useState<boolean>(false);

    useEffect(() => {
        setSellerPrevDisable(true);
        setSellerNextDisable(false);
    }, []);

    return (
        <Swiper
            breakpoints={{
                360: { slidesPerView: 1, spaceBetween: 40 },
                410: { slidesPerView: 1.5, spaceBetween: 30 },
                512: { slidesPerView: 2, spaceBetween: 20 },
                640: { slidesPerView: 2.5, spaceBetween: 10 },
                768: { slidesPerView: 3, spaceBetween: 10 },
                1024: { slidesPerView: 3.5, spaceBetween: 10 },
                1280: { slidesPerView: 4, spaceBetween: 10 },
            }}
            onSwiper={(swiper: any) => {
                swiperRef.current = swiper;
            }}
            onSlideChange={(swiper: any) => {
                setSellerPrevDisable(
                    swiper.navigation.prevEl?.className.includes(
                        "swiper-button-disabled"
                    )
                );
                setSellerNextDisable(
                    swiper.navigation.nextEl?.className.includes(
                        "swiper-button-disabled"
                    )
                );
            }}
            navigation
            modules={[Navigation]}
            speed={2000}
        >
            <SwiperSlide>
                <CardComponent
                    num={1}
                    title="Sign Up"
                    content="Kickstart your home-selling journey with our
                                easy sign-up process. Create your account
                                quickly and step into the world of potential
                                buyers."
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    num={2}
                    title="Enter info about your home"
                    content="Highlight the best features of your home by providing comprehensive details—make your life a little easier by using our AI-powered marketing description writer."
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    num={3}
                    title="Sign Listing Agreement"
                    content="Finalize your intent to sell with our straightforward listing agreement. It's designed to protect your interests, clarify the selling process—no surprises and no pen-and-paper hassle."
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    num={4}
                    title="Schedule Professional Photography"
                    content="Capture the beauty of your home with professional photography—provided as part of your listing by approved Housewell photographers, so you know your home will be shot with top-tier care and expertise."
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    num={5}
                    title="Decide on a Listing Schedule"
                    content="Choose the best time to list your home, aligning with your preferences and market trends. You’re in charge—take the time that you need to get your home ready, or start showing tomorrow."
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    num={6}
                    title="List on Every Major Real Estate Platform"
                    content="Gain maximum exposure by listing your home on all major real estate platforms— pay less than working with a traditional agent, but still get the reach to sell your home for as high of a price as possible."
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    num={7}
                    title="Manage tours & compare offers"
                    content="Easily coordinate home tours with pre-approved buyers and compare offers all from your seller’s dashboard. This means you’ll be notified immediately when a tour or offer comes through."
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    num={8}
                    title="Close & Get Paid"
                    content="Seal the deal with a smooth closing process. Our platform supports you through every step, finalizing your home’s sale and getting you paid as quickly as possible."
                />
            </SwiperSlide>

            <div className="w-full flex justify-center mt-6">
                <div
                    className={`border border-[#E0E5E0] mr-1 p-4 rounded-full w-4 h-4 ${
                        sellerPrevDisable
                            ? "bg-[url('/temp/arrow-left-disabled.svg')]"
                            : "bg-[url('/temp/arrow-left-enabled.svg')]"
                    } bg-no-repeat bg-[length:100%_100%] flex justify-center items-center cursor-pointer hover:bg-[#f9f9f9]`}
                    onClick={() => swiperRef.current?.slidePrev()}
                />
                <div
                    className={`border border-[#E0E5E0] mr-1 p-4 rounded-full w-4 h-4 ${
                        sellerNextDisable
                            ? "bg-[url('/temp/arrow-right-disabled.svg')]"
                            : "bg-[url('/temp/arrow-right-enabled.svg')]"
                    } bg-no-repeat bg-[length:100%_100%] flex justify-center items-center cursor-pointer hover:bg-[#f9f9f9]`}
                    onClick={() => swiperRef.current?.slideNext()}
                />
            </div>
        </Swiper>
    );
};

export default SellersSwiperCard;

const CardComponent: FC<{ num?: number; title?: string; content?: string }> = ({
    num,
    title,
    content,
}) => {
    return (
        <>
            <div className="border border-[#CACFCA] rounded-2xl p-8 z-30 max-lg:p-6 max-[360px]:mx-1">
                <div className="font-austin flex flex-col justify-between h-96 overflow-y-auto max-sm:h-80 max-[290px]:h-96">
                    <div>
                        <div className="text-[#000] text-[70px] max-2xl:text-[60px] max-xl:text-[55px] max-lg:text-[50px] max-md:text-[45px] max-sm:text-[40px] max-[320px]:text-[35px]">
                            {num}
                        </div>
                        <div className="text-[#0E150E] text-[35px] leading-none max-2xl:text-[32px] max-xl:text-[30px] max-lg:text-[30px] max-[320px]:text-[30px]">
                            {title}
                        </div>
                    </div>
                    <div className="text-[#4E564F] text-sm font-mint max-lg:text-md mt-2">
                        {content}
                    </div>
                </div>
            </div>
        </>
    );
};
