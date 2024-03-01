import { GetServerSidePropsContext } from 'next';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../../../../src/styles/colors';
import { makeAuthedApiRequest } from '../../../../../src/utils/api/apiHelper';
import OnboardingScreenFrame from '../../../../../src/components/stuff/OnboardingScreenFrame';
import { useRouter } from 'next/router';
import { useDevice } from '../../../../../src/contexts/DeviceContext';
import { H3, H5, MintParagraph } from '../../../../../src/components/Typography/Typography';
import StatusMessage from '../../../../../src/components/stuff/StatusMessage';
import MultipleChoiceParent from '../../../../../src/components/stuff/MultipleChoiceParent';
import ParagraphStyledInput from '../../../../../src/components/boxes/ParagraphStyledInput';
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



const SellerDisclosure8 = (props: { sellerDisclosure: any }) => {
    const router = useRouter();
    const { isMobile } = useDevice();
    const prevStep = '/onboarding/property/part-2/seller-disclosure-7?propertyId=' + props.sellerDisclosure.propertyId;
    const nextStep = '/onboarding/property/part-2/seller-disclosure-9?propertyId=' + props.sellerDisclosure.propertyId;
    const disclosureEnumOptions = [{ text: 'Yes' }, { text: 'No' }, { text: 'Unknown/NA' }];
    const [selectedInfestationDamageIndex, setSelectedInfestationDamageIndex] = useState(-1);
    const [selectedUnderPestControlWarrantyIndex, setSelectedUnderPestControlWarrantyIndex] = useState(-1);
    const [selectedPetsOrAnimalsIndex, setSelectedPetsOrAnimalsIndex] = useState(-1);
    const [selectedDamagedOrDiseasedTreeslIndex, setSelectedDamagedOrDiseasedTreeslIndex] = useState(-1);
    const [selectedPestExtraInfo, setSelectedPestExtraInfo] = useState('');

    const { infestationDamage, underPestControlWarranty, petsOrAnimals, damagedOrDiseasedTrees, pestExtraInfo} = props.sellerDisclosure;

    useEffect(() => {
        if (infestationDamage === null) {
            setSelectedInfestationDamageIndex(-1);
        } else {
            const index = mapModelEnumToIndex(infestationDamage);
            setSelectedInfestationDamageIndex(index !== undefined ? index : -1);
        }

        if (underPestControlWarranty === null) {
            setSelectedUnderPestControlWarrantyIndex(-1);
        } else {
            const index = mapModelEnumToIndex(underPestControlWarranty);
            setSelectedUnderPestControlWarrantyIndex(index !== undefined ? index : -1);
        }

        if (petsOrAnimals === null) {
            setSelectedPetsOrAnimalsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(petsOrAnimals);
            setSelectedPetsOrAnimalsIndex(index !== undefined ? index : -1);
        }

        if (damagedOrDiseasedTrees === null) {
            setSelectedDamagedOrDiseasedTreeslIndex(-1);
        } else {
            const index = mapModelEnumToIndex(damagedOrDiseasedTrees);
            setSelectedDamagedOrDiseasedTreeslIndex(index !== undefined ? index : -1);
        }
        setSelectedPestExtraInfo(pestExtraInfo)


    }, [infestationDamage, underPestControlWarranty, petsOrAnimals, damagedOrDiseasedTrees, pestExtraInfo]);

    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.sellerDisclosure.propertyId,
                updateData: {
                    infestationDamage: mapIndexToModelEnum(selectedInfestationDamageIndex),
                    underPestControlWarranty: mapIndexToModelEnum(selectedUnderPestControlWarrantyIndex),
                    petsOrAnimals: mapIndexToModelEnum(selectedPetsOrAnimalsIndex),
                    damagedOrDiseasedTrees: mapIndexToModelEnum(selectedDamagedOrDiseasedTreeslIndex),
                    pestExtraInfo: selectedPestExtraInfo,
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
                selectedInfestationDamageIndex != -1 &&
                    selectedUnderPestControlWarrantyIndex != -1 &&
                    selectedPetsOrAnimalsIndex != -1 &&
                    selectedDamagedOrDiseasedTreeslIndex != -1
                    ? false : true
            }
        >
            {isMobile ? <H5 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 8</H5> : <H3 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 8</H3>}
            <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>Fill out this information about your home to the best of your ability. It&apos;s ok to not know all the details or exact dates, but this helps you fulfill your legal duty to notify buyers of adverse conditions of the property</MintParagraph>
            </StatusMessage>
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>1.  Has the Property undergone any damage caused by termite, rodent, ants, bees, infiltrating pest, dry rot, wood-boring or other pest damage?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedInfestationDamageIndex} onSelection={(index) => setSelectedInfestationDamageIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>2.  Is the Property currently under warranty with a licensed pest control company?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedUnderPestControlWarrantyIndex} onSelection={(index) => setSelectedUnderPestControlWarrantyIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>3.  Has a pet lived on the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedPetsOrAnimalsIndex} onSelection={(index) => setSelectedPetsOrAnimalsIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>4.  Are there any damaged and/or diseased trees, shrubs, or bushes located on the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedDamagedOrDiseasedTreeslIndex} onSelection={(index) => setSelectedDamagedOrDiseasedTreeslIndex(index)} />
            <ParagraphStyledInput style={{ marginBottom: '24px' }} label='Provide any additional information (if applicable) that the Seller has knowledge pertaining to the Environmental Conditions:' value={selectedPestExtraInfo ? selectedPestExtraInfo : ""} onChange={(e) => setSelectedPestExtraInfo(e.target.value)} />
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

export default SellerDisclosure8;