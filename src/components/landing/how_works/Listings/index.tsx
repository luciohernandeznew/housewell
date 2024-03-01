import React, { FC } from "react";
import SecondaryButton from "../../../buttons/SecondaryButton";
import ListingsSwiperCard from "./ListingsSwiperCard";

const Listings: FC = () => {
    return (
        <div className="px-12 py-28 border-b max-sm:px-6">
            <div className="flex justify-between w-full max-md:flex-col">
                <div className="font-austin text-[25px] leading-none max-md:text-[20px] max-md:mb-4 max-md:text-center">
                    <div className="font-bold">Active listings near</div>
                    <div className="text-[#E0650D] font-bold mt-1">
                        Atlanta, GA
                    </div>
                </div>
                <SecondaryButton
                    text="Find your dream home"
                    hasArrow
                    size="medium"
                    isLight
                />
            </div>
            <div className="mt-12">
                <ListingsSwiperCard />
            </div>
        </div>
    );
};

export default Listings;
