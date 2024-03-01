import React from "react";
import {useDevice} from "../../../contexts/DeviceContext";
import Image from "next/image";
import TextButton from "../../buttons/TextButton";
import Link from "next/link";
import {colors} from "../../../styles/oldColors";

const LandingFooter: React.FC = (props: {}) => {
    const { isMobile, windowSize } = useDevice();

    return <div style={{display: "flex", margin: isMobile ? "80px 24px 0 24px" : "200px 10% 0 10%", flexDirection: "column"}}>
        <Image src='/landing/logocolor.svg' alt="image" width={248} height={41.16} style={{maxWidth:"248px", width:"100%", height:"41.16", padding: isMobile ? "0" : "16px 4px"}}/>
        <div style={{display: "flex", margin: isMobile ? "50px 0 80px 0" : "50px 0 200px 0"}}>
            <TextButton style={{fontSize: isMobile ? "11px" : "16px", fontWeight: 500, color: colors.gray700, marginRight: "auto", padding: "0"}} text={"© Housewell 2023"} />
            <Link href="/terms-of-use">
                <TextButton style={{fontSize: isMobile ? "11px" : "16px", fontWeight: 500, color: colors.gray700}} text={"Terms of Service"}/>
            </Link>
            <Link href="/privacy-policy">
                <TextButton style={{fontSize: isMobile ? "11px" : "16px", fontWeight: 500, color: colors.gray700, paddingLeft: isMobile ? "8px" : "24px"}} text={"Privacy Policy"}/>
            </Link>
        </div>
    </div>
}

export default LandingFooter;