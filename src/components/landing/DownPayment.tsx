import React, { FC, useEffect, useRef } from "react";
import Image from "next/image";
import SecondaryButton from "../buttons/SecondaryButton";
import Transition from "./Transition";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import TitleIcon1 from "../../../public/temp/down_payment/title-25k.svg";
import TitleIcon2 from "../../../public/temp/down_payment/title-50k.svg";
import TitleIcon3 from "../../../public/temp/down_payment/title-100k.svg";
import TitleIcon4 from "../../../public/temp/down_payment/title-150k.svg";
import TitleIcon5 from "../../../public/temp/down_payment/title-250k.svg";
import TitleIcon6 from "../../../public/temp/down_payment/title-500k.svg";

const DownPayment: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const tempRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);
    const [animating, setAnimation] = React.useState(false);

    const changeColor1 = () => {
        let extenda1 = gsap
            .timeline({ defaults: { ease: "none" } })
            .fromTo(
                "#first",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#first",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#first",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#first",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#first",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#first",
                { fill: "white" },
                { fill: "#7DFFB9", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#first",
                { fill: "#7DFFB9" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#first",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#first",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#first",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#first",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1.2 }
            );
        return extenda1;
    };

    const changeColor2 = () => {
        let extenda2 = gsap
            .timeline({ defaults: { ease: "none" } })
            .fromTo(
                "#second",
                { fill: "#7DFFB9" },
                { fill: "#7DFFB9", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#second",
                { fill: "#7DFFB9" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#second",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#second",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#second",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#second",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#second",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#second",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#second",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#second",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#second",
                { fill: "white" },
                { fill: "#7DFFB9", duration: 1.4, delay: 1.2 }
            );
        return extenda2;
    };

    const changeColor3 = () => {
        let extenda3 = gsap
            .timeline({ defaults: { ease: "none" } })
            .fromTo(
                "#third",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#third",
                { fill: "white" },
                { fill: "#7DFFB9", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#third",
                { fill: "#7DFFB9" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#third",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#third",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#third",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#third",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#third",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#third",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#third",
                { fill: "white" },
                { fill: "#7DFFB9", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#third",
                { fill: "#7DFFB9" },
                { fill: "white", duration: 1.4, delay: 1.2 }
            );
        return extenda3;
    };

    const changeColor4 = () => {
        let extenda4 = gsap
            .timeline({ defaults: { ease: "none" } })
            .fromTo(
                "#firth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#firth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#firth",
                { fill: "white" },
                { fill: "#7DFFB9", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#firth",
                { fill: "#7DFFB9" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#firth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#firth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#firth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#firth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#firth",
                { fill: "white" },
                { fill: "#7DFFB9", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#firth",
                { fill: "#7DFFB9" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#firth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1.2 }
            );

        return extenda4;
    };

    const changeColor5 = () => {
        let extenda5 = gsap
            .timeline({ defaults: { ease: "none" } })
            .fromTo(
                "#fifth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#fifth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#fifth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#fifth",
                { fill: "white" },
                { fill: "#7DFFB9", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#fifth",
                { fill: "#7DFFB9" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#fifth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#fifth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#fifth",
                { fill: "white" },
                { fill: "#7DFFB9", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#fifth",
                { fill: "#7DFFB9" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#fifth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#fifth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1.2 }
            );
        return extenda5;
    };

    const changeColor6 = () => {
        let extenda6 = gsap
            .timeline({ defaults: { ease: "none" } })
            .fromTo(
                "#sixth",
                { fill: "#7DFFB9" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#sixth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#sixth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#sixth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#sixth",
                { fill: "white" },
                { fill: "#7DFFB9", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#sixth",
                { fill: "#7DFFB9" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#sixth",
                { fill: "white" },
                { fill: "#7DFFB9", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#sixth",
                { fill: "#7DFFB9" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#sixth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#sixth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            )
            .fromTo(
                "#sixth",
                { fill: "white" },
                { fill: "white", duration: 1.4, delay: 1 }
            );
        return extenda6;
    };

    const start = () => {
        const customease = CustomEase.create(
            "custom",
            "M0,0 C0,0 0.065,0.284 0.09,0.373 0.11,0.448 0.154,0.589 0.18,0.654 0.202,0.714 0.252,0.826 0.28,0.873 0.303,0.914 0.406,0.983 0.433,1.01 0.457,1.034 0.536,1.049 0.563,1.049 0.595,1.049 0.647,1.044 0.683,1.043 0.777,1.04 1,1 1,1 "
        );
        const thirdAnimation1 = gsap.to(".first-item", {
            motionPath: {
                path: [
                    // { x: -278, y: 128 },
                    // { x: -300, y: 160 },
                    // { x: -320, y: 190 },
                    { x: 0, y: 0 },
                ],
                type: "soft",
                curviness: 2,
            },
            duration: 1.4,
            rotation: 0,
            repeat: 0,
            delay: 1,
            ease: customease,

            onComplete: () => {
                const thirdAnimation2 = gsap.to(".first-item", {
                    motionPath: {
                        path: [
                            // { x: -300, y: 160 },
                            // { x: -278, y: 128 },
                            { x: 0, y: 0 },
                        ],
                        type: "soft",
                        curviness: 2,
                    },
                    duration: 1.4,
                    rotation: -60,
                    repeat: 0,
                    delay: 1,
                    ease: customease,
                    onComplete: () => {
                        const thirdAnimation3 = gsap.to(".first-item", {
                            motionPath: {
                                path: [
                                    // { x: 260, y: 100 },
                                    // { x: 320, y: 160 },
                                    { x: 0, y: 0 },
                                ],
                                type: "soft",
                                curviness: 2,
                            },
                            duration: 1.4,
                            rotation: -120,
                            repeat: 0,
                            delay: 1,
                            ease: customease,
                            onComplete: () => {
                                const thirdAnimation4 = gsap.to(".first-item", {
                                    motionPath: {
                                        path: [
                                            // { x: 260, y: 100 },
                                            { x: 0, y: 0 },
                                        ],
                                        type: "soft",
                                        curviness: 2,
                                    },
                                    duration: 1.4,
                                    rotation: -180,
                                    repeat: 0,
                                    delay: 1,
                                    ease: customease,
                                    onComplete: () => {
                                        const thirdAnimation5 = gsap.to(
                                            ".first-item",
                                            {
                                                motionPath: {
                                                    path: [
                                                        // { x: 260, y: 100 },
                                                        { x: 0, y: 0 },
                                                    ],
                                                    type: "soft",
                                                    curviness: 2,
                                                },
                                                duration: 1.4,
                                                rotation: -240,
                                                repeat: 0,
                                                delay: 1,
                                                ease: customease,
                                                onComplete: () => {
                                                    const thirdAnimation6 =
                                                        gsap.to(".first-item", {
                                                            motionPath: {
                                                                path: [
                                                                    // { x: 260, y: 100 },
                                                                    {
                                                                        x: 0,
                                                                        y: 0,
                                                                    },
                                                                ],
                                                                type: "soft",
                                                                curviness: 2,
                                                            },
                                                            duration: 1.4,
                                                            rotation: -300,
                                                            repeat: 0,
                                                            delay: 1,
                                                            ease: customease,
                                                            onComplete: () => {
                                                                const thirdAnimation7 =
                                                                    gsap.to(
                                                                        ".first-item",
                                                                        {
                                                                            motionPath:
                                                                                {
                                                                                    path: [
                                                                                        // { x: 260, y: 100 },
                                                                                        {
                                                                                            x: 0,
                                                                                            y: 0,
                                                                                        },
                                                                                    ],
                                                                                    type: "soft",
                                                                                    curviness: 2,
                                                                                },
                                                                            duration: 1.4,
                                                                            rotation:
                                                                                -240,
                                                                            repeat: 0,
                                                                            delay: 1,
                                                                            ease: customease,
                                                                            onComplete:
                                                                                () => {
                                                                                    const thirdAnimation8 =
                                                                                        gsap.to(
                                                                                            ".first-item",
                                                                                            {
                                                                                                motionPath:
                                                                                                    {
                                                                                                        path: [
                                                                                                            // { x: 260, y: 100 },
                                                                                                            {
                                                                                                                x: 0,
                                                                                                                y: 0,
                                                                                                            },
                                                                                                        ],
                                                                                                        type: "soft",
                                                                                                        curviness: 2,
                                                                                                    },
                                                                                                duration: 1.4,
                                                                                                rotation:
                                                                                                    -180,
                                                                                                repeat: 0,
                                                                                                delay: 1,
                                                                                                ease: customease,
                                                                                                onComplete:
                                                                                                    () => {
                                                                                                        const thirdAnimation9 =
                                                                                                            gsap.to(
                                                                                                                ".first-item",
                                                                                                                {
                                                                                                                    motionPath:
                                                                                                                        {
                                                                                                                            path: [
                                                                                                                                // { x: 260, y: 100 },
                                                                                                                                {
                                                                                                                                    x: 0,
                                                                                                                                    y: 0,
                                                                                                                                },
                                                                                                                            ],
                                                                                                                            type: "soft",
                                                                                                                            curviness: 2,
                                                                                                                        },
                                                                                                                    duration: 1.4,
                                                                                                                    rotation:
                                                                                                                        -120,
                                                                                                                    repeat: 0,
                                                                                                                    delay: 1,
                                                                                                                    ease: customease,
                                                                                                                    onComplete:
                                                                                                                        () => {
                                                                                                                            const thirdAnimation10 =
                                                                                                                                gsap.to(
                                                                                                                                    ".first-item",
                                                                                                                                    {
                                                                                                                                        motionPath:
                                                                                                                                            {
                                                                                                                                                path: [
                                                                                                                                                    // { x: 260, y: 100 },
                                                                                                                                                    {
                                                                                                                                                        x: 0,
                                                                                                                                                        y: 0,
                                                                                                                                                    },
                                                                                                                                                ],
                                                                                                                                                type: "soft",
                                                                                                                                                curviness: 2,
                                                                                                                                            },
                                                                                                                                        duration: 1.4,
                                                                                                                                        rotation:
                                                                                                                                            -60,
                                                                                                                                        repeat: 0,
                                                                                                                                        delay: 1,
                                                                                                                                        ease: customease,
                                                                                                                                        onComplete:
                                                                                                                                            () => {
                                                                                                                                                const thirdAnimation11 =
                                                                                                                                                    gsap.to(
                                                                                                                                                        ".first-item",
                                                                                                                                                        {
                                                                                                                                                            motionPath:
                                                                                                                                                                {
                                                                                                                                                                    path: [
                                                                                                                                                                        // { x: 260, y: 100 },
                                                                                                                                                                        {
                                                                                                                                                                            x: 0,
                                                                                                                                                                            y: 0,
                                                                                                                                                                        },
                                                                                                                                                                    ],
                                                                                                                                                                    type: "soft",
                                                                                                                                                                    curviness: 2,
                                                                                                                                                                },
                                                                                                                                                            duration: 1.4,
                                                                                                                                                            rotation: 0,
                                                                                                                                                            repeat: 0,
                                                                                                                                                            delay: 1,
                                                                                                                                                            ease: customease,
                                                                                                                                                            onComplete:
                                                                                                                                                                () => {},
                                                                                                                                                        }
                                                                                                                                                    );
                                                                                                                                                document.addEventListener(
                                                                                                                                                    "visibilitychange",
                                                                                                                                                    () => {
                                                                                                                                                        thirdAnimation11.paused(
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
                                                                                                                                    thirdAnimation10.paused(
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
                                                                                                                thirdAnimation9.paused(
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
                                                                                            thirdAnimation8.paused(
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
                                                                        thirdAnimation7.paused(
                                                                            document.hidden
                                                                        );
                                                                    }
                                                                );
                                                            },
                                                        });
                                                    document.addEventListener(
                                                        "visibilitychange",
                                                        () => {
                                                            thirdAnimation6.paused(
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
                                                thirdAnimation5.paused(
                                                    document.hidden
                                                );
                                            }
                                        );
                                    },
                                });
                                document.addEventListener(
                                    "visibilitychange",
                                    () => {
                                        thirdAnimation4.paused(document.hidden);
                                    }
                                );
                            },
                        });
                        document.addEventListener("visibilitychange", () => {
                            thirdAnimation3.paused(document.hidden);
                        });
                    },
                });
                document.addEventListener("visibilitychange", () => {
                    thirdAnimation2.paused(document.hidden);
                });
            },
        });
        const secondAnimation1 = gsap.to(".second-item", {
            motionPath: {
                path: [
                    // { x: -278, y: 128 },
                    // { x: -300, y: 160 },
                    // { x: -320, y: 190 },
                    { x: 0, y: 0 },
                ],
                type: "soft",
                curviness: 2,
            },
            duration: 1.4,
            rotation: 0,
            repeat: 0,
            delay: 1,
            ease: customease,

            onComplete: () => {
                const secondAnimation2 = gsap.to(".second-item", {
                    motionPath: {
                        path: [
                            // { x: -300, y: 160 },
                            // { x: -278, y: 128 },
                            { x: 0, y: 0 },
                        ],
                        type: "soft",
                        curviness: 2,
                    },
                    duration: 1.4,
                    rotation: -67,
                    repeat: 0,
                    delay: 1,
                    ease: customease,
                    onComplete: () => {
                        const secondAnimation3 = gsap.to(".second-item", {
                            motionPath: {
                                path: [
                                    // { x: 260, y: 100 },
                                    // { x: 320, y: 160 },
                                    { x: 0, y: 0 },
                                ],
                                type: "soft",
                                curviness: 2,
                            },
                            duration: 1.4,
                            rotation: -134,
                            repeat: 0,
                            delay: 1,
                            ease: customease,
                            onComplete: () => {
                                const secondAnimation4 = gsap.to(
                                    ".second-item",
                                    {
                                        motionPath: {
                                            path: [
                                                // { x: 260, y: 100 },
                                                { x: 0, y: 0 },
                                            ],
                                            type: "soft",
                                            curviness: 2,
                                        },
                                        duration: 1.4,
                                        rotation: -200,
                                        repeat: 0,
                                        delay: 1,
                                        ease: customease,
                                        onComplete: () => {
                                            const secondAnimation5 = gsap.to(
                                                ".second-item",
                                                {
                                                    motionPath: {
                                                        path: [
                                                            // { x: 260, y: 100 },
                                                            { x: 0, y: 0 },
                                                        ],
                                                        type: "soft",
                                                        curviness: 2,
                                                    },
                                                    duration: 1.4,
                                                    rotation: -293,
                                                    repeat: 0,
                                                    delay: 1,
                                                    ease: customease,
                                                    onComplete: () => {
                                                        const secondAnimation6 =
                                                            gsap.to(
                                                                ".second-item",
                                                                {
                                                                    motionPath:
                                                                        {
                                                                            path: [
                                                                                // { x: 260, y: 100 },
                                                                                {
                                                                                    x: 0,
                                                                                    y: 0,
                                                                                },
                                                                            ],
                                                                            type: "soft",
                                                                            curviness: 2,
                                                                        },
                                                                    duration: 1.4,
                                                                    rotation:
                                                                        -360,
                                                                    repeat: 0,
                                                                    delay: 1,
                                                                    ease: customease,
                                                                    onComplete:
                                                                        () => {
                                                                            const secondAnimation7 =
                                                                                gsap.to(
                                                                                    ".second-item",
                                                                                    {
                                                                                        motionPath:
                                                                                            {
                                                                                                path: [
                                                                                                    // { x: 260, y: 100 },
                                                                                                    {
                                                                                                        x: 0,
                                                                                                        y: 0,
                                                                                                    },
                                                                                                ],
                                                                                                type: "soft",
                                                                                                curviness: 2,
                                                                                            },
                                                                                        duration: 1.4,
                                                                                        rotation:
                                                                                            -293,
                                                                                        repeat: 0,
                                                                                        delay: 1,
                                                                                        ease: customease,
                                                                                        onComplete:
                                                                                            () => {
                                                                                                const secondAnimation8 =
                                                                                                    gsap.to(
                                                                                                        ".second-item",
                                                                                                        {
                                                                                                            motionPath:
                                                                                                                {
                                                                                                                    path: [
                                                                                                                        // { x: 260, y: 100 },
                                                                                                                        {
                                                                                                                            x: 0,
                                                                                                                            y: 0,
                                                                                                                        },
                                                                                                                    ],
                                                                                                                    type: "soft",
                                                                                                                    curviness: 2,
                                                                                                                },
                                                                                                            duration: 1.4,
                                                                                                            rotation:
                                                                                                                -200,
                                                                                                            repeat: 0,
                                                                                                            delay: 1,
                                                                                                            ease: customease,
                                                                                                            onComplete:
                                                                                                                () => {
                                                                                                                    const secondAnimation9 =
                                                                                                                        gsap.to(
                                                                                                                            ".second-item",
                                                                                                                            {
                                                                                                                                motionPath:
                                                                                                                                    {
                                                                                                                                        path: [
                                                                                                                                            // { x: 260, y: 100 },
                                                                                                                                            {
                                                                                                                                                x: 0,
                                                                                                                                                y: 0,
                                                                                                                                            },
                                                                                                                                        ],
                                                                                                                                        type: "soft",
                                                                                                                                        curviness: 2,
                                                                                                                                    },
                                                                                                                                duration: 1.4,
                                                                                                                                rotation:
                                                                                                                                    -134,
                                                                                                                                repeat: 0,
                                                                                                                                delay: 1,
                                                                                                                                ease: customease,
                                                                                                                                onComplete:
                                                                                                                                    () => {
                                                                                                                                        const secondAnimation10 =
                                                                                                                                            gsap.to(
                                                                                                                                                ".second-item",
                                                                                                                                                {
                                                                                                                                                    motionPath:
                                                                                                                                                        {
                                                                                                                                                            path: [
                                                                                                                                                                // { x: 260, y: 100 },
                                                                                                                                                                {
                                                                                                                                                                    x: 0,
                                                                                                                                                                    y: 0,
                                                                                                                                                                },
                                                                                                                                                            ],
                                                                                                                                                            type: "soft",
                                                                                                                                                            curviness: 2,
                                                                                                                                                        },
                                                                                                                                                    duration: 1.4,
                                                                                                                                                    rotation:
                                                                                                                                                        -67,
                                                                                                                                                    repeat: 0,
                                                                                                                                                    delay: 1,
                                                                                                                                                    ease: customease,
                                                                                                                                                    onComplete:
                                                                                                                                                        () => {
                                                                                                                                                            const secondAnimation11 =
                                                                                                                                                                gsap.to(
                                                                                                                                                                    ".second-item",
                                                                                                                                                                    {
                                                                                                                                                                        motionPath:
                                                                                                                                                                            {
                                                                                                                                                                                path: [
                                                                                                                                                                                    // { x: 260, y: 100 },
                                                                                                                                                                                    {
                                                                                                                                                                                        x: 0,
                                                                                                                                                                                        y: 0,
                                                                                                                                                                                    },
                                                                                                                                                                                ],
                                                                                                                                                                                type: "soft",
                                                                                                                                                                                curviness: 2,
                                                                                                                                                                            },
                                                                                                                                                                        duration: 1.4,
                                                                                                                                                                        rotation: 0,
                                                                                                                                                                        repeat: 0,
                                                                                                                                                                        delay: 1,
                                                                                                                                                                        ease: customease,
                                                                                                                                                                        onComplete:
                                                                                                                                                                            () => {},
                                                                                                                                                                    }
                                                                                                                                                                );
                                                                                                                                                            document.addEventListener(
                                                                                                                                                                "visibilitychange",
                                                                                                                                                                () => {
                                                                                                                                                                    secondAnimation11.paused(
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
                                                                                                                                                secondAnimation10.paused(
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
                                                                                                                            secondAnimation9.paused(
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
                                                                                                        secondAnimation8.paused(
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
                                                                                    secondAnimation7.paused(
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
                                                                secondAnimation6.paused(
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
                                                    secondAnimation5.paused(
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
                                        secondAnimation4.paused(
                                            document.hidden
                                        );
                                    }
                                );
                            },
                        });
                        document.addEventListener("visibilitychange", () => {
                            secondAnimation3.paused(document.hidden);
                        });
                    },
                });
                document.addEventListener("visibilitychange", () => {
                    secondAnimation2.paused(document.hidden);
                });
            },
        });
        const firstAnimation1 = gsap.to("special", {
            motionPath: {
                path: [
                    // { x: -278, y: 128 },
                    // { x: -300, y: 160 },
                    // { x: -320, y: 190 },
                    { x: 0, y: 0 },
                ],
                type: "soft",
                curviness: 2,
            },
            duration: 1.4,
            rotation: 0,
            repeat: 0,
            delay: 1,
            ease: customease,

            onComplete: () => {
                const firstAnimation2 = gsap.to(".special", {
                    motionPath: {
                        path: [
                            // { x: -300, y: 160 },
                            // { x: -278, y: 128 },
                            { x: 0, y: 0 },
                        ],
                        type: "soft",
                        curviness: 2,
                    },
                    duration: 1.4,
                    rotation: -67,
                    repeat: 0,
                    delay: 1,
                    ease: customease,
                    onComplete: () => {
                        const firstAnimation3 = gsap.to(".special", {
                            motionPath: {
                                path: [
                                    // { x: 260, y: 100 },
                                    // { x: 320, y: 160 },
                                    { x: 0, y: 0 },
                                ],
                                type: "soft",
                                curviness: 2,
                            },
                            duration: 1.4,
                            rotation: -134,
                            repeat: 0,
                            delay: 1,
                            ease: customease,
                            onComplete: () => {
                                const firstAnimation4 = gsap.to(".special", {
                                    motionPath: {
                                        path: [
                                            // { x: 260, y: 100 },
                                            { x: 0, y: 0 },
                                        ],
                                        type: "soft",
                                        curviness: 2,
                                    },
                                    duration: 1.4,
                                    rotation: -200,
                                    repeat: 0,
                                    delay: 1,
                                    ease: customease,
                                    onComplete: () => {
                                        const firstAnimation5 = gsap.to(
                                            ".special",
                                            {
                                                motionPath: {
                                                    path: [
                                                        // { x: 260, y: 100 },
                                                        { x: 0, y: 0 },
                                                    ],
                                                    type: "soft",
                                                    curviness: 2,
                                                },
                                                duration: 1.4,
                                                rotation: -268,
                                                repeat: 0,
                                                delay: 1,
                                                ease: customease,
                                                onComplete: () => {
                                                    const firstAnimation6 =
                                                        gsap.to(".special", {
                                                            motionPath: {
                                                                path: [
                                                                    // { x: 260, y: 100 },
                                                                    {
                                                                        x: 0,
                                                                        y: 0,
                                                                    },
                                                                ],
                                                                type: "soft",
                                                                curviness: 2,
                                                            },
                                                            duration: 1.4,
                                                            rotation: -335,
                                                            repeat: 0,
                                                            delay: 1,
                                                            ease: customease,
                                                            onComplete: () => {
                                                                const firstAnimation7 =
                                                                    gsap.to(
                                                                        ".special",
                                                                        {
                                                                            motionPath:
                                                                                {
                                                                                    path: [
                                                                                        // { x: 260, y: 100 },
                                                                                        {
                                                                                            x: 0,
                                                                                            y: 0,
                                                                                        },
                                                                                    ],
                                                                                    type: "soft",
                                                                                    curviness: 2,
                                                                                },
                                                                            duration: 1.4,
                                                                            rotation:
                                                                                -268,
                                                                            repeat: 0,
                                                                            delay: 1,
                                                                            ease: customease,
                                                                            onComplete:
                                                                                () => {
                                                                                    const firstAnimation8 =
                                                                                        gsap.to(
                                                                                            ".special",
                                                                                            {
                                                                                                motionPath:
                                                                                                    {
                                                                                                        path: [
                                                                                                            // { x: 260, y: 100 },
                                                                                                            {
                                                                                                                x: 0,
                                                                                                                y: 0,
                                                                                                            },
                                                                                                        ],
                                                                                                        type: "soft",
                                                                                                        curviness: 2,
                                                                                                    },
                                                                                                duration: 1.4,
                                                                                                rotation:
                                                                                                    -200,
                                                                                                repeat: 0,
                                                                                                delay: 1,
                                                                                                ease: customease,
                                                                                                onComplete:
                                                                                                    () => {
                                                                                                        const firstAnimation9 =
                                                                                                            gsap.to(
                                                                                                                ".special",
                                                                                                                {
                                                                                                                    motionPath:
                                                                                                                        {
                                                                                                                            path: [
                                                                                                                                // { x: 260, y: 100 },
                                                                                                                                {
                                                                                                                                    x: 0,
                                                                                                                                    y: 0,
                                                                                                                                },
                                                                                                                            ],
                                                                                                                            type: "soft",
                                                                                                                            curviness: 2,
                                                                                                                        },
                                                                                                                    duration: 1.4,
                                                                                                                    rotation:
                                                                                                                        -134,
                                                                                                                    repeat: 0,
                                                                                                                    delay: 1,
                                                                                                                    ease: customease,
                                                                                                                    onComplete:
                                                                                                                        () => {
                                                                                                                            const firstAnimation10 =
                                                                                                                                gsap.to(
                                                                                                                                    ".special",
                                                                                                                                    {
                                                                                                                                        motionPath:
                                                                                                                                            {
                                                                                                                                                path: [
                                                                                                                                                    // { x: 260, y: 100 },
                                                                                                                                                    {
                                                                                                                                                        x: 0,
                                                                                                                                                        y: 0,
                                                                                                                                                    },
                                                                                                                                                ],
                                                                                                                                                type: "soft",
                                                                                                                                                curviness: 2,
                                                                                                                                            },
                                                                                                                                        duration: 1.4,
                                                                                                                                        rotation:
                                                                                                                                            -67,
                                                                                                                                        repeat: 0,
                                                                                                                                        delay: 1,
                                                                                                                                        ease: customease,
                                                                                                                                        onComplete:
                                                                                                                                            () => {
                                                                                                                                                const firstAnimation11 =
                                                                                                                                                    gsap.to(
                                                                                                                                                        ".special",
                                                                                                                                                        {
                                                                                                                                                            motionPath:
                                                                                                                                                                {
                                                                                                                                                                    path: [
                                                                                                                                                                        // { x: 260, y: 100 },
                                                                                                                                                                        {
                                                                                                                                                                            x: 0,
                                                                                                                                                                            y: 0,
                                                                                                                                                                        },
                                                                                                                                                                    ],
                                                                                                                                                                    type: "soft",
                                                                                                                                                                    curviness: 2,
                                                                                                                                                                },
                                                                                                                                                            duration: 1.4,
                                                                                                                                                            rotation: 0,
                                                                                                                                                            repeat: 0,
                                                                                                                                                            delay: 1,
                                                                                                                                                            ease: customease,
                                                                                                                                                            onComplete:
                                                                                                                                                                () => {},
                                                                                                                                                        }
                                                                                                                                                    );
                                                                                                                                                document.addEventListener(
                                                                                                                                                    "visibilitychange",
                                                                                                                                                    () => {
                                                                                                                                                        firstAnimation11.paused(
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
                                                                                                                                    firstAnimation10.paused(
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
                                                                                                                firstAnimation9.paused(
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
                                                                                            firstAnimation8.paused(
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
                                                                        firstAnimation7.paused(
                                                                            document.hidden
                                                                        );
                                                                    }
                                                                );
                                                            },
                                                        });
                                                    document.addEventListener(
                                                        "visibilitychange",
                                                        () => {
                                                            firstAnimation6.paused(
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
                                                firstAnimation5.paused(
                                                    document.hidden
                                                );
                                            }
                                        );
                                    },
                                });
                                document.addEventListener(
                                    "visibilitychange",
                                    () => {
                                        firstAnimation4.paused(document.hidden);
                                    }
                                );
                            },
                        });
                        document.addEventListener("visibilitychange", () => {
                            firstAnimation3.paused(document.hidden);
                        });
                    },
                });
                document.addEventListener("visibilitychange", () => {
                    firstAnimation2.paused(document.hidden);
                });
            },
        });
    };
    useEffect(() => {
        let tempInterval: any;
        clearInterval(tempInterval);
        start();
        changeColor1();
        changeColor2();
        changeColor3();
        changeColor4();
        changeColor5();
        changeColor6();
        tempInterval = setInterval(() => {
            start();
            changeColor1();
            changeColor2();
            changeColor3();
            changeColor4();
            changeColor5();
            changeColor6();
        }, 26400);
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                clearInterval(tempInterval);
            } else {
                tempInterval = setInterval(() => {
                    start();
                    changeColor1();
                    changeColor2();
                    changeColor3();
                    changeColor4();
                    changeColor5();
                    changeColor6();
                }, 26400);
            }
        });
    }, []);

    const shadowCompoenent = () => {
        return (
            <svg
                width="340"
                height="120"
                viewBox="0 0 442 166"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#1B311C"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.70724 55.3197C0.0466925 60.0513 -2.55752 71.1353 2.73142 79.4672L51.9354 156.98C56.836 164.7 66.8248 167.319 75.1004 163.429C120.924 141.889 172.097 129.85 226.082 129.85C276.154 129.85 323.807 140.207 367.016 158.895C375.208 162.438 384.867 159.739 389.65 152.204L439.246 74.0734C444.629 65.5937 441.823 54.3044 432.885 49.7234C370.862 17.9355 300.566 0 226.082 0C147.333 0 73.2659 20.0484 8.70724 55.3197Z"
                />
            </svg>
        );
    };

    const mainCompoenent = (id, fill) => {
        return (
            <svg
                id={id}
                width="300"
                height="120"
                fill={fill}
                viewBox="0 0 442 166"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke="black"
                    stroke-width="2px"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.70724 55.3197C0.0466925 60.0513 -2.55752 71.1353 2.73142 79.4672L51.9354 156.98C56.836 164.7 66.8248 167.319 75.1004 163.429C120.924 141.889 172.097 129.85 226.082 129.85C276.154 129.85 323.807 140.207 367.016 158.895C375.208 162.438 384.867 159.739 389.65 152.204L439.246 74.0734C444.629 65.5937 441.823 54.3044 432.885 49.7234C370.862 17.9355 300.566 0 226.082 0C147.333 0 73.2659 20.0484 8.70724 55.3197Z"
                />
            </svg>
        );
    };
    return (
        <>
            <div className="rounded-2xl bg-[#F5FEF6] mt-8">
                <div className="grid grid-cols-12 lg:gap-8 max-lg:flex max-lg:justify-center max-lg:flex-col">
                    <div className="col-span-4 max-lg:col-span-12 p-8 z-30">
                        <Transition refElement={tempRef}>
                            <div ref={tempRef} />
                            <div className="font-austin text-5xl max-[1767px]:text-4xl max-lg:text-4xl max-md:text-3xl">
                                <div>Build your offer with</div>
                                <div>everything you need,</div>
                                <div>no agent required</div>
                            </div>

                            <div className="font-mint text-lg mt-20 max-lg:text-md max-md:text-sm max-[1767px]:text-sm ">
                                Submit an offer in minutes using our simple step-by-step
                                offer builder tool based on pre-built and vetted contract forms. Have them looked over by a member of our staff, your attorney, or both. 
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
                    <div
                        className="col-span-8 scale-90 max-md:col-span-12 flex pt-8 justify-center w-full z-10 
                    max-[1238px]:scale-90 max-[1120px]:scale-85 max-[1060px]:scale-80 max-[634px]:scale-70 max-[562px]:scale-60"
                    >
                        <div ref={ref} />

                        <div className="bg-[url('/temp/OfficerBuilder.svg')] bg-no-repeat bg-[length:100%_100%] w-[36rem] h-[33rem] absolute justify-center" />
                        <div className="second-item absolute w-[700px] h-[700px] mt-[270px]">
                            <div className="first absolute rotate-[-67deg] mt-[175px] -ml-[95px]">
                                {shadowCompoenent()}
                            </div>
                            <div className="second absolute ml-[180px] -mt-[5px]">
                                {shadowCompoenent()}
                            </div>
                            <div className="third absolute rotate-[67deg] ml-[455px] mt-[175px]">
                                {shadowCompoenent()}
                            </div>
                        </div>
                        <div className="special absolute w-[700px] h-[700px] mt-[270px]">
                            <div className="firth absolute rotate-[-93deg] mt-[300px] -ml-[114px]">
                                {shadowCompoenent()}
                            </div>
                            <div className="fifth absolute ml-[80px] mt-[572px] rotate-[200deg]">
                                {shadowCompoenent()}
                            </div>
                            <div className="sixth absolute ml-[395px] mt-[495px] rotate-[134deg]">
                                {shadowCompoenent()}
                            </div>
                        </div>
                        <div className="first-item absolute w-[700px] h-[700px] mt-[270px]">
                            <div className="absolute rotate-[-60deg] mt-[135px] -ml-[70px]">
                                <Image
                                    width={200}
                                    height={60}
                                    className="absolute top-[10px] left-[50px]"
                                    src={TitleIcon6}
                                    alt="title"
                                />
                                {mainCompoenent("first", "white")}
                            </div>
                            <div className="absolute  ml-[200px] -mt-[20px]">
                                <Image
                                    width={150}
                                    height={90}
                                    className="absolute top-[5px] left-[75px]"
                                    src={TitleIcon1}
                                    alt="title"
                                />
                                {mainCompoenent("second", "#7DFFB9")}
                            </div>
                            <div className="absolute rotate-[60deg] ml-[470px] mt-[130px]">
                                <Image
                                    width={150}
                                    height={90}
                                    className="absolute top-[5px] left-[80px]"
                                    src={TitleIcon2}
                                    alt="title"
                                />
                                {mainCompoenent("third", "white")}
                            </div>
                            <div className="absolute rotate-[120deg] ml-[470px] mt-[445px]">
                                <Image
                                    width={200}
                                    height={90}
                                    className="absolute top-[5px] left-[50px]"
                                    src={TitleIcon3}
                                    alt="title"
                                />
                                {mainCompoenent("firth", "white")}
                            </div>
                            <div className="absolute rotate-[180deg] ml-[200px] mt-[600px]">
                                <Image
                                    width={200}
                                    height={90}
                                    className="absolute top-[5px] left-[50px]"
                                    src={TitleIcon4}
                                    alt="title"
                                />
                                {mainCompoenent("fifth", "white")}
                            </div>
                            <div className="absolute rotate-[-120deg] ml-[-70px] mt-[445px]">
                                <Image
                                    width={200}
                                    height={90}
                                    className="absolute top-[5px] left-[50px]"
                                    src={TitleIcon5}
                                    alt="title"
                                />
                                {mainCompoenent("sixth", "white")}
                            </div>
                        </div>
                        <div className="absolute w-[800px] h-[350px] z-10 -ml-[41px] mt-[550px] bg-[#F5FEF6] max-[500px]:mt-[480px] max-[600px]:mt-[545px] max-[700px]:mt-[580px] max-[700px]:bg-[white]"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DownPayment;
