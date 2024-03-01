import {
  ListItem,
  TableBody,
  List,
  TextBold,
  List_End_Item,
  Table,
} from "../../documentComponents";
import { Page, Text } from "@react-pdf/renderer";

const Page6: React.FC<any> = ({ templateValues, pageStyles }) => {
  return (
    <Page size="A4" style={pageStyles.page}>
      <Table>
        <TableBody>
          <List>
            <List_End_Item marker={<Text></Text>}>
              <List>
                <ListItem marker={<TextBold>(b)</TextBold>}>
                  <Text>
                    <TextBold>Remedies of Buyer:</TextBold>
                    {" "}Should Seller breach this Agreement or refuse or fail to
                    purchase the Property as contemplated herein, Buyer shall be
                    entitled may either seek the specific performance or
                    terminate this Agreement upon notice to Seller and Holder
                    and all Earnest Moneys and other payments Buyer has paid
                    towards the purchase of the Property shall be returned to
                    Buyer.
                  </Text>
                </ListItem>
                <ListItem marker={<TextBold>(c)</TextBold>}>
                  <Text>
                    <TextBold>Remedies of Broker:</TextBold>
                    {" "}Should Buyer or Seller breach this Agreement, then the
                    defaulting party shall pay as liquidated damages to every
                    broker involved in this Agreement the commission the broker
                    would have received had the transaction closed. The
                    liquidated damages referenced above are a reasonable
                    pre-estimate of the Broker(s) actual damages and are not a
                    penalty.
                  </Text>
                </ListItem>
                <ListItem marker={<TextBold>(d)</TextBold>}>
                  <Text>
                    <TextBold>Attorney’s Fees:</TextBold>
                    {" "}In any litigation or arbitration arising out of this
                    Agreement, including but not limited to breach of contract
                    claims between Buyer and Seller and commission claims
                    brought by a broker, the non-prevailing party shall be
                    liable to the prevailing party for its reasonable attorney’s
                    fees and expenses.
                  </Text>
                </ListItem>
                <ListItem marker={<TextBold>(e)</TextBold>}>
                  <Text>
                    <TextBold>Attorneys’ Fees.</TextBold>
                    {" "}If either party shall bring an action against the other
                    arising out of this Agreement, the party in whose favor
                    final judgment is entered shall be entitled to have and
                    recover from the other party its reasonable attorneys’ fees
                    and other reasonable expenses incurred in connection with
                    such action or proceeding, in addition to its recoverable
                    court costs. The provisions of this Paragraph shall survive
                    Closing.
                  </Text>
                </ListItem>
              </List>
            </List_End_Item>
            <List_End_Item marker={<Text>14.</Text>}>
              <TextBold>Earnest Money.</TextBold>

              <List>
                <ListItem marker={<TextBold>(a)</TextBold>}>
                  <Text>
                    <TextBold>Buyer’s Entitlement:</TextBold>
                    {" "}The Buyer shall be entitled to the earnest money upon Seller
                    default, Buyer’s termination of this Agreement in accordance
                    with this Agreement’s terms, Buyer’s termination in
                    accordance with its contingencies, or if the Parties fail to
                    entire into a binding Agreement.
                  </Text>
                </ListItem>
                <ListItem marker={<TextBold>(b)</TextBold>}>
                  <Text>
                    <TextBold>Holder’s Distribution:</TextBold>
                    {" "}The Holder shall distribute the Earnest Money in accordance
                    with this Agreements terms or in accordance with a separate
                    written agreement executed by both Buyer and Seller.
                    Additionally, the Holder may distribute the Earnest Money in
                    accordance with a court order.
                  </Text>
                </ListItem>
                <ListItem marker={<TextBold>(c)</TextBold>}>
                  <Text>
                    <TextBold>Interpleader:</TextBold>
                    {" "}In the event of a dispute, Holder may also interplead the
                    earnest money into a court of law if in Holder’s reasonable
                    discretion, Holder cannot ascertain the proper party to
                    distribute the Earnest Money to. Holder’s reasonable costs
                    associated with an interpleader shall be reimbursed by the
                    party at fault (or the breaching party), debited from the
                    Earnest Money prior to distribution, or paid for by the
                    Parties in accordance with a court order.{" "}
                    <TextBold>
                      All parties shall indemnify and hold Holder harmless from
                      and against all claims, injuries, suits, and damages
                      (collectively, “Claims”) arising out of the performance by
                      Holder of its duties in accordance with this agreement,
                      decisions made in Holder’s reasonable discretion in
                      accordance with this Agreement.
                    </TextBold>
                  </Text>
                </ListItem>
              </List>
            </List_End_Item>
            <List_End_Item marker={<Text>15.</Text>}>
              <Text>
                <TextBold>Benefit and Binding Effect.</TextBold>
                {" "}This Agreement shall be binding upon and inure to the benefit of
                the personal and legal representatives, successors, and assigns
                of the respective parties; provided that Buyer shall not assign
                this agreement without the prior written consent of Seller,
                which may be withheld, conditioned, or delayed in Seller’s sole
                discretion.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>16.</Text>}>
              <Text>
                <TextBold>Governing Law.</TextBold>
                {" "}This Agreement shall be governed by and construed in accordance
                with the laws of the state of Georgia.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>17.</Text>}>
              <Text>
                <TextBold>Waiver.</TextBold>
                {" "}No waiver of any breach of any covenant or provision contained
                herein will be deemed a waiver of any preceding or succeeding
                breach thereof, or of any other covenant or provision contained
                herein. No extension of time for performance of any obligation
                or act will be deemed an extension of the time for performance
                of any other obligation or act except those of the waiving
                party, which will be extended by a period of time equal to the
                period of the delay.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>18.</Text>}>
              <Text>
                <TextBold>Entire Agreement.</TextBold>
                {" "}This Agreement (including all Exhibits attached hereto)
                constitutes the entire contract between the parties hereto and
                may not be modified except by an instrument in writing signed by
                the party to be charged.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>19.</Text>}>
              <Text>
                <TextBold>Preparation of Agreement; Collaboration.</TextBold>
                {" "}This Agreement has been prepared by Seller and reviewed by both
                parties, their advisors and/or their attorneys. Both Parties
                represent that this Agreement is the product of all of their
                efforts, intentions, and wills and that it expresses their
                agreement and that it should not be construed in favor or
                against either Seller or Buyer.
              </Text>
            </List_End_Item>
          </List>
        </TableBody>
      </Table>
    </Page>
  );
};

export default Page6;
