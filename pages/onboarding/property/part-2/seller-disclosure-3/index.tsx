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



const SellerDisclosure3 = (props: { sellerDisclosure: any }) => {
    const router = useRouter();
    const currentDate = dayjs();
    const { isMobile } = useDevice();
    const prevStep = '/onboarding/property/part-2/seller-disclosure-2?propertyId=' + props.sellerDisclosure.propertyId;
    const nextStep = '/onboarding/property/part-2/seller-disclosure-4?propertyId=' + props.sellerDisclosure.propertyId;
    const disclosureEnumOptions = [{ text: 'Yes' }, { text: 'No' }, { text: 'Unknown/NA' }];
    const [selectedPresentDamageRoofIndex, setSelectedPresentDamageRoofIndex] = useState(-1);
    const [selectedYearsOldRoof, setSelectedYearsOldRoof] = useState<any>(null);
    const [selectedRoofRepairsIndex, setSelectedRoofRepairsIndex] = useState(-1);
    const [selectedWaterDamageIndex, setSelectedWaterDamageIndex] = useState(-1);
    const [selectedWaterDamageLocation, setSelectedWaterDamageLocation] = useState(null);
    const [selectedWaterDamageRepairsIndex, setSelectedWaterDamageRepairsIndex] = useState(-1);
    const [selectedFireWindDamageIndex, setSelectedFireWindDamageIndex] = useState(-1);
    const [selectedFireWindDamageLocation, setSelectedFireWindDamageLocation] = useState<any>(null);
    const [selectedFireWindDamageRepairsIndex, setSelectedFireWindDamageRepairsIndex] = useState(-1);
    const [selectedWindowsWorkableIndex, setSelectedWindowsWorkableIndex] = useState(-1);
    const [selectedFoundationDamageIndex, setSelectedFoundationDamageIndex] = useState(-1);
    const [selectedFloorsDamageIndex, setSelectedFloorsDamageIndex] = useState(-1);
    const [selectedWallsDamageIndex, setSelectedWallsDamageIndex] = useState(-1);
    const [selectedDrivewayDamageIndex, setSelectedDrivewayDamageIndex] = useState(-1);
    const [selectedBalconyDamageIndex, setSelectedBalconyDamageIndex] = useState(-1);
    const [selectedSidingDamageIndex, setSelectedSidingDamageIndex] = useState(-1);
    const [selectedExteriorWallsDamageIndex, setSelectedExteriorWallsDamageIndex] = useState(-1);
    const [selectedStructureExtraInfo, setSelectedStructureExtraInfo] = useState(null);


    const { presentDamageRoof, yearsOldRoof, roofRepairs, waterDamage, waterDamageDate, waterDamageLocation, waterDamageRepairs, fireWindDamage, fireWindDamageDate, fireWindDamageLocation, fireWindDamageRepairs, windowsWorkable, foundationDamage, floorsDamage, wallsDamage, drivewayDamage, balconyDamage, sidingDamage, exteriorWallsDamage, structureExtraInfo } = props.sellerDisclosure;

    const waterDate = waterDamageDate
        ? dayjs.utc(waterDamageDate, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD')
        : currentDate.format('YYYY-MM-DD');
    const [selectedWaterDamageDate, setSelectedWaterDamageDate] = useState(waterDate);

    const fireWindDate = fireWindDamageDate
        ? dayjs.utc(fireWindDamageDate, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD')
        : currentDate.format('YYYY-MM-DD');
    const [selectedFireWindDamageDate, setSelectedFireWindDamageDate] = useState(fireWindDate);

    useEffect(() => {
        if (presentDamageRoof === null) {
            setSelectedPresentDamageRoofIndex(-1);
        } else {
            const index = mapModelEnumToIndex(presentDamageRoof);
            setSelectedPresentDamageRoofIndex(index !== undefined ? index : -1);
        }

        setSelectedYearsOldRoof(yearsOldRoof);

        if (roofRepairs === null) {
            setSelectedRoofRepairsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(roofRepairs);
            setSelectedRoofRepairsIndex(index !== undefined ? index : -1);
        }

        if (waterDamage === null) {
            setSelectedWaterDamageIndex(-1);
        } else {
            const index = mapModelEnumToIndex(waterDamage);
            setSelectedWaterDamageIndex(index !== undefined ? index : -1);
        }

        setSelectedWaterDamageLocation(waterDamageLocation);

        if (waterDamageRepairs === null) {
            setSelectedWaterDamageRepairsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(waterDamageRepairs);
            setSelectedWaterDamageRepairsIndex(index !== undefined ? index : -1);
        }

        if (fireWindDamage === null) {
            setSelectedFireWindDamageIndex(-1);
        } else {
            const index = mapModelEnumToIndex(fireWindDamage);
            setSelectedFireWindDamageIndex(index !== undefined ? index : -1);
        }

        setSelectedFireWindDamageLocation(fireWindDamageLocation);

        if (fireWindDamageRepairs === null) {
            setSelectedFireWindDamageRepairsIndex(-1);
        } else {
            const index = mapModelEnumToIndex(fireWindDamageRepairs);
            setSelectedFireWindDamageRepairsIndex(index !== undefined ? index : -1);
        }

        if (windowsWorkable === null) {
            setSelectedWindowsWorkableIndex(-1);
        } else {
            const index = mapModelEnumToIndex(windowsWorkable);
            setSelectedWindowsWorkableIndex(index !== undefined ? index : -1);
        }

        if (foundationDamage === null) {
            setSelectedFoundationDamageIndex(-1);
        } else {
            const index = mapModelEnumToIndex(foundationDamage);
            setSelectedFoundationDamageIndex(index !== undefined ? index : -1);
        }

        if (floorsDamage === null) {
            setSelectedFloorsDamageIndex(-1);
        } else {
            const index = mapModelEnumToIndex(floorsDamage);
            setSelectedFloorsDamageIndex(index !== undefined ? index : -1);
        }

        if (wallsDamage === null) {
            setSelectedWallsDamageIndex(-1);
        } else {
            const index = mapModelEnumToIndex(wallsDamage);
            setSelectedWallsDamageIndex(index !== undefined ? index : -1);
        }

        if (drivewayDamage === null) {
            setSelectedDrivewayDamageIndex(-1);
        } else {
            const index = mapModelEnumToIndex(drivewayDamage);
            setSelectedDrivewayDamageIndex(index !== undefined ? index : -1);
        }

        if (balconyDamage === null) {
            setSelectedBalconyDamageIndex(-1);
        } else {
            const index = mapModelEnumToIndex(balconyDamage);
            setSelectedBalconyDamageIndex(index !== undefined ? index : -1);
        }

        if (sidingDamage === null) {
            setSelectedSidingDamageIndex(-1);
        } else {
            const index = mapModelEnumToIndex(sidingDamage);
            setSelectedSidingDamageIndex(index !== undefined ? index : -1);
        }

        if (exteriorWallsDamage === null) {
            setSelectedExteriorWallsDamageIndex(-1);
        } else {
            const index = mapModelEnumToIndex(exteriorWallsDamage);
            setSelectedExteriorWallsDamageIndex(index !== undefined ? index : -1);
        }

        setSelectedStructureExtraInfo(structureExtraInfo)

    }, [presentDamageRoof, yearsOldRoof, roofRepairs, waterDamage, waterDamageDate, waterDamageLocation, waterDamageRepairs, fireWindDamage, fireWindDamageDate, fireWindDamageLocation, fireWindDamageRepairs, windowsWorkable, foundationDamage, floorsDamage, wallsDamage, drivewayDamage, balconyDamage, sidingDamage, exteriorWallsDamage, structureExtraInfo]);

    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.sellerDisclosure.propertyId,
                updateData: {
                    presentDamageRoof: mapIndexToModelEnum(selectedPresentDamageRoofIndex),
                    yearsOldRoof: selectedYearsOldRoof,
                    roofRepairs: mapIndexToModelEnum(selectedRoofRepairsIndex),
                    waterDamage: mapIndexToModelEnum(selectedWaterDamageIndex),
                    waterDamageDate: selectedWaterDamageIndex == 0 ? dayjs(selectedWaterDamageDate).format('YYYY-MM-DD') : null,
                    waterDamageLocation: selectedWaterDamageLocation,
                    waterDamageRepairs: mapIndexToModelEnum(selectedWaterDamageRepairsIndex),
                    fireWindDamage: mapIndexToModelEnum(selectedFireWindDamageIndex),
                    fireWindDamageDate: selectedFireWindDamageIndex == 0 ? dayjs(selectedFireWindDamageDate).format('YYYY-MM-DD') : null,
                    fireWindDamageLocation: selectedFireWindDamageLocation,
                    fireWindDamageRepairs: mapIndexToModelEnum(selectedFireWindDamageRepairsIndex),
                    windowsWorkable: mapIndexToModelEnum(selectedWindowsWorkableIndex),
                    foundationDamage: mapIndexToModelEnum(selectedFoundationDamageIndex),
                    floorsDamage: mapIndexToModelEnum(selectedFloorsDamageIndex),
                    wallsDamage: mapIndexToModelEnum(selectedWallsDamageIndex),
                    drivewayDamage: mapIndexToModelEnum(selectedDrivewayDamageIndex),
                    balconyDamage: mapIndexToModelEnum(selectedBalconyDamageIndex),
                    sidingDamage: mapIndexToModelEnum(selectedSidingDamageIndex),
                    exteriorWallsDamage: mapIndexToModelEnum(selectedExteriorWallsDamageIndex),
                    structureExtraInfo: selectedStructureExtraInfo
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
                selectedPresentDamageRoofIndex != -1 &&
                    selectedYearsOldRoof &&
                    selectedWaterDamageIndex != -1 &&
                    selectedFireWindDamageIndex != -1 &&
                    selectedWindowsWorkableIndex != -1 &&
                    selectedExteriorWallsDamageIndex != -1
                    ? false : true
            }
        >
            {isMobile ? <H5 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 3</H5> : <H3 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 3</H3>}
            <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>Fill out this information about your home to the best of your ability. It&apos;s ok to not know all the details or exact dates, but this helps you fulfill your legal duty to notify buyers of adverse conditions of the property</MintParagraph>
            </StatusMessage>
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>1. Is there present damage to the roof or any part of the roofing system, (roof’s flashing, downspouts, and gutters)?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedPresentDamageRoofIndex} onSelection={(index) => { if (index != 0) { setSelectedRoofRepairsIndex(-1); } setSelectedPresentDamageRoofIndex(index) }} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>What is the current age of the roof (years)?</MintParagraph>
            <StyledInput type="text"
                min={0}
                value={selectedYearsOldRoof}
                onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, '');
                    setSelectedYearsOldRoof(numericValue);
                }}
                required
            />
            {selectedPresentDamageRoofIndex == 0 &&
                (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Are there any repairs made to the roof or roofing system?</MintParagraph>
                        <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedRoofRepairsIndex} onSelection={(index) => setSelectedRoofRepairsIndex(index)} />
                    </>
                )
            }

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>2.  Has the basement, garage, crawl space or any part of the Property been damaged by water or flooding?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedWaterDamageIndex} onSelection={(index) => { if (index != 0) { setSelectedWaterDamageDate(waterDate); setSelectedWaterDamageLocation(null); setSelectedWaterDamageRepairsIndex(-1); } setSelectedWaterDamageIndex(index); }} />
            {selectedWaterDamageIndex == 0 &&
                (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Provide the date of damage?</MintParagraph>
                        <StyledInput type="date"
                            max={currentDate.format('YYYY-MM-DD')}
                            value={selectedWaterDamageDate}
                            onChange={(e) => setSelectedWaterDamageDate(e.target.value)}
                            required
                        />
                        <StyledInputWithSuperText style={{ marginTop: '24px' }} label='Provide the location damage?' value={selectedWaterDamageLocation ? selectedWaterDamageLocation : ""} onChange={(e) => setSelectedWaterDamageLocation(e.target.value)} />
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Has the damage been repaired?</MintParagraph>
                        <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedWaterDamageRepairsIndex} onSelection={(index) => setSelectedWaterDamageRepairsIndex(index)} />
                    </>
                )
            }

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>3.  Has the Property ever experienced a fire or wind damage?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedFireWindDamageIndex} onSelection={(index) => { if (index != 0) { setSelectedFireWindDamageDate(fireWindDate); setSelectedFireWindDamageLocation(null); setSelectedFireWindDamageRepairsIndex(-1); } setSelectedFireWindDamageIndex(index); }} />
            {selectedFireWindDamageIndex == 0 &&
                (
                    <>
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Provide the date of damage?</MintParagraph>
                        <StyledInput type="date"
                            max={currentDate.format('YYYY-MM-DD')}
                            value={selectedFireWindDamageDate}
                            onChange={(e) => setSelectedFireWindDamageDate(e.target.value)}
                            required
                        />
                        <StyledInputWithSuperText style={{ marginTop: '24px' }} label='Provide the location damage?' value={selectedFireWindDamageLocation ? selectedFireWindDamageLocation : ""} onChange={(e) => setSelectedFireWindDamageLocation(e.target.value)} />
                        <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>Has the damage been repaired?</MintParagraph>
                        <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedFireWindDamageRepairsIndex} onSelection={(index) => setSelectedFireWindDamageRepairsIndex(index)} />
                    </>
                )
            }

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>4.  Are the window in the Property workable and properly sealed?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedWindowsWorkableIndex} onSelection={(index) => setSelectedWindowsWorkableIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>5.  Are there any settling, cracks, shifting, movement, or damage to any of the following:</MintParagraph>
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>Foundation</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedFoundationDamageIndex} onSelection={(index) => setSelectedFoundationDamageIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>Floors</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedFloorsDamageIndex} onSelection={(index) => setSelectedFloorsDamageIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>Walls</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedWallsDamageIndex} onSelection={(index) => setSelectedWallsDamageIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>Driveway</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedDrivewayDamageIndex} onSelection={(index) => setSelectedDrivewayDamageIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>Balcony or Patio</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedBalconyDamageIndex} onSelection={(index) => setSelectedBalconyDamageIndex(index)} />
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>Exterior Siding</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedSidingDamageIndex} onSelection={(index) => setSelectedSidingDamageIndex(index)} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px' }}>6. Are there any problems with the exterior structure walls, to include but not limited to brick, siding, masonry, stucco, or other related materials?</MintParagraph>
            <MultipleChoiceParent buttonHeight='64px' fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={disclosureEnumOptions} selectedIndex={selectedExteriorWallsDamageIndex} onSelection={(index) => setSelectedExteriorWallsDamageIndex(index)} />

            <ParagraphStyledInput style={{ marginBottom: '24px' }} label='Provide any additional information that the Seller has knowledge pertaining to the Structure System:' value={selectedStructureExtraInfo ? selectedStructureExtraInfo : ""} onChange={(e) => setSelectedStructureExtraInfo(e.target.value)} />
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

export default SellerDisclosure3;