import React from "react";
import styles from "./styles/Home.module.css";

import dynamic from "next/dist/shared/lib/dynamic";
import { OfferModel } from "../../models/offerModel";
import { PropertyModel } from "../../slices/properties";

const HouseWell = dynamic(import("./layout/HouseWell"), { ssr: false });
const Attorney = dynamic(import("./layout/Attorney"), { ssr: false });
const TemporaryBuyer = dynamic(import("./layout/TemporaryBuyer"), {
  ssr: false,
});
const TemporarySeller = dynamic(import("./layout/TemporarySeller"), {
  ssr: false,
});
const Amendment = dynamic(import("./layout/Amendment"), {
  ssr: false,
});
const Escalating = dynamic(import("./layout/Escalating"), {
  ssr: false,
});
const LeadBased = dynamic(import("./layout/LeadBased"), {
  ssr: false,
});
const SellerDisclosure = dynamic(import("./layout/SellerDisclosure"), {
  ssr: false,
});

export type DocumentTypes =
  | "PSA"
  | "TEMP_OCC_BUYER"
  | "TEMP_OCC_SELLER"
  | "ESCALATION"
  | "CLOSING_ATTORNEY_HOLDER"
  | "LEAD_BASED"
  | "SELLER_DISCLOSURE";

const LandingPage = (props: {docType: string, offer: OfferModel, property: PropertyModel, currentDateString: string, selectedPage: number}) => {
  return (
    <div className={styles.container} style={{  width: '100%'}}>
      {props.docType === 'PSA' && <div>
        <HouseWell offer={props.offer} property={props.property} currentDateString={props.currentDateString} currentPage={props.selectedPage}/>
      </div>}
      {props.docType === "CLOSING_ATTORNEY_HOLDER" && <div style={{ width: '100%' }}>
        <Attorney offer={props.offer} property={props.property} currentDateString={props.currentDateString} currentPage={props.selectedPage}/>
      </div>}
      {props.docType === "TEMP_OCC_BUYER" && <div style={{ width: '100%' }}>
        <TemporaryBuyer offer={props.offer} property={props.property} currentDateString={props.currentDateString}/>
      </div>}
      {props.docType === "TEMP_OCC_SELLER" && <div style={{ width: '100%' }}>
        <TemporarySeller offer={props.offer} property={props.property} currentDateString={props.currentDateString} currentPage={props.selectedPage}/>
      </div>}
      {props.docType === "ESCALATING" && <div style={{ width: '100%' }}>
        <Escalating offer={props.offer} property={props.property} currentDateString={props.currentDateString}/>
      </div>}
      {props.docType === "SELLER_DISCLOSURE" && (
        <div>
          <SellerDisclosure
            offer={props.offer}
            property={props.property}
            currentDateString={props.currentDateString}
            currentPage={props.selectedPage}
          />
        </div>
      )}
            {props.docType === "LEAD_BASED" && (
        <div>
          <LeadBased
            offer={props.offer}
            property={props.property}
            currentDateString={props.currentDateString}
            currentPage={props.selectedPage}
          />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
