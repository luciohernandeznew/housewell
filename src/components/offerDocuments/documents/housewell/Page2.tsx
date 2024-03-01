import {
  ListItem,
  List_Border_Item,
  TableBody,
  TableHeader,
  List,
  TextBold,
  List_End_Item,
  Checkbox,
  Table,
} from "../../documentComponents";
import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const Page2: React.FC<any> = ({ templateValues, pageStyles }) => {
  return (
    <>
      <Page size="A4" style={pageStyles.page}>
        <Table>
          <TableBody>
            <List>
              <List_Border_Item marker={<Text>5.</Text>}>
                <Text>
                  <TextBold>Fees, Currency, and Interest. </TextBold>
                  All monies exchanged under this Agreement shall be in US
                  dollars. Holder has the right to separate charge Buyer for any
                  cost associated with receiving of earnest money. Such charge
                  shall be collected separately from the payment of earnest
                  money. All interest accumulated on any Earnest Money shall be
                  retained by the party to whom the Earnest Money is ultimately
                  distributed to or otherwise applied to at Closing after
                  accounting for any costs or fees associated with Holder
                  receiving the Earnest Money.
                </Text>
              </List_Border_Item>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View
                  style={{
                    width: "50%",
                    borderRightWidth: "1px",
                    paddingTop: "10px",
                    paddingLeft: "30px",
                  }}
                >
                  <Text style={{ marginBottom: "10px" }}>
                    <View
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "row",
                        paddingHorizontal: 28,
                        paddingVertical: 10,
                      }}
                      wrap={false}
                    >
                      <View style={{ width: 24 }}>
                        <Text>6. </Text>
                      </View>
                      <View style={{ flex: 1, fontSize: 10 }}>
                        <TextBold>Brokerage.</TextBold>
                      </View>
                    </View>
                  </Text>
                  <ListItem marker={<Text>(a)</Text>}>
                    <Text>Buyer’s Broker is</Text>
                    <Text style={{ marginTop: 10 }}>
                      {templateValues.tableSections.A.buy_broker}
                    </Text>
                    <br></br>
                    <Text style={{ marginTop: 10 }}>and is:</Text>
                    <Text style={{ marginTop: 10 }}>
                      <Checkbox
                        isChecked={
                          templateValues.tableSections.A.buy_brokerage[0]
                        }
                      />
                      &nbsp;representing Buyer as a client.
                    </Text>
                    <Text style={{ marginTop: 10 }}>
                      <Checkbox
                        isChecked={
                          templateValues.tableSections.A.buy_brokerage[1]
                        }
                      />
                      &nbsp;working with Buyer as a customer.
                    </Text>
                  </ListItem>
                </View>

                <View
                  style={{ width: "50%", marginTop: 30, paddingLeft: "10px" }}
                >
                  <ListItem marker={<Text>(b)</Text>}>
                    <Text>Seller’s Broker is </Text>
                    <Text style={{ marginTop: 10 }}>
                      {templateValues.tableSections.A.seller_broker}
                    </Text>
                    <Text style={{ marginTop: 10 }}>and is:</Text>
                    <Text style={{ marginTop: 10 }}>
                      <Checkbox
                        isChecked={
                          templateValues.tableSections.A.sell_brokerage[0]
                        }
                      />
                      &nbsp;representing Buyer as a client.
                    </Text>
                    <Text style={{ marginTop: 10 }}>
                      <Checkbox
                        isChecked={
                          templateValues.tableSections.A.sell_brokerage[1]
                        }
                      />
                      &nbsp;working with Buyer as a customer.
                    </Text>
                  </ListItem>
                </View>
              </View>
              <ListItem>
                <Text
                  style={{
                    paddingLeft: "30px",
                    paddingRight: "30px",
                    marginTop: "10px",
                    fontFamily: "Roboto_Italic",
                  }}
                >
                  (Buyer acknowledges that, if Buyer is not represented by a
                  Broker in a client relationship, they are each solely
                  responsible for protecting their own interests, and that
                  Broker&apos;s role is limited to performing ministerial acts for
                  Buyer.)
                </Text>
              </ListItem>

              <List_End_Item marker={<Text>7.</Text>}>
                <Text>
                  <TextBold>Other Material Relationship Disclosure. </TextBold>
                  The other material relationships required to be disclosed by
                  either Buyer or Seller’s Broker are as follows:
                </Text>
                <Text>{templateValues.tableSections.A.relationship1}</Text>
                <Text>{templateValues.tableSections.A.relationship2}</Text>
              </List_End_Item>
            </List>
          </TableBody>
          <TableHeader>
            <Text>B. Closing.</Text>
          </TableHeader>
          <TableBody>
            <List_Border_Item marker={<Text>1.</Text>}>
              <Text>
                Closing of the sale (the “Closing”) shall occur on or before <TextBold>{templateValues.tableSections.B.date}</TextBold> unless time for closing is
                extended as permitted under the terms of this Agreement or as
                agreed upon by all parties hereto. The Buyer shall select the
                Closing Attorney.
              </Text>
            </List_Border_Item>
            <List_Border_Item marker={<Text>2.</Text>}>
              <Text>
                Closing shall occur at the offices of <TextBold>{templateValues.tableSections.B.name_attorney}</TextBold> located at:{" "} <TextBold>{templateValues.tableSections.B.location}</TextBold> (the “Closing Attorney”) or at such place as determined by the
                Buyer.
              </Text>
              <Text>The Closing Attorney shall be responsible for:</Text>
              <List>
                <ListItem marker={<Text>(a)</Text>}>
                  <Text>
                    preparing all closing documents, including the mortgage,
                    deed, and title insurance policy, and attempting to clear
                    title as agreed; (ii) Ensuring that all closing costs are
                    paid; (iii) Disbursing funds to the appropriate parties at
                    the closing if the Closing Attorney is Holder. The Closing
                    Attorney shall not be obligated to perform other duties
                    including, but not limited to, certifying title unless
                    separately engaged to do so.
                  </Text>
                </ListItem>
                <ListItem marker={<Text>(b)</Text>}>
                  <Text>
                    <TextBold>
                      Closing Attorney as Representative for Lender. 
                    </TextBold>
                    {" "}If the Buyer obtains mortgage financing from a lender, then
                    the Closing Attorney shall represent the lender at the
                    closing of this transaction. The Closing Attorney shall not
                    represent the Buyer or the Seller in any capacity at the
                    closing. In such case, The Buyer and Seller agree that the
                    Closing Attorney is acting as the attorney for the lender
                    and not for the Buyer or the Seller. The Buyer and Seller
                    waive any right to have the Closing Attorney represent them
                    at the closing.
                  </Text>
                </ListItem>
                <ListItem marker={<Text>(c)</Text>}>
                  <Text>
                    <TextBold>
                      Closing Attorney as Representative for Buyer. 
                    </TextBold>
                    {" "}If the Buyer does not obtain mortgage financing from a
                    lender, then the Closing Attorney shall represent the Buyer
                    at the closing of this transaction. In such case, the Buyer
                    and Seller agree that the Closing Attorney is acting as the
                    attorney for the Buyer and not for the Seller. The Buyer and
                    Seller waive any right to have the Closing Attorney
                    represent them at the closing.
                  </Text>
                </ListItem>
              </List>
              {/* */}
            </List_Border_Item>
            <List_Border_Item marker={<Text>3.</Text>}>
              <Text>
                <TextBold>Possession. </TextBold>
                Possession of the Property shall be delivered to Buyer:
              </Text>
              <List>
                <ListItem>
                  <Text>
                    <Checkbox
                      isChecked={templateValues.tableSections.B.option[0]}
                    />
                    &nbsp; Upon the Closing of this transaction.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    <Checkbox
                      isChecked={templateValues.tableSections.B.option[1]}
                    />
                    &nbsp; on <TextBold>{templateValues.tableSections.B.possession_date}</TextBold> (date) and at{" "}
                    <TextBold>{templateValues.tableSections.B.possession_time}</TextBold> (time)
                    &nbsp;
                    <Checkbox isChecked={templateValues.tableSections.B.b_am} />
                    &nbsp; AM &nbsp;
                    <Checkbox isChecked={templateValues.tableSections.B.b_pm} />
                    &nbsp; &nbsp;PM.
                  </Text>
                </ListItem>
              </List>
            </List_Border_Item>
          </TableBody>
        </Table>
      </Page>
    </>
  );
};

export default Page2;
