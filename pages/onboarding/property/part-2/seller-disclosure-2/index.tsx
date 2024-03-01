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
    if (index === 0) return 'WORKING';
    if (index === 1) return 'NOT_WORKING';
    if (index === 2) return 'UNKNOWN';
};

const mapModelEnumToIndex = (model: string) => {
    if (model === 'WORKING') return 0;
    if (model === 'NOT_WORKING') return 1;
    if (model === 'UNKNOWN') return 2;
};

const garageDoorOpenerTypeEnum = (index: number) => {
    if (index === 0) return 'OPENER';
    if (index === 1) return 'REMOTE';
    if (index === 2) return 'KEYPAD';
};

const garageDoorOpenerTypeIndex = (model: string) => {
    if (model === 'OPENER') return 0;
    if (model === 'REMOTE') return 1;
    if (model === 'KEYPAD') return 2;
};



const SellerDisclosure2 = (props: { sellerDisclosure: any }) => {
    const router = useRouter();
    const { isMobile } = useDevice();
    const prevStep = '/onboarding/property/part-2/seller-disclosure-1?propertyId=' + props.sellerDisclosure.propertyId;
    const nextStep = '/onboarding/property/part-2/seller-disclosure-3?propertyId=' + props.sellerDisclosure.propertyId;
    const disclosureEnumOptions = [{ text: 'Working' }, { text: 'Not Working' }, { text: 'Unknown/NA' }];
    const garageDoorOpenerTypeEnumOptions = [{ text: 'Opener' }, { text: 'Remote' }, { text: 'Keypad' }];
    // const securitySystemOwnedEnumOptions = [{ text: 'Opener' }, { text: 'Remote' }, { text: 'Keypad' }];
    const [selectedServicePanelStateIndex, setSelectedServicePanelStateIndex] = useState(-1);
    const [selectedNaturalGasStateIndex, setSelectedNaturalGasStateIndex] = useState(-1);
    const [selectedHasNatGasFurnace, setSelectedHasNatGasFurnace] = useState<any>(null);
    const [selectedHasNatGasStove, setSelectedHasNatGasStove] = useState<any>(null);
    const [selectedHasNatGasWaterHeater, setSelectedHasNatGasWaterHeater] = useState<any>(null);
    const [selectedHasNatGasFireplace, setSelectedHasNatGasFireplace] = useState<any>(null);
    const [selectedSecuritySystemStateIndex, setSelectedSecuritySystemStateIndex] = useState(-1);
    const [selectedSecuritySystemOwned, setSelectedSecuritySystemOwned] = useState<any>(null);
    const [selectedSmokeDetectorsStateIndex, setSelectedSmokeDetectorsStateIndex] = useState(-1);
    const [selectedCarbonMonoxideDetectorsStateIndex, setSelectedCarbonMonoxideDetectorsStateIndex] = useState(-1);
    const [selectedGarageDoorStateIndex, setSelectedGarageDoorStateIndex] = useState(-1);
    const [selectedGarageDoorOpenerTypeIndex, setSelectedGarageDoorOpenerTypeIndex] = useState(-1);
    const [selectedElectricalExtraInfo, setSelectedElectricalExtraInfo] = useState(null);

    const { servicePanelState, naturalGasState, hasNatGasFurnace, hasNatGasStove, hasNatGasWaterHeater, hasNatGasFireplace, securitySystemState, securitySystemOwned, smokeDetectorsState, carbonMonoxideDetectorsState, garageDoorState, garageDoorOpenerType, electricalExtraInfo } = props.sellerDisclosure;

    useEffect(() => {
        if (servicePanelState === null) {
            setSelectedServicePanelStateIndex(-1);
        } else {
            const index = mapModelEnumToIndex(servicePanelState);
            setSelectedServicePanelStateIndex(index !== undefined ? index : -1);
        }

        if (naturalGasState === null) {
            setSelectedNaturalGasStateIndex(-1);
        } else {
            const index = mapModelEnumToIndex(naturalGasState);
            setSelectedNaturalGasStateIndex(index !== undefined ? index : -1);
        }

        if (hasNatGasFurnace) {
            setSelectedHasNatGasFurnace(hasNatGasFurnace);
        }
        else {
            setSelectedHasNatGasFurnace(false);
        }

        if (hasNatGasStove != undefined) {
            setSelectedHasNatGasStove(hasNatGasStove);
        }
        else {
            setSelectedHasNatGasStove(false);
        }

        if (hasNatGasWaterHeater != undefined) {
            setSelectedHasNatGasWaterHeater(hasNatGasWaterHeater);
        }
        else {
            setSelectedHasNatGasWaterHeater(false);
        }

        if (hasNatGasFireplace != undefined) {
            setSelectedHasNatGasFireplace(hasNatGasFireplace);
        }
        else {
            setSelectedHasNatGasFireplace(false);
        }

        if (securitySystemState === null) {
            setSelectedSecuritySystemStateIndex(-1);
        } else {
            const index = mapModelEnumToIndex(securitySystemState);
            setSelectedSecuritySystemStateIndex(index !== undefined ? index : -1);
        }

        if (securitySystemOwned != undefined) {
            setSelectedSecuritySystemOwned(securitySystemOwned);
        }
        else {
            setSelectedSecuritySystemOwned(false);
        }

        if (smokeDetectorsState === null) {
            setSelectedSmokeDetectorsStateIndex(-1);
        } else {
            const index = mapModelEnumToIndex(smokeDetectorsState);
            setSelectedSmokeDetectorsStateIndex(index !== undefined ? index : -1);
        }

        if (carbonMonoxideDetectorsState === null) {
            setSelectedCarbonMonoxideDetectorsStateIndex(-1);
        } else {
            const index = mapModelEnumToIndex(carbonMonoxideDetectorsState);
            setSelectedCarbonMonoxideDetectorsStateIndex(index !== undefined ? index : -1);
        }

        if (garageDoorState === null) {
            setSelectedGarageDoorStateIndex(-1);
        } else {
            const index = mapModelEnumToIndex(garageDoorState);
            setSelectedGarageDoorStateIndex(index !== undefined ? index : -1);
        }

        if (garageDoorOpenerType === null) {
            setSelectedGarageDoorOpenerTypeIndex(-1);
        } else {
            const index = garageDoorOpenerTypeIndex(garageDoorOpenerType);
            setSelectedGarageDoorOpenerTypeIndex(index !== undefined ? index : -1);
        }

        setSelectedElectricalExtraInfo(electricalExtraInfo)

    }, [servicePanelState, naturalGasState, hasNatGasFurnace, hasNatGasStove, hasNatGasWaterHeater, hasNatGasFireplace, securitySystemState, securitySystemOwned, smokeDetectorsState, carbonMonoxideDetectorsState, garageDoorState, garageDoorOpenerType, electricalExtraInfo]);

    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.sellerDisclosure.propertyId,
                updateData: {
                    servicePanelState: mapIndexToModelEnum(selectedServicePanelStateIndex),
                    naturalGasState: mapIndexToModelEnum(selectedNaturalGasStateIndex),
                    hasNatGasFurnace: selectedHasNatGasFurnace,
                    hasNatGasStove: selectedHasNatGasStove,
                    hasNatGasWaterHeater: selectedHasNatGasWaterHeater,
                    hasNatGasFireplace: selectedHasNatGasFireplace,
                    securitySystemState: mapIndexToModelEnum(selectedSecuritySystemStateIndex),
                    securitySystemOwned: selectedSecuritySystemOwned,
                    smokeDetectorsState: mapIndexToModelEnum(selectedSmokeDetectorsStateIndex),
                    carbonMonoxideDetectorsState: mapIndexToModelEnum(selectedCarbonMonoxideDetectorsStateIndex),
                    garageDoorState: mapIndexToModelEnum(selectedGarageDoorStateIndex),
                    garageDoorOpenerType: garageDoorOpenerTypeEnum(selectedGarageDoorOpenerTypeIndex),
                    electricalExtraInfo: selectedElectricalExtraInfo
                },
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
                selectedServicePanelStateIndex != -1 &&
                    selectedNaturalGasStateIndex != -1 &&
                    selectedSecuritySystemStateIndex != -1 &&
                    selectedSmokeDetectorsStateIndex != -1 &&
                    selectedCarbonMonoxideDetectorsStateIndex != -1 &&
                    selectedGarageDoorStateIndex != -1
                    ? false : true
            }
        >
            {isMobile ? <H5 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 2</H5> : <H3 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 2</H3>}
            <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>Fill out this information about your home to the best of your ability. It&apos;s ok to not know all the details or exact dates, but this helps you fulfill your legal duty to notify buyers of adverse conditions of the property</MintParagraph>
            </StatusMessage>
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>1. Electric Service Panel</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedServicePanelStateIndex} onSelection={(index) => setSelectedServicePanelStateIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>2. Is the Property connected to a natural gas system?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedNaturalGasStateIndex} onSelection={(index) => { if (index != 0) { setSelectedHasNatGasFurnace(false); setSelectedHasNatGasStove(false); setSelectedHasNatGasWaterHeater(false); setSelectedHasNatGasFireplace(false); } setSelectedNaturalGasStateIndex(index) }} />
            {
                selectedNaturalGasStateIndex == 0 && (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Which appliances are connected to natural gas?</MintParagraph>
                        <MultipleChoiceParent multipleSelectable buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={[{ text: 'Furnace' }, { text: 'Stove' }, { text: 'Water Heater' }, { text: 'Fireplace' }]} defaultChecks={([selectedHasNatGasFurnace, selectedHasNatGasStove, selectedHasNatGasWaterHeater, selectedHasNatGasFireplace])} onSelection={(indexArray) => { setSelectedHasNatGasFurnace(indexArray[0]); setSelectedHasNatGasStove(indexArray[1]); setSelectedHasNatGasWaterHeater(indexArray[2]); setSelectedHasNatGasFireplace(indexArray[3]); }} />
                    </>
                )
            }
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>3. Security System</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedSecuritySystemStateIndex} onSelection={(index) => { if (index != 0) { setSelectedSecuritySystemOwned(false); } setSelectedSecuritySystemStateIndex(index); }} />
            {
                selectedSecuritySystemStateIndex == 0 && (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Is the security system owned or leased?</MintParagraph>
                        <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={[{ text: 'Owned' }, { text: 'Leased' }]} selectedIndex={selectedSecuritySystemOwned ? 0 : 1} onSelection={(index) => setSelectedSecuritySystemOwned(index === 0 ? true : false)} />
                    </>
                )
            }
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>4. Smoke Detectors</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedSmokeDetectorsStateIndex} onSelection={(index) => setSelectedSmokeDetectorsStateIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>5. Carbon Monoxide Detectors</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedCarbonMonoxideDetectorsStateIndex} onSelection={(index) => setSelectedCarbonMonoxideDetectorsStateIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>6. Garage Door</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedGarageDoorStateIndex} onSelection={(index) => { if (index != 0) { setSelectedGarageDoorOpenerTypeIndex(-1); } setSelectedGarageDoorStateIndex(index) }} />
            {
                selectedGarageDoorStateIndex == 0 && (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>How do you open the garage door?</MintParagraph>
                        <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={garageDoorOpenerTypeEnumOptions} selectedIndex={selectedGarageDoorOpenerTypeIndex} onSelection={(index) => setSelectedGarageDoorOpenerTypeIndex(index)} />
                    </>
                )
            }
            <ParagraphStyledInput style={{ marginBottom: '24px' }} label='Provide any additional information that the Seller has knowledge pertaining to the Electrical System:' value={selectedElectricalExtraInfo ? selectedElectricalExtraInfo : ""} onChange={(e) => setSelectedElectricalExtraInfo(e.target.value)} />
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

export default SellerDisclosure2;