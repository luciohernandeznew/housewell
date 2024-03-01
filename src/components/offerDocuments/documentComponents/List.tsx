import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  list: {
    padding: 0,
    marginTop: 10,
  },
  list_border_item: {
    padding: 0,
    marginTop: 10,
  },
  li: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  listItemFixedHeight: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    height: 65, 
    // paddingHorizontal: 10, // for horizontal padding
    // paddingVertical: 5,    // for vertical padding
  },
  li_end: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  li_table_list: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  li_border: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
  },
  marker: {
    width: 24,
    fontSize: 10,
  },
  content: {
    flex: 1,
    fontSize: 10,
  },
});

type TListItem = React.PropsWithChildren & {
  marker?: any;
};

export const ListItem: React.FC<TListItem> = ({ children, marker }) => (
  <View style={styles.li} wrap={false}>
    {marker && <View style={styles.marker}>{marker}</View>}
    <View style={styles.content}>{children}</View>
  </View>
);
export const ListItemFixedHeight: React.FC<TListItem> = ({ children, marker }) => (
  <View style={styles.listItemFixedHeight} wrap={false}>
    {marker && <View style={styles.marker}>{marker}</View>}
    <View style={styles.content}>{children}</View>
  </View>
);

export const List: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <View style={styles.list}>{children}</View>;
};

export const List_Border_Item: React.FC<TListItem> = ({ children, marker }) => (
  <View style={styles.li_border} wrap={false}>
    {marker && <View style={styles.marker}>{marker}</View>}
    <View style={styles.content}>{children}</View>
  </View>
);

export const List_End_Item: React.FC<TListItem> = ({ children, marker }) => (
  <View style={styles.li_end} wrap={false}>
    {marker && <View style={styles.marker}>{marker}</View>}
    <View style={styles.content}>{children}</View>
  </View>
);

export const Table_List_Item: React.FC<TListItem> = ({ children, marker }) => (
  <View style={styles.li_table_list} wrap={false}>
    {marker && <View style={styles.marker}>{marker}</View>}
    <View style={styles.content}>{children}</View>
  </View>
);

export const List_Normal_Item: React.FC<TListItem> = ({ children, marker }) => (
  <View style={styles.li_border} wrap={false}>
    {marker && <View style={styles.marker}>{marker}</View>}
    <View style={styles.content}>{children}</View>
  </View>
);
