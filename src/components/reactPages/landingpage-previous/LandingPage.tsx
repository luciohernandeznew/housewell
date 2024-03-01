import React, { useEffect } from "react";
import IntroBedroomBlock from "./IntroBedroomBlock";
import ListingPlacesBlock from "./ListingPlacesBlock";
import SecondaryCallToActionBlock from "./CircleImageBigCallToActionBlock";
import { useDevice } from "../../../contexts/DeviceContext";
import PricingBlock from "./PricingBlock";
import GoodbyeEmailBlock from "./GoodbyeEmailBlock";
import LandingFooter from "./LandingFooter";
import ImageTextFourSmallImagesBlock from "./ImageTextFourSmallImagesBlock";


const LandingPage: React.FC = (props: {}) => {
    const { isMobile, windowSize} = useDevice();
    return (
        <div>
            <IntroBedroomBlock />
            <ListingPlacesBlock />
            <SecondaryCallToActionBlock />
            <ImageTextFourSmallImagesBlock/>
            <PricingBlock />
            <GoodbyeEmailBlock />
            <LandingFooter />
        </div>
    )
}

export default LandingPage;