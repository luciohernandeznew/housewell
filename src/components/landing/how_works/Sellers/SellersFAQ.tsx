import React, { FC } from "react";
import Collapsible from "react-collapsible";
import { IoAddOutline } from "react-icons/io5";

const SellersFAQ: FC = () => {
    return (
        <>
            <div className="text-[#0E150E] font-austin text-[50px] text-center mt-16 pb-4 max-lg:text-[40px] max-md:text-[30px] max-sm:text-[20px]">
                Sellers FAQ
            </div>

            <div className="font-austin mx-80 max-2xl:mx-60 max-xl:mx-40 max-lg:mx-20 max-md:mx-10 max-sm:mx-5">
                <Collapsible
                    trigger={
                        <div className="flex font-bold w-full items-center justify-between text-[25px] py-4 border-t max-lg:text-[20px] max-md:text-[18px] max-sm:text-[16px]">
                            <div>Does Housewell cost money for sellers?</div>
                            <IoAddOutline />
                        </div>
                    }
                >
                    <p className="text-lg py-4 max-lg:text-md max-md:text-sm">
                    Yes, but only once you complete the sale. You can list with Housewell for free, and we charge a flat $2000 commission when you sell your home (not including any buyers agent commission). This is a fraction of the typical 6% commission charged by traditional agents.
                    </p>
                </Collapsible>

                <Collapsible
                    trigger={
                        <div className="flex font-bold w-full items-center justify-between text-[25px] py-4 border-t max-lg:text-[20px] max-md:text-[18px] max-sm:text-[16px]">
                            <div>
                                Can I use another agent and Housewell as a
                                Seller?
                            </div>
                            <IoAddOutline />
                        </div>
                    }
                >
                    <p className="text-lg py-4 max-lg:text-md max-md:text-sm">
                        No, when you list with Housewell you can&apos;t use another listing agent. We are technically your agent.
                    </p>
                </Collapsible>

                <Collapsible
                    trigger={
                        <div className="flex font-bold w-full items-center justify-between text-[25px] py-4 border-t max-lg:text-[20px] max-md:text-[18px] max-sm:text-[16px]">
                            <div>
                                How is Housewell so cheap compared to
                                traditional agents for Sellers?
                            </div>
                            <IoAddOutline />
                        </div>
                    }
                >
                    <p className="text-lg py-4 max-lg:text-md max-md:text-sm">
                        We are able to offer our services so cheaply because we use software to automate many of the tasks that traditional agents do manually. This allows us to pass the savings on to you.
                    </p>
                </Collapsible>

                <Collapsible
                    trigger={
                        <div className="flex font-bold w-full items-center justify-between text-[25px] py-4 border-t max-lg:text-[20px] max-md:text-[18px] max-sm:text-[16px]">
                            <div>
                                How can I ensure safety during showings as a
                                Seller?
                            </div>
                            <IoAddOutline />
                        </div>
                    }
                >
                    <p className="text-lg py-4 max-lg:text-md max-md:text-sm">
                        Part of listing with Housewell means we will do a basic criminal search on anyone who schedules a tour of your home. With that being said there are other things you can do to ensure safety. We recommend removing any valuables from your home and putting them in a safe place. We also recommend removing any prescription drugs from your home and putting them in a safe place. Lastly, we recommend you remove any firearms from your home and put them in a safe place. If you have any questions about safety please reach out to us at support@housewell.com
                    </p>
                </Collapsible>
            </div>
        </>
    );
};

export default SellersFAQ;
