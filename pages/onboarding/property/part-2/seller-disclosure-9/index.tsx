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
import StyledInputWithSuperText from '../../../../../src/components/boxes/StyledInputWithSupertext';
import BasicParentModal from '../../../../../src/components/boxes/modals/BasicParentModal';
import SecondaryButton from '../../../../../src/components/buttons/SecondaryButton';

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

const SellerDisclosure9 = (props: { sellerDisclosure: any }) => {
    const router = useRouter();
    const { isMobile } = useDevice();
    const prevStep = '/onboarding/property/part-2/seller-disclosure-8?propertyId=' + props.sellerDisclosure.propertyId;
    const nextStep = '/dashboard';
    const [selectedOvenStoveRemains, setSelectedOvenStoveRemains] = useState<any>(null);
    const [selectedRangeRemains, setSelectedRangeRemains] = useState<any>(null);
    const [selectedRangeVentilatorRemains, setSelectedRangeVentilatorRemains] = useState<any>(null);
    const [selectedCooktopRemains, setSelectedCooktopRemains] = useState<any>(null);
    const [selectedFreezerRemains, setSelectedFreezerRemains] = useState<any>(null);
    const [selectedMicrowaveOvenRemains, setSelectedMicrowaveOvenRemains] = useState<any>(null);
    const [selectedBuiltInVacuumSystemRemains, setSelectedBuiltInVacuumSystemRemains] = useState<any>(null);
    const [selectedIceMakerRemains, setSelectedIceMakerRemains] = useState<any>(null);
    const [selectedDishwasherRemains, setSelectedDishwasherRemains] = useState<any>(null);
    const [selectedWineCoolerRemains, setSelectedWineCoolerRemains] = useState<any>(null);
    const [selectedGarbageDisposalRemains, setSelectedGarbageDisposalRemains] = useState<any>(null);
    const [selectedTrashCompactorRemains, setSelectedTrashCompactorRemains] = useState<any>(null);
    const [selectedWashingMachineRemains, setSelectedWashingMachineRemains] = useState<any>(null);
    const [selectedClothesDryerRemains, setSelectedClothesDryerRemains] = useState<any>(null);
    const [selectedSecurityCameraRemains, setSelectedSecurityCameraRemains] = useState<any>(null);
    const [selectedAlarmSystemsRemains, setSelectedAlarmSystemsRemains] = useState<any>(null);
    const [selectedSmokeDetectorRemains, setSelectedSmokeDetectorRemains] = useState<any>(null);
    const [selectedCarbonMonoxideRemains, setSelectedCarbonMonoxideRemains] = useState<any>(null);
    const [selectedWindowScreensRemains, setSelectedWindowScreensRemains] = useState<any>(null);
    const [selectedWindowSecurityGateRemains, setSelectedWindowSecurityGateRemains] = useState<any>(null);
    const [selectedDoorLocksRemains, setSelectedDoorLocksRemains] = useState<any>(null);
    const [selectedFireSprinklerSystemRemains, setSelectedFireSprinklerSystemRemains] = useState<any>(null);
    const [selectedSolarPanelsRemains, setSelectedSolarPanelsRemains] = useState<any>(null);
    const [selectedCarChargingStationRemains, setSelectedCarChargingStationRemains] = useState<any>(null);
    const [selectedAirConditionerUnitRemains, setSelectedAirConditionerUnitRemains] = useState<any>(null);
    const [selectedAirPurifierRemains, setSelectedAirPurifierRemains] = useState<any>(null);
    const [selectedAtticFanRemains, setSelectedAtticFanRemains] = useState<any>(null);
    const [selectedGeneratorRemains, setSelectedGeneratorRemains] = useState<any>(null);
    const [selectedHumidifierRemains, setSelectedHumidifierRemains] = useState<any>(null);
    const [selectedDehumidifierRemains, setSelectedDehumidifierRemains] = useState<any>(null);
    const [selectedHotTubRemains, setSelectedHotTubRemains] = useState<any>(null);
    const [selectedWaterPurifierRemains, setSelectedWaterPurifierRemains] = useState<any>(null);
    const [selectedWaterSoftenerRemains, setSelectedWaterSoftenerRemains] = useState<any>(null);
    const [selectedPropaneTankRemains, setSelectedPropaneTankRemains] = useState<any>(null);
    const [selectedFuelOilTankRemains, setSelectedFuelOilTankRemains] = useState<any>(null);
    const [selectedWellPumpRemains, setSelectedWellPumpRemains] = useState<any>(null);
    const [selectedSumpPumpRemains, setSelectedSumpPumpRemains] = useState<any>(null);
    const [selectedSeweragePumpRemains, setSelectedSeweragePumpRemains] = useState<any>(null);
    const [selectedWindowBlindsRemains, setSelectedWindowBlindsRemains] = useState<any>(null);
    const [selectedWindowCurtainsRemains, setSelectedWindowCurtainsRemains] = useState<any>(null);
    const [selectedWindowShuttersRemains, setSelectedWindowShuttersRemains] = useState<any>(null);
    const [selectedWindowHardwareRemains, setSelectedWindowHardwareRemains] = useState<any>(null);
    const [selectedCeilingFansRemains, setSelectedCeilingFansRemains] = useState<any>(null);
    const [selectedLightFixturesRemains, setSelectedLightFixturesRemains] = useState<any>(null);
    const [selectedShelvingSystemsRemains, setSelectedShelvingSystemsRemains] = useState<any>(null);
    const [selectedStorageSystemsRemains, setSelectedStorageSystemsRemains] = useState<any>(null);
    const [selectedClosetSystemsRemains, setSelectedClosetSystemsRemains] = useState<any>(null);
    const [selectedFireplaceRemains, setSelectedFireplaceRemains] = useState<any>(null);
    const [selectedFireplaceAccessoriesRemains, setSelectedFireplaceAccessoriesRemains] = useState<any>(null);
    const [selectedMirrorRemains, setSelectedMirrorRemains] = useState<any>(null);
    const [selectedShowerheadRemains, setSelectedShowerheadRemains] = useState<any>(null);
    const [selectedBuiltInSafeRemains, setSelectedBuiltInSafeRemains] = useState<any>(null);
    const [selectedGasGrillRemains, setSelectedGasGrillRemains] = useState<any>(null);
    const [selectedOutdoorFurnitureRemains, setSelectedOutdoorFurnitureRemains] = useState<any>(null);
    const [selectedPoolAndEquipmentRemains, setSelectedPoolAndEquipmentRemains] = useState<any>(null);
    const [selectedSaunaRemains, setSelectedSaunaRemains] = useState<any>(null);
    const [selectedOutdoorKitchenRemains, setSelectedOutdoorKitchenRemains] = useState<any>(null);
    const [selectedBasketballSystemRemains, setSelectedBasketballSystemRemains] = useState<any>(null);
    const [selectedKidsPlaySystemRemains, setSelectedKidsPlaySystemRemains] = useState<any>(null);
    const [selectedDoghouseRemains, setSelectedDoghouseRemains] = useState<any>(null);
    const [selectedStorageBuildingRemains, setSelectedStorageBuildingRemains] = useState<any>(null);
    const [selectedSwingRemains, setSelectedSwingRemains] = useState<any>(null);
    const [selectedGazeboRemains, setSelectedGazeboRemains] = useState<any>(null);
    const [selectedOutdoorLightingRemains, setSelectedOutdoorLightingRemains] = useState<any>(null);
    const [selectedArborRemains, setSelectedArborRemains] = useState<any>(null);
    const [selectedMailboxRemains, setSelectedMailboxRemains] = useState<any>(null);
    const [selectedOtherSystemOne, setSelectedOtherSystemOne] = useState<any>(null);
    const [selectedOtherSystemTwo, setSelectedOtherSystemTwo] = useState<any>(null);
    const [selectedOtherSystemThree, setSelectedOtherSystemThree] = useState<any>(null);
    const [selectedOtherSystemFour, setSelectedOtherSystemFour] = useState<any>(null);
    const [selectedOtherSystemFive, setSelectedOtherSystemFive] = useState<any>(null);
    const [selectedOtherSystemSix, setSelectedOtherSystemSix] = useState<any>(null);
    const [selectedOtherSystemSeven, setSelectedOtherSystemSeven] = useState<any>(null);
    const [selectedSellerAddtionalDetails, setSelectedSellerAddtionalDetails] = useState<any>(null);
    const [finishedAppliances, setFinishedAppliances] = useState<boolean>(false);
    const [finishedSafetySystems, setFinishedSafetySystems] = useState<boolean>(false);
    const [finishedHomeSystems, setFinishedHomeSystems] = useState<boolean>(false);
    const [finishedInteriorSystems, setFinishedInteriorSystems] = useState<boolean>(false);
    const [finishedOutdoorSystems, setFinishedOutdoorSystems] = useState<boolean>(false);
    const [showFinishedModal, setShowFinishedModal] = useState(false);

    const closeModal = () => {
        setShowFinishedModal(false);
        router.push(nextStep);
    };
  

    const {
        ovenStoveRemains,
        rangeRemains,
        rangeVentilatorRemains,
        cooktopRemains,
        freezerRemains,
        microwaveOvenRemains,
        builtInVacuumSystemRemains,
        iceMakerRemains,
        dishwasherRemains,
        wineCoolerRemains,
        garbageDisposalRemains,
        trashCompactorRemains,
        washingMachineRemains,
        clothesDryerRemains,
        securityCameraRemains,
        alarmSystemsRemains,
        smokeDetectorRemains,
        carbonMonoxideRemains,
        windowScreensRemains,
        windowSecurityGateRemains,
        doorLocksRemains,
        fireSprinklerSystemRemains,
        solarPanelsRemains,
        carChargingStationRemains,
        airConditionerUnitRemains,
        airPurifierRemains,
        atticFanRemains,
        generatorRemains,
        humidifierRemains,
        dehumidifierRemains,
        hotTubRemains,
        waterPurifierRemains,
        waterSoftenerRemains,
        propaneTankRemains,
        fuelOilTankRemains,
        wellPumpRemains,
        sumpPumpRemains,
        seweragePumpRemains,
        windowBlindsRemains,
        windowCurtainsRemains,
        windowShuttersRemains,
        windowHardwareRemains,
        ceilingFansRemains,
        lightFixturesRemains,
        shelvingSystemsRemains,
        storageSystemsRemains,
        closetSystemsRemains,
        fireplaceRemains,
        fireplaceAccessoriesRemains,
        mirrorRemains,
        showerheadRemains,
        builtInSafeRemains,
        gasGrillRemains,
        outdoorFurnitureRemains,
        poolAndEquipmentRemains,
        saunaRemains,
        outdoorKitchenRemains,
        basketballSystemRemains,
        kidsPlaySystemRemains,
        doghouseRemains,
        storageBuildingRemains,
        swingRemains,
        gazeboRemains,
        outdoorLightingRemains,
        arborRemains,
        mailboxRemains,
        otherSystemOne,
        otherSystemTwo,
        otherSystemThree,
        otherSystemFour,
        otherSystemFive,
        otherSystemSix,
        otherSystemSeven
    } = props.sellerDisclosure;

    useEffect(() => {
        setSelectedOvenStoveRemains(ovenStoveRemains ? ovenStoveRemains : false);
        if (ovenStoveRemains || !ovenStoveRemains) {
            setFinishedAppliances(true)
        }
        setSelectedRangeRemains(rangeRemains ? rangeRemains : false);
        if (rangeRemains || !rangeRemains) {
            setFinishedAppliances(true)
        }
        setSelectedRangeVentilatorRemains(rangeVentilatorRemains ? rangeVentilatorRemains : false);
        if (rangeVentilatorRemains || !rangeVentilatorRemains) {
            setFinishedAppliances(true)
        }
        setSelectedCooktopRemains(cooktopRemains ? cooktopRemains : false);
        if (cooktopRemains || !cooktopRemains) {
            setFinishedAppliances(true)
        }
        setSelectedFreezerRemains(freezerRemains ? freezerRemains : false);
        if (freezerRemains || !freezerRemains) {
            setFinishedAppliances(true)
        }
        setSelectedMicrowaveOvenRemains(microwaveOvenRemains ? microwaveOvenRemains : false);
        if (microwaveOvenRemains || !microwaveOvenRemains) {
            setFinishedAppliances(true)
        }
        setSelectedBuiltInVacuumSystemRemains(builtInVacuumSystemRemains ? builtInVacuumSystemRemains : false);
        if (builtInVacuumSystemRemains || !builtInVacuumSystemRemains) {
            setFinishedAppliances(true)
        }
        setSelectedIceMakerRemains(iceMakerRemains ? iceMakerRemains : false);
        if (iceMakerRemains || !iceMakerRemains) {
            setFinishedAppliances(true)
        }
        setSelectedDishwasherRemains(dishwasherRemains ? dishwasherRemains : false);
        if (dishwasherRemains || !dishwasherRemains) {
            setFinishedAppliances(true)
        }
        setSelectedWineCoolerRemains(wineCoolerRemains ? wineCoolerRemains : false);
        if (wineCoolerRemains || !wineCoolerRemains) {
            setFinishedAppliances(true)
        }
        setSelectedGarbageDisposalRemains(garbageDisposalRemains ? garbageDisposalRemains : false);
        if (garbageDisposalRemains || !garbageDisposalRemains) {
            setFinishedAppliances(true)
        }
        setSelectedTrashCompactorRemains(trashCompactorRemains ? trashCompactorRemains : false);
        if (trashCompactorRemains || !trashCompactorRemains) {
            setFinishedAppliances(true)
        }
        setSelectedWashingMachineRemains(washingMachineRemains ? washingMachineRemains : false);
        if (washingMachineRemains || !washingMachineRemains) {
            setFinishedAppliances(true)
        }
        setSelectedClothesDryerRemains(clothesDryerRemains ? clothesDryerRemains : false);
        if (clothesDryerRemains || !clothesDryerRemains) {
            setFinishedAppliances(true)
        }
        setSelectedSecurityCameraRemains(securityCameraRemains ? securityCameraRemains : false);
        if (securityCameraRemains || !securityCameraRemains) {
            setFinishedSafetySystems(true)
        }
        setSelectedAlarmSystemsRemains(alarmSystemsRemains ? alarmSystemsRemains : false);
        if (alarmSystemsRemains || !alarmSystemsRemains) {
            setFinishedSafetySystems(true)
        }
        setSelectedSmokeDetectorRemains(smokeDetectorRemains ? smokeDetectorRemains : false);
        if (smokeDetectorRemains || !smokeDetectorRemains) {
            setFinishedSafetySystems(true)
        }
        setSelectedCarbonMonoxideRemains(carbonMonoxideRemains ? carbonMonoxideRemains : false);
        if (carbonMonoxideRemains || !carbonMonoxideRemains) {
            setFinishedSafetySystems(true)
        }
        setSelectedWindowScreensRemains(windowScreensRemains ? windowScreensRemains : windowScreensRemains);
        if (windowScreensRemains || !windowScreensRemains) {
            setFinishedSafetySystems(true)
        }
        setSelectedWindowSecurityGateRemains(windowSecurityGateRemains ? windowSecurityGateRemains : false);
        if (windowSecurityGateRemains || !windowSecurityGateRemains) {
            setFinishedSafetySystems(true)
        }
        setSelectedDoorLocksRemains(doorLocksRemains ? doorLocksRemains : false);
        if (doorLocksRemains || !doorLocksRemains) {
            setFinishedSafetySystems(true)
        }
        setSelectedFireSprinklerSystemRemains(fireSprinklerSystemRemains ? fireSprinklerSystemRemains : false);
        if (fireSprinklerSystemRemains || !fireSprinklerSystemRemains) {
            setFinishedSafetySystems(true)
        }
        setSelectedSolarPanelsRemains(solarPanelsRemains ? solarPanelsRemains : false);
        if (solarPanelsRemains || !solarPanelsRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedCarChargingStationRemains(carChargingStationRemains ? carChargingStationRemains : false);
        if (carChargingStationRemains || !carChargingStationRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedAirConditionerUnitRemains(airConditionerUnitRemains ? airConditionerUnitRemains : false);
        if (airConditionerUnitRemains || !airConditionerUnitRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedAirPurifierRemains(airPurifierRemains ? airPurifierRemains : false);
        if (airPurifierRemains || !airPurifierRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedAtticFanRemains(atticFanRemains ? atticFanRemains : false);
        if (atticFanRemains || !atticFanRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedGeneratorRemains(generatorRemains ? generatorRemains : false);
        if (generatorRemains || !generatorRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedHumidifierRemains(humidifierRemains ? humidifierRemains : false);
        if (humidifierRemains || !humidifierRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedDehumidifierRemains(dehumidifierRemains ? dehumidifierRemains : false);
        if (dehumidifierRemains || !dehumidifierRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedHotTubRemains(hotTubRemains ? hotTubRemains : false);
        if (hotTubRemains || !hotTubRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedWaterPurifierRemains(waterPurifierRemains ? waterPurifierRemains : false);
        if (waterPurifierRemains || !waterPurifierRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedPropaneTankRemains(propaneTankRemains ? propaneTankRemains : false);
        if (propaneTankRemains || !propaneTankRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedFuelOilTankRemains(fuelOilTankRemains ? fuelOilTankRemains : false);
        if (fuelOilTankRemains || !fuelOilTankRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedWaterSoftenerRemains(waterSoftenerRemains ? waterSoftenerRemains : false);
        if (waterSoftenerRemains || !waterSoftenerRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedWellPumpRemains(wellPumpRemains ? wellPumpRemains : false);
        if (wellPumpRemains || !wellPumpRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedSumpPumpRemains(sumpPumpRemains ? sumpPumpRemains : false);
        if (sumpPumpRemains || !sumpPumpRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedSeweragePumpRemains(seweragePumpRemains ? seweragePumpRemains : false);
        if (seweragePumpRemains || !seweragePumpRemains) {
            setFinishedHomeSystems(true)
        }
        setSelectedWindowBlindsRemains(windowBlindsRemains ? windowBlindsRemains : false);
        if (windowBlindsRemains || !windowBlindsRemains) {
            setFinishedInteriorSystems(true)
        }
        setSelectedWindowCurtainsRemains(windowCurtainsRemains ? windowCurtainsRemains : false);
        if (windowCurtainsRemains || !windowCurtainsRemains) {
            setFinishedInteriorSystems(true)
        }
        setSelectedWindowShuttersRemains(windowShuttersRemains ? windowShuttersRemains : false);
        if (windowShuttersRemains || !windowShuttersRemains) {
            setFinishedInteriorSystems(true)
        }
        setSelectedWindowHardwareRemains(windowHardwareRemains ? windowHardwareRemains : false);
        if (windowHardwareRemains || !windowHardwareRemains) {
            setFinishedInteriorSystems(true)
        }
        setSelectedLightFixturesRemains(lightFixturesRemains ? lightFixturesRemains : false);
        if (lightFixturesRemains || !lightFixturesRemains) {
            setFinishedInteriorSystems(true)
        }
        setSelectedShelvingSystemsRemains(shelvingSystemsRemains ? shelvingSystemsRemains : false);
        if (shelvingSystemsRemains || !shelvingSystemsRemains) {
            setFinishedInteriorSystems(true)
        }
        setSelectedCeilingFansRemains(ceilingFansRemains ? ceilingFansRemains : false);
        if (ceilingFansRemains || !ceilingFansRemains) {
            setFinishedInteriorSystems(true)
        }
        setSelectedStorageSystemsRemains(storageSystemsRemains ? storageSystemsRemains : false);
        if (storageSystemsRemains || !storageSystemsRemains) {
            setFinishedInteriorSystems(true)
        }
        setSelectedClosetSystemsRemains(closetSystemsRemains ? closetSystemsRemains : false);
        if (closetSystemsRemains || !closetSystemsRemains) {
            setFinishedInteriorSystems(true)
        }
        setSelectedFireplaceRemains(fireplaceRemains ? fireplaceRemains : false);
        if (fireplaceRemains || !fireplaceRemains) {
            setFinishedInteriorSystems(true)
        }
        setSelectedFireplaceAccessoriesRemains(fireplaceAccessoriesRemains ? fireplaceAccessoriesRemains : false);
        if (fireplaceAccessoriesRemains || !fireplaceAccessoriesRemains) {
            setFinishedInteriorSystems(true)
        }
        setSelectedMirrorRemains(mirrorRemains ? mirrorRemains : false);
        if (mirrorRemains || !mirrorRemains) {
            setFinishedInteriorSystems(true)
        }
        setSelectedShowerheadRemains(showerheadRemains ? showerheadRemains : false);
        if (showerheadRemains || !showerheadRemains) {
            setFinishedInteriorSystems(true)
        }
        setSelectedBuiltInSafeRemains(builtInSafeRemains ? builtInSafeRemains : false);
        if (builtInSafeRemains || !builtInSafeRemains) {
            setFinishedInteriorSystems(true)
        }
        setSelectedGasGrillRemains(gasGrillRemains ? gasGrillRemains : false);
        if (gasGrillRemains || !gasGrillRemains) {
            setFinishedOutdoorSystems(true)
        }
        setSelectedOutdoorFurnitureRemains(outdoorFurnitureRemains ? outdoorFurnitureRemains : false);
        if (outdoorFurnitureRemains || !outdoorFurnitureRemains) {
            setFinishedOutdoorSystems(true)
        }
        setSelectedPoolAndEquipmentRemains(poolAndEquipmentRemains ? poolAndEquipmentRemains : false);
        if (poolAndEquipmentRemains || !poolAndEquipmentRemains) {
            setFinishedOutdoorSystems(true)
        }
        setSelectedSaunaRemains(saunaRemains ? saunaRemains : false);
        if (saunaRemains || !saunaRemains) {
            setFinishedOutdoorSystems(true)
        }
        setSelectedBasketballSystemRemains(basketballSystemRemains ? basketballSystemRemains : false);
        if (basketballSystemRemains || !basketballSystemRemains) {
            setFinishedOutdoorSystems(true)
        }
        setSelectedKidsPlaySystemRemains(kidsPlaySystemRemains ? kidsPlaySystemRemains : false);
        if (kidsPlaySystemRemains || !kidsPlaySystemRemains) {
            setFinishedOutdoorSystems(true)
        }
        setSelectedOutdoorKitchenRemains(outdoorKitchenRemains ? outdoorKitchenRemains : false);
        if (outdoorKitchenRemains || !outdoorKitchenRemains) {
            setFinishedOutdoorSystems(true)
        }
        setSelectedDoghouseRemains(doghouseRemains ? doghouseRemains : false);
        if (doghouseRemains || !doghouseRemains) {
            setFinishedOutdoorSystems(true)
        }
        setSelectedStorageBuildingRemains(storageBuildingRemains ? storageBuildingRemains : false);
        if (storageBuildingRemains || !storageBuildingRemains) {
            setFinishedOutdoorSystems(true)
        }
        setSelectedSwingRemains(swingRemains ? swingRemains : false);
        if (swingRemains || !swingRemains) {
            setFinishedOutdoorSystems(true)
        }
        setSelectedGazeboRemains(gazeboRemains ? gazeboRemains : false);
        if (gazeboRemains || !gazeboRemains) {
            setFinishedOutdoorSystems(true)
        }
        setSelectedOutdoorLightingRemains(outdoorLightingRemains ? outdoorLightingRemains : false);
        if (outdoorLightingRemains || !outdoorLightingRemains) {
            setFinishedOutdoorSystems(true)
        }
        setSelectedArborRemains(arborRemains ? arborRemains : false);
        if (arborRemains || !arborRemains) {
            setFinishedOutdoorSystems(true)
        }
        setSelectedMailboxRemains(mailboxRemains ? mailboxRemains : false);
        if (mailboxRemains || !mailboxRemains) {
            setFinishedOutdoorSystems(true)
        }
        setSelectedOtherSystemOne(otherSystemOne)
        setSelectedOtherSystemTwo(otherSystemTwo)
        setSelectedOtherSystemThree(otherSystemThree)
        setSelectedOtherSystemFour(otherSystemFour)
        setSelectedOtherSystemFive(otherSystemFive)
        setSelectedOtherSystemSix(otherSystemSix)
        setSelectedOtherSystemSeven(otherSystemSeven)
    }, [
        ovenStoveRemains,
        rangeRemains,
        rangeVentilatorRemains,
        cooktopRemains,
        freezerRemains,
        microwaveOvenRemains,
        builtInVacuumSystemRemains,
        iceMakerRemains,
        dishwasherRemains,
        wineCoolerRemains,
        garbageDisposalRemains,
        trashCompactorRemains,
        washingMachineRemains,
        clothesDryerRemains,
        securityCameraRemains,
        alarmSystemsRemains,
        smokeDetectorRemains,
        carbonMonoxideRemains,
        windowScreensRemains,
        windowSecurityGateRemains,
        doorLocksRemains,
        fireSprinklerSystemRemains,
        solarPanelsRemains,
        carChargingStationRemains,
        airConditionerUnitRemains,
        airPurifierRemains,
        atticFanRemains,
        generatorRemains,
        humidifierRemains,
        dehumidifierRemains,
        hotTubRemains,
        waterPurifierRemains,
        waterSoftenerRemains,
        propaneTankRemains,
        fuelOilTankRemains,
        wellPumpRemains,
        sumpPumpRemains,
        seweragePumpRemains,
        windowBlindsRemains,
        windowCurtainsRemains,
        windowShuttersRemains,
        windowHardwareRemains,
        ceilingFansRemains,
        lightFixturesRemains,
        shelvingSystemsRemains,
        storageSystemsRemains,
        closetSystemsRemains,
        fireplaceRemains,
        fireplaceAccessoriesRemains,
        mirrorRemains,
        showerheadRemains,
        builtInSafeRemains,
        gasGrillRemains,
        outdoorFurnitureRemains,
        poolAndEquipmentRemains,
        saunaRemains,
        outdoorKitchenRemains,
        basketballSystemRemains,
        kidsPlaySystemRemains,
        doghouseRemains,
        storageBuildingRemains,
        swingRemains,
        gazeboRemains,
        outdoorLightingRemains,
        arborRemains,
        mailboxRemains,
        otherSystemOne,
        otherSystemTwo,
        otherSystemThree,
        otherSystemFour,
        otherSystemFive,
        otherSystemSix,
        otherSystemSeven
    ]);

    const handleNextSubmit = async () => {
        try {
            const data = {
                propertyId: props.sellerDisclosure.propertyId,
                updateData: {
                    ovenStoveRemains: selectedOvenStoveRemains,
                    rangeRemains: selectedRangeRemains,
                    rangeVentilatorRemains: selectedRangeVentilatorRemains,
                    cooktopRemains: selectedCooktopRemains,
                    freezerRemains: selectedFreezerRemains,
                    microwaveOvenRemains: selectedMicrowaveOvenRemains,
                    builtInVacuumSystemRemains: selectedBuiltInVacuumSystemRemains,
                    iceMakerRemains: selectedIceMakerRemains,
                    dishwasherRemains: selectedDishwasherRemains,
                    wineCoolerRemains: selectedWineCoolerRemains,
                    garbageDisposalRemains: selectedGarbageDisposalRemains,
                    trashCompactorRemains: selectedTrashCompactorRemains,
                    washingMachineRemains: selectedWashingMachineRemains,
                    clothesDryerRemains: selectedClothesDryerRemains,
                    securityCameraRemains: selectedSecurityCameraRemains,
                    alarmSystemsRemains: selectedAlarmSystemsRemains,
                    smokeDetectorRemains: selectedSmokeDetectorRemains,
                    carbonMonoxideRemains: selectedCarbonMonoxideRemains,
                    windowScreensRemains: selectedWindowScreensRemains,
                    windowSecurityGateRemains: selectedWindowSecurityGateRemains,
                    doorLocksRemains: selectedDoorLocksRemains,
                    fireSprinklerSystemRemains: selectedFireSprinklerSystemRemains,
                    solarPanelsRemains: selectedSolarPanelsRemains,
                    carChargingStationRemains: selectedCarChargingStationRemains,
                    airConditionerUnitRemains: selectedAirConditionerUnitRemains,
                    airPurifierRemains: selectedAirPurifierRemains,
                    atticFanRemains: selectedAtticFanRemains,
                    generatorRemains: selectedGeneratorRemains,
                    humidifierRemains: selectedHumidifierRemains,
                    dehumidifierRemains: selectedDehumidifierRemains,
                    hotTubRemains: selectedHotTubRemains,
                    waterPurifierRemains: selectedWaterPurifierRemains,
                    waterSoftenerRemains: selectedWaterSoftenerRemains,
                    propaneTankRemains: selectedPropaneTankRemains,
                    fuelOilTankRemains: selectedFuelOilTankRemains,
                    wellPumpRemains: selectedWellPumpRemains,
                    sumpPumpRemains: selectedSumpPumpRemains,
                    seweragePumpRemains: selectedSeweragePumpRemains,
                    windowBlindsRemains: selectedWindowBlindsRemains,
                    windowCurtainsRemains: selectedWindowCurtainsRemains,
                    windowShuttersRemains: selectedWindowShuttersRemains,
                    windowHardwareRemains: selectedWindowHardwareRemains,
                    ceilingFansRemains: selectedCeilingFansRemains,
                    lightFixturesRemains: selectedLightFixturesRemains,
                    shelvingSystemsRemains: selectedShelvingSystemsRemains,
                    storageSystemsRemains: selectedStorageSystemsRemains,
                    closetSystemsRemains: selectedClosetSystemsRemains,
                    fireplaceRemains: selectedFireplaceRemains,
                    fireplaceAccessoriesRemains: selectedFireplaceAccessoriesRemains,
                    mirrorRemains: selectedMirrorRemains,
                    showerheadRemains: selectedShowerheadRemains,
                    builtInSafeRemains: selectedBuiltInSafeRemains,
                    gasGrillRemains: selectedGasGrillRemains,
                    outdoorFurnitureRemains: selectedOutdoorFurnitureRemains,
                    poolAndEquipmentRemains: selectedPoolAndEquipmentRemains,
                    saunaRemains: selectedSaunaRemains,
                    outdoorKitchenRemains: selectedOutdoorKitchenRemains,
                    basketballSystemRemains: selectedBasketballSystemRemains,
                    kidsPlaySystemRemains: selectedKidsPlaySystemRemains,
                    doghouseRemains: selectedDoghouseRemains,
                    storageBuildingRemains: selectedStorageBuildingRemains,
                    swingRemains: selectedSwingRemains,
                    gazeboRemains: selectedGazeboRemains,
                    outdoorLightingRemains: selectedOutdoorLightingRemains,
                    arborRemains: selectedArborRemains,
                    mailboxRemains: selectedMailboxRemains,
                    otherSystemOne: selectedOtherSystemOne,
                    otherSystemTwo: selectedOtherSystemTwo,
                    otherSystemThree: selectedOtherSystemThree,
                    otherSystemFour: selectedOtherSystemFour,
                    otherSystemFive: selectedOtherSystemFive,
                    otherSystemSix: selectedOtherSystemSix,
                    otherSystemSeven: selectedOtherSystemSeven
                },
            }
            await makeAuthedApiRequest({ method: 'post', urlExtension: `/v1/sellerDisclosure/updateSellerDisclosure`, data });
            setShowFinishedModal(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <OnboardingScreenFrame
            nextOnClick={handleNextSubmit}
            prevStep={prevStep}
            disabledRight={
                finishedAppliances && finishedSafetySystems && finishedHomeSystems && finishedInteriorSystems && finishedOutdoorSystems ? false : true
            }
        >
            {isMobile ? <H5 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 9</H5> : <H3 style={{ marginBottom: '24px' }}>Seller&apos;s Disclosure: Part 9</H3>}
            <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>For this section, select all the items that <span style={{fontWeight:'bold'}}>stay</span> with the property. Anything not included here that is not a fixture is assumed to go with the sale.</MintParagraph>
            </StatusMessage>
            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>1. APPLIANCES</MintParagraph>
            <MultipleChoiceParent multipleSelectable buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={[{ text: 'Oven/Stove' }, { text: 'Range' }, { text: 'Range Ventilator' }, { text: 'Cooktop' }, { text: 'Freezer' }, { text: 'Microwave Oven' }, { text: 'Built-In Vacuum System' }, { text: 'Ice Maker' }, { text: 'Dishwasher' }, { text: 'Wine Cooler' }, { text: 'Garbage Disposal' }, { text: 'Trash Compactor' }, { text: 'Washing Machine' }, { text: 'Clothes Dryer' }]} defaultChecks={([selectedOvenStoveRemains, selectedRangeRemains, selectedRangeVentilatorRemains, selectedCooktopRemains, selectedFreezerRemains, selectedMicrowaveOvenRemains, selectedBuiltInVacuumSystemRemains, selectedIceMakerRemains, selectedDishwasherRemains, selectedWineCoolerRemains, selectedGarbageDisposalRemains, selectedTrashCompactorRemains, selectedWashingMachineRemains, selectedClothesDryerRemains])} onSelection={(Array) => { setFinishedAppliances(true); setSelectedOvenStoveRemains(Array[0]); setSelectedRangeRemains(Array[1]); setSelectedRangeVentilatorRemains(Array[2]); setSelectedCooktopRemains(Array[3]); setSelectedFreezerRemains(Array[4]); setSelectedMicrowaveOvenRemains(Array[5]); setSelectedBuiltInVacuumSystemRemains(Array[6]); setSelectedIceMakerRemains(Array[7]); setSelectedDishwasherRemains(Array[8]); setSelectedWineCoolerRemains(Array[9]); setSelectedGarbageDisposalRemains(Array[10]); setSelectedTrashCompactorRemains(Array[11]); setSelectedWashingMachineRemains(Array[12]); setSelectedClothesDryerRemains(Array[13]); }} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>2. SAFETY SYSTEMS</MintParagraph>
            <MultipleChoiceParent multipleSelectable buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={[{ text: 'Security Camera' }, { text: 'Alarm Systems' }, { text: ' Smoke Detector' }, { text: 'Carbon Monoxide' }, { text: 'Window Screens' }, { text: 'Window Security Gate' }, { text: 'Door Locks' }, { text: 'Fire Sprinkler System' }]} defaultChecks={([selectedSecurityCameraRemains, selectedAlarmSystemsRemains, selectedSmokeDetectorRemains, selectedCarbonMonoxideRemains, selectedWindowScreensRemains, selectedWindowSecurityGateRemains, selectedDoorLocksRemains, selectedFireSprinklerSystemRemains])} onSelection={(Array) => { setFinishedSafetySystems(true); setSelectedSecurityCameraRemains(Array[0]); setSelectedAlarmSystemsRemains(Array[1]); setSelectedSmokeDetectorRemains(Array[2]); setSelectedCarbonMonoxideRemains(Array[3]); setSelectedWindowScreensRemains(Array[4]); setSelectedWindowSecurityGateRemains(Array[5]); setSelectedDoorLocksRemains(Array[6]); setSelectedFireSprinklerSystemRemains(Array[7]); }} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>3. Home SYSTEMS</MintParagraph>
            <MultipleChoiceParent multipleSelectable buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={[{ text: 'Solar Panels' }, { text: 'Car Charging Station' }, { text: 'Air Conditioner Unit' }, { text: 'Air Purifier' }, { text: 'Attic Fan' }, { text: 'Generator' }, { text: 'Humidifier' }, { text: 'Dehumidifier' }, { text: 'Hot Tub' }, { text: 'Water Purifier' }, { text: 'Water Softener' }, { text: 'Propane Tank' }, { text: 'Fuel Oil Tank' }, { text: 'Well Pump' }, { text: ' Sump Pump' }, { text: 'Sewerage Pump' }]} defaultChecks={([selectedSolarPanelsRemains, selectedCarChargingStationRemains, selectedAirConditionerUnitRemains, selectedAirPurifierRemains, selectedAtticFanRemains, selectedGeneratorRemains, selectedHumidifierRemains, selectedDehumidifierRemains, selectedHotTubRemains, selectedWaterPurifierRemains, selectedWaterSoftenerRemains, selectedPropaneTankRemains, selectedFuelOilTankRemains, selectedWellPumpRemains, selectedSumpPumpRemains, selectedSeweragePumpRemains])} onSelection={(Array) => { setFinishedHomeSystems(true); setSelectedSolarPanelsRemains(Array[0]); setSelectedCarChargingStationRemains(Array[1]); setSelectedAirConditionerUnitRemains(Array[2]); setSelectedAirPurifierRemains(Array[3]); setSelectedAtticFanRemains(Array[4]); setSelectedGeneratorRemains(Array[5]); setSelectedHumidifierRemains(Array[6]); setSelectedDehumidifierRemains(Array[7]); setSelectedHotTubRemains(Array[8]); setSelectedWaterPurifierRemains(Array[9]); setSelectedWaterSoftenerRemains(Array[10]); setSelectedPropaneTankRemains(Array[11]); setSelectedFuelOilTankRemains(Array[12]); setSelectedWellPumpRemains(Array[13]); setSelectedSumpPumpRemains(Array[14]); setSelectedSeweragePumpRemains(Array[15]); }} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>4. INTERIOR SYSTEMS</MintParagraph>
            <MultipleChoiceParent multipleSelectable buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={[{ text: 'Window Blinds' }, { text: 'Window Curtains' }, { text: 'Window Shutters' }, { text: 'Window Hardware' }, { text: 'Ceiling Fans' }, { text: 'Light Fixtures' }, { text: 'Shelving Systems' }, { text: 'Storage Systems' }, { text: 'Closet Systems' }, { text: 'Fireplace' }, { text: 'Fireplace Accessories' }, { text: 'Mirror' }, { text: 'Shower Head' }, { text: 'Built-In Safe' }]} defaultChecks={([selectedWindowBlindsRemains, selectedWindowCurtainsRemains, selectedWindowShuttersRemains, selectedWindowHardwareRemains, selectedCeilingFansRemains, selectedLightFixturesRemains, selectedShelvingSystemsRemains, selectedStorageSystemsRemains, selectedClosetSystemsRemains, selectedFireplaceRemains, selectedFireplaceAccessoriesRemains, selectedMirrorRemains, selectedShowerheadRemains, selectedBuiltInSafeRemains])} onSelection={(Array) => { setFinishedInteriorSystems(true); setSelectedWindowBlindsRemains(Array[0]); setSelectedWindowCurtainsRemains(Array[1]); setSelectedWindowShuttersRemains(Array[2]); setSelectedWindowHardwareRemains(Array[3]); setSelectedCeilingFansRemains(Array[4]); setSelectedLightFixturesRemains(Array[5]); setSelectedShelvingSystemsRemains(Array[6]); setSelectedStorageSystemsRemains(Array[7]); setSelectedClosetSystemsRemains(Array[8]); setSelectedFireplaceRemains(Array[9]); setSelectedFireplaceAccessoriesRemains(Array[10]); setSelectedMirrorRemains(Array[11]); setSelectedShowerheadRemains(Array[12]); setSelectedBuiltInSafeRemains(Array[13]) }} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>5. OUTDOOR SYSTEMS</MintParagraph>
            <MultipleChoiceParent multipleSelectable buttonHeight='64px' fontSize='20' useChecks style={{ margin: "5px 0 36px 0" }} choices={[{ text: 'Gas Grill' }, { text: 'Outdoor Furniture' }, { text: 'Pool & Equipment' }, { text: 'Sauna' }, { text: 'Outdoor Kitchen' }, { text: 'Basketball System' }, { text: 'Kid’s Play System' }, { text: 'Doghouse' }, { text: 'Storage Building' }, { text: 'Swing' }, { text: 'Gazebo' }, { text: 'Outdoor Lighting' }, { text: 'Arbor' }, { text: 'Mailbox' }]} defaultChecks={([selectedGasGrillRemains, selectedOutdoorFurnitureRemains, selectedPoolAndEquipmentRemains, selectedSaunaRemains, selectedOutdoorKitchenRemains, selectedBasketballSystemRemains, selectedKidsPlaySystemRemains, selectedDoghouseRemains, selectedStorageBuildingRemains, selectedSwingRemains, selectedGazeboRemains, selectedOutdoorLightingRemains, selectedArborRemains, selectedMailboxRemains])} onSelection={(Array) => { setFinishedOutdoorSystems(true); setSelectedGasGrillRemains(Array[0]); setSelectedOutdoorFurnitureRemains(Array[1]); setSelectedPoolAndEquipmentRemains(Array[2]); setSelectedSaunaRemains(Array[3]); setSelectedOutdoorKitchenRemains(Array[4]); setSelectedBasketballSystemRemains(Array[5]); setSelectedKidsPlaySystemRemains(Array[6]); setSelectedDoghouseRemains(Array[7]); setSelectedStorageBuildingRemains(Array[8]); setSelectedSwingRemains(Array[9]); setSelectedGazeboRemains(Array[10]); setSelectedOutdoorLightingRemains(Array[11]); setSelectedArborRemains(Array[12]); setSelectedMailboxRemains(Array[13]) }} />

            <MintParagraph size='24' weight='regular' style={{ marginTop: '24px', marginBottom: '24px' }}>6. OTHER SYSTEMS</MintParagraph>
            <StyledInputWithSuperText style={{ marginBottom: '24px' }} label='1. System One' value={selectedOtherSystemOne ? selectedOtherSystemOne : ""} onChange={(e) => setSelectedOtherSystemOne(e.target.value)} />
            <StyledInputWithSuperText style={{ marginBottom: '24px' }} label='2. System two' value={selectedOtherSystemTwo ? selectedOtherSystemTwo : ""} onChange={(e) => setSelectedOtherSystemTwo(e.target.value)} />
            <StyledInputWithSuperText style={{ marginBottom: '24px' }} label='3. System three' value={selectedOtherSystemThree ? selectedOtherSystemThree : ""} onChange={(e) => setSelectedOtherSystemThree(e.target.value)} />
            <StyledInputWithSuperText style={{ marginBottom: '24px' }} label='4. System four' value={selectedOtherSystemFour ? selectedOtherSystemFour : ""} onChange={(e) => setSelectedOtherSystemFour(e.target.value)} />
            <StyledInputWithSuperText style={{ marginBottom: '24px' }} label='5. System five' value={selectedOtherSystemFive ? selectedOtherSystemFive : ""} onChange={(e) => setSelectedOtherSystemFive(e.target.value)} />
            <StyledInputWithSuperText style={{ marginBottom: '24px' }} label='6. System six' value={selectedOtherSystemSix ? selectedOtherSystemSix : ""} onChange={(e) => setSelectedOtherSystemSix(e.target.value)} />
            <StyledInputWithSuperText style={{ marginBottom: '24px' }} label='7. System seven' value={selectedOtherSystemSeven ? selectedOtherSystemSeven : ""} onChange={(e) => setSelectedOtherSystemSeven(e.target.value)} />
            <ParagraphStyledInput style={{ marginBottom: '24px' }} label='The Seller provides the following additional information (if any) to disclose any material details about the condition of the Property not already discussed:' value={selectedSellerAddtionalDetails ? selectedSellerAddtionalDetails : ""} onChange={(e) => setSelectedSellerAddtionalDetails(e.target.value)} />
            {showFinishedModal && (
              <BasicParentModal closeModal={closeModal}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'flex-start', padding: '12px', }}>
            
                  <MintParagraph size={isMobile ? "32" : '24'} weight="medium">Seller Disclosure Complete!</MintParagraph>
                  <MintParagraph size={isMobile ? '16' : '18'} weight="regular" style={{ marginTop: "16px", marginBottom: "72px" }}>Thanks for finishing your seller onboarding. You&apos;re Housewell advisor will reach out to you if there is anything else to complete. Don&apos;t hesitate to ask questions in the meantime.</MintParagraph>

                  <SecondaryButton size="medium" onClick={closeModal} text="Acknowledge" hasArrow style={{ width: "100%" }} />
                  </div>

              </BasicParentModal>
          )}
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

export default SellerDisclosure9;