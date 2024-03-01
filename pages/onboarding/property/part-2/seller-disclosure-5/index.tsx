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



const SellerDisclosure5 = (props: { sellerDisclosure: any }) => {
    const router = useRouter();
    const currentDate = dayjs();
    const { isMobile } = useDevice();
    const prevStep = '/onboarding/property/part-2/seller-disclosure-4?propertyId=' + props.sellerDisclosure.propertyId;
    const nextStep = '/onboarding/property/part-2/seller-disclosure-6?propertyId=' + props.sellerDisclosure.propertyId;
    const disclosureEnumOptions = [{ text: 'Yes' }, { text: 'No' }, { text: 'Unknown/NA' }];
    const [selectedHasPublicSewerIndex, setSelectedHasPublicSewerIndex] = useState(-1);
    const [selectedPublicSewerFunctionalIndex, setSelectedPublicSewerFunctionalIndex] = useState(-1);
    const [selectedHasSepticSystemIndex, setSelectedHasSepticSystemIndex] = useState(-1);
    const [selectedSepticSystemFunctionalIndex, setSelectedSepticSystemFunctionalIndex] = useState(-1);
    const [selectedSepticSystemMeetsMinRequirementsIndex, setSelectedSepticSystemMeetsMinRequirementsIndex] = useState(-1);
    const [selectedHasPrivateSewerIndex, setSelectedHasPrivateSewerIndex] = useState(-1);
    const [selectedPrivateSewerFunctionalIndex, setSelectedPrivateSewerFunctionalIndex] = useState(-1);
    const [selectedHasPumpSumpIndex, setSelectedHasPumpSumpIndex] = useState(-1);
    const [selectedPumpSumpDischarge, setSelectedPumpSumpDischarge] = useState<any>(null);
    const [selectedImprovementsWithPermitsIndex, setSelectedImprovementsWithPermitsIndex] = useState(-1);
    const [selectedPlumbingIssuesIndex, setSelectedPlumbingIssuesIndex] = useState(-1);
    const [selectedConcealedDefectsIndex, setSelectedConcealedDefectsIndex] = useState(-1);
    const [selectedWellSystemIndex, setSelectedWellSystemIndex] = useState(-1);
    const [selectedWellSystemNeedsReparIndex, setSelectedWellSystemNeedsReparIndex] = useState(-1);
    const [selectedNotifiedOfWellWaterIssuesIndex, setSelectedNotifiedOfWellWaterIssuesIndex] = useState(-1);
    const [selectedWaterHeaterFunctionalIndex, setSelectedWaterHeaterFunctionalIndex] = useState(-1);
    const [selectedSewerLineIssuesIndex, setSelectedSewerLineIssuesIndex] = useState(-1);
    const [selectedWaterLinesFrozenOrDamagedIndex, setSelectedWaterLinesFrozenOrDamagedIndex] = useState(-1);
    const [selectedInstalledSprinklerSystemIndex, setSelectedInstalledSprinklerSystemIndex] = useState(-1);
    const [selectedSprinklerSystemNeedsRepairIndex, setSelectedSprinklerSystemNeedsRepairIndex] = useState(-1);
    const [selectedPropertyContainsPolybutylenePipingIndex, setSelectedPropertyContainsPolybutylenePipingIndex] = useState(-1);
    const [selectedAdditionalPlumbingInfo, setSelectedAdditionalPlumbingInfo] = useState<any>(null);

    const { hasPublicSewer, improvementsWithPermits, publicSewerFunctional, hasSepticSystem, septicSystemFunctional, septicSystemMeetsMinRequirements, septicSystemLastServiced, hasPrivateSewer, privateSewerFunctional, hasPumpSump, pumpSumpDischarge, plumbingIssues, concealedDefects, wellSystem, wellSystemNeedsRepar, wellSystemWaterLastTested, notifiedOfWellWaterIssues, waterHeaterFunctional, waterHeaterInstalled, sewerLineIssues, waterLinesFrozenOrDamaged, installedSprinklerSystem, sprinklerSystemNeedsRepair, propertyContainsPolybutylenePiping, additionalPlumbingInfo } = props.sellerDisclosure;

    const septicSystemLastServicedDate = septicSystemLastServiced
        ? dayjs.utc(septicSystemLastServiced, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD')
        : currentDate.format('YYYY-MM-DD');
    const [selectedSepticSystemLastServiced, setSelectedSepticSystemLastServiced] = useState(septicSystemLastServicedDate);

    const wellSystemWaterLastTestedDate = wellSystemWaterLastTested
        ? dayjs.utc(wellSystemWaterLastTested, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD')
        : currentDate.format('YYYY-MM-DD');
    const [selectedWellSystemWaterLastTested, setSelectedWellSystemWaterLastTested] = useState(wellSystemWaterLastTestedDate);

    const waterHeaterInstalledDate = waterHeaterInstalled
        ? dayjs.utc(waterHeaterInstalled, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD')
        : currentDate.format('YYYY-MM-DD');
    const [selectedWaterHeaterInstalled, setSelectedWaterHeaterInstalled] = useState(waterHeaterInstalledDate);

    useEffect(() => {
        if (hasPublicSewer === null) {
            setSelectedHasPublicSewerIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasPublicSewer);
            setSelectedHasPublicSewerIndex(index !== undefined ? index : -1);
        }

        if (publicSewerFunctional === null) {
            setSelectedPublicSewerFunctionalIndex(-1);
        } else {
            const index = mapModelEnumToIndex(publicSewerFunctional);
            setSelectedPublicSewerFunctionalIndex(index !== undefined ? index : -1);
        }

        if (improvementsWithPermits === null) {
            setSelectedImprovementsWithPermitsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(improvementsWithPermits);
            setSelectedImprovementsWithPermitsIndex(index !== undefined ? index : -1);
        }

        if (hasSepticSystem === null) {
            setSelectedHasSepticSystemIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasSepticSystem);
            setSelectedHasSepticSystemIndex(index !== undefined ? index : -1);
        }

        if (septicSystemFunctional === null) {
            setSelectedSepticSystemFunctionalIndex(-1);
        } else {
            const index = mapModelEnumToIndex(septicSystemFunctional);
            setSelectedSepticSystemFunctionalIndex(index !== undefined ? index : -1);
        }

        if (septicSystemMeetsMinRequirements === null) {
            setSelectedSepticSystemMeetsMinRequirementsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(septicSystemMeetsMinRequirements);
            setSelectedSepticSystemMeetsMinRequirementsIndex(index !== undefined ? index : -1);
        }

        if (hasPrivateSewer === null) {
            setSelectedHasPrivateSewerIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasPrivateSewer);
            setSelectedHasPrivateSewerIndex(index !== undefined ? index : -1);
        }

        if (privateSewerFunctional === null) {
            setSelectedPrivateSewerFunctionalIndex(-1);
        } else {
            const index = mapModelEnumToIndex(privateSewerFunctional);
            setSelectedPrivateSewerFunctionalIndex(index !== undefined ? index : -1);
        }

        if (hasPumpSump === null) {
            setSelectedHasPumpSumpIndex(-1);
        } else {
            const index = mapModelEnumToIndex(hasPumpSump);
            setSelectedHasPumpSumpIndex(index !== undefined ? index : -1);
        }

        setSelectedPumpSumpDischarge(pumpSumpDischarge);

        if (plumbingIssues === null) {
            setSelectedPlumbingIssuesIndex(-1);
        } else {
            const index = mapModelEnumToIndex(plumbingIssues);
            setSelectedPlumbingIssuesIndex(index !== undefined ? index : -1);
        }

        if (concealedDefects === null) {
            setSelectedConcealedDefectsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(concealedDefects);
            setSelectedConcealedDefectsIndex(index !== undefined ? index : -1);
        }

        if (wellSystem === null) {
            setSelectedWellSystemIndex(-1);
        } else {
            const index = mapModelEnumToIndex(wellSystem);
            setSelectedWellSystemIndex(index !== undefined ? index : -1);
        }

        if (wellSystemNeedsRepar === null) {
            setSelectedWellSystemNeedsReparIndex(-1);
        } else {
            const index = mapModelEnumToIndex(wellSystemNeedsRepar);
            setSelectedWellSystemNeedsReparIndex(index !== undefined ? index : -1);
        }

        if (notifiedOfWellWaterIssues === null) {
            setSelectedNotifiedOfWellWaterIssuesIndex(-1);
        } else {
            const index = mapModelEnumToIndex(notifiedOfWellWaterIssues);
            setSelectedNotifiedOfWellWaterIssuesIndex(index !== undefined ? index : -1);
        }

        if (waterHeaterFunctional === null) {
            setSelectedWaterHeaterFunctionalIndex(-1);
        } else {
            const index = mapModelEnumToIndex(waterHeaterFunctional);
            setSelectedWaterHeaterFunctionalIndex(index !== undefined ? index : -1);
        }

        if (sewerLineIssues === null) {
            setSelectedSewerLineIssuesIndex(-1);
        } else {
            const index = mapModelEnumToIndex(sewerLineIssues);
            setSelectedSewerLineIssuesIndex(index !== undefined ? index : -1);
        }

        if (waterLinesFrozenOrDamaged === null) {
            setSelectedWaterLinesFrozenOrDamagedIndex(-1);
        } else {
            const index = mapModelEnumToIndex(waterLinesFrozenOrDamaged);
            setSelectedWaterLinesFrozenOrDamagedIndex(index !== undefined ? index : -1);
        }

        if (installedSprinklerSystem === null) {
            setSelectedInstalledSprinklerSystemIndex(-1);
        } else {
            const index = mapModelEnumToIndex(installedSprinklerSystem);
            setSelectedInstalledSprinklerSystemIndex(index !== undefined ? index : -1);
        }

        if (sprinklerSystemNeedsRepair === null) {
            setSelectedSprinklerSystemNeedsRepairIndex(-1);
        } else {
            const index = mapModelEnumToIndex(sprinklerSystemNeedsRepair);
            setSelectedSprinklerSystemNeedsRepairIndex(index !== undefined ? index : -1);
        }

        if (propertyContainsPolybutylenePiping === null) {
            setSelectedPropertyContainsPolybutylenePipingIndex(-1);
        } else {
            const index = mapModelEnumToIndex(propertyContainsPolybutylenePiping);
            setSelectedPropertyContainsPolybutylenePipingIndex(index !== undefined ? index : -1);
        }

        setSelectedAdditionalPlumbingInfo(additionalPlumbingInfo)
    }, [hasPublicSewer, improvementsWithPermits, publicSewerFunctional, hasSepticSystem, septicSystemFunctional, septicSystemMeetsMinRequirements, hasPrivateSewer, privateSewerFunctional, hasPumpSump, pumpSumpDischarge, plumbingIssues, wellSystem, concealedDefects, wellSystemNeedsRepar, notifiedOfWellWaterIssues, waterHeaterFunctional, sewerLineIssues, waterLinesFrozenOrDamaged, installedSprinklerSystem, sprinklerSystemNeedsRepair, propertyContainsPolybutylenePiping, additionalPlumbingInfo]);

    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.sellerDisclosure.propertyId,
                updateData: {
                    hasPublicSewer: mapIndexToModelEnum(selectedHasPublicSewerIndex),
                    publicSewerFunctional: mapIndexToModelEnum(selectedPublicSewerFunctionalIndex),
                    hasSepticSystem: mapIndexToModelEnum(selectedHasSepticSystemIndex),
                    septicSystemFunctional: mapIndexToModelEnum(selectedSepticSystemFunctionalIndex),
                    septicSystemMeetsMinRequirements: mapIndexToModelEnum(selectedSepticSystemMeetsMinRequirementsIndex),
                    septicSystemLastServiced: selectedHasSepticSystemIndex == 0 ? dayjs(selectedSepticSystemLastServiced).format('YYYY-MM-DD') : null,
                    hasPrivateSewer: mapIndexToModelEnum(selectedHasPrivateSewerIndex),
                    privateSewerFunctional: mapIndexToModelEnum(selectedPrivateSewerFunctionalIndex),
                    hasPumpSump: mapIndexToModelEnum(selectedHasPumpSumpIndex),
                    pumpSumpDischarge: selectedPumpSumpDischarge,
                    plumbingIssues: mapIndexToModelEnum(selectedPlumbingIssuesIndex),
                    concealedDefects: mapIndexToModelEnum(selectedConcealedDefectsIndex),
                    improvementsWithPermits: mapIndexToModelEnum(selectedImprovementsWithPermitsIndex),
                    wellSystem: mapIndexToModelEnum(selectedWellSystemIndex),
                    wellSystemNeedsRepar: mapIndexToModelEnum(selectedWellSystemNeedsReparIndex),
                    wellSystemWaterLastTested: selectedWellSystemIndex == 0 ? dayjs(selectedWellSystemWaterLastTested).format('YYYY-MM-DD') : null,
                    notifiedOfWellWaterIssues: mapIndexToModelEnum(selectedNotifiedOfWellWaterIssuesIndex),
                    waterHeaterFunctional: mapIndexToModelEnum(selectedWaterHeaterFunctionalIndex),
                    waterHeaterInstalled: selectedWaterHeaterFunctionalIndex == 0 ? dayjs(selectedWaterHeaterInstalled).format('YYYY-MM-DD') : null,
                    sewerLineIssues: mapIndexToModelEnum(selectedSewerLineIssuesIndex),
                    waterLinesFrozenOrDamaged: mapIndexToModelEnum(selectedWaterLinesFrozenOrDamagedIndex),
                    installedSprinklerSystem: mapIndexToModelEnum(selectedInstalledSprinklerSystemIndex),
                    sprinklerSystemNeedsRepair: mapIndexToModelEnum(selectedSprinklerSystemNeedsRepairIndex),
                    propertyContainsPolybutylenePiping: mapIndexToModelEnum(selectedPropertyContainsPolybutylenePipingIndex),
                    additionalPlumbingInfo: selectedAdditionalPlumbingInfo
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
                selectedHasPublicSewerIndex != -1 &&
                    selectedHasSepticSystemIndex != -1 &&
                    selectedHasPrivateSewerIndex != -1 &&
                    selectedHasPumpSumpIndex != -1 &&
                    selectedImprovementsWithPermitsIndex != -1 &&
                    selectedConcealedDefectsIndex != -1 &&
                    selectedPlumbingIssuesIndex != -1 &&
                    selectedWellSystemIndex != -1 &&
                    selectedWaterHeaterFunctionalIndex != -1 &&
                    selectedSewerLineIssuesIndex != -1 &&
                    selectedWaterLinesFrozenOrDamagedIndex != -1 &&
                    selectedInstalledSprinklerSystemIndex != -1 &&
                    selectedPropertyContainsPolybutylenePipingIndex != -1
                    ? false : true
            }
        >
            {isMobile ? <H5 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 5</H5> : <H3 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 5</H3>}
            <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>Fill out this information about your home to the best of your ability. It&apos;s ok to not know all the details or exact dates, but this helps you fulfill your legal duty to notify buyers of adverse conditions of the property</MintParagraph>
            </StatusMessage>
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>1.  Is the Property on a Public sewer system?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasPublicSewerIndex} onSelection={(index) => { if (index != 0) { setSelectedPublicSewerFunctionalIndex(-1); } setSelectedHasPublicSewerIndex(index) }} />
            {selectedHasPublicSewerIndex == 0 &&
                (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Is the Public sewer system currently operational?</MintParagraph>
                        <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedPublicSewerFunctionalIndex} onSelection={(index) => setSelectedPublicSewerFunctionalIndex(index)} />
                    </>

                )
            }

            <MintParagraph size='24' weight='regular' style={{ marginTop: '28px' }}>2.  Is the Property on a Septic sewer system?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasSepticSystemIndex} onSelection={(index) => { if (index != 0) { setSelectedSepticSystemFunctionalIndex(-1); setSelectedSepticSystemMeetsMinRequirementsIndex(-1); setSelectedSepticSystemLastServiced(septicSystemLastServicedDate); } setSelectedHasSepticSystemIndex(index) }} />
            {selectedHasSepticSystemIndex == 0 &&
                (
                    <>
                        <>
                            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Is the Septic sewer system operational?</MintParagraph>
                            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedSepticSystemFunctionalIndex} onSelection={(index) => setSelectedSepticSystemFunctionalIndex(index)} />
                        </>
                        <>
                            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Does the Septic tank size and dimension meet government requirements for waste disposal to properly service the Property?</MintParagraph>
                            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedSepticSystemMeetsMinRequirementsIndex} onSelection={(index) => setSelectedSepticSystemMeetsMinRequirementsIndex(index)} />
                        </>
                        <>
                            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>When was the last date of professional service to the Septic system?</MintParagraph>
                            <StyledInput type="date"
                                max={currentDate.format('YYYY-MM-DD')}
                                value={selectedSepticSystemLastServiced}
                                onChange={(e) => setSelectedSepticSystemLastServiced(e.target.value)}
                                required
                            />
                        </>
                    </>
                )
            }

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>3.  Is the Property on a private non-public sewer system?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasPrivateSewerIndex} onSelection={(index) => { if (index != 0) { setSelectedPrivateSewerFunctionalIndex(-1); } setSelectedHasPrivateSewerIndex(index) }} />
            {selectedHasPrivateSewerIndex == 0 &&
                (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Is the private sewer system operational?</MintParagraph>
                        <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedPrivateSewerFunctionalIndex} onSelection={(index) => setSelectedPrivateSewerFunctionalIndex(index)} />
                    </>
                )
            }

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>4.  Is there a sump pump in the dwelling?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedHasPumpSumpIndex} onSelection={(index) => { if (index != 0) { setSelectedPumpSumpDischarge(null); } setSelectedHasPumpSumpIndex(index) }} />
            {selectedHasPumpSumpIndex == 0 &&
                (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Where does the sump pump discharge to</MintParagraph>
                        <StyledInputWithSuperText style={{ marginBottom: '50px' }} label='Provide the location' value={selectedPumpSumpDischarge ? selectedPumpSumpDischarge : ""} onChange={(e) => setSelectedPumpSumpDischarge(e.target.value)} />
                    </>
                )
            }

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>5.  Were improvements and/or repairs to the Property performed with all necessary permits and approvals in compliance with building codes and zoning regulations?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedImprovementsWithPermitsIndex} onSelection={(index) => setSelectedImprovementsWithPermitsIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>6.  Are there any concealed or hidden defect(s) that has not been disclosed?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedConcealedDefectsIndex} onSelection={(index) => setSelectedConcealedDefectsIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>7.  Are there any past or present leaks, backups, low pressure water flow, or other concerns with the Property sewer or plumbing system?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedPlumbingIssuesIndex} onSelection={(index) => setSelectedPlumbingIssuesIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>8.  Does the Property utilize a Well system for its indoor water source?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedWellSystemIndex} onSelection={(index) => { if (index != 0) { setSelectedWellSystemNeedsReparIndex(-1); setSelectedWellSystemWaterLastTested(wellSystemWaterLastTestedDate); setSelectedNotifiedOfWellWaterIssuesIndex(-1); } setSelectedWellSystemIndex(index) }} />
            {selectedWellSystemIndex == 0 &&
                (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Is the Well system in need of repare?</MintParagraph>
                        <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedWellSystemNeedsReparIndex} onSelection={(index) => setSelectedWellSystemNeedsReparIndex(index)} />
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>When was the laste date of the well sytem water test?</MintParagraph>
                        <StyledInput type="date"
                            max={currentDate.format('YYYY-MM-DD')}
                            value={selectedWellSystemWaterLastTested}
                            onChange={(e) => setSelectedWellSystemWaterLastTested(e.target.value)}
                            required
                        />
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Have you ever been notified that the well water on the Property is unsafe to drink?</MintParagraph>
                        <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedNotifiedOfWellWaterIssuesIndex} onSelection={(index) => setSelectedNotifiedOfWellWaterIssuesIndex(index)} />
                    </>
                )
            }

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>9.  Are the Water Heater(s) in good working order and free from leakage?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedWaterHeaterFunctionalIndex} onSelection={(index) => { if (index != 0) { setSelectedWaterHeaterInstalled(waterHeaterInstalledDate); } setSelectedWaterHeaterFunctionalIndex(index) }} />
            {selectedWaterHeaterFunctionalIndex == 0 &&
                (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Date of Water Heater(s) installation:</MintParagraph>
                        <StyledInput type="date"
                            max={currentDate.format('YYYY-MM-DD')}
                            value={selectedWaterHeaterInstalled}
                            onChange={(e) => setSelectedWaterHeaterInstalled(e.target.value)}
                            required
                        />
                    </>
                )
            }

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>10.  Has the main sewer lines from the home ever exhibited slow drainage or has backed up?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedSewerLineIssuesIndex} onSelection={(index) => setSelectedSewerLineIssuesIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>11.  Has any of the water lines been frozen or damaged?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedWaterLinesFrozenOrDamagedIndex} onSelection={(index) => setSelectedWaterLinesFrozenOrDamagedIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>12.  Are there installed Sprinkler System located on the Property?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedInstalledSprinklerSystemIndex} onSelection={(index) => { if (index != 0) { setSelectedSprinklerSystemNeedsRepairIndex(-1); } setSelectedInstalledSprinklerSystemIndex(index) }} />
            {selectedInstalledSprinklerSystemIndex == 0 &&
                (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>Is the Sprinkler System in need of any repairs?</MintParagraph>
                        <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedSprinklerSystemNeedsRepairIndex} onSelection={(index) => setSelectedSprinklerSystemNeedsRepairIndex(index)} />
                    </>
                )
            }

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>13.  Does the Property contain polybutylene plumbing (other than the primary service line)?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedPropertyContainsPolybutylenePipingIndex} onSelection={(index) => setSelectedPropertyContainsPolybutylenePipingIndex(index)} />

            <ParagraphStyledInput style={{ marginBottom: '24px' }} label='Provide any additional information (if applicable) that the Seller has knowledge pertaining to the Water/Plumbing/SewerSystems:' value={selectedAdditionalPlumbingInfo ? selectedAdditionalPlumbingInfo : ""} onChange={(e) => setSelectedAdditionalPlumbingInfo(e.target.value)} />
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

export default SellerDisclosure5;