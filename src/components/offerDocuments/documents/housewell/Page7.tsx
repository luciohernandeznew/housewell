import {
  ListItem,
  TableBody,
  TableHeader,
  List,
  TextBold,
  List_End_Item,
  Checkbox,
  Table,
  Row,
  Col,
} from "../../documentComponents";
import { Page, Text, View } from "@react-pdf/renderer";

const Page7: React.FC<any> = ({ templateValues, pageStyles }) => {
 

  return (
    <Page size="A4" style={pageStyles.page}>
      <Table>
        <TableBody>
          <List>
            <List_End_Item marker={<Text>20.</Text>}>
              <Text>
                <TextBold>Time for Performance.</TextBold>
                {" "}In the event the time for performance of any obligation
                hereunder expires on a Saturday, Sunday, or legal holiday, the
                time for performance shall not be extended to the next day
                without mutual written agreement of both the Buyer and Seller.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>21.</Text>}>
              <Text>
                <TextBold>Duty to Cooperate.</TextBold>
                {" "}The Seller and the Buyer agree to cooperate with each other in
                all reasonable ways to facilitate the closing of this
                transaction. Further:
              </Text>

              <List>
                <ListItem marker={<Text>(a)</Text>}>
                  <Text>
                    <TextBold>The Seller shall.</TextBold>
                    {" "}(i) Provide the Buyer with all necessary information about
                    the Property, including copies of all documents relating to
                    the Property; (ii) Allow the Buyer to inspect the Property
                    and to have the Property inspected by any professionals that
                    the Buyer deems necessary; (iii) Execute all documents
                    reasonably required to complete the transaction.
                  </Text>
                </ListItem>
                <ListItem marker={<Text>(b)</Text>}>
                  <Text>
                    <TextBold>The Buyer shall.</TextBold>
                    {" "}(i) Provide the Seller with all necessary information about
                    the Buyer&apos;s financing, including a copy of the Buyer&apos;s
                    pre-approval letter from a lender; (ii) Execute all
                    documents reasonably required to complete the transaction.
                  </Text>
                </ListItem>
              </List>
            </List_End_Item>
            <List_End_Item marker={<Text>22.</Text>}>
              <Text>
                <TextBold>Survival.</TextBold>
                {" "}The parties hereby understand, acknowledge, and agree that no
                provision of this Contract shall survive the Closing absent
                agreement of the parties or as specifically set forth herein.
              </Text>
            </List_End_Item>
            <List_End_Item marker={<Text>23.</Text>}>
              <Text>
                <TextBold>Other Special Stipulations:</TextBold>
                {" "}As described in <TextBold>Exhibit “G”</TextBold>
              </Text>
            </List_End_Item>
          </List>
        </TableBody>
        <TableHeader>
          <Text>G. Exhibits.</Text>
        </TableHeader>
        <TableBody>
          <View style={{ paddingLeft: "30px", paddingTop: "10px" }}>
            {templateValues.tableSections.G.options.map((option: any) => (
              <Text key={option.title} style={{ marginBottom: 4 }}>
                <Checkbox isChecked={option.isChecked} /> &nbsp;
                <TextBold>{option.title}</TextBold>
              </Text>
            ))}
          </View>
        </TableBody>
      </Table>
  
    </Page>
  );
};

export default Page7;
