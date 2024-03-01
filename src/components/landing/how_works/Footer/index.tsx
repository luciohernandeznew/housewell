import React, { FC } from "react";
import Image from "next/image";
import SecondaryButton from "../../../buttons/SecondaryButton";

const Footer: FC = () => {
    return (
        <div className="px-24 pt-28 max-2xl:px-20 max-2xl:pt-24 max-xl:px-16 max-xl:pt-20 max-lg:px-12 max-lg:pt-16 max-md:px-8 max-md:pt-12 max-sm:px-4 max-sm:pt-8">
            <div className="grid grid-cols-12">
                <div className="col-span-6 max-md:col-span-12 max-md:text-center">
                    <div className="text-[60px] font-austin w-full leading-none max-2xl:text-[50px] max-xl:text-[40px] max-lg:text-[35px] max-md:text-[30px] max-sm:text-[25px] max-md:flex max-md:flex-col">
                        <div className="">Buy or sell</div>
                        <div className="">your home today.</div>
                        <SecondaryButton
                            className="mt-6"
                            size="medium"
                            text="Get started"
                            hasArrow
                            isLight
                        />
                    </div>
                </div>
                <div className="col-span-3 max-md:col-span-12 max-md:mt-8 max-md:text-center">
                    <div className="font-mind">
                        <div className="text-[#6A716A] text-md">
                            Our Platform
                        </div>
                        <div className="text-[#000000] text-2xl font-semibold max-sm:text-lg">
                            <div className="my-2">How It Works</div>
                            <div className="my-2">Buy</div>
                            <div className="my-2">Sell</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 max-md:col-span-12 max-md:mt-8 max-md:text-center">
                    <div className="font-mind">
                        <div className="text-[#6A716A] text-md">Support</div>
                        <div className="text-[#000000] text-2xl font-semibold max-sm:text-lg">
                            <div className="my-2">FAQ</div>
                            <div className="my-2">Contact</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8 mt-20 max-md:mt-10 max-md:flex max-md:flex-col max-md:items-center">
                <Image
                    src={"/landing/logocolor.svg"}
                    width={150}
                    height={150}
                    alt="logo"
                />

                <div className="border-t w-full py-6 mt-6">
                    <div className="text-xs font-mint text-[#777571] flex w-full justify-between max-md:flex-col max-md:text-center">
                        <div>© Housewell 2023. All Rights Reserved.</div>
                        <div className="flex max-md:block">
                            <div className="mx-2 max-md:my-2">
                                Terms of Service
                            </div>
                            <div className="mx-2 max-md:my-2">
                                Privacy Policy
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
