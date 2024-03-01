import { TextBold, Row, Col } from "../documentComponents";
import { Page, Text, View } from "@react-pdf/renderer";
import Watermark from "./housewell/Watermark";
import { WaterMarkContext } from "../../../contexts/WatermarkContext";
import { useContext } from "react";

const SignaturePage: React.FC<any> = ({ pageStyles }) => {
  const { hasWaterMark } = useContext(WaterMarkContext);
  return (
    <Page size="A4" style={pageStyles.page}>
      {hasWaterMark && <Watermark />}
      <TextBold style={{ textAlign: "center", fontSize: 11 }}>
        SIGNATURE PAGE
      </TextBold>
    </Page>
  );
};

export default SignaturePage;
