import React, { FC, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import gsap from "gsap";
import SecondaryButton from "../buttons/SecondaryButton";
import { motion } from "framer-motion";
import Transition from "./Transition";

const TextContainer = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const HousewellContainer = styled.div`
    display: flex;
    width: 15rem;
    height: 12rem;
    transform: rotateX(305deg) rotateY(360deg) rotateZ(320deg);
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 49.454px;
    border: 1.371px solid var(--brand-orange-primary-new, #ee5605);
    background: #fff;
    box-shadow: -25px 25px 0px 0px #ee5605;
`;

const TruliaContainer = styled.div`
    display: flex;
    width: 15rem;
    height: 12rem;
    transform: rotateX(305deg) rotateY(360deg) rotateZ(320deg);
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 49.454px;
    border: 1.371px solid #202626;
    background: #fff;
    box-shadow: -25px 25px 0px 0px #202626;
    position: absolute;
    margin-top: -210px;
    margin-left: -15px;
`;

const RealtorContainer = styled.div`
    display: flex;
    width: 15rem;
    height: 12rem;
    transform: rotateX(305deg) rotateY(360deg) rotateZ(320deg);
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 49.454px;
    border: 1.371px solid #d52331;
    background: #fff;
    box-shadow: -25px 25px 0px 0px #d52331;
    position: absolute;
    margin-left: -475px;
    margin-top: 15px;
`;

const FMLSContainer = styled.div`
    display: flex;
    width: 15rem;
    height: 12rem;
    transform: rotateX(305deg) rotateY(360deg) rotateZ(320deg);
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 49.454px;
    border: 1.371px solid #4bae4f;
    background: #fff;
    box-shadow: -25px 25px 0px 0px #4bae4f;
    position: absolute;
    margin-top: 90px;
    margin-left: -240px;
`;

const RedfinContainer = styled.div`
    display: flex;
    width: 15rem;
    height: 12rem;
    transform: rotateX(305deg) rotateY(360deg) rotateZ(320deg);
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 49.454px;
    border: 1.371px solid #c82021;
    background: #fff;
    box-shadow: -25px 25px 0px 0px #c82021;
    position: absolute;
    margin-top: -20px;
    margin-left: -15px;
`;

const ZillowContainer = styled.div`
    display: flex;
    width: 15rem;
    height: 12rem;
    transform: rotateX(305deg) rotateY(360deg) rotateZ(320deg);
    border-radius: 49.454px;
    border: 1.371px solid #5fa1ff;
    background: #fff;
    box-shadow: -25px 25px 0px 0px #006aff;
    position: absolute;
    margin-top: -210px;
    margin-left: -390px;
`;

const HousewellText = styled.div`
    justify-content: center;
    display: block;
`;

const GroupText = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
    transform: rotateZ(43deg) rotateY(50deg);
`;

const Componet1Text = styled.div`
    transform: rotateZ(43deg) rotateY(50deg);
    margin-top: -40px;
`;

const ZillowText = styled.div`
    transform: rotateZ(43deg) rotateY(50deg);
    display: flex;
    align-items: center;
`;

const RedfinText = styled.div`
    transform: rotateZ(43deg) rotateY(50deg);
    display: flex;
    align-items: center;
    justfy-centent: center;
`;

const TruliaText = styled.div`
    transform: rotateZ(43deg) rotateY(50deg);
    display: flex;
    align-items: center;
    justfy-centent: center;
`;

const RealtorText = styled.div`
    display: flex;
    align-items: center;
    justfy-centent: center;
`;

const FMLSText = styled.div`
    display: flex;
    align-items: center;
    justfy-centent: center;
`;

const CardAnimation: FC = () => {
    const zillowElement = useRef<HTMLDivElement>(null);
    const truliaElement = useRef<HTMLDivElement>(null);
    const redFinElement = useRef<HTMLDivElement>(null);
    const fMLElement = useRef<HTMLDivElement>(null);
    const realtorElement = useRef<HTMLDivElement>(null);

    const ref = useRef<HTMLDivElement>(null);

    const start = () => {
        const zillowAnimation1 = gsap.to(zillowElement.current, {
            motionPath: {
                path: [
                    { x: 210, y: -75 },
                    { x: 375, y: 0 },
                ],
                type: "soft",
                curviness: 2,
            },
            duration: 5,
            delay: 5,
            onComplete: () => {
                const zillowAnimation2 = gsap.to(zillowElement.current, {
                    motionPath: {
                        path: [
                            { x: 445, y: 95 },
                            { x: 375, y: 190 },
                        ],
                        type: "soft",
                        curviness: 2,
                    },
                    duration: 5,
                    delay: 5,
                    onComplete: () => {
                        const zillowAnimation3 = gsap.to(
                            zillowElement.current,
                            {
                                motionPath: {
                                    path: [{ x: 150, y: 300 }],
                                    type: "soft",
                                    curviness: 2,
                                },
                                duration: 5,
                                delay: 5,
                                onComplete: () => {
                                    const zillowAnimation4 = gsap.to(
                                        zillowElement.current,
                                        {
                                            motionPath: {
                                                path: [
                                                    { x: 50, y: 305 },
                                                    { x: -85, y: 225 },
                                                ],
                                                type: "soft",
                                                curviness: 2,
                                            },
                                            duration: 5,
                                            ease: "power4.out",
                                            delay: 5,
                                            onComplete: () => {
                                                const zillowAnimation5 =
                                                    gsap.to(
                                                        zillowElement.current,
                                                        {
                                                            motionPath: {
                                                                path: [
                                                                    {
                                                                        x: -150,
                                                                        y: 110,
                                                                    },
                                                                    {
                                                                        x: 0,
                                                                        y: 0,
                                                                    },
                                                                ],
                                                                type: "soft",
                                                                curviness: 2,
                                                            },
                                                            delay: 5,
                                                            duration: 5,
                                                            onComplete: () => {
                                                                zillowAnimation1.kill();
                                                                zillowAnimation2.kill();
                                                                zillowAnimation3.kill();
                                                                zillowAnimation4.kill();
                                                                zillowAnimation5.kill();
                                                            },
                                                        }
                                                    );
                                                document.addEventListener(
                                                    "visibilitychange",
                                                    () => {
                                                        zillowAnimation5.paused(
                                                            document.hidden
                                                        );
                                                    }
                                                );
                                            },
                                        }
                                    );
                                    document.addEventListener(
                                        "visibilitychange",
                                        () => {
                                            zillowAnimation4.paused(
                                                document.hidden
                                            );
                                        }
                                    );
                                },
                            }
                        );
                        document.addEventListener("visibilitychange", () => {
                            zillowAnimation3.paused(document.hidden);
                        });
                    },
                });
                document.addEventListener("visibilitychange", () => {
                    zillowAnimation2.paused(document.hidden);
                });
            },
        });

        const truliaAnimation1 = gsap.to(truliaElement.current, {
            motionPath: {
                path: [
                    { x: 70, y: 95 },
                    { x: 0, y: 190 },
                ],
                type: "soft",
                curviness: 2,
            },
            duration: 5,
            delay: 5,
            onComplete: () => {
                const truliaAnimation2 = gsap.to(truliaElement.current, {
                    motionPath: {
                        path: [{ x: -225, y: 300 }],
                        type: "soft",
                        curviness: 2,
                    },
                    duration: 5,
                    delay: 5,
                    onComplete: () => {
                        const truliaAnimation3 = gsap.to(
                            truliaElement.current,
                            {
                                motionPath: {
                                    path: [
                                        { x: -325, y: 305 },
                                        { x: -460, y: 225 },
                                    ],
                                    type: "soft",
                                    curviness: 2,
                                },
                                duration: 5,
                                ease: "power4.out",
                                delay: 5,
                                onComplete: () => {
                                    const truliaAnimation4 = gsap.to(
                                        truliaElement.current,
                                        {
                                            motionPath: {
                                                path: [
                                                    { x: -525, y: 110 },
                                                    { x: -375, y: 0 },
                                                ],
                                                type: "soft",
                                                curviness: 2,
                                            },
                                            duration: 5,
                                            delay: 5,
                                            onComplete: () => {
                                                const truliaAnimation5 =
                                                    gsap.to(
                                                        truliaElement.current,
                                                        {
                                                            motionPath: {
                                                                path: [
                                                                    {
                                                                        x: -165,
                                                                        y: -75,
                                                                    },
                                                                    {
                                                                        x: 0,
                                                                        y: 0,
                                                                    },
                                                                ],
                                                                type: "soft",
                                                                curviness: 2,
                                                            },
                                                            delay: 5,
                                                            duration: 5,
                                                            onComplete: () => {
                                                                truliaAnimation1.kill();
                                                                truliaAnimation2.kill();
                                                                truliaAnimation3.kill();
                                                                truliaAnimation4.kill();
                                                                truliaAnimation5.kill();
                                                            },
                                                        }
                                                    );
                                                document.addEventListener(
                                                    "visibilitychange",
                                                    () => {
                                                        truliaAnimation5.paused(
                                                            document.hidden
                                                        );
                                                    }
                                                );
                                            },
                                        }
                                    );
                                    document.addEventListener(
                                        "visibilitychange",
                                        () => {
                                            truliaAnimation4.paused(
                                                document.hidden
                                            );
                                        }
                                    );
                                },
                            }
                        );
                        document.addEventListener("visibilitychange", () => {
                            truliaAnimation3.paused(document.hidden);
                        });
                    },
                });
                document.addEventListener("visibilitychange", () => {
                    truliaAnimation2.paused(document.hidden);
                });
            },
        });

        const redFinAnimation1 = gsap.to(redFinElement.current, {
            motionPath: {
                path: [{ x: -225, y: 110 }],
                type: "soft",
                curviness: 2,
            },
            duration: 5,
            delay: 5,
            onComplete: () => {
                const redFinAnimation2 = gsap.to(redFinElement.current, {
                    motionPath: {
                        path: [
                            { x: -325, y: 115 },
                            { x: -460, y: 35 },
                        ],
                        type: "soft",
                        curviness: 2,
                    },
                    duration: 5,
                    ease: "power4.out",
                    delay: 5,
                    onComplete: () => {
                        const redFinAnimation3 = gsap.to(
                            redFinElement.current,
                            {
                                motionPath: {
                                    path: [
                                        { x: -525, y: -80 },
                                        { x: -375, y: -190 },
                                    ],
                                    type: "soft",
                                    curviness: 2,
                                },
                                duration: 5,
                                delay: 5,
                                onComplete: () => {
                                    const redFinAnimation4 = gsap.to(
                                        redFinElement.current,
                                        {
                                            motionPath: {
                                                path: [
                                                    { x: -165, y: -265 },
                                                    { x: 0, y: -190 },
                                                ],
                                                type: "soft",
                                                curviness: 2,
                                            },
                                            duration: 5,
                                            delay: 5,
                                            onComplete: () => {
                                                const redFinAnimation5 =
                                                    gsap.to(
                                                        redFinElement.current,
                                                        {
                                                            motionPath: {
                                                                path: [
                                                                    {
                                                                        x: 70,
                                                                        y: -95,
                                                                    },
                                                                    {
                                                                        x: 0,
                                                                        y: 0,
                                                                    },
                                                                ],
                                                                type: "soft",
                                                                curviness: 2,
                                                            },
                                                            delay: 5,
                                                            duration: 5,
                                                            onComplete: () => {
                                                                redFinAnimation1.kill();
                                                                redFinAnimation2.kill();
                                                                redFinAnimation3.kill();
                                                                redFinAnimation4.kill();
                                                                redFinAnimation5.kill();
                                                            },
                                                        }
                                                    );
                                                document.addEventListener(
                                                    "visibilitychange",
                                                    () => {
                                                        redFinAnimation5.paused(
                                                            document.hidden
                                                        );
                                                    }
                                                );
                                            },
                                        }
                                    );
                                    document.addEventListener(
                                        "visibilitychange",
                                        () => {
                                            redFinAnimation4.paused(
                                                document.hidden
                                            );
                                        }
                                    );
                                },
                            }
                        );
                        document.addEventListener("visibilitychange", () => {
                            redFinAnimation3.paused(document.hidden);
                        });
                    },
                });
                document.addEventListener("visibilitychange", () => {
                    redFinAnimation2.paused(document.hidden);
                });
            },
        });

        const fMLAnimation1 = gsap.to(fMLElement.current, {
            motionPath: {
                path: [
                    { x: -100, y: 5 },
                    { x: -235, y: -75 },
                ],
                type: "soft",
                curviness: 2,
            },
            duration: 5,
            delay: 5,
            ease: "power4.out",
            onComplete: () => {
                const fMLAnimation2 = gsap.to(fMLElement.current, {
                    motionPath: {
                        path: [
                            { x: -300, y: -190 },
                            { x: -150, y: -300 },
                        ],
                        type: "soft",
                        curviness: 2,
                    },
                    duration: 5,
                    delay: 5,
                    onComplete: () => {
                        const fMLAnimation3 = gsap.to(fMLElement.current, {
                            motionPath: {
                                path: [
                                    { x: 60, y: -375 },
                                    { x: 225, y: -300 },
                                ],
                                type: "soft",
                                curviness: 2,
                            },
                            duration: 5,
                            delay: 5,
                            onComplete: () => {
                                const fMLAnimation4 = gsap.to(
                                    fMLElement.current,
                                    {
                                        motionPath: {
                                            path: [
                                                { x: 295, y: -205 },
                                                { x: 225, y: -110 },
                                            ],
                                            type: "soft",
                                            curviness: 2,
                                        },
                                        duration: 5,
                                        delay: 5,
                                        onComplete: () => {
                                            const fMLAnimation5 = gsap.to(
                                                fMLElement.current,
                                                {
                                                    motionPath: {
                                                        path: [{ x: 0, y: 0 }],
                                                        type: "soft",
                                                        curviness: 2,
                                                    },
                                                    duration: 5,
                                                    delay: 5,
                                                    onComplete: () => {
                                                        fMLAnimation1.kill();
                                                        fMLAnimation2.kill();
                                                        fMLAnimation3.kill();
                                                        fMLAnimation4.kill();
                                                        fMLAnimation5.kill();
                                                    },
                                                }
                                            );
                                            document.addEventListener(
                                                "visibilitychange",
                                                () => {
                                                    fMLAnimation5.paused(
                                                        document.hidden
                                                    );
                                                }
                                            );
                                        },
                                    }
                                );
                                document.addEventListener(
                                    "visibilitychange",
                                    () => {
                                        fMLAnimation4.paused(document.hidden);
                                    }
                                );
                            },
                        });
                        document.addEventListener("visibilitychange", () => {
                            fMLAnimation3.paused(document.hidden);
                        });
                    },
                });
                document.addEventListener("visibilitychange", () => {
                    fMLAnimation2.paused(document.hidden);
                });
            },
        });

        const realtorAnimation1 = gsap.to(realtorElement.current, {
            motionPath: {
                path: [
                    { x: -65, y: -115 },
                    { x: 85, y: -225 },
                ],
                type: "soft",
                curviness: 2,
            },
            duration: 5,
            delay: 5,
            onComplete: () => {
                const realtorAnimation2 = gsap.to(realtorElement.current, {
                    motionPath: {
                        path: [
                            { x: 295, y: -300 },
                            { x: 460, y: -225 },
                        ],
                        type: "soft",
                        curviness: 2,
                    },
                    duration: 5,
                    delay: 5,
                    onComplete: () => {
                        const realtorAnimation3 = gsap.to(
                            realtorElement.current,
                            {
                                motionPath: {
                                    path: [
                                        { x: 530, y: -130 },
                                        { x: 460, y: -35 },
                                    ],
                                    type: "soft",
                                    curviness: 2,
                                },
                                duration: 5,
                                delay: 5,
                                onComplete: () => {
                                    const realtorAnimation4 = gsap.to(
                                        realtorElement.current,
                                        {
                                            motionPath: {
                                                path: [{ x: 235, y: 75 }],
                                                type: "soft",
                                                curviness: 2,
                                            },
                                            duration: 5,
                                            delay: 5,
                                            onComplete: () => {
                                                const realtorAnimation5 =
                                                    gsap.to(
                                                        realtorElement.current,
                                                        {
                                                            motionPath: {
                                                                path: [
                                                                    {
                                                                        x: 135,
                                                                        y: 80,
                                                                    },
                                                                    {
                                                                        x: 0,
                                                                        y: 0,
                                                                    },
                                                                ],
                                                                type: "soft",
                                                                curviness: 2,
                                                            },
                                                            duration: 5,
                                                            ease: "power4.out",
                                                            delay: 5,
                                                            onComplete: () => {
                                                                realtorAnimation1.kill();
                                                                realtorAnimation2.kill();
                                                                realtorAnimation3.kill();
                                                                realtorAnimation4.kill();
                                                                realtorAnimation5.kill();
                                                            },
                                                        }
                                                    );
                                                document.addEventListener(
                                                    "visibilitychange",
                                                    () => {
                                                        realtorAnimation5.paused(
                                                            document.hidden
                                                        );
                                                    }
                                                );
                                            },
                                        }
                                    );
                                    document.addEventListener(
                                        "visibilitychange",
                                        () => {
                                            realtorAnimation4.paused(
                                                document.hidden
                                            );
                                        }
                                    );
                                },
                            }
                        );
                        document.addEventListener("visibilitychange", () => {
                            realtorAnimation3.paused(document.hidden);
                        });
                    },
                });
                document.addEventListener("visibilitychange", () => {
                    realtorAnimation2.paused(document.hidden);
                });
            },
        });

        document.addEventListener("visibilitychange", () => {
            zillowAnimation1.paused(document.hidden);
            truliaAnimation1.paused(document.hidden);
            redFinAnimation1.paused(document.hidden);
            fMLAnimation1.paused(document.hidden);
            realtorAnimation1.paused(document.hidden);
        });
    };

    useEffect(() => {
        let tempInterval: any;
        clearInterval(tempInterval);
        start();
        tempInterval = setInterval(() => {
            start();
        }, 50000);
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                clearInterval(tempInterval);
            } else {
                tempInterval = setInterval(() => {
                    start();
                }, 50000);
            }
        });
    }, []);

    return (
        <>
            <div className="bg-[#FDF6F1] rounded-2xl">
                <div className="grid grid-cols-12 gap-8 max-lg:flex max-lg:justify-center max-lg:flex-col">
                    <div className="col-span-8 max-lg:col-span-12 flex justify-center mb-40 max-lg:mb-16 max-md:mb-8 max-sm:mb-4">
                        <div>
                            <div className="max-md:scale-50 max-md:mt-[3rem] max-md:ml-[-1rem] max-lg:scale-70 max-lg:mt-[7rem] max-lg:ml-[3rem] max-[910px]:scale-60 mb-8 lg:mt-40 lg:scale-80">
                                <TextContainer>
                                    <div>
                                        <HousewellContainer>
                                            <HousewellText>
                                                <HousewellText>
                                                    <GroupText>
                                                        <Image
                                                            src={
                                                                "/icon_svg/Group204.svg"
                                                            }
                                                            alt="..."
                                                            width={107}
                                                            height={54}
                                                            style={{
                                                                width: "auto",
                                                                height: "auto",
                                                            }}
                                                        />
                                                    </GroupText>
                                                    <Componet1Text>
                                                        <Image
                                                            src={
                                                                "/icon_svg/Component1.svg"
                                                            }
                                                            alt="..."
                                                            width={247}
                                                            height={144}
                                                        />
                                                    </Componet1Text>
                                                </HousewellText>
                                            </HousewellText>
                                        </HousewellContainer>
                                    </div>

                                    <motion.div ref={zillowElement}>
                                        <ZillowContainer>
                                            <ZillowText>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="247"
                                                    height="144"
                                                    viewBox="0 0 247 144"
                                                    fill="none"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M37.1497 110.731C37.2983 110.591 37.4539 110.579 37.6925 110.583C39.0663 110.612 43.6812 110.814 44.9412 110.871C44.9864 110.873 45.0297 110.88 45.0683 110.892C45.1069 110.904 45.14 110.921 45.1657 110.941C45.1914 110.961 45.209 110.985 45.2176 111.01C45.2261 111.036 45.2254 111.062 45.2154 111.089C44.1223 115.422 43.8736 120.801 44.4568 124.216C44.4686 124.288 44.521 124.264 44.5434 124.233C47.2765 120.449 55.1331 112.394 59.1984 109.06L53.2514 105.627L19.4983 108.342L14.7555 127.851L21.2553 131.603C23.8368 126.198 32.3847 115.201 37.1478 110.732L37.1497 110.731ZM117.668 54.0031L126.129 49.1187L164.358 71.1882L155.897 76.0726L117.668 54.0031ZM111.401 57.6213L102.94 62.5057L141.17 84.5763L149.631 79.6919L111.401 57.6213ZM180.794 32.8193L172.435 37.6448L205.918 47.2015L213.702 42.7078L209.502 37.8294C207.832 35.8919 204.547 32.371 204.547 32.371C204.537 32.3617 204.534 32.3506 204.537 32.3394C204.54 32.3282 204.55 32.3176 204.564 32.3093C204.593 32.2929 204.634 32.2886 204.671 32.299C204.671 32.299 210.863 34.247 214.128 35.2084L222.49 37.6284L230.136 33.2144L213.525 13.9215L205.756 18.4064L210.9 24.1747C212.559 25.9867 214.244 27.7897 215.955 29.5836C215.965 29.5929 215.968 29.604 215.965 29.6152C215.961 29.6264 215.952 29.637 215.937 29.6453C215.923 29.6536 215.905 29.6592 215.885 29.661C215.866 29.6629 215.846 29.661 215.83 29.6556C215.83 29.6556 209.907 27.7425 206.469 26.7332L196.407 23.8059L190.232 27.3707L195.257 33.2057C196.882 35.0626 200.279 38.6373 200.279 38.6373C200.287 38.6466 200.288 38.6573 200.284 38.6679C200.28 38.6784 200.27 38.6883 200.256 38.696C200.243 38.7037 200.226 38.709 200.208 38.7112C200.19 38.7134 200.172 38.7123 200.156 38.7082C200.156 38.7082 194.099 36.7698 190.782 35.7892L180.794 32.8193ZM156.125 61.5999C148.524 57.2121 149.309 50.2583 157.157 45.7275C164.928 41.2415 176.976 40.7884 184.575 45.1752C192.198 49.5759 191.417 56.5295 183.643 61.0177C175.796 65.5474 163.747 66.0005 156.13 61.6028L156.125 61.5999ZM176.457 49.8621C172.735 47.7136 167.422 47.8555 164.133 49.7547C160.765 51.6986 160.522 54.7646 164.243 56.913C167.99 59.0763 173.276 58.9207 176.643 56.9768C179.933 55.0776 180.204 52.0253 176.457 49.8621ZM57.5346 92.8016L64.9058 97.057L79.8591 88.4245C79.9196 88.3895 79.9971 88.4081 80.0148 88.4532L89.3829 111.194L89.401 111.235C89.6564 111.776 89.7189 111.906 90.3369 112.262L91.7748 113.092L120.902 96.277L113.545 92.0295L97.3646 101.37C97.3517 101.378 97.3358 101.383 97.3186 101.386C97.3015 101.388 97.284 101.388 97.2682 101.385C97.2515 101.382 97.237 101.376 97.2263 101.368C97.2155 101.36 97.209 101.351 97.2072 101.341L87.6929 78.3145L87.6558 78.245C87.5562 78.0653 87.4666 77.8957 86.953 77.5992L85.4162 76.7076L57.5363 92.8026L57.5346 92.8016ZM92.9744 69.0494C95.6119 67.5267 99.8255 67.4423 102.33 68.8881C104.836 70.3349 104.693 72.7694 102.056 74.292C99.4183 75.8146 95.2066 75.898 92.7004 74.4512C90.1943 73.0044 90.3387 70.573 92.9761 69.0504L92.9744 69.0494ZM101.276 78.725L109.735 73.8417L134.75 88.283L126.291 93.1663L101.276 78.725ZM46.0114 134.389C46.2318 134.396 46.4354 134.306 46.4856 134.182C50.1124 128.029 61.363 116.381 65.7667 112.852L79.1294 120.567L40.6353 142.789L26.7523 134.774C28.5696 131.255 34.8703 122.55 37.4584 119.7C37.5101 119.642 37.5682 119.656 37.5501 119.72C36.5016 123.284 36.8889 130.043 38.0028 133.889C38.0576 134.067 38.1234 134.096 38.3349 134.102L46.0114 134.389ZM213.125 8.62611C213.857 8.2037 214.882 8.193 215.601 8.60806C216.145 8.92233 216.267 9.34828 215.967 9.71681L217.817 9.9532L217.133 10.3483L215.413 10.1279L214.823 10.4685L215.87 11.0733L215.269 11.4204L211.777 9.40433L213.125 8.62611ZM214.309 10.172L215.018 9.76268C215.417 9.53238 215.416 9.19322 215.007 8.95703C214.596 8.71985 214.003 8.71608 213.606 8.94529L212.895 9.35569L214.309 10.172ZM211.732 8.0312C210.453 8.76905 210.038 9.85872 210.677 10.7906C210.987 11.2472 211.525 11.6307 212.228 11.8967C212.931 12.1628 213.771 12.3004 214.65 12.2939C215.496 12.2887 216.345 12.131 217.079 11.8427C217.812 11.5544 218.395 11.1498 218.745 10.6849C219.457 9.73401 219.126 8.65434 217.905 7.94972C216.238 6.98924 213.476 7.02584 211.732 8.0312ZM217.186 11.1798C216.153 11.7757 214.629 11.9698 213.323 11.6722C212.684 11.5273 212.148 11.2765 211.775 10.9487C211.403 10.621 211.21 10.2296 211.218 9.8197C211.25 8.99518 212.139 8.24046 213.471 7.90876C214.8 7.57606 216.312 7.73085 217.298 8.30008C218.642 9.07794 218.592 10.3656 217.186 11.1798Z"
                                                        fill="#006AFF"
                                                    />
                                                </svg>
                                            </ZillowText>
                                        </ZillowContainer>
                                    </motion.div>

                                    <motion.div ref={truliaElement}>
                                        <TruliaContainer>
                                            <TruliaText>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="215"
                                                    height="125"
                                                    viewBox="0 0 215 125"
                                                    fill="none"
                                                >
                                                    <g clip-path="url(#clip0_3222_6653)">
                                                        <path
                                                            d="M137.012 31.1626C137.954 30.621 138.6 29.9325 138.868 29.1844C139.137 28.4362 139.016 27.662 138.521 26.9597C138.026 26.2573 137.179 25.6584 136.088 25.2388C134.996 24.8192 133.709 24.5977 132.389 24.6023C131.069 24.6069 129.776 24.8375 128.673 25.2648C127.57 25.6922 126.707 26.297 126.192 27.0029C125.678 27.7088 125.536 28.484 125.784 29.2303C126.033 29.9766 126.66 30.6606 127.587 31.1957C128.827 31.912 130.517 32.3108 132.284 32.3046C134.051 32.2984 135.752 31.8877 137.012 31.1626ZM166.443 43.1863L144.408 30.4656L131.046 38.1796L138.935 42.7339L144.297 39.6384L166.332 52.3591L179.686 44.6501L171.797 40.0958L166.443 43.1863ZM143.607 56.3698L111.286 37.7107L97.932 45.4197L105.821 49.9741L111.175 46.8835L135.607 60.9882L130.253 64.0788L138.142 68.6331L156.849 57.8336L148.96 53.2792L143.607 56.3698ZM64.6074 76.4169L62.1849 77.8153C60.2769 78.8093 58.842 80.0687 58.0207 81.4703C57.1994 82.8719 57.0198 84.3675 57.4997 85.8106L51.3903 84.1649L43.5368 88.6987L51.4258 93.253L55.1414 91.1081L77.1763 103.829L85.1764 99.2104L69.7723 90.3176C67.9325 89.2555 66.9092 87.8091 66.9275 86.2964C66.9458 84.7838 68.0043 83.329 69.8699 82.2519L72.2924 80.8534L64.6074 76.4169ZM117.259 64.0324L101.761 55.0856L93.8044 59.6792L109.583 68.7879C111.452 69.8669 112.491 71.3364 112.473 72.8731C112.454 74.4098 111.379 75.8879 109.483 76.9821C107.588 78.0763 105.028 78.6971 102.366 78.7078C99.7039 78.7185 97.1584 78.1184 95.2893 77.0394L79.5112 67.9307L71.468 72.574L86.9656 81.5207C90.927 83.8076 96.3219 85.0796 101.964 85.0569C107.605 85.0341 113.032 83.7185 117.049 81.3994C121.066 79.0803 123.345 75.9477 123.384 72.6907C123.424 69.4338 121.22 66.3193 117.259 64.0324ZM44.4516 97.2793L36.5626 92.7249L26.1228 98.7518L16.4656 93.1766L8.47412 97.7901L18.1314 103.365L12.7693 106.461L20.6583 111.015L26.0204 107.92L33.6034 112.297C35.5634 113.43 37.8962 114.326 40.4686 114.933C43.041 115.54 45.8025 115.847 48.5954 115.836C51.3883 115.826 54.1578 115.497 56.7458 114.87C59.3337 114.243 61.6893 113.329 63.678 112.181C64.787 111.543 65.7743 110.838 66.6226 110.079L58.827 105.578C58.2639 106.267 57.4972 106.896 56.5617 107.436C54.5912 108.613 51.9033 109.297 49.0877 109.338C46.2722 109.379 43.5591 108.773 41.5439 107.654L34.0119 103.306L44.4516 97.2793ZM176.296 12.0565L179.272 13.7742C175.089 13.7466 171.033 14.6762 167.992 16.3599L167.371 16.7182C159.466 21.2819 159.964 28.9647 168.49 33.8871C177.017 38.8096 190.359 39.1165 198.23 34.5332L198.851 34.1748C201.768 32.4191 203.378 30.078 203.33 27.663L206.305 29.3807L214.331 24.7473L184.322 7.42315L176.296 12.0565ZM191.502 29.6035C189.391 30.7753 186.573 31.422 183.666 31.4013C180.759 31.3805 178.002 30.6942 176 29.4931C174.957 28.9306 174.123 28.2511 173.549 27.4951C172.975 26.739 172.672 25.9219 172.658 25.0923C172.643 24.2627 172.919 23.4376 173.467 22.6662C174.015 21.8947 174.825 21.1927 175.849 20.6018C176.872 20.011 178.088 19.5434 179.424 19.2269C180.761 18.9104 182.19 18.7515 183.627 18.7597C185.064 18.7678 186.479 18.9429 187.789 19.2743C189.099 19.6058 190.276 20.087 191.25 20.6892C192.284 21.2557 193.111 21.9361 193.683 22.6914C194.256 23.4466 194.563 24.2619 194.586 25.0902C194.61 25.9186 194.349 26.7437 193.82 27.5183C193.29 28.2928 192.503 29.0014 191.502 29.6035Z"
                                                            fill="#202626"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_3222_6653">
                                                            <rect
                                                                width="198.048"
                                                                height="49.5121"
                                                                fill="white"
                                                                transform="matrix(0.866044 -0.499967 0.866044 0.499967 0.322266 99.2763)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </TruliaText>
                                        </TruliaContainer>
                                    </motion.div>

                                    <motion.div ref={redFinElement}>
                                        <RedfinContainer>
                                            <RedfinText>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="227"
                                                    height="131"
                                                    viewBox="0 0 227 131"
                                                    fill="none"
                                                >
                                                    <g clip-path="url(#clip0_3222_6607)">
                                                        <path
                                                            d="M104.418 56.7182C99.3339 57.7012 93.9326 60.0684 87.8241 63.5948L76.1163 70.3537L105.903 87.5497L117.95 80.5949C122.192 78.146 125.535 75.7657 127.679 73.4769C129.822 71.188 130.637 68.9156 130.123 66.6595C129.608 64.4033 127.595 62.2615 123.953 60.159C120.831 58.3568 117.721 57.1488 114.621 56.5351C110.883 56.1401 107.665 56.0455 104.418 56.7182ZM118.885 68.7918C119.806 69.9117 119.959 71.1753 119.382 72.4094C118.765 73.8167 116.78 75.4133 113.726 77.1765L109.484 79.6254L89.4526 68.0613L93.0158 66.0043C96.4094 64.0452 99.5145 62.7031 102.252 62.3243C104.22 62.0892 106.149 62.0271 108.088 62.5592C110.028 63.0914 112.059 63.8717 114.14 65.0731C116.481 66.4248 118.132 67.574 118.885 68.7918ZM143.781 65.5326L152.604 60.439L139.987 53.1551L150.338 47.1798L145.395 44.3263L135.044 50.3016L127.76 46.0965L143.54 36.9866L138.598 34.1331L113.994 48.3367L143.781 65.5326ZM174.153 47.9986L182.977 42.9049L153.19 25.709L144.367 30.8027L174.153 47.9986ZM192.216 3.17927L183.223 8.37091L200.393 18.283L166.764 17.8726L159.638 21.9867L189.425 39.1826L198.417 33.991L180.858 23.8537L214.707 24.5873L222.003 20.3752L192.216 3.17927ZM73.3475 107.546C72.4086 107.787 71.17 108.052 66.5324 107.725L57.3872 107.148L46.6529 106.436L45.7932 106.332C45.9629 106.234 46.1722 105.963 46.3418 105.865C50.3407 101.904 49.7925 97.8655 44.3294 94.7117C41.5979 93.1347 37.769 92.4916 33.2331 93.0077C32.6336 93.0534 31.8645 93.1971 31.265 93.2428C25.711 94.3465 20.14 96.8118 13.6922 100.534L1.30567 107.685C0.626953 108.077 0.847496 108.4 1.447 108.354C2.0465 108.308 2.77608 108.338 3.81667 108.939L33.7336 126.21C34.7346 126.983 34.7855 127.405 34.8759 127.653C34.7967 127.999 35.3566 128.126 36.205 127.636L45.198 122.445L32.5808 115.161L36.6531 112.81L43.3098 113.322L51.5557 113.968L55.5938 114.341C60.2314 114.667 63.7888 114.566 67.4029 112.93C67.7423 112.734 69.6992 111.904 70.3779 111.513L71.0566 111.121C72.4141 110.337 73.3813 109.328 73.9695 108.688C73.9695 108.688 74.0091 108.515 74.1788 108.417C74.8462 107.431 73.9866 107.327 73.3475 107.546ZM33.4071 108.977L27.638 112.307L15.4111 105.249L21.1802 101.918C24.0647 100.253 26.5307 99.1297 29.2284 98.924C30.2974 98.7574 31.157 98.8619 32.1467 99.0414C33.2665 99.2961 34.5164 99.6258 35.6871 100.302C37.2479 101.203 41.891 104.079 33.4071 108.977ZM71.0978 92.9249L81.4482 86.9497L76.5054 84.0962L66.155 90.0714L58.8709 85.8663L74.651 76.7565L69.7082 73.903L45.1048 88.1065L74.8917 105.302L99.495 91.099L94.5522 88.2455L78.7721 97.3553L71.0978 92.9249Z"
                                                            fill="#C82021"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_3222_6607">
                                                            <rect
                                                                width="215.516"
                                                                height="45.0578"
                                                                fill="white"
                                                                transform="matrix(0.866044 -0.499967 0.866044 0.499967 0.626953 108.077)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </RedfinText>
                                        </RedfinContainer>
                                    </motion.div>

                                    <motion.div ref={fMLElement}>
                                        <FMLSContainer>
                                            <FMLSText>
                                                <Image
                                                    src={"/icon_svg/FMLS.svg"}
                                                    alt="..."
                                                    width={227}
                                                    height={131}
                                                />
                                            </FMLSText>
                                        </FMLSContainer>
                                    </motion.div>

                                    <motion.div ref={realtorElement}>
                                        <RealtorContainer>
                                            <RealtorText>
                                                <Image
                                                    src={
                                                        "/icon_svg/Realtor.com.svg"
                                                    }
                                                    alt="..."
                                                    width={227}
                                                    height={131}
                                                />
                                            </RealtorText>
                                        </RealtorContainer>
                                    </motion.div>
                                </TextContainer>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 p-10 max-lg:col-span-12 max-md:p-5">
                        <Transition refElement={ref}>
                            <div ref={ref} />
                            <div className="font-austin text-5xl max-[1767px]:text-4xl max-lg:text-4xl max-md:text-3xl">
                                <div>List on every major</div>
                                <div>real-estate marketplace,</div>
                                <div>with no restrictions.</div>
                            </div>

                            <div className="font-mint text-lg mt-40 max-lg:text-md max-md:text-sm max-md:mt-5 max-[1767px]:text-sm">
                                Maximize the number of buyers who see your property by listing on every major real-estate marketplace, including the MLS, Zillow, Trulia, Redfin, Realtor.com, and more.
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

export default CardAnimation;
