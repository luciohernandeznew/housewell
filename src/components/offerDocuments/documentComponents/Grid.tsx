import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import { StyleProp } from "../documentTypes/documentTypes";

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: "15px",
  },
});

type ColProps = React.PropsWithChildren &
  StyleProp & {
    width?: number;
  };

export const Row: React.FC<React.PropsWithChildren<StyleProp>> = ({
  children,
  style,
}) => <View style={[styles.row, style || {}]}>{children}</View>;

export const Col: React.FC<ColProps> = ({ children, width = 100, style }) => (
  <View style={[style || {}, { width: `${width}%` }]}>{children}</View>
);
