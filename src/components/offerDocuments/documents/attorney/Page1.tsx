import {
    TextBold,
    List_End_Item,
  } from "../../documentComponents";
  import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
  
  const Page1: React.FC<any> = ({ templateValues, pageStyles }) => {
    return (
      <>
        <Page size="A4" style={pageStyles.page}>
          <TextBold>EXHIBIT “A”</TextBold>
          <TextBold
            style={{ textAlign: "center", fontSize: 11, marginTop: "20px" }}
          >
            CLOSING ATTORNEY TO SERVE AS HOLDER OF EARNEST MONEY AGREEMENT
          </TextBold>
          <Text style={{ marginTop: "20px" }}>
            In consideration of the mutual covenants and agreements contained
            herein, the parties agree as follows:
          </Text>
          <List_End_Item marker={<Text>1</Text>}>
            <Text>
              Appointment of Closing Attorney as Holder of Earnest Money. The
              Closing Attorney is hereby appointed as the holder of the earnest
              money deposit (the &quot;Earnest Money&quot;) in the amount of{" "}
              <TextBold>{templateValues.part1.amount}</TextBold> that the Buyer is required to deposit under
              the Purchase and Sale Agreement (the &quot;Agreement&quot;) between the
              Buyer and Seller dated <TextBold>{templateValues.part1.date}</TextBold> (the
                &quot;Agreement&quot;).
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>2</Text>}>
            <Text>
              Escrow Account. The Closing Attorney shall deposit the Earnest
              Money into a trust account (the &quot;Escrow Account&quot;) in the name of
              the Closing Attorney as escrow agent. The Escrow Account shall be
              maintained at a financial institution in Georgia.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>3</Text>}>
            <Text>
              Disbursement of Earnest Money. The Closing Attorney shall disburse
              the Earnest Money to the appropriate party in accordance with the
              terms of the Agreement.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>4</Text>}>
            <Text>
              Limitation of Liability. The Closing Attorney shall not be liable
              for any loss or damage to the Earnest Money arising from any cause
              whatsoever, except for its own negligence or willful misconduct.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>5</Text>}>
            <Text>
              Entire Agreement. This Agreement constitutes the entire agreement
              between the parties with respect to the subject matter hereof and
              supersedes all prior or contemporaneous communications,
              representations, or agreements, whether oral or written.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>6</Text>}>
            <Text>
              Severability. If any provision of this Agreement is held to be
              invalid or unenforceable, such provision shall be struck from this
              Agreement and the remaining provisions shall remain in full force
              and effect.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>7</Text>}>
            <Text>
              Governing Law. This Agreement shall be governed by and construed
              in accordance with the laws of the State of Georgia.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>8</Text>}>
            <Text>
              Waiver. No waiver of any provision of this Agreement shall be
              effective unless in writing and signed by both parties.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>9</Text>}>
            <Text>
            Notices. All notices and other communications hereunder may be in writing, via email, or SMS. Such notices shall be deemed given: when delivered in person; on the first business day after being sent by United States mail, postage prepaid, certified or registered, return receipt requested; on the day an email is sent if before 5:00 PM local recipient&apos;s time and no failure notification is received, or on the next business day if sent after 5:00 PM; or upon successful transmission of an SMS or after leaving a voicemail for the intended recipient.
            </Text>
          </List_End_Item>
          <List_End_Item marker={<Text>10</Text>}>
            <Text>
              Headings. The headings in this Agreement are for convenience only
              and shall not affect its interpretation.
            </Text>
          </List_End_Item>
        </Page>
      </>
    );
  };
  
  export default Page1;
  