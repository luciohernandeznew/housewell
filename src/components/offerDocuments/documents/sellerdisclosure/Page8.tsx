import { Page, Text, View } from "@react-pdf/renderer";
import { TextBold, Table, Checkbox } from "../../documentComponents";

type PropType = {
    templateValues: any;
    pageStyles: any;
    number: any;
};

const Page8: React.FC<PropType> = ({ templateValues, pageStyles, number }) => {
    const {
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
        hasOtherSystemOne,
        hasOtherSystemTwo,
        hasOtherSystemThree,
        hasOtherSystemFour,
        hasOtherSystemFive,
        hasOtherSystemSix,
        hasOtherSystemSeven,
        otherSystemOne,
        otherSystemTwo,
        otherSystemThree,
        otherSystemFour,
        otherSystemFive,
        otherSystemSix,
        otherSystemSeven
    } = templateValues;

    let appliances = [
        {
            title: "Oven/Stove",
            isCheck: ovenStoveRemains
        },
        {
            title: "Range",
            isCheck: rangeRemains
        },
        {
            title: "Range Ventilator",
            isCheck: rangeVentilatorRemains
        },
        {
            title: "Cooktop",
            isCheck: cooktopRemains
        },
        {
            title: "Refrigerator",
            isCheck: refrigeratorRemains
        },
        {
            title: "Freezer",
            isCheck: freezerRemains
        },
        {
            title: "Microwave Oven",
            isCheck: microwaveOvenRemains
        },
        {
            title: "Built-In Vacuum System",
            isCheck: builtInVacuumSystemRemains
        },
        {
            title: "Ice Maker",
            isCheck: iceMakerRemains
        },
        {
            title: "Dishwasher",
            isCheck: dishwasherRemains
        },
        {
            title: "Wine Cooler",
            isCheck: wineCoolerRemains
        },
        {
            title: "Garbage Disposal",
            isCheck: garbageDisposalRemains
        },
        {
            title: "Trash Compactor",
            isCheck: trashCompactorRemains
        },
        {
            title: "Washing Machine",
            isCheck: washingMachineRemains
        },
        {
            title: "Clothes Dryer",
            isCheck: clothesDryerRemains
        }
    ];

    let safety_system = [
        {
            title: "Security Camera",
            isCheck: securityCameraRemains
        },
        {
            title: "Alarm Systems",
            isCheck: alarmSystemsRemains
        },
        {
            title: "Smoke Detector",
            isCheck: smokeDetectorRemains
        },
        {
            title: "Carbon Monoxide",
            isCheck: carbonMonoxideRemains
        },
        {
            title: "Window Screens",
            isCheck: windowScreensRemains
        },
        {
            title: "Window Security Gate",
            isCheck: windowSecurityGateRemains
        },
        {
            title: "Door Locks",
            isCheck: doorLocksRemains
        },
        {
            title: "Fire Sprinkler System",
            isCheck: fireSprinklerSystemRemains
        }
    ];

    let home_system = [
        {
            title: "Solar Panels",
            isCheck: solarPanelsRemains
        },
        {
            title: "Car Charging Station",
            isCheck: carChargingStationRemains
        },
        {
            title: "Air Conditioner Unit",
            isCheck: airConditionerUnitRemains
        },
        {
            title: "Air Purifier",
            isCheck: airPurifierRemains
        },
        {
            title: "Attic Fan",
            isCheck: atticFanRemains
        },
        {
            title: "Generator",
            isCheck: generatorRemains
        },
        {
            title: "Humidifier",
            isCheck: humidifierRemains
        },
        {
            title: "Dehumidifier",
            isCheck: dehumidifierRemains
        },
        {
            title: "Hot Tub",
            isCheck: hotTubRemains
        },
        {
            title: "Water Purifier",
            isCheck: waterPurifierRemains
        },
        {
            title: "Water Softener",
            isCheck: waterSoftenerRemains
        },
        {
            title: "Propane Tank",
            isCheck: propaneTankRemains
        },
        {
            title: "Fuel Oil Tank",
            isCheck: fuelOilTankRemains
        },
        {
            title: "Well Pump",
            isCheck: wellPumpRemains
        },
        {
            title: "Sump Pump",
            isCheck: sumpPumpRemains
        },
        {
            title: "Sewerage Pump",
            isCheck: seweragePumpRemains
        }
    ];

    let other_system = [
        {
            title: <TextBold>{otherSystemOne}</TextBold>,
            isCheck: hasOtherSystemOne
        },
        {
            title: <TextBold>{otherSystemTwo}</TextBold>,
            isCheck: hasOtherSystemTwo
        },
        {
            title: <TextBold>{otherSystemThree}</TextBold>,
            isCheck: hasOtherSystemThree
        },
        {
            title: <TextBold>{otherSystemFour}</TextBold>,
            isCheck: hasOtherSystemFour
        },
        {
            title: <TextBold>{otherSystemFive}</TextBold>,
            isCheck: hasOtherSystemFive
        },
        {
            title: <TextBold>{otherSystemSix}</TextBold>,
            isCheck: hasOtherSystemSix
        },
        {
            title: <TextBold>{otherSystemSeven}</TextBold>,
            isCheck: hasOtherSystemSeven
        }
    ];

    let interior_system = [
        {
            title: "Window Blinds",
            isCheck: windowBlindsRemains
        },
        {
            title: "Window Curtains",
            isCheck: windowCurtainsRemains
        },
        {
            title: "Window Shutters",
            isCheck: windowShuttersRemains
        },
        {
            title: "Window Hardware",
            isCheck: windowHardwareRemains
        },
        {
            title: "Ceiling Fans",
            isCheck: ceilingFansRemains
        },
        {
            title: "Light Fixtures",
            isCheck: lightFixturesRemains
        },
        {
            title: "Shelving Systems",
            isCheck: shelvingSystemsRemains
        },
        {
            title: "Storage Systems",
            isCheck: storageSystemsRemains
        },
        {
            title: "Closet Systems",
            isCheck: closetSystemsRemains
        },
        {
            title: "Fireplace",
            isCheck: fireplaceRemains
        },
        {
            title: "Fireplace Accessories",
            isCheck: fireplaceAccessoriesRemains
        },
        {
            title: "Mirror",
            isCheck: mirrorRemains
        },
        {
            title: "Shower Head",
            isCheck: showerheadRemains
        },
        {
            title: "Built-In Safe",
            isCheck: builtInSafeRemains
        }
    ];

    let outdoor_system = [
        {
            title: "Gas Grill",
            isCheck: gasGrillRemains
        },
        {
            title: "Outdoor Furniture",
            isCheck: outdoorFurnitureRemains
        },
        {
            title: "Pool & Equipment",
            isCheck: poolAndEquipmentRemains
        },
        {
            title: "Hot Tub",
            isCheck: hotTubRemains
        },
        {
            title: "Sauna",
            isCheck: saunaRemains
        },
        {
            title: "Outdoor Kitchen",
            isCheck: outdoorKitchenRemains
        },
        {
            title: "Basketball System",
            isCheck: basketballSystemRemains
        },
        {
            title: "Kid’s Play System",
            isCheck: kidsPlaySystemRemains
        },
        {
            title: "Doghouse",
            isCheck: doghouseRemains
        },
        {
            title: "Storage Building",
            isCheck: storageBuildingRemains
        },
        {
            title: "Swing",
            isCheck: swingRemains
        },
        {
            title: "Gazebo",
            isCheck: gazeboRemains
        },
        {
            title: "Outdoor Lighting",
            isCheck: outdoorLightingRemains
        },
        {
            title: "Arbor",
            isCheck: arborRemains
        },
        {
            title: "Mailbox",
            isCheck: mailboxRemains
        }
    ];

    const footerItem = (index: any, buyer: any, seller: any) => {
        return (
            <View
                key={index}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 10,
                }}>
                <View
                    style={{
                        width: "50%",
                        padding: "10px"
                    }}
                >
                    <TextBold>{buyer.title}</TextBold>
                    <Text style={{ marginTop: "12px" }}>Signature: {buyer.signature}</Text>
                    <Text style={{ marginTop: "12px" }}>Name: {buyer.name}</Text>
                    <Text style={{ marginTop: "12px" }}>Date: {buyer.date}</Text>
                </View>
                <View
                    style={{
                        width: "50%",
                        padding: "10px"
                    }}
                >
                    <TextBold>{seller.title}</TextBold>
                    <Text style={{ marginTop: "12px" }}>Signature: {seller.signature}</Text>
                    <Text style={{ marginTop: "12px" }}>Name: {seller.name}</Text>
                    <Text style={{ marginTop: "12px" }}>Date: {seller.date}</Text>
                </View>
            </View>
        );
    };

    return (
        <Page size="A4" style={pageStyles.page}>
            <Table>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        borderBottomWidth: 1,
                        borderColor: "black",
                        borderStyle: "solid"
                    }}
                >
                    <View
                        style={{
                            width: "25%",
                            borderRightWidth: 1,
                            borderColor: "black",
                            borderStyle: "solid",
                            fontWeight: 700
                        }}
                    >
                        <TextBold style={{ marginTop: "5px" }}>1. APPLIANCES</TextBold>
                        <View style={{ padding: "2px" }}>
                            {appliances.map((item, index) => {
                                return (
                                    <Text key={index} style={{ marginTop: "2px" }}>
                                        <Checkbox isChecked={item.isCheck} /> &nbsp; {item.title}
                                    </Text>
                                );
                            })}
                        </View>
                        <TextBold style={{ marginTop: "2px" }}>2. SAFETY SYSTEMS</TextBold>
                        <View style={{ padding: "2px" }}>
                            {safety_system.map((item, index) => {
                                return (
                                    <Text key={index} style={{ marginTop: "2px" }}>
                                        <Checkbox isChecked={item.isCheck} /> &nbsp; {item.title}
                                    </Text>
                                );
                            })}
                        </View>
                    </View>
                    <View
                        style={{
                            width: "25%",
                            borderRightWidth: 1,
                            borderColor: "black",
                            borderStyle: "solid",
                            fontWeight: 700
                        }}
                    >
                        <TextBold style={{ marginTop: "5px" }}>3. Home SYSTEMS</TextBold>
                        <View style={{ padding: "2px" }}>
                            {home_system.map((item, index) => {
                                return (
                                    <Text key={index} style={{ marginTop: "2px" }}>
                                        <Checkbox isChecked={item.isCheck} /> &nbsp; {item.title}
                                    </Text>
                                );
                            })}
                        </View>
                        <TextBold>OTHER SYSTEMS</TextBold>
                        <View style={{ padding: "2px" }}>
                            {other_system.map((item, index) => {
                                return (
                                    <Text key={index} style={{ marginTop: "2px" }}>
                                        <Checkbox isChecked={item.isCheck} /> &nbsp; {item.title}
                                    </Text>
                                );
                            })}
                        </View>
                    </View>
                    <View
                        style={{
                            width: "25%",
                            borderRightWidth: 1,
                            borderColor: "black",
                            borderStyle: "solid",
                            fontWeight: 700
                        }}
                    >
                        <TextBold style={{ marginTop: "5px" }}>4.INTERIOR SYSTEMS</TextBold>
                        <View style={{ padding: "2px" }}>
                            {interior_system.map((item, index) => {
                                return (
                                    <Text key={index} style={{ marginTop: "2px" }}>
                                        <Checkbox isChecked={item.isCheck} /> &nbsp; {item.title}
                                    </Text>
                                );
                            })}
                        </View>
                    </View>
                    <View
                        style={{
                            width: "25%",
                            borderRightWidth: 1,
                            borderColor: "black",
                            borderStyle: "solid",
                            fontWeight: 700
                        }}
                    >
                        <TextBold style={{ marginTop: "5px" }}>5.OUTDOOR SYSTEMS</TextBold>
                        <View style={{ padding: "2px" }}>
                            {outdoor_system.map((item, index) => {
                                return (
                                    <Text key={index} style={{ marginTop: "2px" }}>
                                        <Checkbox isChecked={item.isCheck} /> &nbsp; {item.title}
                                    </Text>
                                );
                            })}
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: "black",
                        borderStyle: "solid",
                        fontWeight: 700,
                        padding: "2px",
                        height: "150px"
                    }}
                >
                    <TextBold>
                        The Seller provides the following additional information (if any) to
                        disclose any material details about the condition of the Property
                        not already discussed:
                    </TextBold>
                </View>
            </Table>
            <Text>
                <TextBold>IN WITNESS WHEREOF,</TextBold> the parties have executed this
                Amendment as of the date first written above.
            </Text>
            <View style={{ display: 'flex' }}>
                <View
                    style={{
                        borderStyle: "dotted",
                        borderWidth: "1px",
                        marginTop: "30px"
                    }}
                >
                    {templateValues.footer.length > 0 && (
                        templateValues.footer.map((item: any, index: any) => {
                            return footerItem(index, item.buyer, item.seller)
                        })
                    )}
                </View>
            </View>
        </Page>
    );
};

export default Page8;
