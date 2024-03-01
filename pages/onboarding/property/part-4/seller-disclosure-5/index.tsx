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

const disclosureEnumOptions = [
    { text: "Yes" },
    { text: "No" },
];

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

const SellerDisclosure5 = () => {
    const router = useRouter();
    const handleNextSubmit = async () => {
        router.push("/onboarding/property/part-4/seller-disclosure-6");
    };
    const currentDate = dayjs();
    const [selectedHVAC, setSelectedHVAC] = useState<any>(null);
    const [selectedDwelling, setSelectedDwelling] = useState<any>(null);
    const [selectedSystem, setSelectedSystem] = useState<any>(null);
    const [selecteDaluminum, setSelectedDaluminum] = useState<any>(null);
    const [selectedFirePlaces, setSelectedFirePlaces] = useState<any>(null);
    const [selectedDamaging, setSelectedDamaging] = useState<any>(null);
    const [selectedAppliances, setSelectedAppliances] = useState<any>(null);
    const [selectedRentalPayment, setSelectedRentalPayment] =
        useState<any>(null);
    const havcDate = currentDate.format("YYYY-MM-DD");
    const [havcExpiration, setHavcExpiration] = useState(havcDate);

    return (
        <OnboardingScreenFrame nextOnClick={handleNextSubmit}>
            <H5 style={{ marginBottom: "24px" }}>
                Seller&apos;s Disclosure: SYSTEMS and COMPONENTS:
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
                (a) Has any part of the HVAC system(s) been replaced during
                Seller’s ownership?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedHVAC}
                onSelection={(index) => setSelectedHVAC(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (b) Date of last HVAC system(s) service
            </MintParagraph>
            <StyledInput
                type="date"
                min={currentDate.format("YYYY-MM-DD")}
                value={havcExpiration}
                onChange={(e) => setHavcExpiration(e.target.value)}
                required
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (c) Is any heated and cooled portion of the main dwelling not
                served by a central heating and cooling system?
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
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (d) Is any portion of the heating and cooling system in need of
                repair or replacement?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedSystem}
                onSelection={(index) => setSelectedSystem(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (e) Does any dwelling or garage have aluminum wiring other than
                in the primary service line?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selecteDaluminum}
                onSelection={(index) => setSelectedDaluminum(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (f) Are any fireplaces decorative only or in need of repair?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedFirePlaces}
                onSelection={(index) => setSelectedFirePlaces(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (g) Have there been any reports of damaging moisture behind
                exterior walls constructed of synthetic stucco?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedDamaging}
                onSelection={(index) => setSelectedDamaging(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (h) Have there been any reports of damaging moisture behind
                exterior walls constructed of synthetic stucco?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedRentalPayment}
                onSelection={(index) => setSelectedRentalPayment(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (i) Are there any remotely accessed thermostats, lighting
                systems, security camera, video doorbells, locks, appliances,
                etc. servicing the Property?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedAppliances}
                onSelection={(index) => setSelectedAppliances(index)}
            />
        </OnboardingScreenFrame>
    );
};

export default SellerDisclosure5;
