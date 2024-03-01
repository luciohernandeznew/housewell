import {
    TextBold,
    List_End_Item,
    ListItem,
  } from "../../documentComponents";
  import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
  
  const Page1: React.FC<any> = ({ templateValues, pageStyles }) => {
    return (
      <>
        <Page size="A4" style={pageStyles.page}>
          <TextBold>Exhibit “D”</TextBold>
          <TextBold
            style={{ textAlign: "center", fontSize: 11, marginTop: "20px" }}
          >
            Temporary Occupancy (Seller)
          </TextBold>
          <Text>
            The Buyer and Seller agree that the purchase of the Property
            contemplated by the Purchase and Sales Agreement Dated <TextBold>{templateValues.header.date}</TextBold> (the “Agreement”) is
            subject to the following Temporary Occupancy Contingency (“TOC”)
            Exhibit and that this TOC shall form part of the Agreement.
          </Text>
          <List_End_Item marker={<Text>1</Text>}>
            <Text>
              Provided that Seller is not in breach of its obligations under the
              Agreement, Seller may occupy the Property from{" "}<TextBold>{templateValues.section1.date1}</TextBold>
              {" "}date until the date of <TextBold>{templateValues.section1.date2}</TextBold> (“Temporary
              Occupancy”).
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>2</Text>}>
            <Text>
              Seller has paid to the Holder of the Earnest Money under the
              Agreement, an additional Security Deposit of $1000 which shall be deposited into in
              Holder’s escrow/trust account within three business days of the
              signing of this TOC Exhibit.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>3</Text>}>
            <Text>
              Seller shall be responsible for all utilities and maintenance
              costs during the temporary occupancy and shall transfer or keep
              all utilities to Seller’s name prior to taking occupancy.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>4</Text>}>
            <Text>
              Seller shall not make any additional unapproved alterations or
              improvements to the Property without the Buyer&apos;s prior written
              consent. Any such alterations, repairs or improvements made by
              Seller shall be the sole property of Buyer, and Seller;
            </Text>
            <ListItem marker={<Text>(a)</Text>}>
              <Text>
                shall not be entitled to be reimbursed or compensated for making
                or having made any of said alterations, repairs, or
                improvements; and{" "}
              </Text>
            </ListItem>
            <ListItem marker={<Text>(b)</Text>}>
              <Text>
                waives any right to assert or file any lien against Property.
              </Text>
            </ListItem>
          </List_End_Item>
          <List_End_Item marker={<Text>5</Text>}>
            <Text>
              Notwithstanding any other provision in the Agreement to the
              contrary, in the event that the sale is not consummated for any
              reason, the Seller shall be entitled to a return of any Security
              Deposit. If any dispute arises between Buyer and Seller as to the
              final disposition of all or part of the Security Deposit, the
              Holder shall proceed in accordance with the same provisions which
              apply to the Earnest Money deposit under the Agreement.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>6</Text>}>
            <Text>
              Notwithstanding any other provision in the Agreement to the
              contrary, Seller shall additionally pay Buyer a late fee of $100
              for any overdue amounts hereunder and a hold over daily rental
              amount of ${templateValues.section6.per_day} per day.
            </Text>
          </List_End_Item>
          <List_End_Item>
            <Text>
              Seller agrees to indemnify and hold Buyer harmless from any claim
              or loss which results from the actions of Seller or anyone else
              entering Property while Property is occupied by Seller under this
              Exhibit.
            </Text>
          </List_End_Item>
        </Page>
      </>
    );
  };
  
  export default Page1;
  