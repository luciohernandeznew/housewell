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

const SellerDisclosure9 = () => {
    const router = useRouter();
    const handleNextSubmit = () => {
        router.push("/onboarding/property/part-4/seller-disclosure-10");
    };
    const [selectedLandFill, setSelectedLandFill] = useState<any>(null);
    const [selectedVisible, setSelectedVisible] = useState<any>(null);
    const [selectedSharedImprovement, setSelectedSharedImprovement] =
        useState<any>(null);
    return (
        <OnboardingScreenFrame nextOnClick={handleNextSubmit}>
            <H5 style={{ marginBottom: "24px" }}>
                Seller&apos;s Disclosure: SOIL AND BOUNDARIES
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
                (a) Are there any landfills (other than foundation backfill),
                graves, burial pits, caves, mine shafts, trash dumps or wells
                (in use or abandoned)?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedLandFill}
                onSelection={(index) => setSelectedLandFill(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (b) Is there now or has there ever been any visible soil
                settlement or movement?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedVisible}
                onSelection={(index) => setSelectedVisible(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (c) Are there any shared improvements which benefit or burden
                the Property, including, but not limited to a shared dock,
                septic system, well, driveway, alleyway, or private road?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedSharedImprovement}
                onSelection={(index) => setSelectedSharedImprovement(index)}
            />
        </OnboardingScreenFrame>
    );
};

export default SellerDisclosure9;
