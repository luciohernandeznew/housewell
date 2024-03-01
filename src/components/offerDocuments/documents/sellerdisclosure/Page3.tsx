import { Page, Text, View } from "@react-pdf/renderer";
import { Table, TableHeaderItem, TableBodyItem, TextBold } from "../../documentComponents";

type PropType = {
    templateValues: any;
    pageStyles: any;
    number: any;
};

const Page3: React.FC<PropType> = ({ templateValues, pageStyles, number }) => {
    const {
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
        electricalExtraInfo
    } = templateValues;
    let C_fist_columnArray = [

        {
            title: (
                <>
                    <Text>
                        Is there present damage to the roof or any part of the roofing
                        system, (roof’s flashing, downspouts, and gutters)?
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        What is the current age of the roof (years)?{" "}
                        <TextBold>{yearsOldRoof}</TextBold>.
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        Are there any repairs made to the roof or roofing system?
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: presentDamageRoof === "YES" ? true : false,
                    no_value: presentDamageRoof === "NO" ? true : false,
                    un_value: presentDamageRoof === "UNKNOWN" ? true : false
                },
                {
                    yes_value: false,
                    no_value: false,
                    un_value: false
                },
                {
                    yes_value: roofRepairs === "YES" ? true : false,
                    no_value: roofRepairs === "NO" ? true : false,
                    un_value: roofRepairs === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <>
                    <Text>
                        Has the basement, garage, crawl space or any part of the Property
                        been damaged by water or flooding?{" "}
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        Provide the date of damage? <TextBold>{waterDamageDate}</TextBold>.
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        Provide the location damage?{" "}
                        <TextBold>{waterDamageLocation}</TextBold>.
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        Has the damage been repaired?
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: waterDamage === "YES" ? true : false,
                    no_value: waterDamage === "NO" ? true : false,
                    un_value: waterDamage === "UNKNOWN" ? true : false
                },
                {
                    yes_value: false,
                    no_value: false,
                    un_value: false
                },
                {
                    yes_value: false,
                    no_value: false,
                    un_value: false
                },
                {
                    yes_value: waterDamageRepairs === "YES" ? true : false,
                    no_value: waterDamageRepairs === "NO" ? true : false,
                    un_value: waterDamageRepairs === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <>
                    <Text>Has the Property ever experienced a fire or wind damage?</Text>
                    <Text style={{ marginTop: "10px" }}>
                        Provide the date of damage?{" "}
                        <TextBold>{fireWindDamageDate}</TextBold>.
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        Provide the location damage?{" "}
                        <TextBold>{fireWindDamageLocation}</TextBold>.
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        Has the damage been repaired?
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: fireWindDamage === "YES" ? true : false,
                    no_value: fireWindDamage === "NO" ? true : false,
                    un_value: fireWindDamage === "UNKNOWN" ? true : false
                },
                {
                    yes_value: false,
                    no_value: false,
                    un_value: false
                },
                {
                    yes_value: false,
                    no_value: false,
                    un_value: false
                },
                {
                    yes_value: fireWindDamageRepairs === "YES" ? true : false,
                    no_value: fireWindDamageRepairs === "NO" ? true : false,
                    un_value: fireWindDamageRepairs === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <>
                    <Text>
                        Are the windows in the Property workable and properly sealed?
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: windowsWorkable === "YES" ? true : false,
                    no_value: windowsWorkable === "NO" ? true : false,
                    un_value: windowsWorkable === "UNKNOWN" ? true : false
                }
            ]
        }
    ];
    let C_second_columnArray = [
        {
            title: <Text>Foundation</Text>,
            check: [
                {
                    yes_value: foundationDamage === "YES" ? true : false,
                    no_value: foundationDamage === "NO" ? true : false,
                    un_value: foundationDamage === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: <Text>Floors</Text>,
            check: [
                {
                    yes_value: floorsDamage === "YES" ? true : false,
                    no_value: floorsDamage === "NO" ? true : false,
                    un_value: floorsDamage === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: <Text>Walls</Text>,
            check: [
                {
                    yes_value: wallsDamage === "YES" ? true : false,
                    no_value: wallsDamage === "NO" ? true : false,
                    un_value: wallsDamage === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: <Text>Driveway</Text>,
            check: [
                {
                    yes_value: drivewayDamage === "YES" ? true : false,
                    no_value: drivewayDamage === "NO" ? true : false,
                    un_value: drivewayDamage === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: <Text>Balcony or Patio</Text>,
            check: [
                {
                    yes_value: balconyDamage === "YES" ? true : false,
                    no_value: balconyDamage === "NO" ? true : false,
                    un_value: balconyDamage === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: <Text>Exterior Siding</Text>,
            check: [
                {
                    yes_value: sidingDamage === "YES" ? true : false,
                    no_value: sidingDamage === "NO" ? true : false,
                    un_value: sidingDamage === "UNKNOWN" ? true : false
                }
            ]
        }
    ];

    let C_end_columnArray = [
        {
            title: (
                <>
                    <Text>
                        Are there any problems with the exterior structure walls, to include
                        but not limited to brick, siding, masonry, stucco, or other related
                        materials?
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: exteriorWallsDamage === "YES" ? true : false,
                    no_value: exteriorWallsDamage === "NO" ? true : false,
                    un_value: exteriorWallsDamage === "UNKNOWN" ? true : false
                }
            ]
        }
    ];

    return (
        <Page size="A4" style={pageStyles.page}>
            <Table>
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
                        Provide any additional information that the Seller has knowledge
                        pertaining to the Electrical System:
                    </TextBold>
                    <TextBold>{electricalExtraInfo}</TextBold>
                </View>
                <TableHeaderItem title="C. STRUCTURE SYSTEMS:" />
                {C_fist_columnArray.map((item, index) => {
                    return (
                        <TableBodyItem
                            key={index}
                            index={`${index + 1}.`}
                            title={item.title}
                            check={item.check}
                            title_width="74%"
                            yes_width="5%"
                            no_width="5%"
                            un_width="16%"
                        />
                    );
                })}
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: "black",
                        borderStyle: "solid",
                        fontWeight: 700,
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "22px",
                        paddingRight: "22px",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Text style={{ marginRight: "15px" }}>5.</Text>
                    <Text>
                        Are there any settling, cracks, shifting, movement, or damage to any
                        of the following:
                    </Text>
                </View>
                {C_second_columnArray.map((item, index) => {
                    return (
                        <TableBodyItem
                            key={index}
                            index={null}
                            title={item.title}
                            check={item.check}
                            title_width="74%"
                            yes_width="5%"
                            no_width="5%"
                            un_width="16%"
                        />
                    );
                })}
                {C_end_columnArray.map((item, index) => {
                    return (
                        <TableBodyItem
                            key={index}
                            index={`${index + 6}.`}
                            title={item.title}
                            check={item.check}
                            title_width="74%"
                            yes_width="5%"
                            no_width="5%"
                            un_width="16%"
                        />
                    );
                })}

            </Table>
        </Page>
    );
};

export default Page3;
