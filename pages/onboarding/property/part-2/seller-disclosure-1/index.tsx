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
import StyledYearMonthMultiInput from '../../../../../src/components/boxes/StyledYearMonthMultiInput';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export type BasicPropertyDetails = {
    streetAddress: string,
    address2?: string,
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



const SellerDisclosure1 = (props: { sellerDisclosure: any }) => {
    const router = useRouter();
    const currentDate = dayjs();
    const { isMobile } = useDevice();
    const prevStep = '/onboarding/property/part-1/pricing?propertyId=' + props.sellerDisclosure.propertyId;
    const nextStep = '/onboarding/property/part-2/seller-disclosure-2?propertyId=' + props.sellerDisclosure.propertyId;
    const disclosureEnumOptions = [{ text: 'Yes' }, { text: 'No' }, { text: 'Unknown/NA' }];
    const [selectedLegalAuthorityIndex, setSelectedLegalAuthorityIndex] = useState(-1);
    const [selectedIsOccupiedIndex, setSelectedIsOccupiedIndex] = useState(-1);
    const [selectedHasSellerOccupiedIndex, setHasSellerOccupiedIndex] = useState(-1);
    const [selectedIsRentedIndex, setSelectedIsRentedIndex] = useState(-1);
    const [selectedHasHOAIndex, setSelectedHasHOAIndex] = useState(-1);
    const [selectedHasHOAViolationsIndex, setSelectedHasHOAViolationsIndex] = useState(-1);
    const [selectedHasCCAndRsIndex, setSelectedHasCCAndRsIndex] = useState(-1);
    const [selectedIsHistoricIndex, setSelectedIsHistoricIndex] = useState(-1);
    const [selectedHasOtherRestrictionsIndex, setSelectedHasOtherRestrictionsIndex] = useState(-1);
    const [otherRestrictionsText, setOtherRestrictionsText] = useState(null);
    const [selectedHasEncroachmentsOrBoundaryDisputesIndex, setSelectedHasEncroachmentsOrBoundaryDisputesIndex] = useState(-1);
    const [selectedHasEasementsIndex, setSelectedHasEasementsIndex] = useState(-1);
    const [selectedHasZoningCodeViolationsIndex, setSelectedHasZoningCodeViolationsIndex] = useState(-1);
    const [selectedHasDeedRestrictionsIndex, setSelectedHasDeedRestrictionsIndex] = useState(-1);
    const [selectedSellerHasLeinsIndex, setSelectedSellerHasLeinsIndex] = useState(-1);
    const [selectedHasLawsuitsOrLeinsIndex, setSelectedHasLawsuitsOrLeinsIndex] = useState(-1);
    const [selectedHasInsuranceClaimsIndex, setSelectedHasInsuranceClaimsIndex] = useState(-1);
    const [selectedHasGovernmentNoticesIndex, setSelectedHasGovernmentNoticesIndex] = useState(-1);
    const [InsuranceClaimsText, setInsuranceClaimsText] = useState(null);
    const [selectedIsAgriculturalIndex, setSelectedIsAgriculturalIndex] = useState(-1);
    const [selectedHasKnownAdverseTitleConditionsIndex, setSelectedHasKnownAdverseTitleConditionsIndex] = useState(-1);
    const [selectedAdverseTitleConditionsText, setSelectedAdverseTitleConditionsText] = useState(null);
    const [yearsOwned, setYearsOwned] = useState(props.sellerDisclosure.yearsOwned);
    const [monthsOwned, setMonthsOwned] = useState(props.sellerDisclosure.monthsOwned);
    const leaseDate = props.sellerDisclosure.leaseExpiration
        ? dayjs.utc(props.sellerDisclosure.leaseExpiration, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD')
        : currentDate.format('YYYY-MM-DD');
    const [leaseExpiration, setLeaseExpiration] = useState(leaseDate);

    const { legalAuthority, isOccupied, hasSellerOccupied, isRented, hasHOA, hasHOAViolations, hasCCAndRs, isHistoric, hasOtherRestrictions, hasEncroachmentsOrBoundaryDisputes, hasEasements, hasZoningCodeViolations, hasDeedRestrictions, sellerHasLeins, hasLawsuitsOrLeins, hasInsuranceClaims, hasGovernmentNotices, isAgricultural, hasKnownAdverseTitleConditions } = props.sellerDisclosure;

    useEffect(() => {
        if (legalAuthority === null) {
            setSelectedLegalAuthorityIndex(-1);
        } else {
            const index = mapModelEnumToIndex(legalAuthority);
            setSelectedLegalAuthorityIndex(index !== undefined ? index : -1);
        }

        if (isOccupied === null) {
            setSelectedIsOccupiedIndex(-1);
        } else {
            const index = mapModelEnumToIndex(isOccupied);
            setSelectedIsOccupiedIndex(index !== undefined ? index : -1);
        }

        if (hasSellerOccupied === null) {
            setHasSellerOccupiedIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasSellerOccupied);
            setHasSellerOccupiedIndex(index !== undefined ? index : -1);
        }

        if (isRented === null) {
            setSelectedIsRentedIndex(-1);
        } else {
            const index = mapModelEnumToIndex(isRented);
            setSelectedIsRentedIndex(index !== undefined ? index : -1);
        }

        if (hasHOA === null) {
            setSelectedHasHOAIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasHOA);
            setSelectedHasHOAIndex(index !== undefined ? index : -1);
        }

        if (hasHOAViolations === null) {
            setSelectedHasHOAViolationsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasHOAViolations);
            setSelectedHasHOAViolationsIndex(index !== undefined ? index : -1);
        }

        if (hasCCAndRs === null) {
            setSelectedHasCCAndRsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasCCAndRs);
            setSelectedHasCCAndRsIndex(index !== undefined ? index : -1);
        }

        if (isHistoric === null) {
            setSelectedIsHistoricIndex(-1);
        } else {
            const index = mapModelEnumToIndex(isHistoric);
            setSelectedIsHistoricIndex(index !== undefined ? index : -1);
        }

        if (hasOtherRestrictions === null) {
            setSelectedHasOtherRestrictionsIndex(-1);
            setOtherRestrictionsText(null)
        } else {
            const index = mapModelEnumToIndex(hasOtherRestrictions);
            setSelectedHasOtherRestrictionsIndex(index !== undefined ? index : -1);
        }

        setOtherRestrictionsText(props.sellerDisclosure.otherRestrictionsText);

        if (hasEncroachmentsOrBoundaryDisputes === null) {
            setSelectedHasEncroachmentsOrBoundaryDisputesIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasEncroachmentsOrBoundaryDisputes);
            setSelectedHasEncroachmentsOrBoundaryDisputesIndex(index !== undefined ? index : -1);
        }

        if (hasEasements === null) {
            setSelectedHasEasementsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasEasements);
            setSelectedHasEasementsIndex(index !== undefined ? index : -1);
        }

        if (hasZoningCodeViolations === null) {
            setSelectedHasZoningCodeViolationsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasZoningCodeViolations);
            setSelectedHasZoningCodeViolationsIndex(index !== undefined ? index : -1);
        }

        if (hasDeedRestrictions === null) {
            setSelectedHasDeedRestrictionsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasDeedRestrictions);
            setSelectedHasDeedRestrictionsIndex(index !== undefined ? index : -1);
        }

        if (sellerHasLeins === null) {
            setSelectedSellerHasLeinsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(sellerHasLeins);
            setSelectedSellerHasLeinsIndex(index !== undefined ? index : -1);
        }

        if (hasLawsuitsOrLeins === null) {
            setSelectedHasLawsuitsOrLeinsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasLawsuitsOrLeins);
            setSelectedHasLawsuitsOrLeinsIndex(index !== undefined ? index : -1);
        }

        if (hasInsuranceClaims === null) {
            setSelectedHasInsuranceClaimsIndex(-1);
            setInsuranceClaimsText(null)
        } else {
            const index = mapModelEnumToIndex(hasInsuranceClaims);
            setSelectedHasInsuranceClaimsIndex(index !== undefined ? index : -1);
        }

        setInsuranceClaimsText(props.sellerDisclosure.insuranceClaimsText);

        if (hasGovernmentNotices === null) {
            setSelectedHasGovernmentNoticesIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasGovernmentNotices);
            setSelectedHasGovernmentNoticesIndex(index !== undefined ? index : -1);
        }

        if (isAgricultural === null) {
            setSelectedIsAgriculturalIndex(-1);
        } else {
            const index = mapModelEnumToIndex(isAgricultural);
            setSelectedIsAgriculturalIndex(index !== undefined ? index : -1);
        }

        if (hasKnownAdverseTitleConditions === null) {
            setSelectedHasKnownAdverseTitleConditionsIndex(-1);
            setSelectedAdverseTitleConditionsText(null)
        } else {
            const index = mapModelEnumToIndex(hasKnownAdverseTitleConditions);
            setSelectedHasKnownAdverseTitleConditionsIndex(index !== undefined ? index : -1);
        }

        setSelectedAdverseTitleConditionsText(props.sellerDisclosure.adverseTitleConditionsText);

    }, [legalAuthority, isOccupied, hasSellerOccupied, isRented, hasHOA, hasHOAViolations, hasCCAndRs, isHistoric, hasOtherRestrictions, props.sellerDisclosure.otherRestrictionsText, hasEncroachmentsOrBoundaryDisputes, props.sellerDisclosure.insuranceClaimsText, hasEasements, hasZoningCodeViolations, hasDeedRestrictions, sellerHasLeins, hasLawsuitsOrLeins, hasInsuranceClaims, hasGovernmentNotices, isAgricultural, hasKnownAdverseTitleConditions, props.sellerDisclosure.adverseTitleConditionsText]);

    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.sellerDisclosure.propertyId,
                updateData: {
                    legalAuthority: mapIndexToModelEnum(selectedLegalAuthorityIndex),
                    isOccupied: mapIndexToModelEnum(selectedIsOccupiedIndex),
                    hasSellerOccupied: mapIndexToModelEnum(selectedHasSellerOccupiedIndex),
                    isRented: mapIndexToModelEnum(selectedIsRentedIndex),
                    hasHOA: mapIndexToModelEnum(selectedHasHOAIndex),
                    hasHOAViolations: mapIndexToModelEnum(selectedHasHOAViolationsIndex),
                    hasCCAndRs: mapIndexToModelEnum(selectedHasCCAndRsIndex),
                    isHistoric: mapIndexToModelEnum(selectedIsHistoricIndex),
                    hasOtherRestrictions: mapIndexToModelEnum(selectedHasOtherRestrictionsIndex),
                    otherRestrictionsText: otherRestrictionsText,
                    hasEncroachmentsOrBoundaryDisputes: mapIndexToModelEnum(selectedHasEncroachmentsOrBoundaryDisputesIndex),
                    hasEasements: mapIndexToModelEnum(selectedHasEasementsIndex),
                    hasZoningCodeViolations: mapIndexToModelEnum(selectedHasZoningCodeViolationsIndex),
                    hasDeedRestrictions: mapIndexToModelEnum(selectedHasDeedRestrictionsIndex),
                    sellerHasLeins: mapIndexToModelEnum(selectedSellerHasLeinsIndex),
                    hasLawsuitsOrLeins: mapIndexToModelEnum(selectedHasLawsuitsOrLeinsIndex),
                    hasInsuranceClaims: mapIndexToModelEnum(selectedHasInsuranceClaimsIndex),
                    insuranceClaimsText: InsuranceClaimsText,
                    hasGovernmentNotices: mapIndexToModelEnum(selectedHasGovernmentNoticesIndex),
                    isAgricultural: mapIndexToModelEnum(selectedIsAgriculturalIndex),
                    hasKnownAdverseTitleConditions: mapIndexToModelEnum(selectedHasKnownAdverseTitleConditionsIndex),
                    adverseTitleConditionsText: selectedAdverseTitleConditionsText,
                    yearsOwned: !!yearsOwned ? yearsOwned : 0,
                    monthsOwned: !!monthsOwned ? monthsOwned : 0,
                    leaseExpiration: isRented == 0 ? dayjs(leaseExpiration).format('YYYY-MM-DD') : null
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
                selectedLegalAuthorityIndex != -1 &&
                    selectedIsOccupiedIndex != -1 &&
                    selectedHasSellerOccupiedIndex != -1 &&
                    selectedIsRentedIndex != -1 &&
                    selectedHasHOAIndex != -1 &&
                    selectedHasHOAViolationsIndex != -1 &&
                    selectedHasCCAndRsIndex != -1 &&
                    selectedIsHistoricIndex != -1 &&
                    selectedHasOtherRestrictionsIndex != -1 &&
                    selectedHasEncroachmentsOrBoundaryDisputesIndex != -1 &&
                    selectedHasEasementsIndex != -1 &&
                    selectedHasZoningCodeViolationsIndex != -1 &&
                    selectedHasDeedRestrictionsIndex != -1 &&
                    selectedSellerHasLeinsIndex != -1 &&
                    selectedHasLawsuitsOrLeinsIndex != -1 &&
                    selectedHasInsuranceClaimsIndex != -1 &&
                    selectedHasGovernmentNoticesIndex != -1 &&
                    selectedIsAgriculturalIndex != -1 &&
                    selectedHasKnownAdverseTitleConditionsIndex != -1 &&
                    (yearsOwned || monthsOwned) 
                    ? false : true
            }
        >
            {isMobile ? <H5 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 1</H5> : <H3 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 1</H3>}
            <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>Fill out this information about your home to the best of your ability. It&apos;s ok to not know all the details or exact dates, but this helps you fulfill your legal duty to notify buyers of adverse conditions of the property. Reach out to a housewell advisor if you have questions.</MintParagraph>
            </StatusMessage>
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>1. Do you have legal authority to sell this property</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedLegalAuthorityIndex} onSelection={(index) => setSelectedLegalAuthorityIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>2. Years and months have you owned this property</MintParagraph>
            <StyledYearMonthMultiInput allowOnlyNumbers setFirstValue={setYearsOwned} firstValue={yearsOwned} firstPlaceholder='0' setSecondValue={setMonthsOwned} secondValue={monthsOwned} secondPlaceholder='0' isSmall={isMobile}></StyledYearMonthMultiInput>
            <MintParagraph size='24' weight='regular' style={{ marginTop: '60px', marginBottom: '24px' }}>3. Is the Property currently occupied?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedIsOccupiedIndex} onSelection={(index) => setSelectedIsOccupiedIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>4. Has Seller ever occupied the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasSellerOccupiedIndex} onSelection={(index) => setHasSellerOccupiedIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>5. Is any part of the Property currently under Lease Agreement?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedIsRentedIndex} onSelection={(index) => { if (index != 0) { setLeaseExpiration(leaseDate); } setSelectedIsRentedIndex(index); }} />
            {selectedIsRentedIndex == 0 &&
                (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>6. When does the lease expire?</MintParagraph>
                        <StyledInput type="date"
                            min={currentDate.format('YYYY-MM-DD')}
                            value={leaseExpiration}
                            onChange={(e) => setLeaseExpiration(e.target.value)}
                            required
                        />
                    </>
                )
            }
            <MintParagraph size='24' weight='regular' style={{ marginTop: '60px', marginBottom: '24px' }}>7. Is ownership of the Property subjected to any condominium, homeowners, or other types of association which has authority over the real property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasHOAIndex} onSelection={(index) => setSelectedHasHOAIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>8. If answering yes to question 7, has the association assessed any violations against the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasHOAViolationsIndex} onSelection={(index) => setSelectedHasHOAViolationsIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>9. Is ownership of the Property subjected to recorded Declarations of Covenants, Conditions and Restrictions(“CC&Rs”)?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasCCAndRsIndex} onSelection={(index) => setSelectedHasCCAndRsIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>10. Is the Property a Historic Dwelling or located in a Historic District?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedIsHistoricIndex} onSelection={(index) => setSelectedIsHistoricIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>11. Is ownership of the Property subjected to any other types of Restrictions?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasOtherRestrictionsIndex} onSelection={(index) => { if (index != 0) { setOtherRestrictionsText(null) } setSelectedHasOtherRestrictionsIndex(index) }} />
            {selectedHasOtherRestrictionsIndex == 0 && (
                <>
                    <StyledInputWithSuperText label='If yes, then please provide a summary of the restrictions' value={otherRestrictionsText ? otherRestrictionsText : ""} onChange={(e) => setOtherRestrictionsText(e.target.value)} />
                </>
            )}
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>12. Are there any encroachments, boundary disputes, and/or boundary agreements?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasEncroachmentsOrBoundaryDisputesIndex} onSelection={(index) => setSelectedHasEncroachmentsOrBoundaryDisputesIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>13. Are there any easements (excluding utility easements) on the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasEasementsIndex} onSelection={(index) => setSelectedHasEasementsIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>14. Are there any zoning, building codes, non-conforming use, or “setback” violations?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasZoningCodeViolationsIndex} onSelection={(index) => setSelectedHasZoningCodeViolationsIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>15. Are there any recorded deed restrictions that affect usage of the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasDeedRestrictionsIndex} onSelection={(index) => setSelectedHasDeedRestrictionsIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>16. Are there any liens or unsatisfied judgments against Seller or the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedSellerHasLeinsIndex} onSelection={(index) => setSelectedSellerHasLeinsIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>17. Are there currently or have there ever been any lawsuits, liens, or settlement agreements with regards to the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasLawsuitsOrLeinsIndex} onSelection={(index) => setSelectedHasLawsuitsOrLeinsIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>18. Has there been any insurance claims filed on behalf of the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasInsuranceClaimsIndex} onSelection={(index) => { if (index != 0) { setInsuranceClaimsText(null) } setSelectedHasInsuranceClaimsIndex(index) }} />
            {selectedHasInsuranceClaimsIndex == 0 && (
                <>
                    <StyledInputWithSuperText label='If yes, please provide a summary of the insurance claims including any relevant dates' value={InsuranceClaimsText ? InsuranceClaimsText : ""} onChange={(e) => setInsuranceClaimsText(e.target.value)} />
                </>
            )}
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>19. Are there any notice(s) from the Government, State, City or County that in any way affects the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasGovernmentNoticesIndex} onSelection={(index) => setSelectedHasGovernmentNoticesIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>20. Is the Property located near agricultural or forestry land, or identify as agricultural or forestry usage?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedIsAgriculturalIndex} onSelection={(index) => setSelectedIsAgriculturalIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>21. Are there any other known adverse title conditions that affect the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasKnownAdverseTitleConditionsIndex} onSelection={(index) => { if (index != 0) { setSelectedAdverseTitleConditionsText(null) } setSelectedHasKnownAdverseTitleConditionsIndex(index) }} />
            <ParagraphStyledInput style={{ marginBottom: '24px' }} label='Provide any additional information (if applicable) that the Seller has knowledge pertaining to the above questions:' value={selectedAdverseTitleConditionsText ? selectedAdverseTitleConditionsText : ""} onChange={(e) => setSelectedAdverseTitleConditionsText(e.target.value)} />
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

export default SellerDisclosure1;