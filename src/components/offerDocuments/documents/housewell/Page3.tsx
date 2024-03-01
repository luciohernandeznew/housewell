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
import { Page, Text, View } from "@react-pdf/renderer";

const Page3: React.FC<any> = ({ templateValues, pageStyles }) => {
  return (
    <Page size="A4" style={pageStyles.page}>
      <Table>
        <TableHeader>
          <Text>C. Due Diligence Period.</Text>
        </TableHeader>
        <TableBody>
          <List>
            <Text style={{ paddingLeft: "10px" }}>
              The Buyer shall have a period of{" "}
              <TextBold>{templateValues.tableSections.C.days}</TextBold> days from the Effective Date
              (the &quot;Due Diligence Period&quot;) to conduct due diligence on the
              Property.{" "}
            </Text>
            <Text style={{ paddingLeft: "10px", marginTop: "10px" }}>
              During the Due Diligence Period, the Buyer shall have the right
              to:{" "}
            </Text>
            <List_End_Item marker={<Text>1.</Text>}>
              <Text>
                Review all documents relating to the Property, including the
                title report, survey, appraisal, and any other documents that
                are in the Seller&apos;s possession;
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>2.</Text>}>
              <Text>
                Inspect the Property and have it inspected by any professionals
                that the Buyer deems necessary;
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>3.</Text>}>
              <Text>
                Obtain any other information that the Buyer deems necessary to
                make an informed decision about whether to purchase the
                Property.
              </Text>
            </List_End_Item>
            <List_End_Item>
              <Text>
                If, during the Due Diligence Period, the Buyer discovers any
                material defects in the Property or any other information that
                would cause the Buyer to not want to purchase the Property, the
                Buyer may terminate this Agreement by providing written notice
                to the Seller within three (3) days after which no Party shall
                have any further rights or obligations to any other Party.
              </Text>
            </List_End_Item>
            <List_End_Item>
              <Text>
                If the Buyer terminates this Agreement under this Section, the
                Buyer shall be entitled to a full refund of the Earnest Money.
                Seller shall cause all utilities, systems, and equipment to be
                on so that Buyer may complete all inspections.
              </Text>
            </List_End_Item>
          </List>
          <List>
            <Text style={{ padding: "10px" }}>
              <TextBold>
                Buyer agrees to hold Seller harmless from any and all claims,
                injuries, and damages relating to the exercise of Buyer’s rights
                of inspection and shall promptly pay Seller the costs to restore
                any portion of the Property damaged or disturbed as a result of
                the exercise of such rights, such portion to be restored to a
                condition equal to or better than the condition it was in prior
                to such inspection. The obligations set forth in this Paragraph
                shall survive the Closing.
              </TextBold>
            </Text>
          </List>
        </TableBody>
        <TableHeader>
          <Text>D. Appraisal Contingency.</Text>
        </TableHeader>
        <TableBody>
          <Text
            style={{
              marginTop: "10px",
              paddingLeft: "5px",
              paddingRight: "10px",
            }}
          >
            Seller agrees that if Buyer is financing the purchase of the Property and did not waive their right to financing contingency in section 3, Buyer’s obligation to purchase the Property is
            subject to the following appraisal contingency:
          </Text>

          <List>
            <List_End_Item marker={<Text>1.</Text>}>
              <Text>
                <TextBold>Appraisal Value.</TextBold>
                {" "}The appraised value of the Property must be equal to or greater
                than the Purchase Price in order for the Buyer to be obligated
                to close the purchase. If the appraised value is less than the
                Purchase Price, the Buyer in its sole discretion may within{" "}
                7 days of receiving the
                appraisal report:
              </Text>
              <List>
                <ListItem marker={<Text>(a)</Text>}>
                  <Text>
                    Terminate this Agreement and receive a full refund of the
                    Earnest Money; or
                  </Text>
                </ListItem>
                <ListItem marker={<Text>(b)</Text>}>
                  <Text>
                    Negotiate with the Seller to reduce the Purchase Price to
                    the appraised value; or
                  </Text>
                </ListItem>
                <ListItem marker={<Text>(c)</Text>}>
                  <Text>
                    Pay an amount equal to the difference between the Purchase
                    Price and the appraised value at Closing.
                  </Text>
                  <List>
                    <ListItem marker={<Text>(c-1)</Text>}>
                      <Text>
                        <Checkbox
                          isChecked={templateValues.tableSections.D.c1}
                        />
                        &nbsp; By Checking this box, Buyer additionally agrees
                        that it hereby waives its right to exercise options 1(a)
                        and 1(b) of this Appraisal Contingency Section in the
                        event the appraised value of the Property is not equal
                        to the Purchase Price. Additionally, Buyer will pay the
                        balance of the amount equal to the difference between
                        the Purchase Price and the appraised value up to a
                        maximum amount of{" "}
                        <TextBold>{templateValues.tableSections.D.maxAmount}</TextBold>.
                      </Text>
                    </ListItem>
                  </List>
                </ListItem>
              </List>
            </List_End_Item>
            <List_End_Item marker={<Text>2.</Text>}>
              <Text>
                <TextBold>Termination.</TextBold>
                {" "}If the Buyer terminates this Agreement in accordance with
                Section A (4) upon return of the Earnest Money to the Buyer,
                neither party shall have any further right or remedy against the
                other by reason thereof or hereof. If Buyer does not timely
                terminate in accordance with Section A (4), Buyer shall have the
                option to terminate this Agreement under this contingency
                without further consequence, but the Earnest Money shall be
                distributed to the Seller.
              </Text>
            </List_End_Item>
          </List>
        </TableBody>
      </Table>
    </Page>
  );
};

export default Page3;
