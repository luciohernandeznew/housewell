import { Page, Text, View } from "@react-pdf/renderer";
import { TextBold, Table, TableHeaderItem, TableBodyItem } from "../../documentComponents";

type PropType = {
    templateValues: any;
    pageStyles: any;
    number: any;
};

const Page1: React.FC<PropType> = ({ templateValues, pageStyles, number }) => {
    const {
        exhibit,
        agreement_date,
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
        hasEncroachmentsOrBoundaryDisputes
    } = templateValues;

    let A_columnArray_1 = [
        {
            title: (
                <Text>Seller has complete legal authority to sell the Property?</Text>
            ),
            check: [
                {
                    yes_value: legalAuthority === "YES" ? true : false,
                    no_value: legalAuthority === "NO" ? true : false,
                    un_value: legalAuthority === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Seller has owned the Property for <TextBold>{yearsOwned}</TextBold>{" "}
                    years and <TextBold>{monthsOwned}</TextBold> months.
                </Text>
            ),
            check: [
                {
                    yes_value: false,
                    no_value: false,
                    un_value: false
                }
            ]
        },
        {
            title: <Text>Is the Property currently occupied?</Text>,
            check: [
                {
                    yes_value: isOccupied === "YES" ? true : false,
                    no_value: isOccupied === "NO" ? true : false,
                    un_value: isOccupied === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: <Text>Has Seller ever occupied the Property?</Text>,
            check: [
                {
                    yes_value: hasSellerOccupied === "YES" ? true : false,
                    no_value: hasSellerOccupied === "NO" ? true : false,
                    un_value: hasSellerOccupied === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <>
                    <Text>
                        Is any part of the Property currently under Lease Agreement?
                    </Text>
                    <Text style={{ marginLeft: "-24px", marginTop: "10px" }}>
                        6.      When does the Lease expire? <TextBold>{leaseExpiration}</TextBold>
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: isRented === "YES" ? true : false,
                    no_value: isRented === "NO" ? true : false,
                    un_value: isRented === "UNKNOWN" ? true : false
                },
                {
                    yes_value: false,
                    no_value: false,
                    un_value: false
                }
            ]
        }
    ];

    let A_columnArray_2 = [
        {
            title: (
                <Text>
                    Is ownership of the Property subjected to any condominium,
                    homeowners’, or other types of association which has authority over
                    the real property?
                </Text>
            ),
            check: [
                {
                    yes_value: hasHOA === "YES" ? true : false,
                    no_value: hasHOA === "NO" ? true : false,
                    un_value: hasHOA === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    If answering yes to question 7, has the association assessed any
                    violations against the Property?
                </Text>
            ),
            check: [
                {
                    yes_value: hasHOAViolations === "YES" ? true : false,
                    no_value: hasHOAViolations === "NO" ? true : false,
                    un_value: hasHOAViolations === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Is ownership of the Property subjected to recorded Declarations of
                    Covenants, Conditions and Restrictions (“CC&Rs”)?
                </Text>
            ),
            check: [
                {
                    yes_value: hasCCAndRs === "YES" ? true : false,
                    no_value: hasCCAndRs === "NO" ? true : false,
                    un_value: hasCCAndRs === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <Text>
                    Is the Property a Historic Dwelling or located in a Historic District?
                </Text>
            ),
            check: [
                {
                    yes_value: isHistoric === "YES" ? true : false,
                    no_value: isHistoric === "NO" ? true : false,
                    un_value: isHistoric === "UNKNOWN" ? true : false
                }
            ]
        },
        {
            title: (
                <>
                    <Text>
                        Is ownership of the Property subjected to any other types of
                        Restrictions?
                    </Text>
                    <Text style={{ marginTop: "10px" }}>
                        If yes, then please provide a summary of the restrictions:
                        <TextBold>{otherRestrictionsText}</TextBold>.
                    </Text>
                </>
            ),
            check: [
                {
                    yes_value: hasOtherRestrictions === "YES" ? true : false,
                    no_value: hasOtherRestrictions === "NO" ? true : false,
                    un_value: hasOtherRestrictions === "UNKNOWN" ? true : false
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
                        Are there any encroachments, boundary disputes, and/or boundary
                    </Text>
                    <Text style={{ marginTop: "10px" }}>agreements?</Text>
                </>
            ),
            check: [
                {
                    yes_value:
                        hasEncroachmentsOrBoundaryDisputes === "YES" ? true : false,
                    no_value: hasEncroachmentsOrBoundaryDisputes === "NO" ? true : false,
                    un_value:
                        hasEncroachmentsOrBoundaryDisputes === "UNKNOWN" ? true : false
                }
            ]
        }
    ];

    return (
        <>
            <Page size="A4" style={pageStyles.page}>
                <TextBold>
                    Exhibit <TextBold>{exhibit}</TextBold>
                </TextBold>
                <TextBold style={{ textAlign: "center", fontSize: 11, marginTop: "20px" }}>
                    Seller’s Property Disclosure and Disclaimer Statement
                </TextBold>
                <Text style={{ marginTop: "20px" }}>
                    This Seller’s Property Disclosure and Disclaimer Statement (“SPDS”)
                    forms part of and is subject to the Purchase and Sales Agreement with
                    a Binding Agreement Date of <TextBold>{agreement_date}</TextBold> (the
                    “Agreement”). Any defined terms denoted by their capitalization shall
                    have the meanings assigned to them in the Agreement unless otherwise
                    stated herein.
                </Text>
                <Text style={{ marginTop: "20px" }}>
                    By signing below, Seller represents that they have completed this SPDS
                    truthfully and accurately, to include any known laten material defects
                    in the Property and/or improvements made to the Property to the best
                    of Seller’s ability. Seller agrees to provide a later statement to any
                    material changes made to the Property if those changes are made after
                    completing this SPDS.
                </Text>
                <Text style={{ marginTop: "20px" }}>
                    By signing below, Buyer acknowledges that the disclosure of
                    information contained in this SPDS by Seller is not to designed to be
                    a complete or professional assessment of the Property. Buyer further
                    understands that it is recommended that the Buyer acquires an
                    inspection by a qualified independent home inspection company, survey,
                    title inspection and or engage any other licensed professional(s) as
                    needed.
                </Text>
                <Table style={{ marginTop: "20px" }}>
                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderColor: "black",
                            borderStyle: "solid",
                            fontWeight: 700,
                            padding: "2px"
                        }}
                    >
                        <TextBold>SELLER’S DISCLOSURES</TextBold>
                    </View>
                    <TableHeaderItem title="A. TITLE:" />
                    {A_columnArray_1.map((item, index) => {
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
                        )
                    })}
                    {A_columnArray_2.map((item, index) => {
                        return (
                            <TableBodyItem
                                key={index}
                                index={`${index + 7}.`}
                                title={item.title}
                                check={item.check}
                                title_width="74%"
                                yes_width="5%"
                                no_width="5%"
                                un_width="16%"
                            />
                        )
                    })}
                </Table>
            </Page>
        </>
    );
};

export default Page1;
