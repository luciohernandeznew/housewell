import React from "react";
import { Text } from "@react-pdf/renderer";
import { StyleProp } from "../documentTypes/documentTypes";

export const TextBold: React.FC<React.PropsWithChildren<StyleProp>> = ({
  children,
  style,
}) => (
  <Text
    style={[
      {
        fontWeight: 700,
        fontFamily: "Roboto",
        color: "black",
      },
      style || {},
    ]}
  >
    {children}
  </Text>
);
