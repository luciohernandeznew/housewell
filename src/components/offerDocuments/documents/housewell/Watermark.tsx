import { Document, Page, Text, View } from "@react-pdf/renderer";

const Watermark: React.FC = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0.5,
        transform: "rotate(-35deg)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 100,
          fontWeight: "bold",
          color: "grey",
        }}
      >
        PREVIEW
      </Text>
    </View>
  );
};

export default Watermark;
