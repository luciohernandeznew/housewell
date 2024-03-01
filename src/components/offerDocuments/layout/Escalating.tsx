import {
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import { List_End_Item, TextBold, ListItem } from "../documentComponents";
import { useDevice } from "../../../contexts/DeviceContext";
import { PropertyModel } from "../../../slices/properties";
import { OfferModel } from "../../../models/offerModel";
import { formatMoney } from "../../../utils/helpers";
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

const Escalating = (props: {offer: OfferModel, property: PropertyModel, currentDateString: string}) => {
  const { isMobile } = useDevice();
  let templateValues = {
    section1: {
      date: props.currentDateString,
      base_price: formatMoney(props.offer.offerAmt),
    },
    section2: {
      increase_amount: formatMoney(props.offer.escalationAmt),
      maximum_price: formatMoney(props.offer.escalationMaxAmt),
    },
    section3: {
      number: "[NUMBER]",
    },
    section4: {
      number: "[NUMBER]",
    },
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
          <TextBold style={{ textAlign: "center", fontSize: 11 }}>
            ESCALATING OFFER CLAUSE
          </TextBold>
          <List_End_Item>
            <Text>
              The as part of the Agreement dated <TextBold>{templateValues.section1.date}</TextBold> Buyer hereby makes an offer to purchase the Property for the
              base price of <TextBold>{templateValues.section1.base_price}</TextBold>.
            </Text>
          </List_End_Item>
          <List_End_Item>
            <Text>
              If the Seller receives a bona fide offer for the Property at a
              higher net price (purchase price minus seller paid closing costs), the Buyer agrees to increase its offer by
              <TextBold> {templateValues.section2.increase_amount}</TextBold> above the competing offer. The Buyer&apos;s maximum offer is <TextBold>{templateValues.section2.maximum_price}</TextBold>.
            </Text>
          </List_End_Item>
          <List_End_Item>
            <Text>
              The Seller shall notify the Buyer within{" "}
              3 (three) days of receiving any competing
              offer. If the Seller does not notify the Buyer within the
              specified time period, the Buyer&apos;s offer shall be deemed not
              accepted. As noted in the Purchase and Sale Agreement, the Seller waives any right to seek specific performance.
            </Text>
          </List_End_Item>
          <List_End_Item>
            <Text>
              The Seller shall have 3 (three) days from the date of receipt of their offer becoming primary
            </Text>
          </List_End_Item>
          <List_End_Item>
            <Text>
              This Escalating Offer Clause shall be binding upon and inure to
              the benefit of the parties hereto and their respective successors
              and assigns.
            </Text>
          </List_End_Item>
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
                <TextBold>SELLER 1</TextBold>
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
                <TextBold>SELLER 2</TextBold>
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

export default Escalating;
