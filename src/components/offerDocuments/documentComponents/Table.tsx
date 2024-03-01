import React from "react";
import { View, StyleSheet, Text, Image } from "@react-pdf/renderer";
import { StyleProp } from "../documentTypes/documentTypes";
import { Table_List_Item } from "./List";

const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid"
    },
    header: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        backgroundColor: "#D9D9D9",
        fontWeight: 700,
        paddingLeft: 4,
        paddingRight: 4
    },
    body: {
        // paddingHorizontal: 30,
        // paddingVertical: 20
    },
    row: {
        display: "flex",
        flexDirection: "row"
    }
});

type BodyPropType = {
    title: any;
    index: any;
    check: any;
    title_width: string;
    yes_width: string;
    no_width: string;
    un_width: string;
};

export const TableHeader: React.FC<React.PropsWithChildren<StyleProp>> = ({ children, style }) => <View style={[styles.header, style || {}]}>{children}</View>;
export const TableBody: React.FC<React.PropsWithChildren<StyleProp>> = ({ children, style }) => <View style={[styles.body, style || {}]}>{children}</View>;

export const Table: React.FC<React.PropsWithChildren<StyleProp>> = ({ children, style }) => {
    return <View style={[styles.table, style || {}]}>{children}</View>;
};

export const TableHeaderItem: React.FC<any> = ({ title }) => {
    return (
        <View
            style={{
                borderBottomWidth: 1,
                borderColor: "black",
                borderStyle: "solid",
                fontWeight: 700,
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#D9D9D9"
            }}
        >
            <View
                style={{
                    width: "74%",
                    borderRightWidth: 1,
                    borderColor: "black",
                    borderStyle: "solid",
                    paddingLeft: "5px",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                }}
            >
                <Text>{title}</Text>
            </View>
            <View
                style={{
                    width: "5%",
                    borderRightWidth: 1,
                    borderColor: "black",
                    borderStyle: "solid",
                    textAlign: "center",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                }}
            >
                <Text>YES</Text>
            </View>
            <View
                style={{
                    width: "5%",
                    borderRightWidth: 1,
                    borderColor: "black",
                    borderStyle: "solid",
                    textAlign: "center",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                }}
            >
                <Text>NO</Text>
            </View>
            <View
                style={{
                    width: "16%",
                    textAlign: "center",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                }}
            >
                <Text>UNKNOWN/NA</Text>
            </View>
        </View>
    );
};

export const TableBodyItem: React.FC<BodyPropType> = ({ index, title, check, title_width, yes_width, no_width, un_width }) => {
    return (
        <View
            style={{
                borderBottomWidth: 1,
                borderColor: "black",
                borderStyle: "solid",
                fontWeight: 700,
                display: "flex",
                flexDirection: "row"
            }}
        >
            <View
                style={{
                    width: title_width,
                    borderRightWidth: 1,
                    borderColor: "black",
                    borderStyle: "solid"
                }}
            >
                <Table_List_Item marker={<Text>{index}</Text>}>{title}</Table_List_Item>
            </View>
            <View
                style={{
                    width: yes_width,
                    borderRightWidth: 1,
                    borderColor: "black",
                    borderStyle: "solid",
                    textAlign: "center"
                }}
            >
                <View style={{ paddingTop: "10px" }}>
                    {check.map((item: any) => {
                        return item["yes_value"] ? (
                            <View
                                key={index}
                                style={{
                                    marginBottom: "10px",
                                }}
                            >
                                <View style={{ margin: "auto" }}>
                                    <Image
                                        src="/images/check.png"
                                        style={{ width: "10px", height: "10px" }}
                                    />
                                </View>
                            </View>
                        ) : (
                            <View style={{ height: "10px" }} />
                        );
                    })}
                </View>
            </View>
            <View
                style={{
                    width: no_width,
                    borderRightWidth: 1,
                    borderColor: "black",
                    borderStyle: "solid",
                    textAlign: "center"
                }}
            >
                <View style={{ paddingTop: "10px" }}>
                    {check.map((item: any) => {
                        return item["no_value"] ? (
                            <View
                                key={index}
                                style={{
                                    marginBottom: "10px",
                                }}
                            >
                                <View style={{ margin: "auto" }}>
                                    <Image
                                        src="/images/check.png"
                                        style={{ width: "10px", height: "10px" }}
                                    />
                                </View>
                            </View>
                        ) : (
                            <View style={{ height: "10px" }}                            ></View>
                        );
                    })}
                </View>
            </View>
            <View
                style={{
                    width: un_width,
                    textAlign: "center"
                }}
            >
                <View style={{ paddingTop: "10px" }}>
                    {check.map((item: any) => {
                        return item["un_value"] ? (
                            <View
                                key={index}
                                style={{
                                    marginBottom: "10px",
                                }}
                            >
                                <View style={{ margin: "auto" }}>
                                    <Image
                                        src="/images/check.png"
                                        style={{ width: "10px", height: "10px" }}
                                    />
                                </View>
                            </View>
                        ) : (
                            <View
                                style={{
                                    height: "10px",
                                }}
                            />
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

export const TableMiddleItem: React.FC = () => {
    return (
        <View
            style={{
                borderBottomWidth: 1,
                borderColor: "black",
                borderStyle: "solid",
                fontWeight: 700,
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#D9D9D9"
            }}
        >
            <View
                style={{
                    width: "58%",
                    borderRightWidth: 1,
                    borderColor: "black",
                    borderStyle: "solid",
                    paddingLeft: "5px",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                }}
            >
                <Text>B. ELECTRICAL/GAS SYSTEMS:</Text>
            </View>
            <View
                style={{
                    width: "13%",
                    borderRightWidth: 1,
                    borderColor: "black",
                    borderStyle: "solid",
                    textAlign: "center",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                }}
            >
                <Text>WORKING</Text>
            </View>
            <View
                style={{
                    width: "13%",
                    borderRightWidth: 1,
                    borderColor: "black",
                    borderStyle: "solid",
                    textAlign: "center",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                }}
            >
                <Text>NOT</Text>
                <Text>WORKING</Text>
            </View>
            <View
                style={{
                    width: "16%",
                    textAlign: "center",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                }}
            >
                <Text>UNKNOWN/NA</Text>
            </View>
        </View>
    );
};
