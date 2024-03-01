"use client";
import React, { FC } from "react";

import TextAnimation from "./TextAnimation";
import HousewellSellerText from "./HousewellSellerText";
import CardAnimation from "./CardAnimation";
import CloudAnimation from "./CloudAnimation";
import MessageAnimation from "./MessageAnimation";
import SellersShowingAnimation from "./SellersShowingAnimation";
import BuyersShowingAnimation from "./BuyersShowingAnimation";
import HousewellBuyerText from "./HousewellBuyerText";
import SlotMachineAnimation from "./SlotMachineAnimation";
import OfferAnimation from "./OfferAnimation";
import DownPayment from "./DownPayment";
import PiggyBankAnimation from "./PiggyBankAnimation";

const ContentLandingPage: FC = () => {
    
    return (
        <div className="bg-[#FDF6F1]">
            <TextAnimation />
            <div className="bg-white md:rounded-tl-[80px] md:rounded-tr-[80px] p-10 max-md:p-5">
                <HousewellSellerText />
                <CardAnimation />
                <MessageAnimation />
                <CloudAnimation />
                <OfferAnimation />
                <SellersShowingAnimation />
            </div>

            <div className="bg-white">
                <div
                    className="border-t-[1px] boder-[gray] rounded-tl-[80px] rounded-tr-[80px] z-30"
                    id="Buyers"
                >
                    <div className="bg-white md:rounded-tl-[80px] md:rounded-tr-[80px] p-10 max-md:p-5">
                        <HousewellBuyerText />

                        <div className="font-austin mt-4">
                            <SlotMachineAnimation />
                            <DownPayment />
                            <PiggyBankAnimation />
                        </div>
                        <BuyersShowingAnimation />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentLandingPage;
