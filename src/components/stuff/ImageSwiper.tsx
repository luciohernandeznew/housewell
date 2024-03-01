import React, {useRef, useEffect} from "react";
import {Swiper, SwiperSlide, SwiperRef} from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper";

export type ImageSwiperProps = {
    locs: string[]
    isActive: boolean
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({ locs, isActive }) => {
    const swiperRef = useRef<SwiperRef>(null);
    useEffect(() => {
      return () => {
        const swiperInstance = swiperRef.current?.swiper;
        if (swiperInstance) {
          swiperInstance.autoplay.stop();
          swiperInstance.destroy();
        }
      };
    }, [isActive]);

    return (
        <Swiper
            ref={swiperRef}
            style={{width: "85%", height: "100%"}}
            spaceBetween={0}
            slidesPerView={1}
            modules={[Navigation, Autoplay]}
            navigation={true}
            // navigation={{
            //     prevEl: navigationPrevRef.current,
            //     nextEl: navigationNextRef.current,
            // }}
            // onBeforeInit={(swiper) => {
            //     // @ts-ignore
            //     swiper.params.navigation.prevEl = navigationPrevRef.current;
            //     // @ts-ignore
            //     swiper.params.navigation.nextEl = navigationNextRef.current;
            // }}
            loop={true}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            autoplay={ swiperRef.current?.swiper ? {
                delay: 3000,
                disableOnInteraction: true,
            } : false}
        >
            {locs.map(loc => (
                <SwiperSlide key={loc} style={{position: "relative", width: "100%", height: "100%"}}>
                    <Image fill src={loc} alt="An SVG Icon" style={{padding: "8px 0 8px 0"}} />
                </SwiperSlide>
            ))}
            {/*<div ref={navigationPrevRef} />*/}
            {/*<div ref={navigationNextRef} />*/}
        </Swiper>
    )
}

export default ImageSwiper;