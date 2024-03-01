import { Page, Text } from "@react-pdf/renderer";
import {
  Checkbox,
  List,
  ListItem,
  Table,
  TableHeader,
  TableBody,
  TextBold,
  List_Border_Item,
} from "../../documentComponents";
type PropType = {
  templateValues: any;
  pageStyles: any;
  number: any;
};
const Page1: React.FC<PropType> = ({ templateValues, pageStyles, number }) => {
  return (
    <>
      <Page size="A4" style={pageStyles.page}>
        <TextBold style={{ textAlign: "center", fontSize: 11 }}>
          Purchase and Sale Agreement
        </TextBold>
        <Text style={{ marginTop: 10, marginBottom: 10 }}>
          This agreement is made effective and binding on the date that the last
          of either the Buyer(s) or Seller(s) signs this Agreement (the “Binding
          Agreement Date”). The Buyer and Seller along with their respective
          agents (if any) are named on pages 2 and 8. All singular references to
          the Buyer or Seller shall be to all Buyers or Seller named on page 8. 
          For the good and valuable consideration named in this Agreement, the
          Buyer and Seller agree to the following terms. 
        </Text>
        <Text style={{textAlign: 'center'}}> Offer Date: <TextBold>{templateValues.tableSections.A.offerDate}</TextBold></Text>
        <Table style={{marginTop: '15px'}}>
          <TableHeader>
            <Text>A. General.</Text>
          </TableHeader>
          <TableBody>
            <List>
              <List_Border_Item marker={<Text>1.</Text>}>
                <Text>
                  <TextBold>Offer Expiration.</TextBold>
                  {" "}
                  This Agreement represents an offer only until both the Buyer
                  and Seller sign this Agreement according to this Section A
                  (1)(a).
                </Text>
                <List>
                  <ListItem marker={<Text>(a)</Text>}>
                    <Text>
                      Unless signed by both parties and delivered to the party
                      making the offer prior to the expiration of the offer on <TextBold>{templateValues.tableSections.A.expiryDate}</TextBold> (date) and at{" "}<TextBold>{templateValues.tableSections.A.time}</TextBold> (time &nbsp;
                      {
                        <Checkbox
                          isChecked={templateValues.tableSections.A.a_am}
                        />
                      }
                      &nbsp; AM &nbsp;
                      {
                        <Checkbox
                          isChecked={templateValues.tableSections.A.a_pm}
                        />
                      }
                      &nbsp; PM), this Agreement shall terminate and be of no
                      force and effect.
                    </Text>
                  </ListItem>
                </List>
              </List_Border_Item>
              <List_Border_Item marker={<Text>2.</Text>}>
                <Text>
                  <TextBold>Description of Property.</TextBold>
                  {" "}
                  <Text>
                    The Seller agrees to sell to Buyer and Buyer agrees to buy
                    from Seller, the property located at: Address: <TextBold>{templateValues.tableSections.A.adress}, {templateValues.tableSections.A.city}, {templateValues.tableSections.A.county}, {templateValues.tableSections.A.state}, {templateValues.tableSections.A.code}</TextBold> (the “Property”).
                  </Text>
                </Text>
                <List>
                  <ListItem
                    marker={
                      <Text>
                        <Checkbox
                          isChecked={templateValues.tableSections.A.hasDeedBook}
                        />
                      </Text>
                    }
                  >
                    <Text>
                      The Property may also be described in deed book <TextBold>{templateValues.tableSections.A.deedBook}</TextBold>, Page{" "}
                      <TextBold>{templateValues.tableSections.A.deedBook}</TextBold> of the
                      county land records.
                    </Text>
                  </ListItem>
                  <ListItem
                    marker={
                      <Text>
                        <Checkbox
                          isChecked={templateValues.tableSections.A.hasLandLot}
                        />
                      </Text>
                    }
                  >
                    <Text>
                      as all of that tract of land in Land Lot{" "}
                      <TextBold>{templateValues.tableSections.A.landLot}</TextBold> of the
                      <TextBold>{templateValues.tableSections.A.district}</TextBold> District of{" "}
                      <TextBold>{templateValues.tableSections.A.county}</TextBold> County,
                      Georgia, Lot #{" "}
                      <TextBold>{templateValues.tableSections.A.lotNumber}</TextBold>
                      of the <TextBold>{templateValues.tableSections.A.subdivisionName}</TextBold>{" "}
                      Subdivision.
                    </Text>
                  </ListItem>
                </List>
                <Text style={{ marginTop: "10px" }}>
                  <TextBold>
                    The Legal Description may be further described on Exhibit “F”
                    </TextBold>
                  {" "}
                  The Property includes all fixtures, improvements, shrubbery,
                  and landscaping, unless specifically excluded by Seller.
                  Absent the mutual written consent of the parties, this list of
                  fixtures, improvements, shrubbery, and landscaping shall not
                  be modified after the Binding Agreement Date.
                </Text>
              </List_Border_Item>
              <List_Border_Item marker={<Text>3.</Text>}>
                <Text>
                  <TextBold>
                    Purchase Price, Contributions and Financing.
                  </TextBold>
                  {" "}{templateValues.tableSections.A.purchase_price} (the “Purchase
                  Price”). The Purchase Price shall be paid in cash or
                  immediately available funds at the Closing (as defined in
                  Section B (1) below).
                </Text>
                <List>
                  <ListItem
                    marker={
                      <Text>
                        <Checkbox
                          isChecked={templateValues.tableSections.A.options[0]}
                        />
                      </Text>
                    }
                  >
                    <Text>
                      Seller shall contribute{" "}
                      <TextBold>{templateValues.tableSections.A.closing_costs}</TextBold> towards
                      Buyer’s closing costs.
                    </Text>
                  </ListItem>
                  <ListItem
                    marker={
                      <Text>
                        <Checkbox
                          isChecked={templateValues.tableSections.A.options[1]}
                        />
                      </Text>
                    }
                  >
                    <Text>
                      Since Buyer is not represented as a client by a broker,
                      and since Seller will not pay commissions to a broker for
                      representing Buyer as a client, then Seller has agreed to
                      following (additional) contribution towards closing costs:{" "}
                      <TextBold>{templateValues.tableSections.A.housewell_rebate}</TextBold>.
                    </Text>
                  </ListItem>
                  <ListItem
                    marker={
                      <Text>
                        <Checkbox
                          isChecked={templateValues.tableSections.A.options[2]}
                        />
                      </Text>
                    }
                  >
                    <Text>
                      Buyer’s obligation to purchase the Property is contingent
                      upon Buyer’s ability to obtain financing for <TextBold>{templateValues.tableSections.A.purchase_percent}</TextBold> (%) percent of the Purchase Price at an interest rate of <TextBold>{templateValues.tableSections.A.rate_percent}</TextBold> (%) percent.
                      The Buyer shall use diligent efforts to obtain financing
                      for the purchase of the Property. The Buyer shall have <TextBold>{templateValues.tableSections.A.financing_cont_days}</TextBold> <TextBold>{templateValues.tableSections.A.financing_cont_days_words}</TextBold> days from the
                      Effective Date to obtain a written commitment for
                      financing from a qualified lender. If the Buyer is unable
                      to obtain financing within the specified period, the Buyer
                      may terminate this Agreement by providing written notice
                      to the Seller. If the Buyer terminates this Agreement
                      under this Section, the Buyer shall be entitled to a full
                      refund of the Earnest Money.
                    </Text>
                  </ListItem>
                  <ListItem
                    marker={
                      <Text>
                        <Checkbox
                          isChecked={templateValues.tableSections.A.options[3]}
                        />
                      </Text>
                    }
                  >
                    <Text>
                      Buyer’s obligation to purchase pursuant to this Contract
                      is not contingent upon the Buyer obtaining any financing,
                      because Buyer is waiving its financial contingency.
                    </Text>
                  </ListItem>
                  <ListItem
                    marker={
                      <Text>
                        <Checkbox
                          isChecked={templateValues.tableSections.A.options[4]}
                        />
                      </Text>
                    }
                  >
                    <Text>
                      Buyer’s obligation to purchase pursuant to this Contract
                      is not contingent upon the Buyer obtaining any financing.
                      Buyer shall not be permitted to seek financing for the
                      purchase of the Property. Buyer understands, acknowledges,
                      agrees, and represents this is an &quot;all cash&quot; transaction,
                      and that Buyer has the funds, or will have in its
                      possession as of the date of Closing, the necessary funds
                      to pay the balance of the Purchase Price, all adjustments,
                      taxes, closing costs, and any other fees necessary to
                      close this transaction.
                    </Text>
                  </ListItem>
                </List>
              </List_Border_Item>
              <List_Border_Item marker={<Text>4.</Text>}>
                <Text>
                  <TextBold>Earnest Money (in US Dollars).</TextBold>
                  {" "}
                  Within five (5) days of
                  the Binding Agreement Date, the Buyer shall deliver to{" "}
                  <TextBold>{templateValues.tableSections.A.name_escrow_agent}</TextBold> (“Holder”)
                  the sum of{" "}<TextBold>{templateValues.tableSections.A.earnest_amount_in_numbers}</TextBold> as earnest
                  money (“Earnest Money”) in cash or certified funds to be
                  deposited in Holder’s trust account to be applied to the
                  Purchase Price at the Closing or distributed to the Party
                  entitled to such funds in accordance with this Agreement.
                </Text>
              </List_Border_Item>
            </List>
          </TableBody>
        </Table>
      </Page>
    </>
  );
};

export default Page1;
