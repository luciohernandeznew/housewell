import React, { FC } from "react";
import SellersSwiperCard from "./SellersSwiperCard";
import SellersFAQ from "./SellersFAQ";

const Sellers: FC = () => {
    return (
        <>
            <div className="text-center font-austin py-24">
                <div className="text-[40px] max-lg:text-[30px] max-md:text-[20px] max-sm:text-md">
                    How It Works
                </div>
                <div className="flex justify-center">
                    <div className="h-[1px] w-12 bg-[#303831]" />
                </div>
                <div className="text-[#EE5605] text-[100px] max-lg:text-[80px] max-md:text-[60px] max-sm:text-[40px]">
                    Sellers
                </div>
            </div>

            <div className="py-4 px-12 max-sm:px-6">
                <SellersSwiperCard />
                <SellersFAQ />
            </div>
        </>
    );
};

export default Sellers;
