import {
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Text,
  BlobProvider
} from "@react-pdf/renderer";
import { useDevice } from "../../../contexts/DeviceContext";
import { OfferModel } from "../../../models/offerModel";
import { PropertyModel } from "../../../slices/properties";
import { extractDateTime } from "../../../utils/helpers";
import Page1 from "../documents/temporaryseller/Page1";
import Page2 from "../documents/temporaryseller/Page2";


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

const TemporarySeller = (props: {offer: OfferModel, property: PropertyModel, currentDateString: string, currentPage: number}) => {
  const { isMobile } = useDevice();
  const closingDateInfo = extractDateTime(
    props.offer.closingDate?.toString() || "",
    false
  );
  const possessionDateInfo = extractDateTime(
    props.offer.possessionDate?.toString() || "",
    true
  );
  const templateValues = {
    header: {
      date: props.currentDateString,
    },
    section1: {
      date1: closingDateInfo.dayDate,
      date2: possessionDateInfo.dayDate,
    },
    section6: {
      per_day: props.offer.tempOccPenaltyAmt,
    },
    footer: {
      buyer1: {
        signature: "________________________________",
        name: "________________________________",
        date: "________________________________",
        address: "________________________________",
        email: "________________________________",
        phone: "________________________________",
      },
      buyer2: {
        signature: "________________________________",
        name: "________________________________",
        date: "________________________________",
        address: "________________________________",
        email: "________________________________",
        phone: "________________________________",
      },
    },
  };

  const TempSellerMobile = (props: { currentPage: number }) => {
    return (
      <Document>
        {props.currentPage === 1 && <Page1 templateValues={templateValues} pageStyles={pageStyles} />}
        {props.currentPage === 2 && <Page2 templateValues={templateValues} pageStyles={pageStyles} />}
      </Document>
    );
  }

  if (isMobile) {
    return (
      <BlobProvider document={<TempSellerMobile currentPage={props.currentPage} />}>
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
        <Page1 templateValues={templateValues} pageStyles={pageStyles} />
        <Page2 templateValues={templateValues} pageStyles={pageStyles} />
      </Document>
    </PDFViewer>
  );
};

export default TemporarySeller;
