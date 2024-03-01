import React, { useCallback, useRef, useEffect } from "react";
import { motion, useAnimate, useInView } from "framer-motion";
import Typing from "./Typing";
import SecondaryButton from "../buttons/SecondaryButton";
import Transition from "./Transition";

const MessageAnimation: React.FC = () => {
    const tempRef = useRef<HTMLDivElement>(null);
    const ref = useRef(null);
    const isInView = useInView(ref);
    const [message1, message1Animate] = useAnimate();
    const [message1Text, message1TextAnimate] = useAnimate();
    const [message1Section, message1SectionAnimate] = useAnimate();
    const [message1Typing, message1TypingAnimate] = useAnimate();
    const [message1Time, message1TimeAnimate] = useAnimate();
    const [message2, message2Animate] = useAnimate();
    const [message2Text, message2TextAnimate] = useAnimate();
    const [message2Section, message2SectionAnimate] = useAnimate();
    const [message2Typing, message2TypingAnimate] = useAnimate();
    const [message2Time, message2TimeAnimate] = useAnimate();
    const [message3, message3Animate] = useAnimate();
    const [message3Text, message3TextAnimate] = useAnimate();
    const [message3Section, message3SectionAnimate] = useAnimate();
    const [message3Typing, message3TypingAnimate] = useAnimate();
    const [message3Time, message3TimeAnimate] = useAnimate();
    const [message4, message4Animate] = useAnimate();
    const [message4Text, message4TextAnimate] = useAnimate();
    const [message4Section, message4SectionAnimate] = useAnimate();
    const [message4Typing, message4TypingAnimate] = useAnimate();
    const [message4Time, message4TimeAnimate] = useAnimate();

    const messageAnimation = useCallback(() => {
        message1SectionAnimate(
            message1Section.current,
            {
                opacity: 1,
            },
            {
                onComplete: () => {
                    message1TypingAnimate(
                        message1Typing.current,
                        {
                            display: "none",
                        },
                        {
                            delay: 5,
                            onComplete: () => {
                                message1TimeAnimate(
                                    message1Time.current,
                                    {
                                        opacity: 1,
                                        display: "inherit",
                                    },
                                    {
                                        duration: 0.2,
                                        delay: 0.5,
                                    }
                                );
                                message1Animate(
                                    message1.current,
                                    {
                                        // display: "flex",
                                        // width: "100%",
                                        // height: "100%",
                                        opacity: 1,
                                    },
                                    {
                                        duration: 0.2,
                                        type: "tween",
                                        onComplete: () => {
                                            message1TextAnimate(
                                                message1Text.current,
                                                { opacity: 1 },
                                                {
                                                    duration: 0.2,
                                                    type: "tween",
                                                    onComplete: () => {
                                                        message2SectionAnimate(
                                                            message2Section.current,
                                                            {
                                                                opacity: 1,
                                                            },
                                                            {
                                                                delay: 1,
                                                                onComplete:
                                                                    () => {
                                                                        message2TypingAnimate(
                                                                            message2Typing.current,
                                                                            {
                                                                                display:
                                                                                    "none",
                                                                            },
                                                                            {
                                                                                delay: 5,
                                                                                onComplete:
                                                                                    () => {
                                                                                        message2TimeAnimate(
                                                                                            message2Time.current,
                                                                                            {
                                                                                                opacity: 1,
                                                                                                display:
                                                                                                    "inherit",
                                                                                            },
                                                                                            {
                                                                                                duration: 0.2,
                                                                                                delay: 0.5,
                                                                                            }
                                                                                        );
                                                                                        message2Animate(
                                                                                            message2.current,
                                                                                            {
                                                                                                opacity: 1,
                                                                                                // width: "100%",
                                                                                                // height: "100%",
                                                                                                // display:
                                                                                                //     "flex",
                                                                                            },
                                                                                            {
                                                                                                duration: 0.2,
                                                                                                // delay: 5,
                                                                                                type: "tween",
                                                                                                onComplete:
                                                                                                    () => {
                                                                                                        message2TextAnimate(
                                                                                                            message2Text.current,
                                                                                                            {
                                                                                                                opacity: 1,
                                                                                                            },
                                                                                                            {
                                                                                                                duration: 0.2,
                                                                                                                type: "tween",
                                                                                                                onComplete:
                                                                                                                    () => {
                                                                                                                        message3SectionAnimate(
                                                                                                                            message3Section.current,
                                                                                                                            {
                                                                                                                                opacity: 1,
                                                                                                                            },
                                                                                                                            {
                                                                                                                                delay: 1,
                                                                                                                                onComplete:
                                                                                                                                    () => {
                                                                                                                                        message3TypingAnimate(
                                                                                                                                            message3Typing.current,
                                                                                                                                            {
                                                                                                                                                display:
                                                                                                                                                    "none",
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                delay: 5,
                                                                                                                                                onComplete:
                                                                                                                                                    () => {
                                                                                                                                                        message3TimeAnimate(
                                                                                                                                                            message3Time.current,
                                                                                                                                                            {
                                                                                                                                                                opacity: 1,
                                                                                                                                                                display:
                                                                                                                                                                    "inherit",
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                duration: 0.2,
                                                                                                                                                                delay: 0.5,
                                                                                                                                                            }
                                                                                                                                                        );
                                                                                                                                                        message3Animate(
                                                                                                                                                            message3.current,
                                                                                                                                                            {
                                                                                                                                                                // display:
                                                                                                                                                                //     "flex",
                                                                                                                                                                // width: "100%",
                                                                                                                                                                // height: "100%",
                                                                                                                                                                opacity: 1,
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                duration: 0.2,
                                                                                                                                                                // delay: 5,
                                                                                                                                                                type: "tween",
                                                                                                                                                                onComplete:
                                                                                                                                                                    () => {
                                                                                                                                                                        message3TextAnimate(
                                                                                                                                                                            message3Text.current,
                                                                                                                                                                            {
                                                                                                                                                                                opacity: 1,
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                duration: 0.2,
                                                                                                                                                                                type: "tween",
                                                                                                                                                                                onComplete:
                                                                                                                                                                                    () => {
                                                                                                                                                                                        message4SectionAnimate(
                                                                                                                                                                                            message4Section.current,
                                                                                                                                                                                            {
                                                                                                                                                                                                opacity: 1,
                                                                                                                                                                                            },
                                                                                                                                                                                            {
                                                                                                                                                                                                delay: 1,
                                                                                                                                                                                                onComplete:
                                                                                                                                                                                                    () => {
                                                                                                                                                                                                        message4TypingAnimate(
                                                                                                                                                                                                            message4Typing.current,
                                                                                                                                                                                                            {
                                                                                                                                                                                                                display:
                                                                                                                                                                                                                    "none",
                                                                                                                                                                                                            },
                                                                                                                                                                                                            {
                                                                                                                                                                                                                delay: 5,
                                                                                                                                                                                                                onComplete:
                                                                                                                                                                                                                    () => {
                                                                                                                                                                                                                        message4TimeAnimate(
                                                                                                                                                                                                                            message4Time.current,
                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                opacity: 1,
                                                                                                                                                                                                                                display:
                                                                                                                                                                                                                                    "inherit",
                                                                                                                                                                                                                            },
                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                duration: 0.2,
                                                                                                                                                                                                                                delay: 0.5,
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                        );
                                                                                                                                                                                                                        message4Animate(
                                                                                                                                                                                                                            message4.current,
                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                // width: "100%",
                                                                                                                                                                                                                                // height: "100%",
                                                                                                                                                                                                                                // display:
                                                                                                                                                                                                                                //     "flex",
                                                                                                                                                                                                                                opacity: 1,
                                                                                                                                                                                                                            },
                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                duration: 0.2,
                                                                                                                                                                                                                                type: "tween",
                                                                                                                                                                                                                                onComplete:
                                                                                                                                                                                                                                    () => {
                                                                                                                                                                                                                                        message4TextAnimate(
                                                                                                                                                                                                                                            message4Text.current,
                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                opacity: 1,
                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                duration: 0.2,
                                                                                                                                                                                                                                                type: "tween",
                                                                                                                                                                                                                                                onComplete:
                                                                                                                                                                                                                                                    () => {},
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                        );
                                                                                                                                                                                                                    },
                                                                                                                                                                                                            }
                                                                                                                                                                                                        );
                                                                                                                                                                                                    },
                                                                                                                                                                                            }
                                                                                                                                                                                        );
                                                                                                                                                                                    },
                                                                                                                                                                            }
                                                                                                                                                                        );
                                                                                                                                                                    },
                                                                                                                                                            }
                                                                                                                                                        );
                                                                                                                                                    },
                                                                                                                                            }
                                                                                                                                        );
                                                                                                                                    },
                                                                                                                            }
                                                                                                                        );
                                                                                                                    },
                                                                                                            }
                                                                                                        );
                                                                                                    },
                                                                                            }
                                                                                        );
                                                                                    },
                                                                            }
                                                                        );
                                                                    },
                                                            }
                                                        );
                                                    },
                                                }
                                            );
                                        },
                                    }
                                );
                            },
                        }
                    );
                },
            }
        );
    }, [
        message1,
        message1Animate,
        message1Section,
        message1SectionAnimate,
        message1Text,
        message1TextAnimate,
        message1Time,
        message1TimeAnimate,
        message1Typing,
        message1TypingAnimate,
        message2,
        message2Animate,
        message2Section,
        message2SectionAnimate,
        message2Text,
        message2TextAnimate,
        message2Time,
        message2TimeAnimate,
        message2Typing,
        message2TypingAnimate,
        message3,
        message3Animate,
        message3Section,
        message3SectionAnimate,
        message3Text,
        message3TextAnimate,
        message3Time,
        message3TimeAnimate,
        message3Typing,
        message3TypingAnimate,
        message4,
        message4Animate,
        message4Section,
        message4SectionAnimate,
        message4Text,
        message4TextAnimate,
        message4Time,
        message4TimeAnimate,
        message4Typing,
        message4TypingAnimate,
    ]);

    useEffect(() => {
        if (isInView) {
            messageAnimation();
        }
    }, [messageAnimation, isInView]);

    return (
        <>
            <div className="rounded-2xl bg-[#FCFDF1] font-austin mt-4 pt-10">
                <div className="grid grid-cols-12 lg:gap-8">
                    <div className="col-span-8 max-lg:col-span-12 max-md:min-h-[20rem] z-30">
                        <div className="border-[#1B311C] border-t border-r w-full rounded-tr-2xl bg-white h-full pt-2 pr-2 max-lg:p-0 max-lg:border-none">
                            <div
                                className="border-[#1B311C] border-t border-r w-full rounded-tr-2xl bg-white h-full pt-16 pr-16 pl-8 shadow-[#1B311C] bg-gradient-to-b from-[#308546] from-100% to-90% max-lg:p-0 max-lg:bg-white max-lg:rounded-tl-2xl max-lg:border-none"
                                style={{ boxShadow: "inset -5px 0px" }}
                            >
                                <div
                                    className="rounded-tr-2xl rounded-tl-2xl shadow-[#1B311C] h-full w-full border-[#1B311C] border-l border-t border-r bg-[#fff]"
                                    style={{ boxShadow: "-5px 0px" }}
                                >
                                    <div className="text-[#308546] font-mint">
                                        <div className="w-full border-[#308546] border-b p-4 flex justify-between items-center">
                                            <div className="border-[#308546] rounded-full w-full border h-full flex items-center px-4 py-2 mr-4 text-sm">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="11"
                                                    height="15"
                                                    viewBox="0 0 15 19"
                                                    fill="none"
                                                >
                                                    <rect
                                                        y="7.05469"
                                                        width="14.9087"
                                                        height="11.4682"
                                                        rx="2.29365"
                                                        fill="#308546"
                                                    />
                                                    <rect
                                                        x="4.00943"
                                                        y="1.89224"
                                                        width="6.88094"
                                                        height="10.3214"
                                                        rx="3.44047"
                                                        stroke="#308546"
                                                        stroke-width="2.29365"
                                                    />
                                                </svg>
                                                &nbsp;housewell.com
                                            </div>
                                            <div className="bg-[url('/temp/threedots.svg')] bg-[length:100%_100%] h-16 w-16" />
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            ref={message1Section}
                                            className="flex justify-center px-16 py-6 max-lg:px-1"
                                        >
                                            <div className="w-full flex items-end justify-end h-auto">
                                                <motion.div
                                                    ref={message1Typing}
                                                    className="mr-12 absolute"
                                                >
                                                    <Typing
                                                        className="border-[#308546] w-full h-full border rounded-2xl flex items-center p-4"
                                                        style={{
                                                            boxShadow:
                                                                "-5px 0px",
                                                        }}
                                                    />
                                                    <div
                                                        className="absolute text-[12px] w-24"
                                                        ref={ref}
                                                    >
                                                        Seller is typing...
                                                    </div>
                                                </motion.div>
                                                <motion.div
                                                    initial={{
                                                        width: "100%",
                                                        height: "100%",
                                                        opacity: 0,
                                                    }}
                                                    ref={message1}
                                                    className="border-[#308546] border rounded-2xl flex items-center p-4 mr-4 ml-28 max-md:ml-1 max-md:p-2 max-md:mr-2"
                                                    style={{
                                                        boxShadow: "-5px 0px",
                                                        // display: "none",
                                                    }}
                                                >
                                                    <motion.div
                                                        ref={message1Text}
                                                        initial={{
                                                            opacity: 0,
                                                        }}
                                                        className="max-lg:text-sm max-md:text-xs"
                                                    >
                                                        Looking forward to
                                                        meeting you in person,
                                                        let me know if you guys
                                                        have any questions after
                                                        you take the tour, happy
                                                        to answer as soon as I
                                                        can.
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            display: "none",
                                                        }}
                                                        ref={message1Time}
                                                        className="absolute mt-[10rem] text-[12px] ml-[18rem]"
                                                    >
                                                        {/* <span>Sent 12:33pm</span> */}
                                                    </motion.div>
                                                </motion.div>
                                                <div className="rounded-full p-4 bg-[#308546] text-[#fff] w-10 h-10 flex items-center justify-center max-md:w-6 max-md:h-6 max-md:p-2 max-sm:hidden">
                                                    S
                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            ref={message2Section}
                                            className="flex px-16 py-6 max-lg:px-1"
                                        >
                                            <div className="flex items-end w-full justify-start">
                                                <div className="rounded-full p-4 bg-[#308546] text-[#fff] w-10 h-10 flex items-center justify-center mr-4 max-md:w-6 max-md:h-6 max-md:p-2 max-md:mr-2">
                                                    B
                                                </div>
                                                <div className="w-full flex items-end h-auto">
                                                    <motion.div
                                                        ref={message2Typing}
                                                    >
                                                        <Typing
                                                            className="border-[#308546] w-full h-full border rounded-2xl flex items-center p-4"
                                                            style={{
                                                                boxShadow:
                                                                    "-5px 0px",
                                                            }}
                                                        />
                                                        <div className="text-[12px] absolute w-24">
                                                            Buyer is typing...
                                                        </div>
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{
                                                            width: "100%",
                                                            height: "100%",
                                                            opacity: 0,
                                                        }}
                                                        ref={message2}
                                                        className="border-[#308546] border rounded-2xl flex items-center p-4 mr-28 max-md:ml-1 max-md:p-2 max-md:mr-2"
                                                        style={{
                                                            boxShadow:
                                                                "-5px 0px",
                                                        }}
                                                    >
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                            }}
                                                            ref={message2Text}
                                                            className="max-lg:text-sm max-md:text-xs"
                                                        >
                                                            We just submitted an
                                                            offer! Please us
                                                            know if you have any
                                                            questions.
                                                        </motion.div>
                                                        <motion.div
                                                            ref={message2Time}
                                                            initial={{
                                                                opacity: 0,
                                                                display: "none",
                                                            }}
                                                            className="absolute text-[12px] mt-[8rem] ml-[18rem]"
                                                        >
                                                            {/* <span>Sent 12:41pm</span> */}
                                                        </motion.div>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            ref={message3Section}
                                            className="flex justify-center px-16 py-6 max-lg:px-1"
                                        >
                                            <div className="w-full flex items-end justify-end h-auto">
                                                <motion.div
                                                    ref={message3Typing}
                                                    className="mr-12 absolute"
                                                >
                                                    <Typing
                                                        className="border-[#308546] w-full h-full border rounded-2xl flex items-center p-4"
                                                        style={{
                                                            boxShadow:
                                                                "-5px 0px",
                                                        }}
                                                    />
                                                    <div className="absolute text-[12px] w-24">
                                                        Seller is typing...
                                                    </div>
                                                </motion.div>
                                                <motion.div
                                                    initial={{
                                                        width: "100%",
                                                        height: "100%",
                                                        opacity: 0,
                                                    }}
                                                    ref={message3}
                                                    className="border-[#308546] border rounded-2xl flex items-center p-4 mr-4 ml-28 max-md:ml-1 max-md:p-2 max-md:mr-2"
                                                    style={{
                                                        boxShadow: "-5px 0px",
                                                        // display: "none",
                                                    }}
                                                >
                                                    <motion.div
                                                        ref={message3Text}
                                                        initial={{
                                                            opacity: 0,
                                                        }}
                                                        className="max-lg:text-sm max-md:text-xs"
                                                    >
                                                        Your offer looks great!
                                                        We need at least two
                                                        weeks after closing to
                                                        get into our new place
                                                        though. Would that work
                                                        for you?
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            display: "none",
                                                        }}
                                                        ref={message3Time}
                                                        className="absolute mt-[10rem] text-[12px] ml-[18rem]"
                                                    >
                                                        {/* <span>Sent 12:33pm</span> */}
                                                    </motion.div>
                                                </motion.div>
                                                <div className="rounded-full p-4 bg-[#308546] text-[#fff] w-10 h-10 flex items-center justify-center max-md:w-6 max-md:h-6 max-md:p-2 max-sm:hidden">
                                                    S
                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            ref={message4Section}
                                            className="flex px-16 py-6 max-lg:px-1"
                                        >
                                            <div className="flex items-end w-full justify-start">
                                                <div className="rounded-full p-4 bg-[#308546] text-[#fff] w-10 h-10 flex items-center justify-center mr-4 max-md:w-6 max-md:h-6 max-md:p-2 max-md:mr-2">
                                                    B
                                                </div>
                                                <div className="w-full flex items-end h-auto">
                                                    <motion.div
                                                        ref={message4Typing}
                                                    >
                                                        <Typing
                                                            className="border-[#308546] w-full h-full border rounded-2xl flex items-center p-4"
                                                            style={{
                                                                boxShadow:
                                                                    "-5px 0px",
                                                            }}
                                                        />
                                                        <div className="text-[12px] absolute w-24">
                                                            Buyer is typing...
                                                        </div>
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{
                                                            width: "100%",
                                                            height: "100%",
                                                            opacity: 0,
                                                        }}
                                                        ref={message4}
                                                        className="border-[#308546] border rounded-2xl flex items-center p-4 mr-28 max-md:ml-1 max-md:p-2 max-md:mr-2"
                                                        style={{
                                                            boxShadow:
                                                                "-5px 0px",
                                                        }}
                                                    >
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                            }}
                                                            ref={message4Text}
                                                            className="max-lg:text-sm max-md:text-xs"
                                                        >
                                                            Of course, we will
                                                            send a new offer
                                                            with a Temporary
                                                            Occupancy Agreement
                                                            ASAP!
                                                        </motion.div>
                                                        <motion.div
                                                            ref={message4Time}
                                                            initial={{
                                                                opacity: 0,
                                                                display: "none",
                                                            }}
                                                            className="absolute text-[12px] mt-[8rem] ml-[18rem]"
                                                        >
                                                            {/* <span>Sent 12:41pm</span> */}
                                                        </motion.div>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 max-lg:col-span-12 max-lg:pt-5 px-5 pb-5 z-30">
                        <Transition refElement={tempRef}>
                            <div ref={tempRef} />
                            <div className="font-austin text-5xl max-[1767px]:text-4xl max-lg:text-4xl max-md:text-3xl">
                                <div>Talk directly to buyers</div>
                                <div>or sellers—avoid</div>
                                <div>the agent loop.</div>
                            </div>

                            <div className="font-mint text-lg mt-72 max-lg:text-md max-md:text-sm max-md:mt-5 max-[1767px]:text-sm">
                            No more playing telephone with your agent and the other sides’s agent. With Housewell, you&apos;re in control of the conversation. (But don&apos;t worry. If you get stuck, we&apos;ll be here to answer questions.)
                            </div>
                            <SecondaryButton
                                hasArrow
                                text="Get Started"
                                style={{ height: "3rem", marginTop: "2rem" }}
                                size="medium"
                            />
                        </Transition>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessageAnimation;
