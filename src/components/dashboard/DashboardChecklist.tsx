import React from "react";
import ChecklistItem from "./ChecklistItem";
import styled from "@emotion/styled";
import Image from "next/image";
import PrimaryButton from "../buttons/PrimaryButton";
import { H1, H2, H4, MintParagraph } from "../Typography/Typography";
import SecondaryButton from "../buttons/SecondaryButton";
import { useDevice } from "../../contexts/DeviceContext";

const Container = styled.div`
    border: 1px solid #E0E5E0;
    border-radius: 12px;
    display: flex;
    
    margin-bottom: 64px;
`;

const DashboardChecklist: React.FC = () => {
    const { isMobile } = useDevice();
    return <>
    {!isMobile && <Container>
        <div style={{ padding: "44px 44px 0 44px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <H4 style={{ fontSize: "48px" }}>Pre-listing checklist</H4>
            </div>
            <div style={{ display: "flex", marginTop: "20px" }}>
                <div style={{ borderRight: "1px solid rgba(0, 0, 0, 0.07)", paddingRight: "32px", flexGrow: 2 }}>
                <ChecklistItem num={1} title={"Declutter"}
                                   text={"Remove personal items and excess furniture to create a clean, spacious feel. Store excess items offsite."}
                    />
                    <ChecklistItem num={2} title={"Deep Clean"}
                                   text={"Thoroughly clean every room, including windows and carpets."}
                    />
                    <ChecklistItem num={3} title={"Maximize Curb Appeal"}
                                   text={"Clean up landscaping, touch up exterior paint, and complete any in progress projects."}
                    />
                    <ChecklistItem num={4} title={"Repair"}
                                   text={"Fix any minor repairs, such as leaky faucets and creaky doors."}
                    />
                </div>
                <div style={{ padding: "0 60px 0 22px", flexGrow: 2 }}>
                    <ChecklistItem num={5} title={"Stage"}
                                   text={"Rearrange furniture and add décor to create an inviting atmosphere."}
                    />
                    <ChecklistItem num={6} title={"Remove Valuables"}
                                   text={"Securely store any jewelry, valuables, or dangerous items."}
                    />
                    <ChecklistItem num={7} title={"Schedule Professional Photography"}
                                   text={"After you complete onboarding, your Housewell photographger will reach out to schedule a photoshoot."}
                    />
                </div>
            </div>
        </div>
    </Container>}
    </>
}

export default DashboardChecklist;