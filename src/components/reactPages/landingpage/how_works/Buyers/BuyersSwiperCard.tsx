import React, { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";

const BuyersSwiperCard: FC = () => {
    const swiperRef = useRef<any>(null);
    const [buyerPrevDisable, setBuyerPrevDisable] = useState<boolean>(true);
    const [buyerNextDisable, setBuyerNextDisable] = useState<boolean>(false);

    useEffect(() => {
        setBuyerPrevDisable(true);
        setBuyerNextDisable(false);
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
                setBuyerPrevDisable(
                    swiper.navigation.prevEl?.className.includes(
                        "swiper-button-disabled"
                    )
                );
                setBuyerNextDisable(
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
                    content="Start your home-buying journey with an easy sign up on Housewell. Gain immediate access to properties tailored to your wants and needs."
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    num={2}
                    title="Get Pre-Approved"
                    content="Get pre-approved for a mortgage through Housewell in as little as 5 minutes. Manage mortgage, offers, and showings all in one place."
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    num={3}
                    title="Find a Home on Housewell"
                    content="Discover your dream home on Housewell. All listings are from vetted owners who are ready to accept tours and any of your questions."
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    num={4}
                    title="Schedule Tour"
                    content="Easily arrange a tour to experience your potential new home firsthand—no need to wait for a realtor-owner loop to check for times that work for them."
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    num={5}
                    title="Talk to the Seller"
                    content="Directly connect with sellers for a more personal home-buying experience. Ask questions, and when you find the house you love, find out what offer will be most persuasive from the source."
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    num={6}
                    title="Submit Offer"
                    content="When you find the right home, submit an offer through our offer builder—where we guide you each step of the way to create the best offer for both you and the seller."
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    num={7}
                    title="Close & Get the Keys "
                    content="Complete your home purchase with a streamlined closing process. Housewell helps you navigate the final steps, ensuring a smooth transition to your new home."
                />
            </SwiperSlide>

            <div className="w-full flex justify-center mt-6">
                <div
                    className={`border border-[#E0E5E0] mr-1 p-4 rounded-full w-4 h-4 ${
                        buyerPrevDisable
                            ? "bg-[url('/temp/arrow-left-disabled.svg')]"
                            : "bg-[url('/temp/arrow-left-enabled.svg')]"
                    } bg-no-repeat bg-[length:100%_100%] flex justify-center items-center cursor-pointer hover:bg-[#f9f9f9]`}
                    onClick={() => swiperRef.current.slidePrev()}
                />
                <div
                    className={`border border-[#E0E5E0] mr-1 p-4 rounded-full w-4 h-4 ${
                        buyerNextDisable
                            ? "bg-[url('/temp/arrow-right-disabled.svg')]"
                            : "bg-[url('/temp/arrow-right-enabled.svg')]"
                    } bg-no-repeat bg-[length:100%_100%] flex justify-center items-center cursor-pointer hover:bg-[#f9f9f9]`}
                    onClick={() => swiperRef.current.slideNext()}
                />
            </div>
        </Swiper>
    );
};

export default BuyersSwiperCard;

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
