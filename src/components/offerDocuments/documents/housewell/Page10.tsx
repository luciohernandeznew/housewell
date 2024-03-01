import exp from "constants";
import {
  ListItem,
  TableBody,
  TableHeader,
  List,
  TextBold,
  List_End_Item,
  Checkbox,
  Table,
  Row,
  Col,
} from "../../documentComponents";

import { Page, Text, View } from "@react-pdf/renderer";

const personalPart = (data: any, person: string) => {
  return (
    <Col width={50}>
      <TextBold>{person}</TextBold>
      <Row>
        <Col width={20}>
          <Text>Signature:</Text>
        </Col>
        <Col width={50}>
          <Text>{data.signature}</Text>
        </Col>
      </Row>
      <Row>
        <Col width={20}>
          <Text>Date:</Text>
        </Col>
        <Col width={50}>
          <Text>{data.date}</Text>
        </Col>
      </Row>
      <Row>
        <Col width={20}>
          <Text>Name:</Text>
        </Col>
        <Col width={50}>
          <Text>{data.name}</Text>
        </Col>
      </Row>
      <Row>
        <Col width={20}>
          <Text>Address:</Text>
        </Col>
        <Col width={50}>
          <Text>{data.address}</Text>
        </Col>
      </Row>
      <Row>
        <Col width={20}>
          <Text>E-Mail:</Text>
        </Col>
        <Col width={50}>
          <Text>{data.email}</Text>
        </Col>
      </Row>
      <Row>
        <Col width={20}>
          <Text>Phone:</Text>
        </Col>
        <Col width={50}>
          <Text>{data.phone}</Text>
        </Col>
      </Row>
    </Col>
  );
};
const brokeragePart = (data: any, person: string) => {
  return (
    <Col width={50}>
      <TextBold>{person}</TextBold>
      <Col>
        <Col style={{ marginTop: "7px" }}>
          <Text>{data.firstName}</Text>
        </Col>
        <Col style={{ marginTop: "5px" }}>
          <Text>Brokerage Firm’s Name</Text>
        </Col>
      </Col>
      <Col style={{ marginTop: "7px" }}>
        <Col>
          <Text>{data.firstNumber}</Text>
        </Col>
        <Col style={{ marginTop: "5px" }}>
          <Text>Brokerage Firm’s License Number</Text>
        </Col>
      </Col>
      <Col style={{ marginTop: "7px" }}>
        <Col>
          <Text>{data.address}</Text>
        </Col>
        <Col style={{ marginTop: "5px" }}>
          <Text>Broker’s Address</Text>
        </Col>
      </Col>
      <Col style={{ marginTop: "7px" }}>
        <Col>
          <Text>{data.agentName}</Text>
        </Col>
        <Col style={{ marginTop: "5px" }}>
          <Text>Licensee’s Agent’s Name</Text>
        </Col>
      </Col>
      <Col style={{ marginTop: "7px" }}>
        <Col>
          <Text>{data.licenseNumber}</Text>
        </Col>
        <Col style={{ marginTop: "5px" }}>
          <Text>Real Estate License Number</Text>
        </Col>
      </Col>
      <Col style={{ marginTop: "7px" }}>
        <Col>
          <Text>{data.signature}</Text>
        </Col>
        <Col style={{ marginTop: "5px" }}>
          <Text>Licensee’s Signature</Text>
        </Col>
      </Col>
      <Col style={{ marginTop: "7px" }}>
        <Col>
          <Text>{data.phoneNumber}</Text>
        </Col>
        <Col style={{ marginTop: "5px" }}>
          <Text>Licensee’s Phone Number</Text>
        </Col>
      </Col>
    </Col>
  );
};

const Page10: React.FC<any> = ({ templateValues, pageStyles }) => {
  return (
    <Page size="A4" style={pageStyles.page}>
      <View
        style={{ borderWidth: "1px", borderStyle: "dotted", padding: "10px" }}
      >
        <Row>
          {personalPart(templateValues.tableSections.Extra.info[0], "BUYER 1")}
          {personalPart(templateValues.tableSections.Extra.info[1], "SELLER 1")}
        </Row>
      </View>
      <View
        style={{ borderStyle: "dotted", borderWidth: "1px", padding: "10px" }}
      >
        <Row>
          {personalPart(templateValues.tableSections.Extra.info[2], "BUYER 2")}
          {personalPart(templateValues.tableSections.Extra.info[3], "SELLER 2")}
        </Row>
      </View>
      <View
        style={{ borderStyle: "dotted", borderWidth: "1px", padding: "10px" }}
      >
        <Row>
          {brokeragePart(
            templateValues.tableSections.Extra.info[4],
            "BUYER’S BROKERAGE/ AGENT"
          )}
          {brokeragePart(
            templateValues.tableSections.Extra.info[5],
            "SELLER’S BROKER/ AGENT"
          )}
        </Row>
      </View>
    </Page>
  );
};

export default Page10;
