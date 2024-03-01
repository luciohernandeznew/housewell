import React, { useState, FC } from "react";
import Image from "next/image";
import gsap from "gsap";
import SecondaryButton from "../../../../buttons/SecondaryButton";
import Link from "next/link";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import { MintParagraph } from "../../../../Typography/Typography";
import { colors } from "../../../../../styles/colors";
import FooterTitle from "./FooterTitle";

gsap.registerPlugin(ScrollToPlugin);

const Footer: FC<{ removeUpperFooter: boolean }> = ({ removeUpperFooter }) => {
    const onChangeBuyerOrSeller = (option: string) => {
        gsap.to(window, {
            duration: 1,
            scrollTo: { y: `#${option}` },
        });
    };

    return (
        <div className="px-24 pt-28 max-2xl:px-20 max-2xl:pt-24 max-xl:px-16 max-xl:pt-20 max-lg:px-12 max-lg:pt-16 max-md:px-8 max-md:pt-12 max-sm:px-4 max-sm:pt-8">
            {!removeUpperFooter && (
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
                                onClick={() =>
                                    window.location.assign("/signup")
                                }
                            />
                        </div>
                    </div>
                    <div className="col-span-3 max-md:col-span-12 max-md:mt-8 max-md:text-center">
                        <div className="font-mind">
                            <div className="text-[#6A716A] text-md">
                                Our Platform
                            </div>
                            <div className="text-[#000000] text-2xl font-semibold max-sm:text-lg">
                                <div className="my-2">
                                    <Link
                                        href="/how-it-works"
                                        onClick={() =>
                                            window.location.assign(
                                                "/how-it-works"
                                            )
                                        }
                                    >
                                        How It Works
                                    </Link>
                                </div>
                                <div
                                    className="my-2 cursor-pointer"
                                    onClick={() =>
                                        onChangeBuyerOrSeller("Buyers")
                                    }
                                >
                                    Buy
                                </div>
                                <div
                                    className="my-2 cursor-pointer"
                                    onClick={() =>
                                        onChangeBuyerOrSeller("Sellers")
                                    }
                                >
                                    Sell
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 max-md:col-span-12 max-md:mt-8 max-md:text-center">
                        <div className="font-mind">
                            <div className="text-[#6A716A] text-md">
                                Support
                            </div>
                            <div className="text-[#000000] text-2xl font-semibold max-sm:text-lg">
                                <div className="my-2">
                                    <Link
                                        href="/how-it-works"
                                        onClick={() =>
                                            window.location.assign(
                                                "/how-it-works"
                                            )
                                        }
                                    >
                                        FAQ
                                    </Link>
                                </div>
                                <div className="my-2">
                                    <Link
                                        href="/signup"
                                        className="my-2"
                                        onClick={() =>
                                            window.location.assign("/signup")
                                        }
                                    >
                                        Contact
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={`py-8 ${removeUpperFooter == false ? "mt-20": "mt-0"} max-md:mt-10 max-md:flex max-md:flex-col max-md:items-center`}>
                <Image
                    src={"/landing/logocolor.svg"}
                    width={150}
                    height={150}
                    alt="logo"
                />

                <div className="border-t w-full py-6 mt-6">
                    <div className="text-xs font-mint text-[#777571] flex w-full justify-between max-md:flex-col max-md:text-center">
                        <FooterTitle />

                        <div className="flex max-md:block mt-2">
                            <div className="mx-2 max-md:my-2">
                                <Link
                                    href="/terms-of-use"
                                    className="my-2"
                                    onClick={() =>
                                        window.location.assign("/terms-of-use")
                                    }
                                >
                                    Terms of Service
                                </Link>
                            </div>
                            <div className="mx-2 max-md:my-2">
                                <Link
                                    href="/privacy-policy"
                                    className="my-2"
                                    onClick={() =>
                                        window.location.assign(
                                            "/privacy-policy"
                                        )
                                    }
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MintParagraph style={{color:colors.gray600}} size="11" weight="regular" className="pb-8">
                Housewell Technologies, Inc. is not a lender. All loan products
                and financial services are provided by Embed Inc. d/b/a Pylon
                Lending, Pylon, NMLS# 2324627 (“Pylon”), a non-affiliated
                mortgage lender. You are not required to use Pylon for your
                mortgage needs and may be able to obtain lower rates or fees
                through a different lender. All communications and information
                sharing that occurs through the mortgage application process are
                between you and Pylon. This is not a commitment to lend. All
                offers are subject to submitting a complete loan application and
                obtaining a full underwriting approval. Loan terms are subject
                to change. Only the most qualified applicants will be approved
                for Pylon’s lowest rates. Not available in all states.{" "}
                <Link href="https://www.nmlsconsumeraccess.org/TuringTestPage.aspx?ReturnUrl=/EntityDetails.aspx/COMPANY/2324627">
                    NMLS Consumer Access.
                </Link>{" "}
                All loan products and financial services are subject to Pylon’s{" "}
                <Link href="https://www.pylonlending.com/terms-of-use">
                    Terms of Use
                </Link>{" "}
                Equal Housing Lender.
            </MintParagraph>
        </div>
    );
};

export default Footer;
