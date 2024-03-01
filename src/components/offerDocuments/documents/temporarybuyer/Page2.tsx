import {
    TextBold,
    List_End_Item,
    ListItem,
  } from "../../documentComponents";
  import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
  const footerItem = (title: any, data: any, width: any, top: any,) => {
    return (
      <View
        style={{
          marginTop: top,
          borderStyle: "dotted",
          borderBottomWidth: 1,
          borderTopWidth: width,
          padding: "10px",
        }}
      >
        <TextBold>{title}</TextBold>
        <Text style={{ marginTop: "20px" }}>Signature: {data.signature}</Text>
        <Text style={{ marginTop: "20px" }}>Name: {data.name}</Text>
        <Text style={{ marginTop: "20px" }}>Date: {data.date}</Text>
        <Text style={{ marginTop: "20px" }}>Address: {data.address}</Text>
        <Text style={{ marginTop: "20px" }}>E-Mail: {data.email}</Text>
        <Text style={{ marginTop: "20px" }}>Phone: {data.phone}</Text>
      </View>
    );
  };
  const Page1: React.FC<any> = ({ templateValues, pageStyles }) => {
    return (
      <>
        <Page size="A4" style={pageStyles.page}>
          <Text>
            <TextBold>IN WITNESS WHEREOF,</TextBold> the parties have executed
            this Amendment as of the date first written above.
          </Text>
          <View
            style={{
              width: "50%",
              borderStyle: "dotted",
              borderWidth: "1px",
              marginTop: "20px",
            }}
          >
            {footerItem("BUYER 1", templateValues.footer.buyer1, 0, 0)}
            {footerItem("BUYER 2", templateValues.footer.buyer2, 1, 20)}
          </View>
        </Page>
      </>
    );
  };
  
  export default Page1;
  