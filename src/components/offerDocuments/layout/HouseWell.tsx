
import {
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Page,
  Text,
  View,
  BlobProvider
} from "@react-pdf/renderer";

import React, { useEffect, useState } from "react";

import Page1 from "../documents/housewell/Page1";
import Page2 from "../documents/housewell/Page2";
import Page3 from "../documents/housewell/Page3";
import Page4 from "../documents/housewell/Page4";
import Page5 from "../documents/housewell/Page5";
import Page6 from "../documents/housewell/Page6";
import Page7 from "../documents/housewell/Page7";
import Page8 from "../documents/housewell/Page8";
import Page9 from "../documents/housewell/Page9";
import Page10 from "../documents/housewell/Page10";
import SignaturePage from "../documents/SignaturePage";
import { useDevice } from "../../../contexts/DeviceContext";
import { PropertyModel } from "../../../slices/properties";
import { OfferModel } from "../../../models/offerModel";
import {
  extractDateTime,
  calculateRemainingPaymentPercentage,
  numberToWords,
  formatMoney,
} from "../../../utils/helpers";
import { sellerDisclosureModel } from "../../../models/sellerDisclosureModel";
import { useAppSelector } from "../../../store";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "./fonts/Roboto-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "./fonts/Roboto-Medium.ttf",
      fontWeight: 500,
    },
    {
      src: "./fonts/Roboto-Bold.ttf",
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "Roboto_Italic",
  fonts: [
    {
      src: "./fonts/Roboto-Italic.ttf",
      fontWeight: 400,
    },
  ],
});

const pageStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    fontSize: 10,
    padding: 30,
  },
  title: {
    textAlign: "center",
  },
});


const HouseWell = (props: {offer: OfferModel, property: PropertyModel, currentDateString: string, currentPage: number}) => {
  const { isMobile } = useDevice();
  const sellerDisclosureProperty: sellerDisclosureModel = useAppSelector((state) => state.sellerDisclosureReducer.sellerDisclosureProperty);
    const {
        wasConstructedBefore1978,
        propertyId,
    } = sellerDisclosureProperty[props.property.id];
  const expiryDateInfo = extractDateTime(
    props.offer.expiryDate?.toString() || "",
    true
  );
  const closingDateInfo = extractDateTime(
    props.offer.closingDate?.toString() || "",
    false
  );
  const possessionDateInfo = extractDateTime(
    props.offer.possessionDate?.toString() || "",
    true
  );
  const [buyerSideCommissionDollars, setBuyerSideCommissionDollars] =
    useState(0);
  const [buyerSideCommission, setBuyerSideCommission] = useState(
    props.offer.buyerSideCommission || 2.5
  );
  const remainingPercent = calculateRemainingPaymentPercentage(
    props.offer.offerAmt!,
    props.offer.downPaymentAmt || 10000
  );
  const sellersBroker = "Housewell.com Realty, LLC";
  const doesClosingEqaualPossession =
    props.offer.closingDate === props.offer.possessionDate;

  useEffect(() => {
    const dollarAmt = props.offer.offerAmt! * (buyerSideCommission / 100);
    setBuyerSideCommissionDollars(dollarAmt);
  }, [
    props.offer.offerAmt,
    props.offer.buyerSideCommission,
    buyerSideCommission,
  ]);

  let templateValues = {
    tableSections: {
      A: {
        offerDate: props.currentDateString,
        expiryDate: expiryDateInfo.dayDate,
        time: expiryDateInfo.time,
        a_am: expiryDateInfo.isAM,
        a_pm: expiryDateInfo.isPM,
        adress: props.property.streetAddress,
        city: props.property.city,
        county: props.property.county,
        state: props.property.state,
        code: props.property.zip,

        hasDeedBook: !!props.property.hasDeedBook,
        deedBook: props.property.deedBook || "_______",
        deedPage: props.property.deedPage || "_______",
        hasLandLot: !!props.property.hasLandLot,
        landLot: props.property.landLot || "_______",
        district: props.property.district || "_________",
        lotNumber: props.property.lotNumber || "________",
        subdivisionName: props.property.subdivisionName || "__________________",


        purchase_price: formatMoney(props.offer.offerAmt),
        closing_costs: formatMoney(props.offer.sellerClosingAmt),
        housewell_rebate: !props.offer.buyerAgentUserId
          ? formatMoney(buyerSideCommissionDollars)
          : "_____",
        options: [
          !!props.offer.sellerClosingAmt,
          !props.offer.buyerAgentUserId,
          !!props.offer.financingCont,
          !props.offer.financingCont && props.offer.financingType !== "CASH",
          !props.offer.financingCont && props.offer.financingType === "CASH",
        ],

        financing_cont_days: props.offer.financingCont
          ? props.offer.daysToGetPreapproval
          : "____",
        financing_cont_days_words: props.offer.financingCont
          ? `(${numberToWords(props.offer.daysToGetPreapproval)})`
          : "",
        buy_broker: props.offer.buyersAgentBrokerage
          ? props.offer.buyersAgentBrokerage
          : sellersBroker,
        seller_broker: sellersBroker,
        buy_brokerage: [
          !!props.offer.buyersAgentBrokerage,
          !props.offer.buyersAgentBrokerage,
        ],
        sell_brokerage: [true, false],
        purchase_percent: props.offer.financingCont
          ? remainingPercent
          : "_____",
        rate_percent: props.offer.financingCont
          ? props.offer.interestRate.toString()
          : "_____",
        name_escrow_agent: props.offer.closingAttorneyAsHolderOfEarnestMoney
          ? props.offer.closingAttorney
          : props.offer.holderOfEarnestMoney,
        earnest_amount_in_numbers: formatMoney(props.offer.earnestMoneyAmt),
        relationship1:
          "____________________________________________________________________________________",
        relationship2:
          "________________________________________________________________________________",
      },
      B: {
        date: closingDateInfo.dayDate,
        name_attorney: props.offer.closingAttorney,
        location: props.offer.closingAttorneyAddress,
        possession_date: !doesClosingEqaualPossession
          ? possessionDateInfo.dayDate
          : "_________",
        possession_time: !doesClosingEqaualPossession
          ? possessionDateInfo.time
          : "_________",
        option: [doesClosingEqaualPossession, !doesClosingEqaualPossession],
        b_am: !doesClosingEqaualPossession ? possessionDateInfo.isAM : false,
        b_pm: !doesClosingEqaualPossession ? possessionDateInfo.isPM : false,
      },
      C: {
        days: props.offer.dueDiligenceDays,
      },
      D: {
        c1: props.offer.appraisalCont,
        maxAmount: props.offer.appraisalCont
          ? formatMoney(props.offer.appraisalContAmt)
          : "_____",
      },
      E: {
        option1: !wasConstructedBefore1978,
        option2: propertyId,
      },
      G: {
        options: [
          {
            title: "Closing Attorney Holder of Earnest Money, Exhibit “A”.",
            isChecked: props.offer.closingAttorneyAsHolderOfEarnestMoney,
          },
          {
            title: "Escalation Addendum, Exhibit “B”.",
            isChecked: props.offer.offerType === "ESCALATION",
          },
          {
            title:
              "Seller’s Property Condition Disclosure Statement, Exhibit “C”.",
            isChecked: false,
          },
          {
            title: "Temporary Occupancy (Seller), Exhibit “D”.",
            isChecked: props.offer.tempOccCont,
          },
          {
            title: "Temporary Occupancy (Buyer), Exhibit “E”.",
            isChecked: props.offer.tempOccBuyerCont,
          },
          {
            title: "Legal Description, Exhibit “F”.",
            isChecked: !!props.property.legalDescription,
          },
          {
            title: "Other Special Stipulations, Exhibit “G”.",
            isChecked: props.offer.customCont,
          },
        ],
      },
      Extra: {
        agreement: "______________________________________________",
        info: [
          {
            signature: "________________________________",
            date: "________________________________",
            name: "________________________________",
            address: "________________________________",
            email: "________________________________",
            phone: "________________________________",
          },
          {
            signature: "________________________________",
            date: "________________________________",
            name: "________________________________",
            address: "________________________________",
            email: "________________________________",
            phone: "________________________________",
          },
          {
            signature: "________________________________",
            date: "________________________________",
            name: "________________________________",
            address: "________________________________",
            email: "________________________________",
            phone: "________________________________",
          },
          {
            signature: "________________________________",
            date: "________________________________",
            name: "________________________________",
            address: "________________________________",
            email: "________________________________",
            phone: "________________________________",
          },
          {
            firstName: "________________________________",
            firstNumber: "________________________________",
            address: "________________________________",
            agentName: "________________________________",
            licenseNumber: "________________________________",
            signature: "________________________________",
            phoneNumber: "________________________________",
          },
          {
            firstName: "________________________________",
            firstNumber: "________________________________",
            address: "________________________________",
            agentName: "________________________________",
            licenseNumber: "________________________________",
            signature: "________________________________",
            phoneNumber: "________________________________",
          },
        ],
      },
    },
    G_blank_data: props.offer.customContText || "",
    E_blank_data: props.property.legalDescription || "",
  };
  type PSADocumentMobileProps = {
    currentPage: number;
    // include any other props your component needs
  };
  
  const PSADocumentMobile = React.memo(({ currentPage }: PSADocumentMobileProps) => {
    
    return (
      <Document>
        {currentPage === 1 && <Page1 templateValues={templateValues} pageStyles={pageStyles} number={1} />}
        {currentPage === 2 && <Page2 templateValues={templateValues} pageStyles={pageStyles} number={2} />}
        {currentPage === 3 && <Page3
          templateValues={templateValues}
          pageStyles={pageStyles}
          number={3}
        />}
    {currentPage === 4 && 
      <Page4
        templateValues={templateValues}
        pageStyles={pageStyles}
        number={4}
      />
    }
    {currentPage === 5 && 
      <Page5
        templateValues={templateValues}
        pageStyles={pageStyles}
        number={5}
      />
    }
    {currentPage === 6 && 
      <Page6
        templateValues={templateValues}
        pageStyles={pageStyles}
        number={6}
      />
    }
    {currentPage === 7 && 
      <Page7
        templateValues={templateValues}
        pageStyles={pageStyles}
        number={7}
      />
    }
    {currentPage === 8 && 
      <Page8
        templateValues={templateValues}
        pageStyles={pageStyles}
        number={8}
      />
    }
    {currentPage === 9 && 
      <Page9
        templateValues={templateValues}
        pageStyles={pageStyles}
        number={9}
      />
    }
        {currentPage === 10 && <SignaturePage pageStyles={pageStyles} />}
      </Document>
    );
  }, (prevProps, nextProps) => {
    // Only re-render if the currentPage has changed
    return prevProps.currentPage === nextProps.currentPage;
  });
  PSADocumentMobile.displayName = 'PSADocumentMobile';
  const memoizedDocument = React.useMemo(() => {
    return <PSADocumentMobile currentPage={props.currentPage} />;
  }, [props.currentPage]); // Depend only on `currentPage`
  

  if (isMobile) {
    return (
  <BlobProvider document={memoizedDocument}>
    {({ blob, url, loading, error }) => {
      if (error) {
        return <Text>An error occurred</Text>;
      }
      if (!url) {
        return <Text>Document not available</Text>;
      }
      // Now we're sure `url` is not null, we can use it safely
      return (
        <object data={url} type="application/pdf" style={{height: isMobile ? 'calc(100vh - 51px)' : 'calc(100vh - 71px)', width: "100%" }}>
          <a href={url} download="document.pdf">Download PDF</a>
        </object>
      );
    }}
  </BlobProvider>

    );
  }
  return (
    <PDFViewer style={{height: isMobile ? 'calc(100vh - 51px)' : 'calc(100vh - 71px)', width: "100%" }}>
          <Document>
    <Page1
      templateValues={templateValues}
      pageStyles={pageStyles}
      number={1}
    />
    <Page2
      templateValues={templateValues}
      pageStyles={pageStyles}
      number={2}
    />
    <Page3
      templateValues={templateValues}
      pageStyles={pageStyles}
      number={3}
    />
    <Page4
      templateValues={templateValues}
      pageStyles={pageStyles}
      number={4}
    />
    <Page5
      templateValues={templateValues}
      pageStyles={pageStyles}
      number={5}
    />
    <Page6
      templateValues={templateValues}
      pageStyles={pageStyles}
      number={6}
    />
    <Page7
      templateValues={templateValues}
      pageStyles={pageStyles}
      number={7}
    />
    <Page8
      templateValues={templateValues}
      pageStyles={pageStyles}
      number={8}
    />
    <Page9
      templateValues={templateValues}
      pageStyles={pageStyles}
      number={8}
    />
    <SignaturePage pageStyles={pageStyles} />
  </Document>
    </PDFViewer>
  );
};

export default HouseWell;
