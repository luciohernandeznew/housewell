import { Page, Text, View } from "@react-pdf/renderer";
import { Table, TableHeaderItem, TableBodyItem, TextBold } from "../../documentComponents";

type PropType = {
    templateValues: any;
    pageStyles: any;
    number: any;
};

const Page5: React.FC<PropType> = ({ templateValues, pageStyles, number }) => {
    const {
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
        hasSepticSystem,
        septicSystemFunctional,
        septicSystemMeetsMinRequirements,
        septicSystemLastServiced,
        hasPrivateSewer,
        privateSewerFunctional,
        hasPumpSump,
        pumpSumpDischarge,
        improvementsWithPermits,
        concealedDefects,
    } = templateValues;
    let E_columnArray = [
        {
            title: (
                <>
                    <Text>Is the Property on a Septic sewer system?</Text>
                    <Text style={{ marginTop: "10px" }}>
                        Is the Septic sewer system operational?
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        Does the Septic tank size and dimension meet government requirements
                        for waste disposal to properly service the Property?
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        When was the last date of professional service to the Septic system?
                    </Text>
                    <Text>
                        <TextBold>{septicSystemLastServiced}</TextBold>.
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: hasSepticSystem === "YES" ? true : false,
                    no_value: hasSepticSystem === "NO" ? true : false,
                    un_value: hasSepticSystem === "UNKNOWN" ? true : false
                },
                {
                    yes_value: septicSystemFunctional === "YES" ? true : false,
                    no_value: septicSystemFunctional === "NO" ? true : false,
                    un_value: septicSystemFunctional === "UNKNOWN" ? true : false
                },
                {
                    yes_value: septicSystemMeetsMinRequirements === "YES" ? true : false,
                    no_value: septicSystemMeetsMinRequirements === "NO" ? true : false,
                    un_value:
                        septicSystemMeetsMinRequirements === "UNKNOWN" ? true : false
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
                    <Text>Is the Property on a private non-public sewer system?</Text>
                    <Text style={{ marginTop: "10px" }}>
                        Is the private sewer system operational?
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: hasPrivateSewer === "YES" ? true : false,
                    no_value: hasPrivateSewer === "NO" ? true : false,
                    un_value: hasPrivateSewer === "UNKNOWN" ? true : false
                },
                {
                    yes_value: privateSewerFunctional === "YES" ? true : false,
                    no_value: privateSewerFunctional === "NO" ? true : false,
                    un_value: privateSewerFunctional === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <>
                    <Text>Is there a sump pump in the dwelling?</Text>
                    <Text style={{ marginTop: "10px" }}>
                        Where does the sump pump discharge to{" "}
                        <TextBold>{pumpSumpDischarge}</TextBold>.
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: hasPumpSump === "YES" ? true : false,
                    no_value: hasPumpSump === "NO" ? true : false,
                    un_value: hasPumpSump === "UNKNOWN" ? true : false
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
                        Were improvements and/or repairs to the Property performed with all
                        necessary permits and approvals in compliance with building codes
                        and zoning regulations?
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: improvementsWithPermits === "YES" ? true : false,
                    no_value: improvementsWithPermits === "NO" ? true : false,
                    un_value: improvementsWithPermits === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <>
                    <Text>
                        Are there any concealed or hidden defect(s) that has not been
                        disclosed?
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: concealedDefects === "YES" ? true : false,
                    no_value: concealedDefects === "NO" ? true : false,
                    un_value: concealedDefects === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <>
                    <Text>
                        Are there any past or present leaks, backups, low pressure water
                        flow, or other concerns with the Property’s sewer or plumbing
                        system?
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: plumbingIssues === "YES" ? true : false,
                    no_value: plumbingIssues === "NO" ? true : false,
                    un_value: plumbingIssues === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <>
                    {" "}
                    <Text>
                        Does the Property utilize a Well system for its indoor water source?
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        Is the Well system in need of repair?
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        When was the last date of the well system water test?
                        <TextBold>{wellSystemWaterLastTested}</TextBold>.
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        Have you ever been notified that the well water on the Property is
                        unsafe to drink?
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: wellSystem === "YES" ? true : false,
                    no_value: wellSystem === "NO" ? true : false,
                    un_value: wellSystem === "UNKNOWN" ? true : false
                },
                {
                    yes_value: wellSystemNeedsRepar === "YES" ? true : false,
                    no_value: wellSystemNeedsRepar === "NO" ? true : false,
                    un_value: wellSystemNeedsRepar === "UNKNOWN" ? true : false
                },
                {
                    yes_value: false,
                    no_value: false,
                    un_value: false
                },
                {
                    yes_value: notifiedOfWellWaterIssues === "YES" ? true : false,
                    no_value: notifiedOfWellWaterIssues === "NO" ? true : false,
                    un_value: notifiedOfWellWaterIssues === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <>
                    <Text>
                        Are the Water Heater(s) in good working order and free from leakage?
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        Date of Water Heater(s) installation:{" "}
                        <TextBold>{waterHeaterInstalled}</TextBold>.
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: waterHeaterFunctional === "YES" ? true : false,
                    no_value: waterHeaterFunctional === "NO" ? true : false,
                    un_value: waterHeaterFunctional === "UNKNOWN" ? true : false
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
                        Has the main sewer lines from the home ever exhibited slow drainage
                        or has backed up?
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: sewerLineIssues === "YES" ? true : false,
                    no_value: sewerLineIssues === "NO" ? true : false,
                    un_value: sewerLineIssues === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: <Text>Has any of the water lines been frozen or damaged?</Text>,
            check: [
                {
                    yes_value: waterLinesFrozenOrDamaged === "YES" ? true : false,
                    no_value: waterLinesFrozenOrDamaged === "NO" ? true : false,
                    un_value: waterLinesFrozenOrDamaged === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <>
                    <Text>
                        Are there installed Sprinkler System located on the Property?
                    </Text>
                    <Text>Is the Sprinkler System in need of any repairs?</Text>
                </>
            ),
            check: [
                {
                    yes_value: installedSprinklerSystem === "YES" ? true : false,
                    no_value: installedSprinklerSystem === "NO" ? true : false,
                    un_value: installedSprinklerSystem === "UNKNOWN" ? true : false
                },
                {
                    yes_value: sprinklerSystemNeedsRepair === "YES" ? true : false,
                    no_value: sprinklerSystemNeedsRepair === "NO" ? true : false,
                    un_value: sprinklerSystemNeedsRepair === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Does the Property contain polybutylene plumbing (other than the
                    primary service line)?
                </Text>
            ),
            check: [
                {
                    yes_value:
                        propertyContainsPolybutylenePiping === "YES" ? true : false,
                    no_value: propertyContainsPolybutylenePiping === "NO" ? true : false,
                    un_value:
                        propertyContainsPolybutylenePiping === "UNKNOWN" ? true : false
                }
            ]
        }
    ];

    return (
        <Page size="A4" style={pageStyles.page}>
            <Table>
                {E_columnArray.map((item, index) => {
                    return (
                        <TableBodyItem
                            key={index}
                            index={`${index + 2}.`}
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

export default Page5;
