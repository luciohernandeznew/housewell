import React, { FC, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import SecondaryButton from "../../buttons/SecondaryButton";
import "swiper/css";

const SellresShowingAnimation: FC = () => {
    return (
        <>
            <div className="mt-38 p-12 max-md:p-6 z-30">
                <div className="justify-between font-austin text-5xl mb-12 max-lg:text-4xl max-md:text-3xl md:flex z-30">
                    <div className="max-md:mb-4 w-1/3 max-[768px]:w-full">
                        <div>Everything sellers need to get more showings</div>
                    </div>
                    <SecondaryButton
                        hasArrow
                        text="Get Started"
                        style={{ height: "3rem" }}
                        size="medium"
                        onClick={() => window.location.assign("/signup")}
                    />
                </div>

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
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    speed={3000}
                >
                    <SwiperSlide>
                        <CardComponent
                            imgStr="bg-[url('/temp/sellers_showing/showing1.svg')]"
                            title={
                                <>
                                    Ask a licensed agent your questions any
                                    day of the week
                                </>
                            }
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardComponent
                            imgStr="bg-[url('/temp/sellers_showing/showing2.svg')]"
                            title={
                                <>Free professional photography when you list with Housewell</>
                            }
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardComponent
                            imgStr="bg-[url('/temp/sellers_showing/showing3.svg')]"
                            title={
                                <>
                                    Know who&apos;s touring your home-we do basic criminal
                                    background checks on anyone who schedules a showing
                                </>
                            }
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardComponent
                            imgStr="bg-[url('/temp/sellers_showing/showing4.svg')]"
                            title={
                                <>Sell as team by inviting your co-sellers</>
                            }
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <CardComponent
                            imgStr="bg-[url('/temp/sellers_showing/showing1.svg')]"
                            title={
                                <>
                                    Ask a licensed agent your questions any
                                    day of the week
                                </>
                            }
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardComponent
                            imgStr="bg-[url('/temp/sellers_showing/showing2.svg')]"
                            title={
                                <>Free professional photography when you list with Housewell</>
                            }
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardComponent
                            imgStr="bg-[url('/temp/sellers_showing/showing3.svg')]"
                            title={
                                <>
                                    Know who&apos;s touring your home-we do basic criminal
                                    background checks on anyone who schedules a showing
                                </>
                            }
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardComponent
                            imgStr="bg-[url('/temp/sellers_showing/showing4.svg')]"
                            title={
                                <>Sell as team by inviting your co-sellers</>
                            }
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
};

export default SellresShowingAnimation;

const CardComponent: FC<{ imgStr?: string; title?: ReactNode }> = ({
    imgStr,
    title,
}) => {
    return (
        <>
            <div className="max-lg:mt-4 z-30 max-sm:mx-1">
                <div className="border border-[#CACFCA] rounded-2xl p-8 flex flex-col justify-between">
                    <div
                        className={`${imgStr} bg-contain bg-no-repeat w-[12rem] h-32 max-lg:w-[10rem] max-lg:h-24 max-[580px]:w-[8rem]`}
                    />

                    <div className="text-xl font-austin text-black max-[580px]:text-xl mt-24 max-[1000px]:mt-20 max-[794px]:mt-16 max-[580px]:mt-10 h-20">
                        {title}
                    </div>
                </div>
            </div>
        </>
    );
};
