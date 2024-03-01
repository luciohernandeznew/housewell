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
          <TextBold>Exhibit “E” </TextBold>
          <TextBold
            style={{ textAlign: "center", fontSize: 11, marginTop: "20px" }}
          >
            Temporary Occupancy (Buyer)
          </TextBold>
          <Text>
            The Buyer and Seller agree that the purchase of the Property
            contemplated by the Purchase and Sales Agreement with a Binding
            Agreement Date of <TextBold>{templateValues.header.date}</TextBold> (the “Agreement”) is
            subject to the following Temporary Occupancy Contingency (“TOC”)
            Exhibit and that this TOC shall form part of the Agreement.
          </Text>
          <List_End_Item marker={<Text>1</Text>}>
            <Text>
              Provided that Buyer is not in breach of its obligations under the
              Agreement, Buyer may occupy the Property from{" "}
              <TextBold>{templateValues.section1.date1}</TextBold> date until the date of{" "}
              <TextBold>{templateValues.section1.date2}</TextBold> (“Temporary Occupancy”).
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>2</Text>}>
            <Text>
              The Buyer shall pay the Seller a daily rent amount of{" "}
              <TextBold>{templateValues.section2.amount}</TextBold> (which equals <TextBold>{templateValues.section2.per_month}</TextBold> per month) for
              the duration of the Temporary Occupancy. Buyer pay said rent via cash or check to 
              Buyer acknowledges that none of the rent paid was contemplated by,
              accounted towards, or credited in the Purchase Price.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>3</Text>}>
            <Text>
              Buyer has paid to the Holder of the Earnest Money under the
              Agreement, an additional Security Deposit of $2000 which shall be deposited into in
              Holder’s escrow/trust account within three business days of the
              signing of this TOC Exhibit.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>4</Text>}>
            <Text>
              Buyer shall be responsible for all utilities and maintenance costs
              during the temporary occupancy and shall transfer or keep all
              utilities to Buyer’s name prior to taking occupancy.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>5</Text>}>
            <Text>
              Buyer shall not make any additional unapproved alterations or
              improvements to the Property without the Seller&apos;s prior written
              consent. Any such alterations, repairs or improvements made by
              Buyer shall be the sole property of Seller, and Buyer;
            </Text>
            <ListItem marker={<Text>(a)</Text>}>
              <Text>
                shall not be entitled to be reimbursed or compensated for making
                or having made any of said alterations, repairs, or
                improvements; and
              </Text>
            </ListItem>
            <ListItem marker={<Text>(b)</Text>}>
              <Text>
                waives any right to assert or file any lien against Property.
              </Text>
            </ListItem>
          </List_End_Item>
          <List_End_Item marker={<Text>6</Text>}>
            <Text>
              Notwithstanding any other provision in the Agreement to the
              contrary, in the event that the sale is not consummated for any
              reason, the Buyer shall be entitled to a return of any Security
              Deposit. If any dispute arises between Seller and Buyer as to the
              final disposition of all or part of the Security Deposit, the
              Holder shall proceed in accordance with the same provisions which
              apply to the Earnest Money deposit under the Agreement.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>7</Text>}>
            <Text>
              Notwithstanding any other provision in the Agreement to the
              contrary, Buyer shall additionally pay Seller a late fee of $500 for any overdue amounts hereunder
              and a hold over daily rental amount of <TextBold>{templateValues.section2.amount}</TextBold> per day.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>8</Text>}>
            <Text>
              Buyer agrees to indemnify and hold Seller harmless from any claim
              or loss which results from the actions of Buyer or anyone else
              entering Property while Property is occupied by Buyer under this
              Exhibit.
            </Text>
          </List_End_Item>
        </Page>
      </>
    );
  };
  
  export default Page1;