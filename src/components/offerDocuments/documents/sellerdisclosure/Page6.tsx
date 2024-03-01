import { Page, Text, View } from "@react-pdf/renderer";
import { TextBold, Table, TableHeaderItem, TableBodyItem } from "../../documentComponents";

type PropType = {
    templateValues: any;
    pageStyles: any;
    number: any;
};

const Page6: React.FC<PropType> = ({ templateValues, pageStyles, number }) => {
    const {
        hasMethtamphetamine,
        inFloodPlain,
        gradingFloodingOrDrainageIssues,
        hasUndergroundSprings,
        hasSoilMovement,
        additionalPlumbingInfo,
        wasConstructedBefore1978,
        hasAsbestos,
        hasRadon,
        hasMold,
        hasContaminatedSoil,
        trashDumpNearby,
        undergroundFuelOrChemicalStorageTank,
    } = templateValues;

    let F_columnArray = [
        {
            title: <Text>Was the Property constructed prior to 1978?</Text>,
            check: [
                {
                    yes_value: wasConstructedBefore1978 === "YES" ? true : false,
                    no_value: wasConstructedBefore1978 === "NO" ? true : false,
                    un_value: wasConstructedBefore1978 === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <TextBold>
                    If yes, Parties must complete the Lead Based Paint Disclosure Exhibit
                    F. Buyer must receive the EPA’s Protect Your Family from Lead in Your
                    Home Pamphlet.
                </TextBold>
            ),
            check: [
                {
                    yes_value: false,
                    no_value: false,
                    un_value: false
                }
            ]
        }
    ];

    let G_columnArray = [
        {
            title: <Text>Asbestos?</Text>,
            check: [
                {
                    yes_value: hasAsbestos === "YES" ? true : false,
                    no_value: hasAsbestos === "NO" ? true : false,
                    un_value: hasAsbestos === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: <Text>Radon?</Text>,
            check: [
                {
                    yes_value: hasRadon === "YES" ? true : false,
                    no_value: hasRadon === "NO" ? true : false,
                    un_value: hasRadon === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: <Text>Mold?</Text>,
            check: [
                {
                    yes_value: hasMold === "YES" ? true : false,
                    no_value: hasMold === "NO" ? true : false,
                    un_value: hasMold === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: <Text>Contaminated soil?</Text>,
            check: [
                {
                    yes_value: hasContaminatedSoil === "YES" ? true : false,
                    no_value: hasContaminatedSoil === "NO" ? true : false,
                    un_value: hasContaminatedSoil === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Are there any trash dumps, grave sites, landfills, buried materials,
                    buried fuel tanks or other similar deposits located on the Property?
                </Text>
            ),
            check: [
                {
                    yes_value: trashDumpNearby === "YES" ? true : false,
                    no_value: trashDumpNearby === "NO" ? true : false,
                    un_value: trashDumpNearby === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>Underground fuel, chemical or other type of storage tank?</Text>
            ),
            check: [
                {
                    yes_value:
                        undergroundFuelOrChemicalStorageTank === "YES" ? true : false,
                    no_value:
                        undergroundFuelOrChemicalStorageTank === "NO" ? true : false,
                    un_value:
                        undergroundFuelOrChemicalStorageTank === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Any other toxic or hazardous materials to include Methamphetamine
                    (“Meth”)?
                </Text>
            ),
            check: [
                {
                    yes_value: hasMethtamphetamine === "YES" ? true : false,
                    no_value: hasMethtamphetamine === "NO" ? true : false,
                    un_value: hasMethtamphetamine === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Is the Property presently located on a flood plain, flood zone or
                    floodway hazard area?
                </Text>
            ),
            check: [
                {
                    yes_value: inFloodPlain === "YES" ? true : false,
                    no_value: inFloodPlain === "NO" ? true : false,
                    un_value: inFloodPlain === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Are there any grading, flooding, or drainage problems in connection
                    with the Property?
                </Text>
            ),
            check: [
                {
                    yes_value: gradingFloodingOrDrainageIssues === "YES" ? true : false,
                    no_value: gradingFloodingOrDrainageIssues === "NO" ? true : false,
                    un_value:
                        gradingFloodingOrDrainageIssues === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Are there any underground springs located under or around the main
                    dwelling or any improvements?
                </Text>
            ),
            check: [
                {
                    yes_value: hasUndergroundSprings === "YES" ? true : false,
                    no_value: hasUndergroundSprings === "NO" ? true : false,
                    un_value: hasUndergroundSprings === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Has there been notable changes that has resulted in soil erosion, soil
                    shifting or sink holes in connection with the Property?
                </Text>
            ),
            check: [
                {
                    yes_value: hasSoilMovement === "YES" ? true : false,
                    no_value: hasSoilMovement === "NO" ? true : false,
                    un_value: hasSoilMovement === "UNKNOWN" ? true : false
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
                        Provide any additional information (if applicable) that the Seller
                        has knowledge pertaining to the Water/Plumbing/Sewer Systems:
                    </TextBold>
                    <TextBold>{additionalPlumbingInfo}</TextBold>
                </View>
                <TableHeaderItem title="F. LEAD BASED PAINT DISCLOSURE:" />
                {F_columnArray.map((item, index) => {
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
                <TableHeaderItem title="G. ENVIRONMENTAL CONDITIONS: " />
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: "black",
                        borderStyle: "solid",
                        fontWeight: 700,
                        padding: "2px"
                    }}
                >
                    <Text>
                        Have any of the following substances, materials, or products been
                        found on the Property?
                    </Text>
                </View>
                {G_columnArray.map((item, index) => {
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
            </Table>
        </Page>
    );
};

export default Page6;
