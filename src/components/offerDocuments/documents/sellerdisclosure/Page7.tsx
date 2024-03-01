import { Page, Text, View } from "@react-pdf/renderer";
import { TextBold, Table, TableHeaderItem, TableBodyItem, TableHeader } from "../../documentComponents";

type PropType = {
    templateValues: any;
    pageStyles: any;
    number: any;
};

const Page6: React.FC<PropType> = ({ templateValues, pageStyles, number }) => {
    const {
        environmentalExtraInfo,
        infestationDamage,
        underPestControlWarranty,
        petsOrAnimals,
        damagedOrDiseasedTrees,
    } = templateValues;

    let H_columnArray = [
        {
            title: (
                <Text>
                    Has the Property undergone any damage caused by termite, rodent, ants,
                    bees, infiltrating pest, dry rot, wood-boring or other pest damage?
                </Text>
            ),
            check: [
                {
                    yes_value: infestationDamage === "YES" ? true : false,
                    no_value: infestationDamage === "NO" ? true : false,
                    un_value: infestationDamage === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Is the Property currently under warranty with a licensed pest control
                    company?
                </Text>
            ),
            check: [
                {
                    yes_value: underPestControlWarranty === "YES" ? true : false,
                    no_value: underPestControlWarranty === "NO" ? true : false,
                    un_value: underPestControlWarranty === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: <Text>Has a pet lived on the Property?</Text>,
            check: [
                {
                    yes_value: petsOrAnimals === "YES" ? true : false,
                    no_value: petsOrAnimals === "NO" ? true : false,
                    un_value: petsOrAnimals === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Are there any damaged and/or diseased trees, shrubs, or bushes located
                    on the Property?
                </Text>
            ),
            check: [
                {
                    yes_value: damagedOrDiseasedTrees === "YES" ? true : false,
                    no_value: damagedOrDiseasedTrees === "NO" ? true : false,
                    un_value: damagedOrDiseasedTrees === "UNKNOWN" ? true : false
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
                        height: "150px",
                    }}
                >
                    <TextBold>
                        Provide any additional information (if applicable) that the Seller
                        has knowledge pertaining to the Environmental Conditions:
                    </TextBold>
                    <TextBold>{environmentalExtraInfo}</TextBold>
                </View>
                <TableHeaderItem title="H. OTHER CONDITIONS:" />
                {H_columnArray.map((item, index) => {
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
                        height: "50px"
                    }}
                >
                    <TextBold>
                        State any Other Conditions not listed that affects the Property?
                    </TextBold>
                </View>
                <TableHeader>
                    <Text>I. FIXTURES:</Text>
                </TableHeader>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: "black",
                        borderStyle: "solid",
                        fontWeight: 700,
                        padding: "2px",
                        height: "370px"
                    }}
                >
                    <Text>
                        For the purposes of this SPDS, Property Fixtures are defined as
                        furniture or equipment that is attached to a dwelling and has become
                        a part of the Real Property. The following Property Fixtures will
                        remain with the Property.
                    </Text>
                </View>
            </Table>
        </Page>
    );
};

export default Page6;
