import { TextBold, Row, Col } from "../../documentComponents";
import { Page, Text, View } from "@react-pdf/renderer";

const Page8: React.FC<any> = ({ templateValues, pageStyles }) => {
  return (
    <Page size="A4" style={pageStyles.page}>
      <TextBold style={{ textAlign: "center", fontSize: 11 }}>
        EXHIBIT “G” OTHER SPECIAL STIPULATIONS
      </TextBold>
      <Text>
        {templateValues.G_blank_data}
      </Text>
    </Page>
  );
};

export default Page8;