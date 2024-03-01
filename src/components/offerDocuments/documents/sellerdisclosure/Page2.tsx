import { Page, Text, View } from "@react-pdf/renderer";
import { Table, TableBodyItem, TableMiddleItem, TextBold, Checkbox } from "../../documentComponents";

type PropType = {
    templateValues: any;
    pageStyles: any;
    number: any;
};

const Page2: React.FC<PropType> = ({ templateValues, pageStyles, number }) => {
    const {
        hasEasements,
        hasZoningCodeViolations,
        hasDeedRestrictions,
        sellerHasLeins,
        hasLawsuitsOrLeins,
        insuranceClaimsText,
        hasInsuranceClaims,
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
    } = templateValues;

    let A_columnArray = [
        {
            title: (
                <Text>
                    Are there any easements (excluding utility easements) on the Property?
                </Text>
            ),
            check: [
                {
                    yes_value: hasEasements === "YES" ? true : false,
                    no_value: hasEasements === "NO" ? true : false,
                    un_value: hasEasements === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Are there any zoning, building codes, non-conforming use, or “setback”
                    violations?
                </Text>
            ),
            check: [
                {
                    yes_value: hasZoningCodeViolations === "YES" ? true : false,
                    no_value: hasZoningCodeViolations === "NO" ? true : false,
                    un_value: hasZoningCodeViolations === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Are there any recorded deed restrictions that affect usage of the
                    Property?
                </Text>
            ),
            check: [
                {
                    yes_value: hasDeedRestrictions === "YES" ? true : false,
                    no_value: hasDeedRestrictions === "NO" ? true : false,
                    un_value: hasDeedRestrictions === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Are there any liens or unsatisfied judgments against Seller or the
                    Property?
                </Text>
            ),
            check: [
                {
                    yes_value: sellerHasLeins === "YES" ? true : false,
                    no_value: sellerHasLeins === "NO" ? true : false,
                    un_value: sellerHasLeins === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Are there currently or have there ever been any lawsuits, liens, or
                    settlement agreements with regards to the Property?
                </Text>
            ),
            check: [
                {
                    yes_value: hasLawsuitsOrLeins === "YES" ? true : false,
                    no_value: hasLawsuitsOrLeins === "NO" ? true : false,
                    un_value: hasLawsuitsOrLeins === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <>
                    <Text>
                        Has there been any insurance claims filed on behalf of the Property?
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        If yes, please provide a summary of the insurance claims including
                        any relevant dates:
                        <TextBold>{insuranceClaimsText}</TextBold>.
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: hasInsuranceClaims === "YES" ? true : false,
                    no_value: hasInsuranceClaims === "NO" ? true : false,
                    un_value: hasInsuranceClaims === "UNKNOWN" ? true : false
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
                <Text>
                    Are there any notice(s) from the Government, State, City or County
                    that in any way affects the Property?
                </Text>
            ),
            check: [
                {
                    yes_value: hasGovernmentNotices === "YES" ? true : false,
                    no_value: hasGovernmentNotices === "NO" ? true : false,
                    un_value: hasGovernmentNotices === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Is the Property located near agricultural or forestry land, or
                    identify as agricultural or forestry usage?
                </Text>
            ),
            check: [
                {
                    yes_value: isAgricultural === "YES" ? true : false,
                    no_value: isAgricultural === "NO" ? true : false,
                    un_value: isAgricultural === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Are there any other known adverse title conditions that affect the
                    Property?
                </Text>
            ),
            check: [
                {
                    yes_value: hasKnownAdverseTitleConditions === "YES" ? true : false,
                    no_value: hasKnownAdverseTitleConditions === "NO" ? true : false,
                    un_value: hasKnownAdverseTitleConditions === "UNKNOWN" ? true : false
                }
            ]
        }
    ];

    let B_columnArray = [
        {
            title: <Text>Electric Service Panel</Text>,
            check: [
                {
                    yes_value: servicePanelState === "WORKING" ? true : false,
                    no_value: servicePanelState === "NOT_WORKING" ? true : false,
                    un_value: servicePanelState === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <>
                    <Text>Is the Property connected to a natural gas system?</Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "5px",
                        }}
                    >
                        <Text style={{ marginRight: "5px" }}>
                            <Checkbox isChecked={hasNatGasFurnace} />
                            &nbsp; Furnace
                        </Text>
                        <Text style={{ marginRight: "5px" }}>
                            <Checkbox isChecked={hasNatGasStove} />
                            &nbsp; Stove
                        </Text>
                        <Text style={{ marginRight: "5px" }}>
                            <Checkbox isChecked={hasNatGasWaterHeater} />
                            &nbsp; Water Heater
                        </Text>
                        <Text style={{ marginRight: "5px" }}>
                            <Checkbox isChecked={hasNatGasFireplace} />
                            &nbsp; Fireplace
                        </Text>
                    </View>
                </>
            ),
            check: [
                {
                    yes_value: naturalGasState === "WORKING" ? true : false,
                    no_value: naturalGasState === "NOT_WORKING" ? true : false,
                    un_value: naturalGasState === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text>Security System</Text>
                    <Text>
                        <Checkbox isChecked={securitySystemOwned} /> &nbsp; Owned
                    </Text>
                    <Text>
                        <Checkbox isChecked={!securitySystemOwned} /> &nbsp; Leased
                    </Text>
                </View>
            ),
            check: [
                {
                    yes_value: securitySystemState === "WORKING" ? true : false,
                    no_value: securitySystemState === "NOT_WORKING" ? true : false,
                    un_value: securitySystemState === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: <Text>Smoke Detectors</Text>,
            check: [
                {
                    yes_value: smokeDetectorsState === "WORKING" ? true : false,
                    no_value: smokeDetectorsState === "NOT_WORKING" ? true : false,
                    un_value: smokeDetectorsState === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: <Text>Carbon Monoxide Detectors</Text>,
            check: [
                {
                    yes_value: carbonMonoxideDetectorsState === "WORKING" ? true : false,
                    no_value:
                        carbonMonoxideDetectorsState === "NOT_WORKING" ? true : false,
                    un_value: carbonMonoxideDetectorsState === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Text>Garage Door</Text>
                    <Text>
                        <Checkbox
                            isChecked={garageDoorOpenerType === "OPENER" ? true : false}
                        />{" "}
                        &nbsp; Opener
                    </Text>
                    <Text>
                        <Checkbox
                            isChecked={garageDoorOpenerType === "REMOTE" ? true : false}
                        />{" "}
                        &nbsp; Remote
                    </Text>
                    <Text>
                        <Checkbox
                            isChecked={garageDoorOpenerType === "KEYPAD" ? true : false}
                        />{" "}
                        &nbsp; Keypad
                    </Text>
                </View>
            ),
            check: [
                {
                    yes_value: garageDoorState === "WORKING" ? true : false,
                    no_value: garageDoorState === "NOT_WORKING" ? true : false,
                    un_value: garageDoorState === "UNKNOWN" ? true : false
                }
            ]
        },
    ];

    return (
        <Page size="A4" style={pageStyles.page}>
            <Table>
                {A_columnArray.map((item, index) => {
                    return (
                        <TableBodyItem
                            key={index}
                            index={`${index + 13}.`}
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
                        height: "150px",
                        padding: "2px",
                    }}
                >
                    <TextBold>
                        If you answered yes to 21, please provide any additional information
                        that the Seller has knowledge concerning any adverse title condition
                        of the Property:{" "}
                    </TextBold>
                    <TextBold>{adverseTitleConditionsText}</TextBold>
                </View>
                <TableMiddleItem />
                {B_columnArray.map((item, index) => {
                    return (
                        <TableBodyItem
                            key={index}
                            index={`${index + 1}.`}
                            title={item.title}
                            check={item.check}
                            title_width="58%"
                            yes_width="13%"
                            no_width="13%"
                            un_width="16%"
                        />
                    );
                })}
            </Table>
        </Page>
    );
};

export default Page2;
