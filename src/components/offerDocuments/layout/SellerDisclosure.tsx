import { Document, StyleSheet, PDFViewer, Font, BlobProvider, Text } from "@react-pdf/renderer";
import dateFormat from "dateformat";
import Page1 from "../documents/sellerdisclosure/Page1";
import Page2 from "../documents/sellerdisclosure/Page2";
import Page3 from "../documents/sellerdisclosure/Page3";
import Page4 from "../documents/sellerdisclosure/Page4";
import Page5 from "../documents/sellerdisclosure/Page5";
import Page6 from "../documents/sellerdisclosure/Page6";
import Page7 from "../documents/sellerdisclosure/Page7";
import Page8 from "../documents/sellerdisclosure/Page8";
import { useDevice } from "../../../contexts/DeviceContext";
import { OfferModel } from "../../../models/offerModel";
import { PropertyModel } from "../../../slices/properties";
import { useAppSelector } from "../../../store";
import { sellerDisclosureModel } from "../../../models/sellerDisclosureModel";

const SellerDisclosure = (props: { offer: OfferModel; property: PropertyModel; currentDateString: string; currentPage: number; }) => {
    const sellerDisclosureProperty: sellerDisclosureModel = useAppSelector((state) => state.sellerDisclosureReducer.sellerDisclosureProperty);

    const {
        legalAuthority,
        yearsOwned,
        monthsOwned,
        isOccupied,
        hasSellerOccupied,
        isRented,
        leaseExpiration,
        hasHOA,
        hasHOAViolations,
        hasCCAndRs,
        isHistoric,
        hasOtherRestrictions,
        otherRestrictionsText,
        hasEncroachmentsOrBoundaryDisputes,
        hasEasements,
        hasZoningCodeViolations,
        hasDeedRestrictions,
        sellerHasLeins,
        hasLawsuitsOrLeins,
        hasInsuranceClaims,
        insuranceClaimsText,
        hasGovernmentNotices,
        isAgricultural,
        hasKnownAdverseTitleConditions,
        adverseTitleConditionsText,
        servicePanelState,
        naturalGasState,
        hasNatGasFurnace,
        hasNatGasWaterHeater,
        hasNatGasStove,
        hasNatGasFireplace,
        securitySystemState,
        securitySystemOwned,
        smokeDetectorsState,
        carbonMonoxideDetectorsState,
        garageDoorState,
        garageDoorOpenerType,
        electricalExtraInfo,
        presentDamageRoof,
        yearsOldRoof,
        roofRepairs,
        waterDamage,
        waterDamageDate,
        waterDamageLocation,
        waterDamageRepairs,
        fireWindDamage,
        fireWindDamageDate,
        fireWindDamageLocation,
        fireWindDamageRepairs,
        windowsWorkable,
        foundationDamage,
        floorsDamage,
        wallsDamage,
        drivewayDamage,
        balconyDamage,
        sidingDamage,
        exteriorWallsDamage,
        improvementsWithPermits,
        concealedDefects,
        structureExtraInfo,
        hasHVAC,
        hvacNeedsRepair,
        hvacInstalled,
        hvacLastServiced,
        hasHeatingSystem,
        heatingNeedsRepair,
        heatingInstalled,
        heatingLastServiced,
        fireplaceFunctioning,
        fireplaceLastServiced,
        partOfHomeNoHVAC,
        partOfHomeNoHVACDescription,
        hvacExtraInfo,
        hasPublicSewer,
        publicSewerFunctional,
        hasSepticSystem,
        septicSystemFunctional,
        septicSystemMeetsMinRequirements,
        septicSystemLastServiced,
        hasPrivateSewer,
        privateSewerFunctional,
        hasPumpSump,
        pumpSumpDischarge,
        plumbingIssues,
        wellSystem,
        wellSystemNeedsRepar,
        wellSystemWaterLastTested,
        notifiedOfWellWaterIssues,
        waterHeaterFunctional,
        waterHeaterInstalled,
        sewerLineIssues,
        waterLinesFrozenOrDamaged,
        installedSprinklerSystem,
        sprinklerSystemNeedsRepair,
        propertyContainsPolybutylenePiping,
        additionalPlumbingInfo,
        wasConstructedBefore1978,
        hasAsbestos,
        hasRadon,
        hasMold,
        hasContaminatedSoil,
        trashDumpNearby,
        undergroundFuelOrChemicalStorageTank,
        hasMethtamphetamine,
        inFloodPlain,
        gradingFloodingOrDrainageIssues,
        hasUndergroundSprings,
        hasSoilMovement,
        environmentalExtraInfo,
        infestationDamage,
        underPestControlWarranty,
        petsOrAnimals,
        damagedOrDiseasedTrees,
        ovenStoveRemains,
        rangeRemains,
        rangeVentilatorRemains,
        cooktopRemains,
        refrigeratorRemains,
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
    } = sellerDisclosureProperty[props.property.id];

    const { isMobile } = useDevice();
    Font.register({
        family: "Roboto",
        fonts: [
            {
                src: "./fonts/Roboto-Regular.ttf",
                fontWeight: 400,
            },
            {
                src: "./fonts/Roboto-Medium.ttf",
                fontWeight: 500,
            },
            {
                src: "./fonts/Roboto-Bold.ttf",
                fontWeight: 700
            }
        ]
    });

    Font.register({
        family: "Roboto_Italic",
        fonts: [
            {
                src: "./fonts/Roboto-Italic.ttf",
                fontWeight: 400
            }
        ]
    });

    const pageStyles = StyleSheet.create({
        page: {
            flexDirection: "column",
            backgroundColor: "#ffffff",
            fontSize: 10,
            padding: 30
        },
        title: {
            textAlign: "center"
        }
    });

    let templateValues = {
        exhibit: `"B"`,
        agreement_date: props.currentDateString,
        yearsOwned: yearsOwned ? yearsOwned : "___________",
        monthsOwned: monthsOwned ? monthsOwned : "___________",
        leaseExpiration: leaseExpiration
            ? dateFormat(new Date(leaseExpiration), "yyyy-mm-dd")
            : "________________________",
        legalAuthority,
        isOccupied,
        hasSellerOccupied,
        isRented,
        hasHOA,
        hasHOAViolations,
        hasCCAndRs,
        isHistoric,
        otherRestrictionsText: otherRestrictionsText
            ? otherRestrictionsText
            : "____________________________________________________",
        hasOtherRestrictions,
        hasEncroachmentsOrBoundaryDisputes,
        hasEasements,
        hasZoningCodeViolations,
        hasDeedRestrictions,
        sellerHasLeins,
        hasLawsuitsOrLeins,
        hasInsuranceClaims,
        insuranceClaimsText: insuranceClaimsText
            ? insuranceClaimsText
            : "_____________________________________________________",
        hasGovernmentNotices,
        isAgricultural,
        hasKnownAdverseTitleConditions,
        adverseTitleConditionsText: adverseTitleConditionsText
            ? adverseTitleConditionsText
            : "",
        servicePanelState,
        naturalGasState,
        hasNatGasFurnace,
        hasNatGasWaterHeater,
        hasNatGasStove,
        hasNatGasFireplace,
        securitySystemState,
        securitySystemOwned,
        smokeDetectorsState,
        carbonMonoxideDetectorsState,
        garageDoorState,
        garageDoorOpenerType,
        electricalExtraInfo: electricalExtraInfo ? electricalExtraInfo : "",
        yearsOldRoof: yearsOldRoof ? yearsOldRoof : "_________________________",
        presentDamageRoof,
        roofRepairs,
        waterDamage,
        waterDamageDate: waterDamageDate
            ? dateFormat(new Date(waterDamageDate), "yyyy-mm-dd")
            : "_________________________",
        waterDamageLocation: waterDamageLocation
            ? waterDamageLocation
            : "_________________________",
        waterDamageRepairs,
        fireWindDamage,
        fireWindDamageDate: fireWindDamageDate
            ? dateFormat(new Date(fireWindDamageDate), "yyyy-mm-dd")
            : "_________________________",
        fireWindDamageLocation: fireWindDamageLocation
            ? fireWindDamageLocation
            : "_________________________",
        fireWindDamageRepairs,
        windowsWorkable,
        foundationDamage,
        floorsDamage,
        wallsDamage,
        drivewayDamage,
        balconyDamage,
        sidingDamage,
        exteriorWallsDamage,
        improvementsWithPermits,
        concealedDefects,
        structureExtraInfo: structureExtraInfo ? structureExtraInfo : "",
        hasHVAC,
        hvacNeedsRepair,
        hvacInstalled: hvacInstalled ? dateFormat(new Date(hvacInstalled), "yyyy-mm-dd") : "___________________",
        hvacLastServiced: hvacLastServiced
            ? dateFormat(new Date(hvacLastServiced), "yyyy-mm-dd")
            : "___________________",
        hasHeatingSystem,
        heatingNeedsRepair,
        heatingInstalled: heatingInstalled
            ? dateFormat(new Date(heatingInstalled), "yyyy-mm-dd")
            : "___________________",
        heatingLastServiced: heatingLastServiced
            ? dateFormat(new Date(heatingLastServiced), "yyyy-mm-dd")
            : "___________________",
        fireplaceFunctioning,
        fireplaceLastServiced: fireplaceLastServiced
            ? dateFormat(new Date(fireplaceLastServiced), "yyyy-mm-dd")
            : "___________________",
        partOfHomeNoHVAC,
        partOfHomeNoHVACDescription: partOfHomeNoHVACDescription
            ? partOfHomeNoHVACDescription
            : "___________________",
        hvacExtraInfo: hvacExtraInfo ? hvacExtraInfo : "",
        hasPublicSewer,
        publicSewerFunctional,
        hasSepticSystem,
        septicSystemFunctional,
        septicSystemMeetsMinRequirements,
        septicSystemLastServiced: septicSystemLastServiced
            ? dateFormat(new Date(septicSystemLastServiced), "yyyy-mm-dd")
            : "___________________",
        hasPrivateSewer,
        privateSewerFunctional,
        hasPumpSump,
        pumpSumpDischarge: pumpSumpDischarge
            ? pumpSumpDischarge
            : "___________________",
        plumbingIssues,
        wellSystem,
        wellSystemNeedsRepar,
        wellSystemWaterLastTested: wellSystemWaterLastTested ? dateFormat(new Date(wellSystemWaterLastTested), "yyyy-mm-dd") : "___________________",
        notifiedOfWellWaterIssues,
        waterHeaterFunctional,
        waterHeaterInstalled: waterHeaterInstalled ? dateFormat(new Date(waterHeaterInstalled), "yyyy-mm-dd") : "___________________",
        sewerLineIssues,
        waterLinesFrozenOrDamaged,
        installedSprinklerSystem,
        sprinklerSystemNeedsRepair,
        propertyContainsPolybutylenePiping,
        additionalPlumbingInfo: additionalPlumbingInfo
            ? additionalPlumbingInfo
            : "",
        wasConstructedBefore1978,
        hasAsbestos,
        hasRadon,
        hasMold,
        hasContaminatedSoil,
        trashDumpNearby,
        undergroundFuelOrChemicalStorageTank,
        hasMethtamphetamine,
        inFloodPlain,
        gradingFloodingOrDrainageIssues,
        hasUndergroundSprings,
        hasSoilMovement,
        environmentalExtraInfo,
        infestationDamage,
        underPestControlWarranty,
        petsOrAnimals,
        damagedOrDiseasedTrees,
        ovenStoveRemains,
        rangeRemains,
        rangeVentilatorRemains,
        cooktopRemains,
        refrigeratorRemains,
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
        outdoorLightingRemains,
        gazeboRemains,
        swingRemains,
        arborRemains,
        mailboxRemains,
        hasOtherSystemOne: otherSystemOne ? true : false,
        hasOtherSystemTwo: otherSystemTwo ? true : false,
        hasOtherSystemThree: otherSystemThree ? true : false,
        hasOtherSystemFour: otherSystemFour ? true : false,
        hasOtherSystemFive: otherSystemFive ? true : false,
        hasOtherSystemSix: otherSystemSix ? true : false,
        hasOtherSystemSeven: otherSystemSeven ? true : false,
        otherSystemOne: otherSystemOne ? otherSystemOne : "_________________",
        otherSystemTwo: otherSystemTwo ? otherSystemTwo : "_________________",
        otherSystemThree: otherSystemThree ? otherSystemThree : "_________________",
        otherSystemFour: otherSystemFour ? otherSystemFour : "_________________",
        otherSystemFive: otherSystemFive ? otherSystemFive : "_________________",
        otherSystemSix: otherSystemSix ? otherSystemSix : "_________________",
        otherSystemSeven: otherSystemSeven ? otherSystemSeven : "_________________",
        footer: [
            {
                buyer: {
                    title: "BUYER 1",
                    signature: "________________________________",
                    name: "___________________________________",
                    date: "____________________________________"
                },
                seller: {
                    title: "SELLER 1",
                    signature: "________________________________",
                    name: "___________________________________",
                    date: "____________________________________"
                }
            },
            {
                buyer: {
                    title: "BUYER 2",
                    signature: "________________________________",
                    name: "___________________________________",
                    date: "____________________________________"
                },
                seller: {
                    title: "SELLER 2",
                    signature: "________________________________",
                    name: "___________________________________",
                    date: "____________________________________"
                }
            }
        ]
    };
    const SellerDisclosureMobile = (props: { currentPage: number }) => {
        return (
          <Document>
            {props.currentPage === 1 && <Page1
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={1}
                />}
            {props.currentPage === 2 &&                 <Page2
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={2}
                />}
            {props.currentPage === 3 &&                 <Page3
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={3}></Page3>}
            {props.currentPage === 4 &&                 <Page4
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={4}
                />}
            {props.currentPage === 5 &&                 <Page5
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={5}
                />}
            {props.currentPage === 6 &&                 <Page6
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={6}
                />}
            {props.currentPage === 7 &&                 <Page7
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={7}
                />}
            {props.currentPage === 8 &&                 <Page8
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={8}
                />}
                
          </Document>
        );
      }


    if (isMobile) {
        return (
          <BlobProvider document={<SellerDisclosureMobile currentPage={props.currentPage} />}>
            {({ blob, url, loading, error }) => {
              if (error) {
                return <Text>An error occurred</Text>;
              }
              if (!url) {
                return <Text>Document not available</Text>;
              }
              // Now we're sure `url` is not null, we can use it safely
              return (
                <object data={url} type="application/pdf" style={{height: isMobile ? 'calc(100vh - 51px)' : 'calc(100vh - 71px)', width: "100%" }}>
                  <a href={url} download="document.pdf">Download PDF</a>
                </object>
              );
            }}
          </BlobProvider>
    
        );
      }

    return (
        <PDFViewer style={{height: isMobile ? 'calc(100vh - 51px)' : 'calc(100vh - 71px)', width: "100%" }}>
            <Document>
                <Page1
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={1}
                />
                <Page2
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={2}
                />
                <Page3
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={3}
                />
                <Page4
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={4}
                />
                <Page5
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={5}
                />
                <Page6
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={6}
                />
                <Page7
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={7}
                />
                <Page8
                    templateValues={templateValues}
                    pageStyles={pageStyles}
                    number={8}
                />
            </Document>
        </PDFViewer>
    );
};

export default SellerDisclosure;
