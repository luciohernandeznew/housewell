import {
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import { Checkbox, ListItem, List_End_Item, TextBold, ListItemFixedHeight } from "../documentComponents";
import { OfferModel } from "../../../models/offerModel";
import { PropertyModel } from "../../../slices/properties";
import { useDevice } from "../../../contexts/DeviceContext";
import { useAppSelector } from "../../../store";
import { sellerDisclosureModel } from "../../../models/sellerDisclosureModel";

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
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "Roboto_Italic",
  fonts: [
    {
      src: "./fonts/Roboto-Italic.ttf",
      fontWeight: 400,
    },
  ],
});

const pageStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    fontSize: 10,
    padding: 30,
  },
  title: {
    textAlign: "center",
  },
});

const LeadBased = (props: {
  offer: OfferModel;
  property: PropertyModel;
  currentDateString: string;
  currentPage: number;
}) => {
  const { isMobile } = useDevice();
  const sellerDisclosureProperty: sellerDisclosureModel = useAppSelector((state) => state.sellerDisclosureReducer.sellerDisclosureProperty);


  const {
    wasConstructedBefore1978,
    knownLeadPaint,
    leadPaintExtraInfo,
    leadBasedPaintReports,
    leadBasedPaintReportsExtraInfo,
  } = sellerDisclosureProperty[props.property.id];

  let templateValues = {
    agreement_date: props.currentDateString,
    knownLeadPaint,
    leadPaintExtraInfo,
    leadBasedPaintReports,
    leadBasedPaintReportsExtraInfo,
    seller_2_ii: "_____",
    purchaser_3_c: "________",
    purchaser_4_d: "________",
    purchaser_5_i: "________",
    purchaser_5_ii: "________",
    agent_f: "________",
    tableSection: {
      buyer1: {
        signature: "_______________________________",
        name: "________________________________",
        date: "________________________________",
      },
      seller1: {
        signature: "_______________________________",
        name: "________________________________",
        date: "________________________________",
      },
      buyer2: {
        signature: "_______________________________",
        name: "________________________________",
        date: "________________________________",
      },
      seller2: {
        signature: "_______________________________",
        name: "________________________________",
        date: "________________________________",
      },
    },
  };

  return (
    <PDFViewer style={{height: isMobile ? 'calc(100vh - 51px)' : 'calc(100vh - 71px)', width: "100%" }}>
      <Document>
        <Page size="A4" style={pageStyles.page}>
          <TextBold>EXHIBIT “F”</TextBold>
          <TextBold
            style={{ textAlign: "center", fontSize: 11, marginTop: "20px" }}
          >
            Disclosure of Information on Lead-Based Paint and/or Lead-Based
            Paint Hazards
          </TextBold>
          <Text style={{ marginTop: "20px" }}>
            This Disclosure of Information on Lead-Based Paint and/or Lead-Based
            Paint Hazards (“LBPH”) forms part of and is subject to the Purchase
            and Sales Agreement with a Binding Agreement Date of{" "}
            <TextBold>{templateValues.agreement_date}</TextBold> (the “Agreement”). Any defined terms
            denoted by their capitalization shall have the meanings assigned to
            them in the Agreement unless otherwise stated herein.
          </Text>
          <Text
            style={{ textAlign: "center", fontSize: 11, marginTop: "20px" }}
          >
            Disclosure of Information on Lead-Based Paint and/or Lead-Based
            Paint Hazards
          </Text>
          <TextBold style={{ textDecoration: "underline", marginTop: "20px" }}>
            Lead Warning Statement
          </TextBold>
          <Text style={{ fontFamily: "Roboto_Italic", marginTop: "10px" }}>
            Every purchaser of any interest in residential real property on
            which a residential dwelling was built prior to 1978 is notified
            that such property may present exposure to lead from lead-based
            paint that may place young children at risk of developing lead
            poisoning. Lead poisoning in young children may produce permanent
            neurological damage, including learning disabilities, reduced
            intelligence quotient, behavioral problems, and impaired memory.
            Lead poisoning also poses a particular risk to pregnant women. The
            seller of any interest in residential real property is required to
            provide the buyer with any information on lead-based paint hazards
            from risk assessments or inspections in the seller’s possession and
            notify the buyer of any known lead-based paint hazards. A risk
            assessment or inspection for possible lead-based paint hazards is
            recommended prior to purchase.
          </Text>
          <TextBold style={{ marginTop: "15px" }}>Seller’s Disclosure</TextBold>
          <List_End_Item marker={<Text>1.</Text>}>
            <Text>
              Presence of lead-based paint and/or lead-based paint hazards
              (check (i) or (ii) below):
            </Text>
            
            <ListItem marker={<Text>(i)</Text>}>

              <Text>
              <Checkbox
                          isChecked={templateValues.knownLeadPaint}
                        /> Known lead-based paint and/or
                lead-based paint hazards are present in the housing (explain).
              </Text>
            </ListItem>
            <ListItemFixedHeight>
              <Text>{templateValues.leadPaintExtraInfo}</Text>
            </ListItemFixedHeight>
            <ListItem marker={<Text>(ii)</Text>}>
              <Text>
              <Checkbox
                isChecked={!templateValues.knownLeadPaint}
                /> Seller has no knowledge of
                lead-based paint and/or lead-based paint hazards in the housing.
              </Text>
            </ListItem>
          </List_End_Item>
          <List_End_Item marker={<Text>2</Text>}>
            <Text>
              Records and reports available to the seller(check(i) or (ii)
              below):
            </Text>
            <ListItem marker={<Text>(i)</Text>}>
              <Text>
              <Checkbox
                isChecked={templateValues.leadBasedPaintReports}
                /> Seller has records and/or reports pertaining to lead- based
                paint and/or lead-based paint hazards in the housing that are available upon request (list
                documents below).
              </Text>
            </ListItem>
            <ListItemFixedHeight>
              <Text>{templateValues.leadBasedPaintReportsExtraInfo}</Text>
            </ListItemFixedHeight>
            <ListItem marker={<Text>(ii)</Text>}>
              <Text>
              <Checkbox
                isChecked={!templateValues.leadBasedPaintReports}
                /> Seller has no reports or records
                pertaining to lead-based paint and/or lead-based paint hazards
                in the housing.
              </Text>
            </ListItem>
          </List_End_Item>
          <TextBold style={{ marginTop: "10px" }}>
            Purchaser’s Acknowledgment (initial)
          </TextBold>
          <List_End_Item marker={<Text>3</Text>}>
            <Text>
              {templateValues.purchaser_4_d} Purchaser has received the
              pamphlet Protect Your Family from Lead in Your Home.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>4</Text>}>
            <ListItem >
              <Text>
                {templateValues.purchaser_5_i} Purchaser has received a 10-day opportunity (or
                mutually agreed upon period) to conduct a risk assessment or
                inspection for the presence of lead-based paint and/or
                lead-based paint hazards;
              </Text>
            </ListItem>
          </List_End_Item>
          <TextBold>Agent’s Acknowledgment (initial)</TextBold>
          <Text style={{ marginTop: "10px" }}>
            (f) {templateValues.agent_f} Agent has informed the seller of the
            seller’s obligations under 42 U.S.C. 4852d and is aware of his/her
            responsibility to ensure compliance.
          </Text>
          <TextBold style={{ textDecoration: "underline", marginTop: "10px" }}>
            Certification of Accuracy
          </TextBold>
          <Text style={{ marginTop: "10px" }}>
            The following parties have reviewed the information above and
            certify, to the best of their knowledge, that the information they
            have provided is true and accurate.
          </Text>
        </Page>
        <Page size="A4" style={pageStyles.page}>
          <View
            style={{
              marginTop: "10px",
              borderWidth: "1px",
              borderStyle: "dotted",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderBottomWidth: "1px",
                borderStyle: "dotted",
              }}
            >
              <View
                style={{
                  width: "50%",
                  borderRightWidth: "1px",
                  borderStyle: "dotted",
                  marginRight: "20px",
                  padding: "10px",
                }}
              >
                <TextBold>BUYER1</TextBold>
                <Text style={{ marginTop: "20px" }}>
                  Signature: {templateValues.tableSection.buyer1.signature}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Name: {templateValues.tableSection.buyer1.name}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Date: {templateValues.tableSection.buyer1.date}
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  borderLeftWidth: "1px",
                  borderStyle: "dotted",
                  padding: "10px",
                }}
              >
                <TextBold>BUYER’S AGENT</TextBold>
                <Text style={{ marginTop: "20px" }}>
                  Signature: {templateValues.tableSection.seller1.signature}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Name: {templateValues.tableSection.seller1.name}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Date: {templateValues.tableSection.seller1.date}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderTopWidth: "1px",
                borderBottomWidth: "1px",
                borderStyle: "dotted",
                marginTop: "20px",
              }}
            >
              <View
                style={{
                  width: "50%",
                  borderRightWidth: "1px",
                  borderStyle: "dotted",
                  marginRight: "20px",
                  padding: "10px",
                }}
              >
                <TextBold>BUYER2</TextBold>
                <Text style={{ marginTop: "20px" }}>
                  Signature: {templateValues.tableSection.buyer2.signature}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Name: {templateValues.tableSection.buyer2.name}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Date: {templateValues.tableSection.buyer2.date}
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  borderLeftWidth: "1px",
                  borderStyle: "dotted",
                  padding: "10px",
                }}
              >
                <TextBold>Buyer’s Brokerage Firm</TextBold>
                <Text style={{ marginTop: "20px" }}>
                  Signature: {templateValues.tableSection.seller2.signature}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Name: {templateValues.tableSection.seller2.name}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Date: {templateValues.tableSection.seller2.date}
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default LeadBased;
