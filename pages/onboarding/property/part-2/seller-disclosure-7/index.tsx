import { GetServerSidePropsContext } from 'next';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../../../../src/styles/colors';
import { makeAuthedApiRequest } from '../../../../../src/utils/api/apiHelper';
import ParagraphStyledInput from '../../../../../src/components/boxes/ParagraphStyledInput';
import OnboardingScreenFrame from '../../../../../src/components/stuff/OnboardingScreenFrame';
import { useRouter } from 'next/router';
import { useDevice } from '../../../../../src/contexts/DeviceContext';
import { H3, H5, MintParagraph } from '../../../../../src/components/Typography/Typography';
import StatusMessage from '../../../../../src/components/stuff/StatusMessage';
import MultipleChoiceParent from '../../../../../src/components/stuff/MultipleChoiceParent';

export type BasicPropertyDetails = {
    streetAddress: string,
    addres2?: string,
    city: string,
    state: string,
    zip: string,
    propertyId: string,
    buyerSideCommission: number,
}
export const StyledInput = styled.input<{ isSmall?: boolean }>`
    height: 64px;
    font-size: ${props => props.isSmall ? '16px' : '24px'};
    line-height: ${props => props.isSmall ? '18px' : '24px'};
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

const mapIndexToModelEnum = (index: number) => {
    if (index === 0) return 'YES';
    if (index === 1) return 'NO';
    if (index === 2) return 'UNKNOWN';
};

const mapModelEnumToIndex = (model: string) => {
    if (model === 'YES') return 0;
    if (model === 'NO') return 1;
    if (model === 'UNKNOWN') return 2;
};



const SellerDisclosure7 = (props: { sellerDisclosure: any }) => {
    const router = useRouter();
    const { isMobile } = useDevice();
    const prevStep = '/onboarding/property/part-2/seller-disclosure-6?propertyId=' + props.sellerDisclosure.propertyId;
    const nextStep = '/onboarding/property/part-2/seller-disclosure-8?propertyId=' + props.sellerDisclosure.propertyId;
    const disclosureEnumOptions = [{ text: 'Yes' }, { text: 'No' }, { text: 'Unknown/NA' }];
    const [selectedHasAsbestosIndex, setSelectedHasAsbestosIndex] = useState(-1);
    const [selectedHasRadonIndex, setSelectedHasRadonIndex] = useState(-1);
    const [selectedHasMoldIndex, setSelectedHasMoldIndex] = useState(-1);
    const [selectedHasContaminatedSoilIndex, setSelectedHasContaminatedSoilIndex] = useState(-1);
    const [selectedTrashDumpNearbyIndex, setSelectedTrashDumpNearbyIndex] = useState(-1);
    const [selectedUndergroundFuelOrChemicalStorageTankIndex, setSelectedUndergroundFuelOrChemicalStorageTankIndex] = useState(-1);
    const [selectedHasMethtamphetaminelIndex, setSelectedHasMethtamphetaminelIndex] = useState(-1);
    const [selectedInFloodPlainIndex, setSelectedInFloodPlainIndex] = useState(-1);
    const [selectedGradingFloodingOrDrainageIssuesIndex, setSelectedGradingFloodingOrDrainageIssuesIndex] = useState(-1);
    const [selectedHasUndergroundSpringsIndex, setSelectedHasUndergroundSpringsIndex] = useState(-1);
    const [selectedHasSoilMovementIndex, setSelectedHasSoilMovementIndex] = useState(-1);
    const [selectedEnvironmentalExtraInfo, setSelectedEnvironmentalExtraInfo] = useState<any>(null);

    const { hasAsbestos, hasRadon, hasMold, hasContaminatedSoil, trashDumpNearby, undergroundFuelOrChemicalStorageTank, hasMethtamphetamine, inFloodPlain, gradingFloodingOrDrainageIssues, hasUndergroundSprings, hasSoilMovement, environmentalExtraInfo } = props.sellerDisclosure;

    useEffect(() => {
        if (hasAsbestos === null) {
            setSelectedHasAsbestosIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasAsbestos);
            setSelectedHasAsbestosIndex(index !== undefined ? index : -1);
        }

        if (hasRadon === null) {
            setSelectedHasRadonIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasRadon);
            setSelectedHasRadonIndex(index !== undefined ? index : -1);
        }

        if (hasMold === null) {
            setSelectedHasMoldIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasMold);
            setSelectedHasMoldIndex(index !== undefined ? index : -1);
        }

        if (hasContaminatedSoil === null) {
            setSelectedHasContaminatedSoilIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasContaminatedSoil);
            setSelectedHasContaminatedSoilIndex(index !== undefined ? index : -1);
        }

        if (trashDumpNearby === null) {
            setSelectedTrashDumpNearbyIndex(-1);
        } else {
            const index = mapModelEnumToIndex(trashDumpNearby);
            setSelectedTrashDumpNearbyIndex(index !== undefined ? index : -1);
        }

        if (hasMethtamphetamine === null) {
            setSelectedHasMethtamphetaminelIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasMethtamphetamine);
            setSelectedHasMethtamphetaminelIndex(index !== undefined ? index : -1);
        }

        if (undergroundFuelOrChemicalStorageTank === null) {
            setSelectedUndergroundFuelOrChemicalStorageTankIndex(-1);
        } else {
            const index = mapModelEnumToIndex(undergroundFuelOrChemicalStorageTank);
            setSelectedUndergroundFuelOrChemicalStorageTankIndex(index !== undefined ? index : -1);
        }

        if (inFloodPlain === null) {
            setSelectedInFloodPlainIndex(-1);
        } else {
            const index = mapModelEnumToIndex(inFloodPlain);
            setSelectedInFloodPlainIndex(index !== undefined ? index : -1);
        }

        if (gradingFloodingOrDrainageIssues === null) {
            setSelectedGradingFloodingOrDrainageIssuesIndex(-1);
        } else {
            const index = mapModelEnumToIndex(gradingFloodingOrDrainageIssues);
            setSelectedGradingFloodingOrDrainageIssuesIndex(index !== undefined ? index : -1);
        }

        if (hasUndergroundSprings === null) {
            setSelectedHasUndergroundSpringsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasUndergroundSprings);
            setSelectedHasUndergroundSpringsIndex(index !== undefined ? index : -1);
        }

        if (hasSoilMovement === null) {
            setSelectedHasSoilMovementIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasSoilMovement);
            setSelectedHasSoilMovementIndex(index !== undefined ? index : -1);
        }

        setSelectedEnvironmentalExtraInfo(environmentalExtraInfo)
    }, [hasAsbestos, hasRadon, hasMold, hasContaminatedSoil, trashDumpNearby, undergroundFuelOrChemicalStorageTank, hasMethtamphetamine, inFloodPlain, gradingFloodingOrDrainageIssues, hasUndergroundSprings, hasSoilMovement, environmentalExtraInfo]);

    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.sellerDisclosure.propertyId,
                updateData: {
                    hasAsbestos: mapIndexToModelEnum(selectedHasAsbestosIndex),
                    hasRadon: mapIndexToModelEnum(selectedHasRadonIndex),
                    hasMold: mapIndexToModelEnum(selectedHasMoldIndex),
                    hasContaminatedSoil: mapIndexToModelEnum(selectedHasContaminatedSoilIndex),
                    trashDumpNearby: mapIndexToModelEnum(selectedTrashDumpNearbyIndex),
                    undergroundFuelOrChemicalStorageTank: mapIndexToModelEnum(selectedUndergroundFuelOrChemicalStorageTankIndex),
                    hasMethtamphetamine: mapIndexToModelEnum(selectedHasMethtamphetaminelIndex),
                    inFloodPlain: mapIndexToModelEnum(selectedInFloodPlainIndex),
                    gradingFloodingOrDrainageIssues: mapIndexToModelEnum(selectedGradingFloodingOrDrainageIssuesIndex),
                    hasUndergroundSprings: mapIndexToModelEnum(selectedHasUndergroundSpringsIndex),
                    hasSoilMovement: mapIndexToModelEnum(selectedHasSoilMovementIndex),
                    environmentalExtraInfo: selectedEnvironmentalExtraInfo
                }
            }
            await makeAuthedApiRequest({ method: 'post', urlExtension: `/v1/sellerDisclosure/updateSellerDisclosure`, data });
            router.push(nextStep);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <OnboardingScreenFrame
            nextOnClick={handleNextSubmit}
            prevStep={prevStep}
            disabledRight={
                selectedHasAsbestosIndex != -1 &&
                    selectedHasRadonIndex != -1 &&
                    selectedHasMoldIndex != -1 &&
                    selectedHasContaminatedSoilIndex != -1 &&
                    selectedTrashDumpNearbyIndex != -1 &&
                    selectedUndergroundFuelOrChemicalStorageTankIndex != -1 &&
                    selectedHasMethtamphetaminelIndex != -1 &&
                    selectedInFloodPlainIndex != -1 &&
                    selectedGradingFloodingOrDrainageIssuesIndex != -1 &&
                    selectedHasUndergroundSpringsIndex != -1 &&
                    selectedHasSoilMovementIndex != -1
                    ? false : true
            }
        >
            {isMobile ? <H5 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 6</H5> : <H3 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 7</H3>}
            <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>Fill out this information about your home to the best of your ability. It&apos;s ok to not know all the details or exact dates, but this helps you fulfill your legal duty to notify buyers of adverse conditions of the property</MintParagraph>
            </StatusMessage>
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>Have any of the following substances, materials, or products been found on the Property?</MintParagraph>
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>1.  Asbestos?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasAsbestosIndex} onSelection={(index) => setSelectedHasAsbestosIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>2.  Radon?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasRadonIndex} onSelection={(index) => setSelectedHasRadonIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>3.  Mold?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasMoldIndex} onSelection={(index) => setSelectedHasMoldIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>4.  Contaminated soil?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasContaminatedSoilIndex} onSelection={(index) => setSelectedHasContaminatedSoilIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>5.  Are there any trash dumps, grave sites, landfills, buried materials, buried fuel tanks or other similar deposits located on the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedTrashDumpNearbyIndex} onSelection={(index) => setSelectedTrashDumpNearbyIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>6.  Underground fuel, chemical or other type of storage tank?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedUndergroundFuelOrChemicalStorageTankIndex} onSelection={(index) => setSelectedUndergroundFuelOrChemicalStorageTankIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>7.  Any other toxic or hazardous materials to include Methamphetamine (“Meth”)?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasMethtamphetaminelIndex} onSelection={(index) => setSelectedHasMethtamphetaminelIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>8.  Is the Property presently located on a flood plain, flood zone or floodway hazard area?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedInFloodPlainIndex} onSelection={(index) => setSelectedInFloodPlainIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>9.  Are there any grading, flooding, or drainage problems in connection with the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedGradingFloodingOrDrainageIssuesIndex} onSelection={(index) => setSelectedGradingFloodingOrDrainageIssuesIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>10.  Are there any underground springs located under or around the main dwelling or any improvements?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasUndergroundSpringsIndex} onSelection={(index) => setSelectedHasUndergroundSpringsIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>11.  Has there been notable changes that has resulted in soil erosion, soil shifting or sink holes in connection with the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasSoilMovementIndex} onSelection={(index) => setSelectedHasSoilMovementIndex(index)} />

            <ParagraphStyledInput style={{ marginBottom: '24px' }} label='Provide any additional information (if applicable) that the Seller has knowledge pertaining to the Environmental Conditions:' value={selectedEnvironmentalExtraInfo ? selectedEnvironmentalExtraInfo : ""} onChange={(e) => setSelectedEnvironmentalExtraInfo(e.target.value)} />
        </OnboardingScreenFrame>
    )
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const { req, res, query } = context;
        const propertyId = query.propertyId;
        if (!propertyId) {
            return { props: {} };
        }
        const data = { propertyId };
        const response = await makeAuthedApiRequest({ method: 'post', data, urlExtension: '/v1/sellerDisclosure/getSellerDisclosure', isServer: true, req, res });
        return { props: { sellerDisclosure: response.data } };
    } catch (error) {
        console.log("ERROR", error);
        return { props: { basicAddressData: false } }
    }


}

export default SellerDisclosure7;