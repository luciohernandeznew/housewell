import React, { useRef } from 'react';
import App, { AppProps, AppContext } from "next/app";
import { Provider as ReduxProvider } from 'react-redux';
import { initializeStore } from '../src/store';
import IntercomChat from '../src/components/stuff/Intercom';
import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/TimeslotSelector.css";
import "../styles/LandingTextAnimation.css";
import "../styles/Typing.css";
import "../styles/SelectDropdown.css";
import { css, Global } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileDetect from "mobile-detect";
import { DeviceProvider } from "../src/contexts/DeviceContext";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthNav from "../src/components/headerFooter/AuthNav";
import styled from "@emotion/styled";

// Define global styles
const GlobalStyle = css`
    a {
        text-decoration: none;
        color: inherit;
    }

    html,
    body {
        overflow-x: hidden;
    }

    .swiper-button-next,
    .swiper-button-prev {
        color: #075f4e;
    }

    .react-switch-bg {
        height: 16px !important;
        width: 34px !important;
        border: 1px solid #202326;
    }
`;

// Styled component for the page body
const Body = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
`;

// Main App component
export default function HousewellApp({ Component, pageProps }: AppProps) {
    const store = initializeStore(pageProps.initialState || {});
    const router = useRouter();
    const navRoutes = [
        '/dashboard', '/messages', '/settings', '/schedule-event', 
        '/property-admin', '/buy', '/offer-details', '/property-listing', '/buy/map'
    ];

    // Use a ref for the main content body to allow scrolling to top
    const styledFrameRef = useRef<HTMLDivElement>(null);
    const scrollToTop = () => {
        if (styledFrameRef.current) {
            styledFrameRef.current.scrollTop = 0;
        }
    };
    return (
        <ReduxProvider store={store}>
            <DeviceProvider initialIsMobile={pageProps.isMobile}>
                <Head>
                    <title>Housewell | Sell or buy a house and save tens of thousands in fees</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </Head>
                <Global styles={GlobalStyle} />
                <ToastContainer />
                <Body ref={styledFrameRef}>
                    {navRoutes.includes(router.pathname) && <AuthNav />}
                    <Component {...pageProps} scrollToTop={scrollToTop} />
                    <IntercomChat/>
                </Body>
            </DeviceProvider>
        </ReduxProvider>
    );
}

// Get initial props for setting mobile detection
HousewellApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);

    const userAgent = appContext.ctx.req?.headers["user-agent"];
    const md = new MobileDetect(userAgent || "uhoh");
    const isMobile = !!md.mobile();

    return { ...appProps, pageProps: { ...appProps.pageProps, isMobile } };
};
