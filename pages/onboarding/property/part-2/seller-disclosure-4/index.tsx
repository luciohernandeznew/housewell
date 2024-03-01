import { GetServerSidePropsContext } from 'next';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../../../../src/styles/colors';
import { makeAuthedApiRequest } from '../../../../../src/utils/api/apiHelper';
import StyledInputWithSuperText from '../../../../../src/components/boxes/StyledInputWithSupertext';
import ParagraphStyledInput from '../../../../../src/components/boxes/ParagraphStyledInput';
import OnboardingScreenFrame from '../../../../../src/components/stuff/OnboardingScreenFrame';
import { useRouter } from 'next/router';
import { useDevice } from '../../../../../src/contexts/DeviceContext';
import { H3, H5, MintParagraph } from '../../../../../src/components/Typography/Typography';
import StatusMessage from '../../../../../src/components/stuff/StatusMessage';
import MultipleChoiceParent from '../../../../../src/components/stuff/MultipleChoiceParent';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

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



const SellerDisclosure4 = (props: { sellerDisclosure: any }) => {
    const router = useRouter();
    const currentDate = dayjs();
    const { isMobile } = useDevice();
    const prevStep = '/onboarding/property/part-2/seller-disclosure-3?propertyId=' + props.sellerDisclosure.propertyId;
    const nextStep = '/onboarding/property/part-2/seller-disclosure-5?propertyId=' + props.sellerDisclosure.propertyId;
    const disclosureEnumOptions = [{ text: 'Yes' }, { text: 'No' }, { text: 'Unknown/NA' }];
    const [selectedHasHVACIndex, setSelectedHasHVACIndex] = useState(-1);
    const [selectedHvacNeedsRepairIndex, setSelectedHvacNeedsRepairIndex] = useState(-1);
    const [selectedHasHeatingSystemIndex, setSelectedHasHeatingSystemIndex] = useState(-1);
    const [selectedHeatingNeedsRepairIndex, setSelectedHeatingNeedsRepairIndex] = useState(-1);
    const [selectedFireplaceFunctioningIndex, setSelectedFireplaceFunctioningIndex] = useState(-1);
    const [selectedPartOfHomeNoHVACIndex, setSelectedPartOfHomeNoHVACIndex] = useState(-1);
    const [selectedPartOfHomeNoHVACDescription, setSelectedPartOfHomeNoHVACDescription] = useState<any>(null);
    const [selectedHvacExtraInfo, setSelectedHvacExtraInfo] = useState<any>(null);

    const { hasHVAC, hvacNeedsRepair, hvacInstalled, hvacLastServiced, hasHeatingSystem, heatingNeedsRepair, heatingInstalled, heatingLastServiced, fireplaceFunctioning, fireplaceLastServiced, partOfHomeNoHVAC, partOfHomeNoHVACDescription, hvacExtraInfo } = props.sellerDisclosure;

    const hvacInstalledDate = hvacInstalled
        ? dayjs.utc(hvacInstalled, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD')
        : currentDate.format('YYYY-MM-DD');
    const [selectedHvacInstalled, setSelectedHvacInstalled] = useState(hvacInstalledDate);

    const hvacLastServicedDate = hvacLastServiced
        ? dayjs.utc(hvacLastServiced, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD')
        : currentDate.format('YYYY-MM-DD');
    const [selectedHvacLastServiced, setSelectedHvacLastServiced] = useState(hvacLastServicedDate);

    const heatingInstalledDate = heatingInstalled
        ? dayjs.utc(heatingInstalled, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD')
        : currentDate.format('YYYY-MM-DD');
    const [selectedHeatingInstalled, setSelectedHeatingInstalled] = useState(heatingInstalledDate);

    const heatingLastServicedDate = heatingLastServiced
        ? dayjs.utc(heatingLastServiced, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD')
        : currentDate.format('YYYY-MM-DD');
    const [selectedHeatingLastServiced, setSelectedHeatingLastServiced] = useState(heatingLastServicedDate);

    const fireplaceLastServicedServicedDate = fireplaceLastServiced
        ? dayjs.utc(fireplaceLastServiced, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD')
        : currentDate.format('YYYY-MM-DD');
    const [selectedFireplaceLastServiced, setSelectedFireplaceLastServiced] = useState(fireplaceLastServicedServicedDate);

    useEffect(() => {
        if (hasHVAC === null) {
            setSelectedHasHVACIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasHVAC);
            setSelectedHasHVACIndex(index !== undefined ? index : -1);
        }

        if (hvacNeedsRepair === null) {
            setSelectedHvacNeedsRepairIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hvacNeedsRepair);
            setSelectedHvacNeedsRepairIndex(index !== undefined ? index : -1);
        }

        if (hasHeatingSystem === null) {
            setSelectedHasHeatingSystemIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasHeatingSystem);
            setSelectedHasHeatingSystemIndex(index !== undefined ? index : -1);
        }

        if (heatingNeedsRepair === null) {
            setSelectedHeatingNeedsRepairIndex(-1);
        } else {
            const index = mapModelEnumToIndex(heatingNeedsRepair);
            setSelectedHeatingNeedsRepairIndex(index !== undefined ? index : -1);
        }

        if (fireplaceFunctioning === null) {
            setSelectedFireplaceFunctioningIndex(-1);
        } else {
            const index = mapModelEnumToIndex(fireplaceFunctioning);
            setSelectedFireplaceFunctioningIndex(index !== undefined ? index : -1);
        }

        if (partOfHomeNoHVAC === null) {
            setSelectedPartOfHomeNoHVACIndex(-1);
        } else {
            const index = mapModelEnumToIndex(partOfHomeNoHVAC);
            setSelectedPartOfHomeNoHVACIndex(index !== undefined ? index : -1);
        }

        setSelectedPartOfHomeNoHVACDescription(partOfHomeNoHVACDescription);
        setSelectedHvacExtraInfo(hvacExtraInfo);

    }, [hasHVAC, hvacNeedsRepair, hasHeatingSystem, heatingNeedsRepair, fireplaceFunctioning, partOfHomeNoHVAC, partOfHomeNoHVACDescription, hvacExtraInfo]);

    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.sellerDisclosure.propertyId,
                updateData: {
                    hasHVAC: mapIndexToModelEnum(selectedHasHVACIndex),
                    hvacNeedsRepair: mapIndexToModelEnum(selectedHvacNeedsRepairIndex),
                    hvacInstalled: selectedHvacNeedsRepairIndex == 0 ? dayjs(selectedHvacInstalled).format('YYYY-MM-DD') : null,
                    hvacLastServiced: selectedHvacNeedsRepairIndex == 0 ? dayjs(hvacLastServicedDate).format('YYYY-MM-DD') : null,
                    hasHeatingSystem: mapIndexToModelEnum(selectedHasHeatingSystemIndex),
                    heatingNeedsRepair: mapIndexToModelEnum(selectedHeatingNeedsRepairIndex),
                    heatingInstalled: selectedHasHeatingSystemIndex == 0 ? dayjs(selectedHeatingInstalled).format('YYYY-MM-DD') : null,
                    heatingLastServiced: selectedHasHeatingSystemIndex == 0 ? dayjs(selectedHeatingLastServiced).format('YYYY-MM-DD') : null,
                    fireplaceFunctioning: mapIndexToModelEnum(selectedFireplaceFunctioningIndex),
                    fireplaceLastServiced: selectedFireplaceFunctioningIndex == 0 ? dayjs(selectedFireplaceLastServiced).format('YYYY-MM-DD') : null,
                    partOfHomeNoHVAC: mapIndexToModelEnum(selectedPartOfHomeNoHVACIndex),
                    partOfHomeNoHVACDescription: selectedPartOfHomeNoHVACDescription,
                    hvacExtraInfo: selectedHvacExtraInfo
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
                selectedHasHVACIndex != -1 &&
                    selectedHasHeatingSystemIndex != -1 &&
                    selectedFireplaceFunctioningIndex != -1 &&
                    selectedPartOfHomeNoHVACIndex != -1
                    ? false : true
            }
        >
            {isMobile ? <H5 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 4</H5> : <H3 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 4</H3>}
            <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>Fill out this information about your home to the best of your ability. It&apos;s ok to not know all the details or exact dates, but this helps you fulfill your legal duty to notify buyers of adverse conditions of the property</MintParagraph>
            </StatusMessage>
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>1. Does the Property utilize a HVAC system(s)?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasHVACIndex} onSelection={(index) => { if (index != 0) { setSelectedHvacInstalled(hvacInstalledDate); setSelectedHvacLastServiced(hvacLastServicedDate); setSelectedHvacNeedsRepairIndex(-1); } setSelectedHasHVACIndex(index) }} />
            {selectedHasHVACIndex == 0 &&
                (
                    <>
                        <>
                            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Is the HVAC system in need of repair?</MintParagraph>
                            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHvacNeedsRepairIndex} onSelection={(index) => setSelectedHvacNeedsRepairIndex(index)} />
                        </>
                        <>
                            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>When was the system last installed?</MintParagraph>
                            <StyledInput type="date"
                                max={currentDate.format('YYYY-MM-DD')}
                                value={selectedHvacInstalled}
                                onChange={(e) => setSelectedHvacInstalled(e.target.value)}
                                required
                            />
                        </>
                        <>
                            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>When was the last date of professional service to the HVAC system?</MintParagraph>
                            <StyledInput type="date"
                                max={currentDate.format('YYYY-MM-DD')}
                                value={selectedHvacLastServiced}
                                onChange={(e) => setSelectedHvacLastServiced(e.target.value)}
                                required
                            />
                        </>
                    </>
                )
            }

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>2.  Does the Property utilize a Heating system(s)?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasHeatingSystemIndex} onSelection={(index) => { if (index != 0) { setSelectedHeatingInstalled(heatingInstalledDate); setSelectedHeatingLastServiced(heatingLastServicedDate); setSelectedHeatingNeedsRepairIndex(-1); } setSelectedHasHeatingSystemIndex(index) }} />
            {selectedHasHeatingSystemIndex == 0 &&
                (
                    <>
                        <>
                            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Is the Heating System in need of repaire?</MintParagraph>
                            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHeatingNeedsRepairIndex} onSelection={(index) => { setSelectedHeatingNeedsRepairIndex(index) }} />
                        </>
                        <>
                            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>When was the system installed?</MintParagraph>
                            <StyledInput type="date"
                                max={currentDate.format('YYYY-MM-DD')}
                                value={selectedHeatingInstalled}
                                onChange={(e) => setSelectedHeatingInstalled(e.target.value)}
                                required
                            />
                        </>
                        <>
                            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>When was the last date of professional service to the Heating system?</MintParagraph>
                            <StyledInput type="date"
                                max={currentDate.format('YYYY-MM-DD')}
                                value={selectedHeatingLastServiced}
                                onChange={(e) => setSelectedHeatingLastServiced(e.target.value)}
                                required
                            />
                        </>
                    </>
                )
            }

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>3.  If the Property contains a fireplace(s), are the fireplace(s) undamaged and in working order?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedFireplaceFunctioningIndex} onSelection={(index) => { if (index != 0) { setSelectedFireplaceLastServiced(fireplaceLastServicedServicedDate); } setSelectedFireplaceFunctioningIndex(index) }} />
            {selectedFireplaceFunctioningIndex == 0 &&
                (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>When was the last date of professional service to the fireplace(s) and chimney(s)?</MintParagraph>
                        <StyledInput type="date"
                            max={currentDate.format('YYYY-MM-DD')}
                            value={selectedFireplaceLastServiced}
                            onChange={(e) => setSelectedFireplaceLastServiced(e.target.value)}
                            required
                        />
                    </>
                )
            }

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>4.  Is there any location within the dwelling space of the home that is not connected to a heating and cooling system?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedPartOfHomeNoHVACIndex} onSelection={(index) => { if (index != 0) { setSelectedPartOfHomeNoHVACDescription(null); } setSelectedPartOfHomeNoHVACIndex(index); }} />
            {selectedPartOfHomeNoHVACIndex == 0 &&
                (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Provide the location</MintParagraph>
                        <StyledInputWithSuperText style={{ marginBottom: '50px' }} label='Provide the location' value={selectedPartOfHomeNoHVACDescription ? selectedPartOfHomeNoHVACDescription : ""} onChange={(e) => setSelectedPartOfHomeNoHVACDescription(e.target.value)} />
                    </>
                )
            }

            <ParagraphStyledInput style={{ marginBottom: '24px' }} label='Provide any additional information (if applicable) that the Seller has knowledge pertaining to the Water/Plumbing/Sewer Systems:' value={selectedHvacExtraInfo ? selectedHvacExtraInfo : ""} onChange={(e) => setSelectedHvacExtraInfo(e.target.value)} />
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

export default SellerDisclosure4;