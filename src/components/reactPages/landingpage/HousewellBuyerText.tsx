import React, { FC, useState, useRef } from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import SelectDropdown from "../../select/SelectDropdown";
import Transition from "./Transition";
gsap.registerPlugin(ScrollToPlugin);

const HousewellBuyerText: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [userOption, setUserOption] = useState<string>("Buyers");

    const onChangeBuyerOrSeller = (option: string) => {
        gsap.to(window, {
            duration: 1,
            scrollTo: { y: `#${option}` },
        }).then(() => {
            setUserOption("Buyers");
        });
    };
    return (
        <>
            <Transition refElement={ref}>
                <div className="p-8 max-md:p-4 z-30">
                    <div className="font-austin text-6xl items-center md:flex max-lg:text-3xl z-30">
                        <div>Housewell is made for &nbsp;</div>
                        <SelectDropdown defaultString={userOption}>
                            <div
                                onClick={() => onChangeBuyerOrSeller("Buyers")}
                                className="rounded-t-lg hover:bg-[#ddd] block px-4 py-3"
                            >
                                Buyers
                            </div>
                            <div
                                onClick={() => onChangeBuyerOrSeller("Sellers")}
                                className="rounded-b-lg hover:bg-[#ddd] block px-4 py-3"
                            >
                                Sellers
                            </div>
                        </SelectDropdown>
                    </div>
                    <div className="text-[#4E564F] font-austin text-5xl max-lg:text-3xl max-md:text-xl max-md:mt-4 mb-8">
                        <div className="w-1/2 max-md:w-full">
                            Everything you need to buy your dream home, with or without an agent
                        </div>
                    </div>
                </div>
                <div ref={ref} />
            </Transition>
        </>
    );
};

export default HousewellBuyerText;
