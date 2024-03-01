import {MintParagraph} from "../Typography/Typography";
import React from "react";

export const OFFER_TYPES_CARDS = [
    {
        type: "FIXED",
        text: "Fixed-price offer",
        subtext: "This is the most standard offer, just provide your best, highest offer."
    }, {
        type: "ESCALATION",
        text: "Escalation-clause offer",
        subtext: "This tells the sellers you're willing to beat other offers up to a certain amount."
    }
]

export const FINANCING_TYPES_OPTS= [
    {
        type: 'PREAPPROVED',
        text: "Mortgage pre-approval"
    }, {
        type: 'CASH',
        text: "Cash financing"
    }
];

export const LOAN_TYPES_CARDS = [
    {
        type: 'CONVENTIONAL',
        title: "Conventional",
        body: "This type of loan is great to avoid PMI and lower your monthly payments."
    }, {
        type: 'FHA',
        title: "FHA",
        body: "This type of loan is great for new buyers, but requires paying mortgage insurance."
    }, {
        type: 'VA',
        title: "VA",
        body: "If you’re a veteran, you can qualify for this loan which requires no down payment."
    }
]

export const CLOSING_COST_ACCORDION_BODY = <div>
    <MintParagraph size={"16"} weight={"regular"} style={{ lineHeight: "24px" }}>There is no set rule on how much a seller must contribute. It&apos;s negotiable between the buyer and seller.</MintParagraph>
    <ul/> {/* dirty way to have same line break height as list */}
    <ul>
        <li><MintParagraph size={"16"} weight={"regular"} style={{ lineHeight: "24px" }}>Based on the purchase and sale agreement, sellers pay for the owner&apos;s title insurance policy, real estate commission fees, and any amount required to discharge any mortgage, lien, or encumbrance not assumed by Buyer</MintParagraph></li>
        <li><MintParagraph size={"16"} weight={"regular"} style={{ lineHeight: "24px" }}>Buyers pay their own closing costs like lender fees, their own title insurance policy, appraisal fees, home inspection fees, etc. However, the seller could agree to contribute a certain dollar amount to the buyer&apos;s closing costs to incentivize the sale. This is in addition to any &quot;Housewell Cash Back&quot; amount</MintParagraph></li>
        <li><MintParagraph size={"16"} weight={"regular"} style={{ lineHeight: "24px" }}>In a hot seller&apos;s market, sellers have less incentive to offer closing cost contributions. In a buyer&apos;s market, sellers may offer larger contributions to attract buyers.</MintParagraph></li>
    </ul>
    <MintParagraph size={"16"} weight={"regular"} style={{ lineHeight: "24px" }}><span style={{fontWeight:'bold'}}>Note:</span> the total amount of closing costs contributed by the seller cannot exceed 6% of the purchase price for most loans and 2-3% of the purchase price for some lower down payment loans (This includes any Housewell cash back you receive). Please speak to your mortgage broker if you have specific questions.</MintParagraph>
</div>

export const EARNEST_MONEY_ACCORDION_BODY = (
    <div>
      <MintParagraph size={"16"} weight={"regular"} style={{ lineHeight: "24px" }}>
        Earnest money serves as a deposit made by the buyer to demonstrate their commitment to completing the property purchase.
      </MintParagraph>
      <ul/> {/* dirty way to have same line break height as list */}
      <ul>
        <li>
          <MintParagraph size={"16"} weight={"regular"} style={{ lineHeight: "24px" }}>
            The typical earnest money deposit ranges from 1% to 5% of the home&apos;s purchase price, although this can vary depending on market conditions and negotiations between buyer and seller.
          </MintParagraph>
        </li>
        <li>
          <MintParagraph size={"16"} weight={"regular"} style={{ lineHeight: "24px" }}>
            Earnest money is usually held in an escrow account by a third party until closing. If the transaction is successful, the earnest money goes toward the buyer&apos;s down payment and closing costs.
          </MintParagraph>
        </li>
        <li>
          <MintParagraph size={"16"} weight={"regular"} style={{ lineHeight: "24px" }}>
            If the buyer backs out for reasons covered by contract contingencies, such as financing or inspection issues, the earnest money is typically returned. Otherwise, the seller may have the right to keep the earnest money as damages.
          </MintParagraph>
        </li>
        <li>
          <MintParagraph size={"16"} weight={"regular"} style={{ lineHeight: "24px" }}>
            In competitive markets, a larger earnest money deposit can make an offer more attractive to sellers. Conversely, in buyer&apos;s markets, smaller earnest money deposits may be more commonplace.
          </MintParagraph>
        </li>
      </ul>
    </div>
  );
  