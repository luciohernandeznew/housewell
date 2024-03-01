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

const disclosureEnumOptions = [{ text: "Yes" }, { text: "No" }];

const SellerDisclosure4 = () => {
    const router = useRouter();
    const handleNextSubmit = async () => {
        router.push("/onboarding/property/part-4/seller-disclosure-5");
    };
    const [selectedMovement, setSelectedMovement] = useState<any>(null);
    const [selectedReinForcements, setSelectedReinForcements] =
        useState<any>(null);
    const [selectedAddition, setSelectedAddition] = useState<any>(null);
    const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
    const [selectedViolations, setSelectedViolations] = useState<any>(null);
    const [selectedNotices, setSelectedNotices] = useState<any>(null);
    const [selectedDwelling, setSelectedDwelling] = useState<any>(null);
    const [selectedPortion, setSelectedPortion] = useState<any>(null);

    return (
        <OnboardingScreenFrame nextOnClick={handleNextSubmit}>
            <H5 style={{ marginBottom: "24px" }}>
                Seller&apos;s Disclosure: STRUCTURAL ITEMS, ADDITIONS AND
                ALTERATIONS
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
                (a) Has there been any settling, movement, cracking or breakage
                of the foundations or structural supports of the improvements?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedMovement}
                onSelection={(index) => setSelectedMovement(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (b) Have any structural reinforcements or supports been added?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedReinForcements}
                onSelection={(index) => setSelectedReinForcements(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (c) Have there been any additions, structural changes, or any
                other major alterations to the original improvements or
                Property, including without limitation pools, carports or
                storage buildings?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedAddition}
                onSelection={(index) => setSelectedAddition(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (d) Has any work been done where a required building permit was
                not obtained?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedBuilding}
                onSelection={(index) => setSelectedBuilding(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (e) Are there violations of building codes, housing codes, or
                zoning regulations (not otherwise grandfathered)?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedViolations}
                onSelection={(index) => setSelectedViolations(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (f) Have any notices alleging such violations been received?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedNotices}
                onSelection={(index) => setSelectedNotices(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (g) Is any portion of the main dwelling a mobile, modular or
                manufactured home?
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
                (h) Was any dwelling or portion thereof (excluding mobile,
                modular and manufactured dwelling) moved to the site from
                another location?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedPortion}
                onSelection={(index) => setSelectedPortion(index)}
            />
        </OnboardingScreenFrame>
    );
};

export default SellerDisclosure4;
