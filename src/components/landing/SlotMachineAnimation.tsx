import React, { FC, useEffect, useRef, useState } from "react";
import SecondaryButton from "../buttons/SecondaryButton";
import { useInView } from "framer-motion";
import Transition from "./Transition";

const SlotMachineAnimation: FC = () => {
    const tempRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const [offsetNumber, setOffsetNumber] = useState<number>(8);
    const [status, setStatus] = useState("down");

    useEffect(() => {
        startAnimation(offsetNumber);
        const timer = setTimeout(() => {
            if (status == "down") {
                setOffsetNumber(offsetNumber - 1);
                if (offsetNumber == 2) setStatus("up");
            }
            if (status == "up") {
                setOffsetNumber(offsetNumber + 1);
                if (offsetNumber == 7) setStatus("down");
            }
        }, 5500);
        if (inView) {
            timer;
        } else {
            clearInterval(timer);
        }
        return () => {
            clearInterval(timer);
        };
    }, [offsetNumber, status, inView]);

    const startAnimation = (offset: number) => {
        const numbers_container1 =
            document.getElementById("numbers_container1") || null;
        const options1 = numbers_container1?.children || [];
        const chosenOption1: any = options1[offset];
        const top1 = -chosenOption1.offsetTop + 50;
        chosenOption1.parentElement.style.fontWeight = "100";
        chosenOption1.parentElement.style.color = "#274b29";
        if (numbers_container1) {
            numbers_container1.style.top = `${top1}px`;
            numbers_container1.style.transition = `cubic-bezier(.47, 1.64, .41, .8) 1200ms`;
            setTimeout(() => {
                chosenOption1.parentElement.style.color = "#1B311C";
                chosenOption1.parentElement.style.fontWeight = "550";
            }, 400);
        }

        const numbers_container2 =
            document.getElementById("numbers_container2") || null;
        const options2 = numbers_container2?.children || [];
        const chosenOption2: any = options2[offset];
        const top2 = -chosenOption2.offsetTop + 50;
        chosenOption2.parentElement.style.fontWeight = "400";
        if (numbers_container2) {
            numbers_container2.style.top = `${top2}px`;
            numbers_container2.style.transition = `cubic-bezier(.47, 1.64, .41, .8) 1200ms`;
        }
    };

    return (
        <>
            <div className="rounded-2xl bg-[#F1FEFE]">
                <div className="grid grid-cols-12 lg:gap-8">
                    <div
                        className={`col-span-8 max-lg:col-span-12 flex justify-center z-30 w-full`}
                    >
                        <div ref={ref} />
                        <div className="bg-[url('/temp/Mortgage.svg')] h-[34rem] bg-no-repeat bg-[length:100%_100%] absolute flex justify-center w-[47rem] max-[700px]:w-[35rem] max-[700px]:h-[26rem] max-sm:h-[21rem] max-[500px]:h-[15rem] max-[380px]:h-[10rem]" />

                        <div className="font-mint text-[90px] absolute tracking-normal leading-snug mt-[170px] ml-[100px] px-5 h-[228px] w-auto rounded-r-[3rem] max-[700px]:scale-[75%] max-[700px]:mt-[103px] max-[700px]:ml-[70px] max-sm:scale-[62%] max-sm:mt-[62px] max-sm:ml-[45px] max-sm:w-[516px] max-[500px]:scale-[44%] max-[500px]:mt-[12px] max-[380px]:scale-[29%] max-[380px]:mg-[-30px] max-[380px]:ml-[24px] max-[380px]:-mt-[30px] overflow-hidden">
                            <div id="numbers_container1" className="relative">
                                <div>
                                    <span>$ 1000,000</span>
                                </div>
                                <div>
                                    <span>$ 900,000</span>
                                </div>
                                <div>
                                    <span>$ 800,000</span>
                                </div>
                                <div>
                                    <span>$ 700,000</span>
                                </div>
                                <div>
                                    <span>$ 600,000</span>
                                </div>
                                <div>
                                    <span>$ 500,000</span>
                                </div>
                                <div>
                                    <span>$ 400,000</span>
                                </div>
                                <div>
                                    <span>$ 300,000</span>
                                </div>
                                <div>
                                    <span>$ 200,000</span>
                                </div>
                                <div>
                                    <span>$ 100,000</span>
                                </div>
                            </div>
                            <div className="absolute bg-white w-[545px] h-[50px] -ml-[20px] -mt-[1238px] rounded-tr-[3rem] max-sm:-mt-[1364px] max-[500px]:-mt-[1364px]"></div>
                            <div className="absolute bg-white w-[545px] h-[50px] -ml-[20px] -mt-[1059px] rounded-br-[3rem] max-sm:-mt-[1183px]"></div>
                            <div
                                id="numbers_container2"
                                className="relative -mt-[1238px] stroke-text max-sm:-mt-[1361px]"
                            >
                                <div>
                                    <span>$ 1000,000</span>
                                </div>
                                <div>
                                    <span>$ 900,000</span>
                                </div>
                                <div>
                                    <span>$ 800,000</span>
                                </div>
                                <div>
                                    <span>$ 700,000</span>
                                </div>
                                <div>
                                    <span>$ 600,000</span>
                                </div>
                                <div>
                                    <span>$ 500,000</span>
                                </div>
                                <div>
                                    <span>$ 400,000</span>
                                </div>
                                <div>
                                    <span>$ 300,000</span>
                                </div>
                                <div>
                                    <span>$ 200,000</span>
                                </div>
                                <div>
                                    <span>$ 100,000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 py-10 px-5 max-lg:col-span-12 max-md:p-5 z-30 max-lg:mt-[545px] max-[700px]:mt-[415px] max-sm:mt-[337px] max-[500px]:mt-[241px] max-[380px]:mt-[200px]">
                        <Transition refElement={tempRef}>
                            <div ref={tempRef} />
                            <div className="font-austin text-5xl max-[1767px]:text-4xl max-lg:text-4xl max-md:text-3xl">
                                <div>Get pre-approved</div>
                                <div>for a mortgage in 5</div>
                                <div>minutes or less</div>
                            </div>

                            <div className="font-mint text-lg mt-48 max-lg:text-md max-md:text-sm max-md:mt-5 max-[1767px]:text-sm">
                                <div>
                                    Apply 100% online and get pre-approved with
                                </div>
                                <div>
                                    competitive rates in minutes—a pre-approval
                                    is a must
                                </div>
                                <div>
                                    for many sellers. Receive a generous rebate
                                    at closing
                                </div>
                                <div>
                                    (0.6% of the loan) with no origination fee.
                                </div>
                            </div>
                            <SecondaryButton
                                hasArrow
                                text="Get Started"
                                style={{
                                    height: "3rem",
                                    marginTop: "2rem",
                                }}
                                size="medium"
                            />
                        </Transition>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SlotMachineAnimation;
