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

const sellerDisclosure10 = () => {
    const router = useRouter();
    const currentDate = dayjs();
    const handleNextSubmit = () => {
        router.push("/onboarding/property/part-4/seller-disclosure-11");
    };
    const [selectedAwareAttic, setSelectedAwareAttic] = useState<any>(null);
    const [selectedHazardous, setSelectedHazardous] = useState<any>(null);
    const [selectedPresently, setSelectedPresently] = useState<any>(null);
    const [transferCost, setTransferCost] = useState<any>(null);
    const [annualcost, setAnnulaCost] = useState<any>(null);
    const [companyName, setCompanyName] = useState<any>(null);
    const [coverage, setCoverage] = useState<any>(null);
    const [expirationDate, setExpirationDate] = useState<any>(null);
    const [renewalDate, setRenewalDate] = useState<any>(null);
    return (
        <OnboardingScreenFrame nextOnClick={handleNextSubmit}>
            <H5 style={{ marginBottom: "24px" }}>
                Seller&apos;s Disclosure: TERMITES, DRY ROT, PESTS, and WOOD
                DESTROYING ORGANISMS
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
                selectedIndex={selectedAwareAttic}
                onSelection={(index) => setSelectedAwareAttic(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (b) Is there any damage or hazardous condition resulting from
                such wildlife intrusion; from insects (such as termites, bees
                and ants); or by fungi or dry rot?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedHazardous}
                onSelection={(index) => setSelectedHazardous(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "24px", marginBottom: "24px" }}
            >
                (c) Is there presently a bond, warranty or service contract for
                termites or other wood destroying organisms by a licensed pest
                control company?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedPresently}
                onSelection={(index) => setSelectedPresently(index)}
            />
            {selectedPresently == 0 && (
                <>
                    <MintParagraph
                        size="24"
                        weight="regular"
                        style={{ marginTop: "24px", marginBottom: "24px" }}
                    >
                        what is the cost to transfer?
                    </MintParagraph>
                    <StyledInput
                        type="text"
                        min={0}
                        value={transferCost}
                        onChange={(e) => {
                            const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                            );
                            setTransferCost(numericValue);
                        }}
                        required
                    />
                    <MintParagraph
                        size="24"
                        weight="regular"
                        style={{ marginTop: "24px", marginBottom: "24px" }}
                    >
                        What is the annual cost?
                    </MintParagraph>
                    <StyledInput
                        type="text"
                        min={0}
                        value={annualcost}
                        onChange={(e) => {
                            const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                            );
                            setAnnulaCost(numericValue);
                        }}
                        required
                    />
                    <MintParagraph
                        size="24"
                        weight="regular"
                        style={{ marginTop: "24px", marginBottom: "24px" }}
                    >
                        Company name/contact
                    </MintParagraph>
                    <StyledInput
                        type="text"
                        min={0}
                        value={companyName}
                        onChange={(e) => {
                            const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                            );
                            setCompanyName(numericValue);
                        }}
                        required
                    />
                    <MintParagraph
                        size="24"
                        weight="regular"
                        style={{ marginTop: "24px", marginBottom: "24px" }}
                    >
                        Coverage
                    </MintParagraph>
                    <MultipleChoiceParent
                        buttonHeight="64px"
                        fontSize="20"
                        useChecks
                        style={{ margin: "24px 0 36px 0" }}
                        choices={[
                            { text: "re-treatment and repair" },
                            { text: "re-treatment" },
                            { text: "periodic inspections only" },
                        ]}
                        selectedIndex={coverage}
                        onSelection={(index) => setCoverage(index)}
                    />
                    <MintParagraph
                        size="24"
                        weight="regular"
                        style={{ marginTop: "24px", marginBottom: "24px" }}
                    >
                        when is the Expiration Date?
                    </MintParagraph>
                    <StyledInput
                        type="date"
                        min={currentDate.format("YYYY-MM-DD")}
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        required
                    />
                    <MintParagraph
                        size="24"
                        weight="regular"
                        style={{ marginTop: "24px", marginBottom: "24px" }}
                    >
                        when is the Renewal Date?
                    </MintParagraph>
                    <StyledInput
                        type="date"
                        min={currentDate.format("YYYY-MM-DD")}
                        value={renewalDate}
                        onChange={(e) => setRenewalDate(e.target.value)}
                        required
                    />
                </>
            )}
        </OnboardingScreenFrame>
    );
};

export default sellerDisclosure10;
