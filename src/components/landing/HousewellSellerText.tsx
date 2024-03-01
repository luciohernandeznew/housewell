import React, { FC, useRef, useState } from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import SelectDropdown from "../select/SelectDropdown";
import Transition from "./Transition";
gsap.registerPlugin(ScrollToPlugin);

const HousewellSellerText: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [userOption, setUserOption] = useState<string>("Sellers");

    const onChangeSellerOrBuyer = (option: string) => {
        gsap.to(window, {
            duration: 2,
            scrollTo: { y: `#${option}` },
        }).then(() => {
            setUserOption("Sellers");
        });
    };

    return (
        <>
            <div id="Sellers">
                <Transition refElement={ref}>
                    <div className="p-8">
                        <div className="font-austin text-6xl items-center md:flex max-lg:text-4xl max-md:text-2xl">
                            <div>Housewell is made for &nbsp;</div>
                            <SelectDropdown defaultString={userOption}>
                                <div
                                    onClick={() =>
                                        onChangeSellerOrBuyer("Sellers")
                                    }
                                    className="rounded-t-lg hover:bg-[#ddd] block px-4 py-3"
                                >
                                    Sellers
                                </div>
                                <div
                                    onClick={() =>
                                        onChangeSellerOrBuyer("Buyers")
                                    }
                                    className="rounded-b-lg hover:bg-[#ddd] block px-4 py-3"
                                >
                                    Buyers
                                </div>
                            </SelectDropdown>
                        </div>
                        <div className="text-[#4E564F] font-austin text-4xl max-lg:text-2xl max-md:text-lg max-md:mt-4 mb-8">
                            <div>Everything you need to sell your home, </div>
                            <div className="">no agent required</div>
                        </div>
                        <div ref={ref} />
                    </div>
                </Transition>
            </div>
        </>
    );
};

export default HousewellSellerText;
