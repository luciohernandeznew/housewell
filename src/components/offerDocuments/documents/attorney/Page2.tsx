import {
    TextBold,
    List_End_Item,
  } from "../../documentComponents";
  import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
  
  const Page2: React.FC<any> = ({ templateValues, pageStyles }) => {
    return (
      <>
        <Page size="A4" style={pageStyles.page}>
          <Text style={{ marginTop: "20px" }}>
            IN WITNESS WHEREOF, the parties have executed this Agreement as of
            the date first written above.
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
                <TextBold>BUYER 1</TextBold>
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
                  Phone: {templateValues.tableSection.seller2.date}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Email: {templateValues.tableSection.seller2.date}
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
                  Signature: {templateValues.tableSection.seller2.signature}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Name: {templateValues.tableSection.seller2.name}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Date: {templateValues.tableSection.seller2.date}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Phone: {templateValues.tableSection.seller2.date}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Email: {templateValues.tableSection.seller2.date}
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
                <TextBold>BUYER 2</TextBold>
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
                  Phone: {templateValues.tableSection.seller2.date}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Email: {templateValues.tableSection.seller2.date}
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
                  Phone: {templateValues.tableSection.seller2.date}
                </Text>
                <Text style={{ marginTop: "20px" }}>
                  Email: {templateValues.tableSection.seller2.date}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: "20px",
                borderTopWidth: "1px",
                borderStyle: "dotted",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "20%",
                  padding: "10px",
                  borderRightWidth: "1px",
                  borderStyle: "dotted",
                }}
              >
                <Text>Closing Attorney:</Text>
              </View>
              <View style={{ width: "80%", padding: "10px" }}>
                <Text>{templateValues.tableSection.end.attonrey}</Text>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: "1px",
                borderStyle: "dotted",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "20%",
                  padding: "10px",
                  borderRightWidth: "1px",
                  borderStyle: "dotted",
                }}
              >
                <Text>Address:</Text>
              </View>
              <View style={{ width: "80%", padding: "10px" }}>
                <Text>{templateValues.tableSection.end.name}</Text>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: "1px",
                borderStyle: "dotted",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "20%",
                  padding: "10px",
                  borderRightWidth: "1px",
                  borderStyle: "dotted",
                }}
              >
                <Text>Phone Number:</Text>
              </View>
              <View style={{ width: "80%", padding: "10px" }}>
                <Text>{templateValues.tableSection.end.date}</Text>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: "1px",
                borderStyle: "dotted",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "20%",
                  padding: "10px",
                  borderRightWidth: "1px",
                  borderStyle: "dotted",
                }}
              >
                <Text>Email:</Text>
              </View>
              <View style={{ width: "80%", padding: "10px" }}>
                <Text>{templateValues.tableSection.end.date}</Text>
              </View>
            </View>
          </View>
        </Page>
      </>
    );
  };
  
  export default Page2;
  