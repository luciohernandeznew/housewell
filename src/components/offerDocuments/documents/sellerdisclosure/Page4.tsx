import { Page, Text, View } from "@react-pdf/renderer";
import { TextBold, Table, TableHeaderItem, TableBodyItem } from "../../documentComponents";

type PropType = {
    templateValues: any;
    pageStyles: any;
    number: any;
};

const Page4: React.FC<PropType> = ({ templateValues, pageStyles, number }) => {
    const {
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
        structureExtraInfo,
    } = templateValues;

    let D_columnArray = [
        {
            title: (
                <>
                    <Text>Does the Property utilize a HVAC system(s)?</Text>
                    <Text style={{ marginTop: "10px" }}>
                        Is the HVAC system in need of repair?
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        When was the system last installed?{" "}
                        <TextBold>{hvacInstalled}</TextBold>.
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        When was the last date of professional service to the HVAC system?{" "}
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        <TextBold>{hvacLastServiced}</TextBold>.
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: hasHVAC === "YES" ? true : false,
                    no_value: hasHVAC === "NO" ? true : false,
                    un_value: hasHVAC === "UNKNOWN" ? true : false
                },
                {
                    yes_value: hvacNeedsRepair === "YES" ? true : false,
                    no_value: hvacNeedsRepair === "NO" ? true : false,
                    un_value: hvacNeedsRepair === "UNKNOWN" ? true : false
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
                }
            ]
        },
        {
            title: (
                <>
                    <Text>Does the Property utilize a Heating system(s)?</Text>
                    <Text style={{ marginTop: "10px" }}>
                        Is the Heating System in need of repair?
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        When was the system installed?{" "}
                        <TextBold>{heatingInstalled}</TextBold>.
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        When was the last date of professional service to the Heating
                        system?
                    </Text>
                    <Text>
                        <TextBold>{heatingLastServiced}</TextBold>.
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: hasHeatingSystem === "YES" ? true : false,
                    no_value: hasHeatingSystem === "NO" ? true : false,
                    un_value: hasHeatingSystem === "UNKNOWN" ? true : false
                },
                {
                    yes_value: heatingNeedsRepair === "YES" ? true : false,
                    no_value: heatingNeedsRepair === "NO" ? true : false,
                    un_value: heatingNeedsRepair === "UNKNOWN" ? true : false
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
                }
            ]
        },
        {
            title: (
                <>
                    <Text>
                        If the Property contains a fireplace(s), are the fireplace(s)
                        undamaged and in working order?
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        When was the last date of professional service to the fireplace(s)
                        and chimney(s)? <TextBold>{fireplaceLastServiced}</TextBold>.
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: fireplaceFunctioning === "YES" ? true : false,
                    no_value: fireplaceFunctioning === "NO" ? true : false,
                    un_value: fireplaceFunctioning === "UNKNOWN" ? true : false
                },
                {
                    yes_value: false,
                    no_value: false,
                    un_value: false
                }
            ]
        },
        {
            title: (
                <>
                    <Text>
                        Is there any location within the dwelling space of the home that is
                        not connected to a heating and cooling system?
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        Provide the location{" "}
                        <TextBold>{partOfHomeNoHVACDescription}</TextBold>.
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: partOfHomeNoHVAC === "YES" ? true : false,
                    no_value: partOfHomeNoHVAC === "NO" ? true : false,
                    un_value: partOfHomeNoHVAC === "UNKNOWN" ? true : false
                },
                {
                    yes_value: false,
                    no_value: false,
                    un_value: false
                }
            ]
        }
    ];

    let E_columnArray = [
        {
            title: (
                <>
                    <Text>Is the Property on a Public sewer system?</Text>
                    <Text style={{ marginTop: "10px" }}>
                        Is the Public sewer system currently operational?
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: hasPublicSewer === "YES" ? true : false,
                    no_value: hasPublicSewer === "NO" ? true : false,
                    un_value: hasPublicSewer === "UNKNOWN" ? true : false
                },
                {
                    yes_value: publicSewerFunctional === "YES" ? true : false,
                    no_value: publicSewerFunctional === "NO" ? true : false,
                    un_value: publicSewerFunctional === "UNKNOWN" ? true : false
                }
            ]
        },
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
                        height: "150px",
                    }}
                >
                    <TextBold>
                        Provide any additional information that the Seller has knowledge
                        pertaining to the Structure System:
                    </TextBold>
                    <TextBold>{structureExtraInfo}</TextBold>
                </View>
                <TableHeaderItem title="D. HEATING AND COOLING SYSTEMS: " />
                {D_columnArray.map((item, index) => {
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
                        padding: "2px",
                        height: "150px",
                    }}
                >
                    <TextBold>
                        Provide any additional information (if applicable) that the Seller
                        has knowledge pertaining to the Water/Plumbing/Sewer Systems:
                    </TextBold>
                    <TextBold>{hvacExtraInfo}</TextBold>
                </View>
                <TableHeaderItem title="E. WATER/PLUMBING/SEWER SYSTEMS:" />
                {E_columnArray.map((item, index) => {
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

export default Page4;
