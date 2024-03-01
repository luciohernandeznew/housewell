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
import Watermark from "../documents/housewell/Watermark";
import { useDevice } from "../../../contexts/DeviceContext";
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

const Amendment: React.FC = () => {
  const { isMobile } = useDevice();
  const templateValues = {
    header: {
      date: "____________________",
    },
    section1: {
      agreement_date: "____________________",
      data: "______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________.",
    },
    section2: {
      date: "________",
    },
    section3: {},
    tableSection: {
      buyer1: {
        signature: "_______________________________",
        name: "________________________________",
        date: "________________________________",
        address: "________________________________",
        email: "________________________________",
        phone: "________________________________",
      },
      seller1: {
        signature: "_______________________________",
        name: "________________________________",
        date: "________________________________",
        address: "________________________________",
        email: "________________________________",
        phone: "________________________________",
      },
      buyer2: {
        signature: "_______________________________",
        name: "________________________________",
        date: "________________________________",
        address: "________________________________",
        email: "________________________________",
        phone: "________________________________",
      },
      seller2: {
        signature: "_______________________________",
        name: "________________________________",
        date: "________________________________",
        address: "________________________________",
        email: "________________________________",
        phone: "________________________________",
      },
    },
  };

  return (
    <PDFViewer style={{height: isMobile ? 'calc(100vh - 51px)' : 'calc(100vh - 71px)', width: "100%" }}>
      <Document>
        <Page size="A4" style={pageStyles.page}>
          <TextBold style={{ textAlign: "center", fontSize: 11 }}>
            AMENDMENT
          </TextBold>
          <Text style={{ marginTop: "10px" }}>
            AMENDMENT This Amendment (“Amendment”) is made and entered into as
            of the {templateValues.header.date}[DATE] between the Buyer(s) (the
            &quot;Buyer&quot;) and Seller(s) (the &quot;Seller&quot;) listed in the signature blocks
            below.{" "}
          </Text>
          <Text>
            In consideration of the mutual covenants and agreements contained
            herein, the parties agree as follows:
          </Text>
          <List_End_Item marker={<Text>1.</Text>}>
            <Text>
              <TextBold>Amendment to Contract.</TextBold> The Buyers and Seller
              hereby agree that the Purchase and Sales Agreement with a Binding
              Agreement Date of {templateValues.section1.agreement_date} (the
              “Agreement”) is hereby amendment as follows:
              {templateValues.section1.data}
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>2.</Text>}>
            <Text>
              <TextBold>Effective Date of Amendment.</TextBold>
              This Amendment shall be effective as of{" "}
              {templateValues.section2.date}[DATE].
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>3.</Text>}>
            <Text>
              <TextBold>Entire Agreement.</TextBold>
              This Amendment constitutes the entire agreement between the
              parties with respect to the subject matter hereof, and supersedes
              all prior or contemporaneous communications, representations, or
              agreements, whether oral or written.
              <TextBold>
                Except as set forth in this amendment, the Agreement shall
                remain in full force and effect.
              </TextBold>
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>4.</Text>}>
            <Text>
              <TextBold>Governing Law.</TextBold>
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>5.</Text>}>
            <Text>
              <TextBold>Counterparts.</TextBold> This Amendment may be executed
              in one or more counterparts, each of which shall be deemed an
              original, but all of which together shall constitute one and the
              same instrument.
            </Text>
          </List_End_Item>
          <Text>
            <TextBold>IN WITNESS WHEREOF,</TextBold>
            the parties have executed this Amendment as of the date first
            written above.
          </Text>

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
                <Text style={{ marginTop: "20px" }}>
                  Address: {templateValues.tableSection.buyer1.address}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Email: {templateValues.tableSection.buyer1.email}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Phone: {templateValues.tableSection.buyer1.phone}
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
                <Text style={{ marginTop: "20px" }}>
                  Address: {templateValues.tableSection.seller1.address}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Email: {templateValues.tableSection.seller1.email}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Phone: {templateValues.tableSection.seller1.phone}
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
                <Text style={{ marginTop: "20px" }}>
                  Address: {templateValues.tableSection.buyer2.address}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Email: {templateValues.tableSection.buyer2.email}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Phone: {templateValues.tableSection.buyer2.phone}
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
                <Text style={{ marginTop: "20px" }}>
                  Address: {templateValues.tableSection.seller2.address}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Email: {templateValues.tableSection.seller2.email}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Phone: {templateValues.tableSection.seller2.phone}
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default Amendment;
