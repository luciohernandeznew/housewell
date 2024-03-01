import React, { FC, ReactNode, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper";
import "swiper/css";

const ListingsSwiperCard: FC = () => {
    return (
        <Swiper
            breakpoints={{
                320: { slidesPerView: 1.5, spaceBetween: 15 },
                480: { slidesPerView: 1.5, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 15 },
                1024: { slidesPerView: 3, spaceBetween: 15 },
                1280: { slidesPerView: 3.5, spaceBetween: 15 },
            }}
            freeMode
            autoplay
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode, Autoplay]}
            loop={true}
            speed={5000}
        >
            <SwiperSlide>
                <CardComponent
                    imageStr="bg-[url('/temp/listings/listing1.png')]"
                    price={"$1,490,000"}
                    name={
                        <>
                            <div>100 Rona Lane</div>
                            <div>Weatherford, TX 76088</div>
                        </>
                    }
                    description="3 bed • 4 bath • Built in 2018"
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    imageStr="bg-[url('/temp/listings/listing2.png')]"
                    price={"$1,490,000"}
                    name={
                        <>
                            <div>100 Rona Lane</div>
                            <div>Weatherford, TX 76088</div>
                        </>
                    }
                    description="3 bed • 4 bath • Built in 2018"
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    imageStr="bg-[url('/temp/listings/listing3.png')]"
                    price={"$1,490,000"}
                    name={
                        <>
                            <div>100 Rona Lane</div>
                            <div>Weatherford, TX 76088</div>
                        </>
                    }
                    description="3 bed • 4 bath • Built in 2018"
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    imageStr="bg-[url('/temp/listings/listing4.png')]"
                    price={"$1,490,000"}
                    name={
                        <>
                            <div>100 Rona Lane</div>
                            <div>Weatherford, TX 76088</div>
                        </>
                    }
                    description="3 bed • 4 bath • Built in 2018"
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    imageStr="bg-[url('/temp/listings/listing4.png')]"
                    price={"$1,490,000"}
                    name={
                        <>
                            <div>100 Rona Lane</div>
                            <div>Weatherford, TX 76088</div>
                        </>
                    }
                    description="3 bed • 4 bath • Built in 2018"
                />
            </SwiperSlide>

            <SwiperSlide>
                <CardComponent
                    imageStr="bg-[url('/temp/listings/listing1.png')]"
                    price={"$1,490,000"}
                    name={
                        <>
                            <div>100 Rona Lane</div>
                            <div>Weatherford, TX 76088</div>
                        </>
                    }
                    description="3 bed • 4 bath • Built in 2018"
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    imageStr="bg-[url('/temp/listings/listing2.png')]"
                    price={"$1,490,000"}
                    name={
                        <>
                            <div>100 Rona Lane</div>
                            <div>Weatherford, TX 76088</div>
                        </>
                    }
                    description="3 bed • 4 bath • Built in 2018"
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    imageStr="bg-[url('/temp/listings/listing3.png')]"
                    price={"$1,490,000"}
                    name={
                        <>
                            <div>100 Rona Lane</div>
                            <div>Weatherford, TX 76088</div>
                        </>
                    }
                    description="3 bed • 4 bath • Built in 2018"
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    imageStr="bg-[url('/temp/listings/listing4.png')]"
                    price={"$1,490,000"}
                    name={
                        <>
                            <div>100 Rona Lane</div>
                            <div>Weatherford, TX 76088</div>
                        </>
                    }
                    description="3 bed • 4 bath • Built in 2018"
                />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent
                    imageStr="bg-[url('/temp/listings/listing4.png')]"
                    price={"$1,490,000"}
                    name={
                        <>
                            <div>100 Rona Lane</div>
                            <div>Weatherford, TX 76088</div>
                        </>
                    }
                    description="3 bed • 4 bath • Built in 2018"
                />
            </SwiperSlide>
        </Swiper>
    );
};

export default ListingsSwiperCard;

const CardComponent: FC<{
    imageStr?: string;
    price?: string;
    name?: ReactNode;
    description?: string;
}> = ({ imageStr, price, name, description }) => {
    return (
        <>
            <div className="border rounded-lg">
                <div
                    className={`w-full h-64 ${imageStr} bg-[length:100%_100%] bg-no-repeat flex justify-end`}
                >
                    <div className="bg-[#075F4E] p-1 w-8 h-8 rounded-md cursor-pointer m-2">
                        <div className="bg-[url('/temp/heart.svg')] bg-[length:100%_100%] bg-no-repeat w-full h-full" />
                    </div>
                </div>
                <div className="p-4 text-[#0E150E] font-bold h-56 flex flex-col justify-between">
                    <div>
                        <div className="text-sm font-mint">{price}</div>
                        <div className="font-austin text-lg leading-6 mt-4">
                            {name}
                        </div>
                    </div>
                    <div className="font-normal text-xs font-mint">
                        {description}
                    </div>
                </div>
            </div>
        </>
    );
};
