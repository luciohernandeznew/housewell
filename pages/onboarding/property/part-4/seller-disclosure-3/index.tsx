import { GetServerSidePropsContext } from "next";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { colors } from "../../../../../src/styles/colors";
import { makeAuthedApiRequest } from "../../../../../src/utils/api/apiHelper";
import StyledInputWithSuperText from "../../../../../src/components/boxes/StyledInputWithSupertext";
import ParagraphStyledInput from "../../../../../src/components/boxes/ParagraphStyledInput";
import OnboardingScreenFrame from "../../../../../src/components/stuff/OnboardingScreenFrame";
import { useRouter } from "next/router";
import { useDevice } from "../../../../../src/contexts/DeviceContext";
import {
    H3,
    H5,
    MintParagraph,
} from "../../../../../src/components/Typography/Typography";
import StatusMessage from "../../../../../src/components/stuff/StatusMessage";
import MultipleChoiceParent from "../../../../../src/components/stuff/MultipleChoiceParent";
import dayjs from "dayjs";

const mapModelEnumToIndex = (model: string) => {
    if (model === "YES") return 0;
    if (model === "NO") return 1;
    if (model === "UNKNOWN") return 2;
};

export const StyledInput = styled.input<{ isSmall?: boolean }>`
    height: 64px;
    font-size: ${(props) => (props.isSmall ? "16px" : "24px")};
    line-height: ${(props) => (props.isSmall ? "18px" : "24px")};
    font-family: Mint Grotesk Medium;
    border: 1px solid ${colors.gray300};
    border-radius: 8px;
    padding: 0 16px;

    &:focus {
        outline: none;
        border: 2px solid ${colors.darkgreen1000};
        padding: 0 16px;
        box-sizing: border-box;
        border-radius: 8px;
    }

    ::placeholder {
        color: ${colors.gray700};
    }
    &:disabled {
        background-color: ${colors.gray100};
        color: ${colors.gray700};
    }
`;

const disclosureEnumOptions = [
    { text: "Yes" },
    { text: "No" },
];

const SellerDisclosure3 = () => {
    const router = useRouter();
    const handleNextSubmit = async () => {
        router.push("/onboarding/property/part-4/seller-disclosure-4");
    };
    const [selectedDwelling, setSelectedDwelling] = useState<any>(null);
    const [selectedLeadBased, setSelectedLeadBased] = useState<any>(null);
    const dwelling = "YES";
    useEffect(() => {
        if (dwelling === null) {
            setSelectedDwelling(-1);
        } else {
            const index = mapModelEnumToIndex(dwelling);
            setSelectedDwelling(index !== undefined ? index : -1);
        }
    }, [dwelling]);

    return (
        <OnboardingScreenFrame nextOnClick={handleNextSubmit}>
            <H5 style={{ marginBottom: "24px" }}>
                Seller&apos;s Disclosure: LEAD-BASED PAINT
            </H5>{" "}
            <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>
                    Fill out this information about your home to the best of
                    your ability. It&apos;s ok to not know all the details or
                    exact dates, but this helps you fulfill your legal duty to
                    notify buyers of adverse conditions of the property. Reach
                    out to a housewell advisor if you have questions.
                </MintParagraph>
            </StatusMessage>
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (a) Was any part of the residential dwelling on the Property or
                any painted component, fixture, or material used therein
                constructed or manufacture prior to 1978?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedDwelling}
                onSelection={(index) => setSelectedDwelling(index)}
            />
            {selectedDwelling == 0 && (
                <>
                    <MintParagraph
                        size="24"
                        weight="regular"
                        style={{ marginTop: "60px", marginBottom: "24px" }}
                    >
                        THE “LEAD-BASED PAINT EXHIBIT” GAR F316 MUST BE EXECUTED
                        BY THE PARTIES AND THE “LEADBASED PAINT PAMPHLET” GAR
                        CB04 MUST BE PROVIDED TO THE BUYER.
                    </MintParagraph>
                    <MultipleChoiceParent
                        buttonHeight="64px"
                        fontSize="20"
                        useChecks
                        style={{ margin: "5px 0 36px 0" }}
                        choices={disclosureEnumOptions}
                        selectedIndex={selectedLeadBased}
                        onSelection={(index) => setSelectedLeadBased(index)}
                    />
                </>
            )}
        </OnboardingScreenFrame>
    );
};

export default SellerDisclosure3;
