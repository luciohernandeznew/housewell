import React, { FC, useCallback, useEffect, useState } from "react";
import { parse } from "node-html-parser";
import _ from "lodash";
import gsap from "gsap";

const TextAnimation: FC = () => {
    const [blogText, setBlogText] = useState<any>(null);
    const [minHeight, setMinHeight] = useState<number>(0);

    useEffect(() => {
        const winMinHeight = window.innerHeight;
        setMinHeight(winMinHeight);
    }, [minHeight]);
    const renderBlogParagragh = useCallback(() => {
        let result = ``;
        const blogs = [
            [
                "It’s 2024 and buying or selling a home is",
                "still a mess. Housewell is here to change that.",
            ],
            [
                "With Housewell, anyone can buy or sell a",
                "home without an agent, without six percent",
                "fees, and without antiquated tools.",
            ],
            [
                "It’s time for a platform built for buyers and",
                "sellers one that helps them save time,",
                "money, and hassle.",
            ],
        ];
        _.map(blogs, (item) => {
            result += `<div style="display: block; margin-top: 2rem;">`;
            _.map(item, (subItem) => {
                result += `<div style="display: block;">`;
                _.map(_.split(subItem, " "), (word) => {
                    result += `<div>
                                    <span class="default">${word}</span>
                                    <span class="orange">${word}</span>
                                </div>&nbsp;`;
                });
                result += `</div>`;
            });
            result += `</div>`;
        });
        const root = parse(result);
        setBlogText(root);
    }, []);

    useEffect(() => renderBlogParagragh(), [renderBlogParagragh]);

    useEffect(() => {
        let started = false;
        setTimeout(() => {
            gsap.set(".text-logo", { opacity: 0.05 });
            gsap.set("span.default", { width: 0, color: "#ffc9a3" });
            gsap.set("span.orange", { width: 0, color: "#E0650D" });
            window.addEventListener("scroll", () => {
                if (!started) {
                    const logoAnimation = gsap
                        .timeline({
                            scrollTrigger: {
                                trigger: ".text-logo",
                                scrub: true,
                                start: "center 350",
                                end: "+=480",
                                // markers: true,
                            },
                        })
                        .to(".text-logo", {
                            opacity: 1,
                            duration: 0.5,
                            stagger: 0.5,
                            ease: "linear",
                        });

                    const textAnimation = gsap
                        .timeline({
                            scrollTrigger: {
                                trigger: "span.orange",
                                scrub: true,
                                start: "center 300",
                                end: "+=500",
                                // markers: true,
                            },
                        })
                        .to("span.orange", {
                            width: "100%",
                            color: "#E0650D",
                            ease: "none",
                            duration: 0.5,
                            stagger: 0.5,
                        });

                    const pageWrap = gsap
                        .timeline({
                            scrollTrigger: {
                                trigger: "#pageWrap",
                                pin: true,
                                start: "center center",
                                end: "+=600",
                                scrub: true,
                                // markers: true,
                            },
                        })
                        .to("#pageWrap", {
                            y: 0,
                            duration: 0.5,
                            stagger: 0.5,
                        });

                    // textAnimation.then(() => {
                    //     //   scrollable(true);
                    //     logoAnimation.kill();
                    //     textAnimation.kill();
                    //     pageWrap.kill();
                    // });
                    started = true;
                }
            });
        }, 100);
    }, []);

    return (
        <>
            <div
                className="flex w-full rounded-tl-[80px] rounded-tr-[80px] p-20 flex-col max-lg:p-15 max-md:p-10 max-sm:p-5 justify-center"
                style={{ minHeight: minHeight }}
                id="pageWrap"
            >
                <div className="text-logo">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="61"
                        height="73"
                        viewBox="0 0 61 73"
                        fill="none"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M60.3261 21.7109L30.5009 0.948242L7.32606 17.0813L7.32606 7.79206L0.675781 7.79206V72.0127H60.3261V21.7109ZM7.32607 27.7105L30.5009 11.6988L53.6758 27.7105V29.17C50.7074 28.6783 47.5583 28.3831 44.2849 28.3831C35.0595 28.3831 28.6614 31.3477 22.9832 34.0449L22.7263 34.1669C17.6162 36.5949 13.1947 38.6957 7.32607 39.0201V27.7105ZM44.2849 35.0334C47.5599 35.0334 50.7149 35.37 53.6758 35.9222V49.7805C53.23 49.7919 52.7769 49.7978 52.3165 49.7978C45.6351 49.7978 40.8901 47.5433 35.3297 44.9013L35.0727 44.7793C31.9387 43.2906 28.5853 41.7204 24.6582 40.6122C24.8696 40.5119 25.0802 40.4117 25.29 40.3119L25.2912 40.3113L25.8365 40.0519C31.4008 37.4089 36.6466 35.0334 44.2849 35.0334ZM33.3236 51.3114C29.4285 52.4184 26.0975 53.9782 22.9832 55.4575L22.7263 55.5796C17.6162 58.0075 13.1947 60.1083 7.32607 60.4327V46.3504C9.38758 45.9803 11.5439 45.7678 13.7711 45.7678C21.4093 45.7678 26.6552 48.1433 32.2194 50.7863L33.3236 51.3114ZM17.7635 64.9824H53.6758V57.3348C50.7147 56.7826 47.5597 56.446 44.2849 56.446C36.6466 56.446 31.4008 58.8215 25.8365 61.4645L25.2912 61.7239C22.9276 62.8485 20.4668 64.0194 17.7635 64.9824Z"
                            fill="#EE5605"
                        />
                    </svg>
                </div>
                <div className="mt-2 font-austin text-4xl max-lg:text-2xl">
                    <div
                        className="paragragh"
                        dangerouslySetInnerHTML={{ __html: blogText }}
                    ></div>
                </div>
            </div>
        </>
    );
};

export default TextAnimation;
