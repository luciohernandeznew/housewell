import React, { FC } from "react";
import Collapsible from "react-collapsible";
import { IoAddOutline } from "react-icons/io5";

const BuyersFAQ: FC = () => {
    return (
        <>
            <div className="text-[#0E150E] font-austin text-[50px] text-center mt-16 pb-4 max-lg:text-[40px] max-md:text-[30px] max-sm:text-[20px]">
                Buyers FAQ
            </div>

            <div className="font-austin mx-80 max-2xl:mx-60 max-xl:mx-40 max-lg:mx-20 max-md:mx-10 max-sm:mx-5">
                <Collapsible
                    trigger={
                        <div className="flex font-bold w-full items-center justify-between text-[25px] py-4 border-t max-lg:text-[20px] max-md:text-[18px] max-sm:text-[16px]">
                            <div>
                                Can I use another agent and Housewell when
                                buying?
                            </div>
                            <IoAddOutline />
                        </div>
                    }
                >
                    <p className="text-lg py-4 max-lg:text-md max-md:text-sm">
                    Yes and we encourage it if that&apos;s what you want! However, you won&apos;t be able to get the Housewell Rebate if you use another agent.
                    </p>
                </Collapsible>

                <Collapsible
                    trigger={
                        <div className="flex font-bold w-full items-center justify-between text-[25px] py-4 border-t max-lg:text-[20px] max-md:text-[18px] max-sm:text-[16px]">
                            <div>Does Housewell Cost Money for Buyers?</div>
                            <IoAddOutline />
                        </div>
                    }
                >
                    <p className="text-lg py-4 max-lg:text-md max-md:text-sm">
                        No, buying through Housewell is completely free.
                    </p>
                </Collapsible>

                <Collapsible
                    trigger={
                        <div className="flex font-bold w-full items-center justify-between text-[25px] py-4 border-t max-lg:text-[20px] max-md:text-[18px] max-sm:text-[16px]">
                            <div>What is the Housewell Rebate for Buyers?</div>
                            <IoAddOutline />
                        </div>
                    }
                >
                    <p className="text-lg py-4 max-lg:text-md max-md:text-sm">
                    The Housewell Rebate is a portion of the commission we credit back to you for being our customer. This can be up to 3% of the property value depending on the Seller. You get this rebate for buying directly through Housewell instead of using an agent. You can use an agent on Housewell, but you won&apos;t be eligible for the rebate.

                    </p>
                </Collapsible>

                <Collapsible
                    trigger={
                        <div className="flex font-bold w-full items-center justify-between text-[25px] py-4 border-t max-lg:text-[20px] max-md:text-[18px] max-sm:text-[16px]">
                            <div>
                                Do I need an agent to attend a showing as a
                                Buyer?
                            </div>
                            <IoAddOutline />
                        </div>
                    }
                >
                    <p className="text-lg py-4 max-lg:text-md max-md:text-sm">
                    No, unlike many other platforms you can attend a showing with or without an agent. We will, however, need your information for a basic criminal history check for the safety of our community.

                    </p>
                </Collapsible>
            </div>
        </>
    );
};

export default BuyersFAQ;
