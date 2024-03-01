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
import StyledYearMonthMultiInput from "../../../../../src/components/boxes/StyledYearMonthMultiInput";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

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

const disclosureEnumOptions = [{ text: "Yes" }, { text: "No" }];

const sellerDisclosure12 = () => {
    const router = useRouter();
    const currentDate = dayjs();
    const handleNextSubmit = () => {
        router.push("/onboarding/property/part-4/seller-disclosure-13");
    };
    const [selectedlitigation, setSelectedLitigation] = useState<any>(null);
    const [selectedPoorConstruction, setSelectedPoorConstruction] =
        useState<any>(null);
    const [selectedAnyClaim, setSelectedAnyClaim] = useState<any>(null);
    const [selectedInsurance, setSelectedInsurance] = useState<any>(null);
    const [selectedCondemnation, setSelectedCondemnation] = useState<any>(null);
    const [selectedOwnerShip, setSelectedOwnerShip] = useState<any>(null);

    return (
        <OnboardingScreenFrame nextOnClick={handleNextSubmit}>
            <H5 style={{ marginBottom: "24px" }}>
                Seller&apos;s Disclosure: LITIGATION and INSURANCE
            </H5>
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
                (a) Is there now or has there been any litigation therein
                alleging negligent construction or defective building products?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedlitigation}
                onSelection={(index) => setSelectedLitigation(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (b) Has there been any award or payment of money in lieu of
                repairs for defective building products or poor construction?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedPoorConstruction}
                onSelection={(index) => setSelectedPoorConstruction(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (c) Has any release been signed regarding defective products or
                poor construction that would limit a future owner from making
                any claims?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedAnyClaim}
                onSelection={(index) => setSelectedAnyClaim(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (d) During Seller’s ownership have there been any insurance
                claims for more than 10% of the value of the Property?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedInsurance}
                onSelection={(index) => setSelectedInsurance(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (e) Is the Property subject to a threatened or pending
                condemnation action?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedCondemnation}
                onSelection={(index) => setSelectedCondemnation(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (f) How many insurance claims have been filed duringSeller’s
                ownership?
            </MintParagraph>
            <StyledInput
                type="text"
                min={0}
                value={selectedOwnerShip}
                onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                    setSelectedOwnerShip(numericValue);
                }}
                required
            />
        </OnboardingScreenFrame>
    );
};

export default sellerDisclosure12;
