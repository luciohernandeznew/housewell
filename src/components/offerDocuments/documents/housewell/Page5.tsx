import {
  ListItem,
  TableBody,
  List,
  TextBold,
  List_End_Item,
  Table,
} from "../../documentComponents";
import { Page, Text } from "@react-pdf/renderer";

const Page5: React.FC<any> = ({ templateValues, pageStyles }) => {
  return (
    <Page size="A4" style={pageStyles.page}>
      <Table>
        <TableBody>
          <List>
            <List_End_Item marker={<Text>5.</Text>}>
              <Text>
                <TextBold>Condition of Title.</TextBold>
                {" "}Seller shall convey to Buyer good, marketable, and fee simple
                title to the Property by limited warranty Deed. Title to the
                Property shall be conveyed at Closing.
              </Text>

              <List>
                <ListItem marker={<TextBold>(a)</TextBold>}>
                  <Text>
                    <TextBold>Permitted Exceptions.</TextBold>
                    {" "}Title shall be only subject only to (i) covenants,
                    conditions, and restrictions of record; (ii) public and
                    private utility easements, and road and rights of way; (iii)
                    Any liens for taxes or assessments that are not yet due and
                    payable, and (iv) such other exceptions to title as Buyer
                    shall approve in writing (collectively, the “
                    <TextBold>Permitted Exceptions.</TextBold>”){" "}If upon
                    inspection of title Buyer shall have objections to items
                    affecting title, Buyer shall give written notice of any such
                    objections to Seller.
                  </Text>
                </ListItem>
                <ListItem marker={<TextBold>(b)</TextBold>}>
                  <Text>
                    <TextBold>Title Objections.</TextBold>
                    {" "}The Buyer shall have the right to review the preliminary
                    title report or commitment and to object to any matters of
                    record that are not acceptable to the Buyer. If the Buyer
                    objects to any matters of record, the Seller shall have the
                    option to cure the defect or to allow the Buyer to terminate
                    the Agreement and receive a refund of the Earnest Money.
                  </Text>
                </ListItem>
              </List>
            </List_End_Item>
            <List_End_Item marker={<Text>6.</Text>}>
              <Text>
                <TextBold>Closing Documents.</TextBold>
                {" "}At Closing, each party will execute all necessary and customary
                Closing documents (“<TextBold>Closing Documents</TextBold>”)
                necessary to complete the sale and the transfer of the Property.
                The Parties agree to negotiate all Closing Documents in good
                faith.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>7.</Text>}>
              <Text>
                <TextBold>Notices.</TextBold>
                {" "}All notices, requests, demands, tenders, and other
                communications under this Agreement shall be in writing and
                shall be (i) by certified U.S. Mail, return receipt requested;
                (ii) nationally recognized overnight delivery service; or (iii)
                by email or facsimile.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>8.</Text>}>
              <Text>
                <TextBold>Condemnation.</TextBold>
                {" "}In the event of condemnation or notice of condemnation of all or
                a part of the Property prior to the Closing, Buyer shall have
                the right to terminate this Agreement, whereupon all Earnest
                Money shall be paid to Buyer and neither party shall have any
                further right or remedy against the other by reason thereof or
                hereof.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>9.</Text>}>
              <Text>
                <TextBold>Counterparts.</TextBold>
                {" "}This Agreement may be executed in several counterparts, each of
                which shall be deemed an original, and all of such counterparts
                together shall constitute one and the same instrument.
                Signatures provided by facsimile or electronic transmission
                shall have the same force and effect as original signatures and
                shall be binding upon the parties.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>10.</Text>}>
              <Text>
                <TextBold>Time is of the Essence.</TextBold>
                {" "}Time is of the essence of this Agreement.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>11.</Text>}>
              <Text>
                <TextBold>Real Estate Agency.</TextBold>
                {" "}Seller and Buyer each represent to the other that they have
                not dealt with any other real estate broker or intermediary in
                connection with the negotiations leading to this Agreement
                except those named. Seller and Buyer each agree to indemnify and
                hold each other harmless from and against the claims of any and
                all such other brokers or other intermediaries claiming to have
                had any dealings, negotiations, or consultations with the
                indemnifying party in connection with this Agreement of the sale
                of the Property. The indemnity contained in this Paragraph shall
                survive the Closing.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>12.</Text>}>
              <Text>
                <TextBold>Limitation of Broker Liability.</TextBold>
                {" "}The Brokers shall not be liable to either party for any losses,
                damages, or expenses arising out of or in connection with this
                Agreement, except to the extent that such losses, damages, or
                expenses are caused by the Brokers’ gross negligence or willful
                misconduct. The Brokers’ liability for gross negligence or
                willful misconduct shall be limited to the amount of the
                Broker&apos;s commission. The Broker shall not be liable for any
                indirect, special, incidental, or consequential damages,
                including, but not limited to, lost profits, loss of use, or
                loss of enjoyment. This limitation of liability shall apply to
                all claims, whether in contract, tort, or otherwise.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>13.</Text>}>
              <TextBold>Remedies.</TextBold>
              <List>
                <ListItem marker={<TextBold>(a)</TextBold>}>
                  <Text>
                    <TextBold>Remedies of Seller.</TextBold>
                    {" "}Should Buyer breach this Agreement or refuse or fail to
                    purchase the Property as contemplated herein, Seller shall
                    be entitled to retain the Earnest Money as liquidated
                    damages as its sole and exclusive remedy and expressly
                    waives any right to seek specific performance. Seller
                    expressly agrees that the Earnest Money is a reasonable
                    pre-estimate of Seller’s actual damages, which damages the
                    parties agree are difficult to ascertain. The parties
                    expressly intend for the earnest money to serve as
                    liquidated damages and not as a penalty.
                  </Text>
                </ListItem>
              </List>
            </List_End_Item>
          </List>
        </TableBody>
      </Table>
    </Page>
  );
};

export default Page5;
