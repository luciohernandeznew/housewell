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

const mapIndexToModelEnum = (index: number) => {
    if (index === 0) return "YES";
    if (index === 1) return "NO";
    if (index === 2) return "UNKNOWN";
};

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

export type BasicPropertyDetails = {
    streetAddress: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    propertyId: string;
    buyerSideCommission: number;
};
const disclosureEnumOptions = [{ text: "Yes" }, { text: "No" }];

const SellerDisclosure1 = (props: { sellerDisclosure: any }) => {
    console.log(props.sellerDisclosure)

    const router = useRouter();
    const currentDate = dayjs();
    const { isMobile } = useDevice();
    const [yearBuilt, setYearBuilt] =
        useState<any>(null);
    const [selectedHasHOAIndex, setSelectedHasHOAIndex] = useState(-1);
    const [selectedIsVacantIndex, setSelectedIsVacantIndex] = useState(-1);
    const [selectedYearsProperty, setSelectedYearsProperty] =
        useState<any>(null);
    const [selectedPropertyLeased, setSelectedPropertyLeased] = useState(-1);
    const [selectedPropertyHistoric, setSelectedPropertyHistoric] =
        useState(-1);
    const hasHOA = "YES";
    const prevStep = '/onboarding/property/part-4/seller-disclosure-1?propertyId=' + props.sellerDisclosure.propertyId;
    const nextStep = '/onboarding/property/part-4/seller-disclosure-2?propertyId=' + props.sellerDisclosure.propertyId;


    useEffect(() => {
        if (hasHOA === null) {
            setSelectedHasHOAIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasHOA);
            setSelectedHasHOAIndex(index !== undefined ? index : -1);
        }
    }, [hasHOA]);

    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.sellerDisclosure.propertyId,
                updateData: {
                    yearBuilt,
                    isVacant: mapIndexToModelEnum(selectedIsVacantIndex),
                    hasHOA: mapIndexToModelEnum(selectedHasHOAIndex),
                    
                },
            }
            await makeAuthedApiRequest({ method: 'post', urlExtension: `/v1/sellerDisclosure/updateSellerDisclosure`, data });
            router.push(nextStep);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <OnboardingScreenFrame nextOnClick={handleNextSubmit}>
            <H5 style={{ marginBottom: "24px" }}>
                Seller&apos;s Disclosure: General
            </H5>{" "}
            :{" "}
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
                (a) What year was the main residential dwelling constructed?
            </MintParagraph>
            <StyledInput
                    type="number"
                    min="1850"
                    max="2024" // Adjust max as needed
                    defaultValue={2010}
                    value={yearBuilt}
                    onChange={(e) => setYearBuilt(e.target.value)}
                    required
                />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "60px", marginBottom: "24px" }}
            >
                (b) Is the Property vacant?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedIsVacantIndex}
                onSelection={(index) => setSelectedIsVacantIndex(index)}
            />
            {selectedHasHOAIndex == 0 && (
                <>
                    <MintParagraph
                        size="24"
                        weight="regular"
                        style={{ marginTop: "24px", marginBottom: "24px" }}
                    >
                        how long has it been since the Property has been
                        occupied?
                    </MintParagraph>
                    <StyledInput
                        type="text"
                        min={0}
                        value={selectedYearsProperty}
                        onChange={(e) => {
                            const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                            );
                            setSelectedYearsProperty(numericValue);
                        }}
                        required
                    />
                </>
            )}
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "60px", marginBottom: "24px" }}
            >
                (c) Is the Property or any portion thereof leased?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedPropertyLeased}
                onSelection={(index) => setSelectedPropertyLeased(index)}
            />
            <MintParagraph
                size="24"
                weight="regular"
                style={{ marginTop: "60px", marginBottom: "24px" }}
            >
                (d) Has the Property been designated as historic or in a
                historic district where permission must be received to make
                modifications and additions?
            </MintParagraph>
            <MultipleChoiceParent
                buttonHeight="64px"
                fontSize="20"
                useChecks
                style={{ margin: "5px 0 36px 0" }}
                choices={disclosureEnumOptions}
                selectedIndex={selectedPropertyHistoric}
                onSelection={(index) => setSelectedPropertyHistoric(index)}
            />
        </OnboardingScreenFrame>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // todo: add propertyData
    try {
        const { req, res, query } = context;
        const propertyId = query.propertyId;
        if (!propertyId) {
            return { props: {} };
        }
/*         const data = { propertyId };
        const response = await makeAuthedApiRequest({ method: 'post', data, urlExtension: '/v1/sellerDisclosure/getSellerDisclosure', isServer: true, req, res }); */
        return { props: { sellerDisclosure: {propertyId: '1234'} } };
    } catch (error) {
        console.log("ERROR", error);
        return { props: { basicAddressData: false } }
    }


}

export default SellerDisclosure1;
