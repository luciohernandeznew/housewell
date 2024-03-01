import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import SecondaryButton from "../buttons/SecondaryButton";

const Navbar: FC = () => {
    return (
        <>
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-8">
                    <Link
                        href="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                        onClick={() => window.location.assign("/landing")}
                    >
                        <Image
                            src={"/landing/logocolor.svg"}
                            width={160}
                            height={100}
                            alt="logo"
                            style={{ width: "auto", height: "auto" }}
                            className="max-sm:!h-[25px]"
                        />
                    </Link>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div
                        className="hidden w-full md:block md:w-auto"
                        id="navbar-default"
                    >
                        <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <Link
                                    href="/landing/how_works"
                                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                                    aria-current="page"
                                    onClick={() =>
                                        window.location.assign(
                                            "/landing/how_works"
                                        )
                                    }
                                >
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <SecondaryButton
                                    hasArrow
                                    text="Get Started"
                                    style={{ height: "3rem" }}
                                    size="medium"
                                    onClick={() =>
                                        window.location.assign(
                                            "/signup"
                                        )
                                    }
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
