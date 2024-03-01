import {
  ListItem,
  TableBody,
  TableHeader,
  List,
  TextBold,
  List_End_Item,
  Checkbox,
  Table,
} from "../../documentComponents";
import { Page, Text } from "@react-pdf/renderer";

const Page4: React.FC<any> = ({ templateValues, pageStyles }) => {
  return (
    <Page size="A4" style={pageStyles.page}>
      <Table>
        <TableHeader>
          <Text>E. Condition of Property.</Text>
        </TableHeader>
        <TableBody>
          <Text
            style={{
              marginTop: "10px",
              paddingLeft: "5px",
              paddingRight: "5px",
            }}
          >
            Buyer is purchasing the Property “as is” subject to Buyer’s right to
            inspect the Property. At Closing, the Property shall be in the same
            condition it is on the Binding Agreement Date, normal wear and tear
            and deterioration excepted. Seller has the duty and legal obligation
            to disclose any known latent defects to Buyer. Any repairs performed
            by Seller shall be done in a “good and workmanlike” manner and
            completed prior to Closing unless otherwise agreed to in writing by
            the Parties. Notwithstanding anything else in this Section, the
            Seller shall disclose to the Buyer, in writing, all known latent or
            hidden material defects in the Property. A defect is considered
            &quot;material&quot; if it would be likely to affect the Buyer&apos;s decision to
            purchase the Property. A defect is considered &quot;latent&quot; if it is not
            readily apparent or discoverable by a reasonable inspection of the
            Property. The Seller&apos;s failure to disclose a material defect may
            give the Buyer the right to terminate this Agreement and receive a
            refund of the Earnest Money. The Buyer may also have a claim against
            the Seller for damages if the Buyer suffers losses as a result of
            the Seller&apos;s failure to disclose a known material latent or hidden
            defect.
          </Text>
          <List>
            <List_End_Item
              marker={
                <Text>
                  {" "}
                  <Checkbox
                    isChecked={templateValues.tableSections.E.option1}
                  />
                  &nbsp;
                </Text>
              }
            >
              <Text>
                <TextBold>Lead-Based Paint Disclosure.</TextBold> To the best of
                Seller’s knowledge, no part of the residential dwelling
                (including without limitation any painted fixtures attached
                thereto) was constructed prior to 1978.
              </Text>
            </List_End_Item>
            <List_End_Item
              marker={
                <Text>
                  {" "}
                  <Checkbox
                    isChecked={templateValues.tableSections.E.option2}
                  />
                  &nbsp;
                </Text>
              }
            >
              <Text>
                <TextBold>Property Condition Disclosure Statement.</TextBold>{" "}
                Seller has provided Buyer with a Seller’s Property Condition
                Disclosure Statement and is obligated to update same during the
                term of this Agreement as necessary to reflect an accurate
                disclosure of the condition of the property.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text></Text>}>
              <Text>
                If the Property was constructed prior to 1978, then the Seller
                shall provide the Buyer with a copy of any lead-based paint
                hazard evaluation (LPHE) report that is available for the
                Property. If an LPHE report is unavailable, then the Buyer shall
                have the right to have Property inspected by a certified
                lead-based paint inspector and provide the Seller with a copy of
                the report within ten (10) days. The Buyer shall conduct the
                LPHE at their own expense. If the LPHE report identifies any
                lead-based paint hazards, the Buyer may terminate this Agreement
                and receive a refund of the Earnest Money.
              </Text>
            </List_End_Item>
          </List>
        </TableBody>
        <TableHeader>
          <Text>F. Other Terms.</Text>
        </TableHeader>
        <TableBody>
          <List>
            <List_End_Item marker={<Text>1.</Text>}>
              <Text>
                <TextBold>Damage or Destruction of Property.</TextBold>
                {" "}If the Property is destroyed or materially damaged prior to
                Closing (each a “<TextBold>Change in Condition</TextBold>”),
                Seller shall promptly give notice to Buyer of such Change in
                Condition together with information as to any insurance
                coverage. Upon receipt of notice Buyer may (a) terminate the
                Agreement with all Earnest Money being refunded to Buyer; (b)
                allow Seller a reasonable time to restore the Property to its
                prior condition with the Closing Date being extended as
                necessary to allow for the repairs and as agreed to by the
                Parties; or (c) accept the Property in its damaged condition and
                accept an assignment of Insurance proceeds.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>2.</Text>}>
              <Text>
                <TextBold>Closing Costs and Prorations.</TextBold>
                {" "}Seller shall pay Seller’s attorney fees to prepare and record
                title curative documents and for any fees incurred as a result
                of Seller not attending the Closing, costs for clearing any
                title defects, real estate broker commissions, and any amount
                required to discharge any mortgage, lien, or encumbrance not
                assumed by Buyer, and payoff and proceeds handling expenses.
                Seller shall contribute the amount, if any, detailed in Section
                A (3) above. Buyer shall be responsible for payment of all other
                costs, fees, and expenses including without limitation the
                Georgia property transfer tax, the cost of any title and tax
                record searches, the costs to prepare the deed, and all other
                title and post-closing fees.{" "}
                <TextBold>
                  The obligations to pay attorney fees, real estate broker
                  commissions, and amounts required to discharge any unassumed
                  mortgage, lien, encumbrance, or handling expenses shall
                  survive the Closing.
                </TextBold>
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>3.</Text>}>
              <Text>
                <TextBold>Proration.</TextBold>
                {" "}Ad valorem property taxes, county and/or city taxes if
                applicable, community association fees, solid waste,
                governmental fees, and utility bills for which service cannot be
                terminated as of the date of Closing shall be prorated as of the
                date of Closing. In the event ad valorem property taxes are
                based upon an estimated tax bill or tax bill under appeal, Buyer
                and Seller shall, upon the issuance of the actual tax bill or
                the appeal being resolved, promptly make such financial
                adjustments between themselves as are necessary to correctly
                prorate the tax bill.{" "}
                <TextBold>
                  The obligations in this paragraph, including without
                  limitation, the obligation to prorate for ad valorem taxes,
                  shall survive the Closing.
                </TextBold>
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>4.</Text>}>
              <Text>
                <TextBold>Possession.</TextBold>
                {" "}Seller shall deliver possession of the Property to Buyer as
                determined in Section B (3) above.
              </Text>
            </List_End_Item>
          </List>
        </TableBody>
      </Table>
    </Page>
  );
};

export default Page4;
