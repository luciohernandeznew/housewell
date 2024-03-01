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
import { List_End_Item, TextBold } from "../documentComponents";
import { useDevice } from "../../../contexts/DeviceContext";
import { OfferModel } from "../../../models/offerModel";
import { PropertyModel } from "../../../slices/properties";
import { formatMoney } from "../../../utils/helpers";
import Page1 from "../documents/attorney/Page1";
import Page2 from "../documents/attorney/Page2";
import React from "react";

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

const Attorney = (props: {offer: OfferModel, property: PropertyModel, currentDateString: string, currentPage: number}) => {
  const { isMobile } = useDevice();
  let templateValues = {
    header: {
      date: props.currentDateString,
      close_attorney: props.offer.closingAttorney,
      buyer: "[BUYER]",
      seller: "[SELLER]",
    },
    part1: {
      amount: formatMoney(props.offer.earnestMoneyAmt),
      date: props.currentDateString,
    },
    footer: {
      attorney_address: "[ADDRESS]",
      attorney_email_address: "[EMAIL ADDRESS]",
      buyer_address: "[ADDRESS]",
      buyer_email_address: "[EMAIL ADDRESS]",
      seller_address: "[ADDRESS]",
      seller_email_address: "[EMAIL ADDRESS]",
    },
    tableSection: {
      buyer1: {
        signature: "_______________________________",
        name: "________________________________",
        date: "________________________________",
      },
      seller1: {
        signature: "_______________________________",
        name: "________________________________",
        date: "________________________________",
      },
      buyer2: {
        signature: "_______________________________",
        name: "________________________________",
        date: "________________________________",
      },
      seller2: {
        signature: "_______________________________",
        name: "________________________________",
        date: "________________________________",
      },
      end: {
        attonrey:
          "_____________________________________________________________________",
        name: "_____________________________________________________________________",
        date: "_____________________________________________________________________",
      },
    },
  };
  type AttorneyDocumentMobileProps = {
    currentPage: number;
  };
  
  const AttorneyDocumentMobile = React.memo(({ currentPage }: AttorneyDocumentMobileProps) => {
    return (
      <Document>
        {currentPage === 1 && <Page1 templateValues={templateValues} pageStyles={pageStyles} />}
        {currentPage === 2 && <Page2 templateValues={templateValues} pageStyles={pageStyles} />}
      </Document>
    );
  }, (prevProps, nextProps) => {
    return prevProps.currentPage === nextProps.currentPage;
  });
  AttorneyDocumentMobile.displayName = 'AttorneyDocumentMobile';
  const memoizedDocument = React.useMemo(() => {
    return <AttorneyDocumentMobile currentPage={props.currentPage} />;
  }, [props.currentPage]);
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
        <Page1 templateValues={templateValues} pageStyles={pageStyles} />
        <Page2 templateValues={templateValues} pageStyles={pageStyles} />
      </Document>
    </PDFViewer>
  );
};

export default Attorney;
