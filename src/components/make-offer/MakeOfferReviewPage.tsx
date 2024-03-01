import {PropertyModel} from "../../slices/properties";
import React, {useImperativeHandle, useEffect, useState} from "react";
import {OfferModel} from "../../models/offerModel";
import {H3, MintParagraph} from "../Typography/Typography";
import {MOPHeader, MOPSubcontainer} from "./MakeOfferPageComponents";
import {colors} from "../../styles/colors";
import {makeAuthedApiRequest} from "../../utils/api/apiHelper";
import {useRouter} from "next/router";
import styled from "@emotion/styled";
import numeral from "numeral";
import StatusMessage from "../stuff/StatusMessage";
import dayjs from "dayjs";
const advancedFormat = require('dayjs/plugin/advancedFormat');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat);

export type MakeOfferReviewPageProps = {
    propertyInfo: PropertyModel;
    offerInfo: OfferModel;
    setSelectedIndex: (index: number) => void;
}

const MOPHeaderBtnContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const OfferReviewLineContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
`;

export const OfferReviewLine = (props: { title: string, body: string, subBody?: string, noBorder?: boolean }) => {
    return <OfferReviewLineContainer style={ props.noBorder ? {} : { borderBottom: `1px solid ${colors.gray200}`}} >
        <MintParagraph size={"18"} weight={"medium"} style={{ color: colors.gray700 }}>{props.title}</MintParagraph>
        <div style={{ textAlign: "right", marginLeft: '12px' }}>
            <MintParagraph size={"18"} weight={"medium"} style={{ color: colors.gray900 }}>{props.body}</MintParagraph>
            {props.subBody && <MintParagraph size={"18"} weight={"medium"} style={{ color: colors.gray700 }}>{props.subBody}</MintParagraph>}
        </div>
    </OfferReviewLineContainer>
}

const createContingenciesSection = (offerInfo: OfferModel) => {
    const contingencies = [
        { title: "Inspection Contingency", condition: offerInfo.inspectionCont },
        { title: "Financing Contingency", condition: offerInfo.financingCont },
        { title: "Appraisal Gap Contingency", condition: offerInfo.appraisalCont },
        { title: "Temporary Occupancy Contingency (Seller)", condition: offerInfo.tempOccCont },
        { title: "Temporary Occupancy Contingency (Buyer)", condition: offerInfo.tempOccBuyerCont },
    ];

    const array: JSX.Element[] = [];
    contingencies.forEach(((value, index) => {
        if (value.condition) array.push(<OfferReviewLine title={value.title} body={"Added"} noBorder={index === contingencies.length - 1}/>)
    }))

    if (array.length > 0) {
        array[array.length - 1] = React.cloneElement(array[array.length - 1], {noBorder: true});
    }

    return array;
}

const calculateSignatureState = (signatureInfo: string) => {
    if (!signatureInfo) return "Signature Request Not Sent";
    if (signatureInfo === "SIGNED") return "Signed";
    if (signatureInfo === "REJECTED") return "Rejected";
    if (signatureInfo === "SENT") return "Signature Request Sent";
    if (signatureInfo === "UNSENT") return "Signature Request Not Sent";
    return "Signature Request Not Sent";
}

export const createSignaturesSection = (offerInfo: OfferModel) => {
    const signatures = [
        { title: `${offerInfo.buyerUser?.firstName} ${offerInfo.buyerUser?.lastName}`, condition: offerInfo.buyerUserId, body: calculateSignatureState(offerInfo.buyerSignature?.status || "UNSENT")},
        { title: `${offerInfo.secondBuyerUser?.firstName} ${offerInfo.secondBuyerUser?.lastName}`, condition: offerInfo.secondBuyerUserId, body: calculateSignatureState(offerInfo.secondBuyerSignature?.status || "UNSENT") },
        { title: `${offerInfo.buyerAgentUser?.firstName} ${offerInfo.buyerAgentUser?.lastName}`, condition: offerInfo.buyerAgentUserId, body: calculateSignatureState(offerInfo.buyerAgentSignature?.status || "UNSENT") },
        { title: `${offerInfo.sellerSignerUser?.firstName} ${offerInfo.sellerSignerUser?.lastName}`, condition: offerInfo.sellerSignerUserId, body: calculateSignatureState(offerInfo.sellerSignature?.status || "UNSENT") },
        { title: `${offerInfo.secondSellerSignerUser?.firstName} ${offerInfo.secondSellerSignerUser?.lastName}`, condition: offerInfo.secondSellerSignerUserId, body: calculateSignatureState(offerInfo.secondSellerSignature?.status || "UNSENT") },
        { title: `${offerInfo.sellerAgentUser?.firstName} ${offerInfo.sellerAgentUser?.lastName}`, condition: offerInfo.sellerAgentUserId, body: calculateSignatureState(offerInfo.sellerAgentSignature?.status || "UNSENT") },
    ];
    const array: JSX.Element[] = [];
    signatures.forEach(((value, index) => {
        if (value.condition) array.push(<OfferReviewLine title={value.title} body={value.body} noBorder={index === signatures.length - 1}/>)
    }))

    if (array.length > 0) {
        array[array.length - 1] = React.cloneElement(array[array.length - 1], {noBorder: true});
    }

    return array;
}

const formatMoney = (value?: number) => {
    if (!value) return "$0"
    return numeral(value).format('$0,0');
}

const MakeOfferReviewPage = React.forwardRef((props: MakeOfferReviewPageProps, ref) => {
    MakeOfferReviewPage.displayName = "MakeOfferReviewPage";
    const router = useRouter();
    const save = async () => {
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: `/v1/offer/updateOffer`,
            data: {
                id: props.offerInfo.id,
                updateData: { stepFiveComplete: true}
            }
        });
        router.push(`/offer-review?propertyId=${props.offerInfo.propertyId}&offerId=${props.offerInfo.id}`);
    }
    useImperativeHandle(ref, () => ({ save }));

    const downPaymentPercent = (props.offerInfo.downPaymentAmt && props.offerInfo.offerAmt) 
    ? Math.round((props.offerInfo.downPaymentAmt / props.offerInfo.offerAmt) * 10000) / 100
    : 0;
    const contingenciesChildren = createContingenciesSection(props.offerInfo);
    const signaturesChildren = createSignaturesSection(props.offerInfo);
    const closingDate = dayjs(props.offerInfo.closingDate);
    const possessionDate = dayjs(props.offerInfo.possessionDate);
    const expiryDate = dayjs(props.offerInfo.expiryDate);
    const [buyerSideCommissionDollars, setBuyerSideCommissionDollars] = useState(0);
    const [buyerSideCommission, setBuyerSideCommission] = useState(props.offerInfo.buyerSideCommission || 2.5)

    useEffect(() => {
        const dollarAmt = (props.offerInfo.offerAmt! * (buyerSideCommission / 100));
        setBuyerSideCommissionDollars(dollarAmt);
    }, [props.offerInfo.offerAmt, props.offerInfo.buyerSideCommission, buyerSideCommission]);

    return <div>
        <H3 style={{ margin: "0 0 36px 0" }}>Review your offer</H3>
        <StatusMessage hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>You can track any offer you&apos;ve made through Housewell in the buyer dashboard</MintParagraph>
            </StatusMessage>

        <MOPSubcontainer style={{ marginBottom: "48px", borderTop:'none'}}>
            <MOPHeaderBtnContainer>
                <MOPHeader title={"Offer & Financing"}/>
               {props.offerInfo.status === 'PREPARING' && <MintParagraph size={"18"} weight={"medium"} style={{ color: colors.brandGreen, cursor: "pointer" }} onClick={() => props.setSelectedIndex(1)}>Edit</MintParagraph>}
            </MOPHeaderBtnContainer>

            <OfferReviewLine title={"Offer Amount"} body={`${formatMoney(props.offerInfo.offerAmt)}`} />
            <OfferReviewLine title={"Offer Type"} body={props.offerInfo.offerType === "ESCALATION" ? "Escalation-clause" : "Fixed-price"} />
            <OfferReviewLine title={"Financing"} body={props.offerInfo.financingType === 'CASH' ? "All Cash" : props.offerInfo.loanType === "VA" ? "VA Loan" : (props.offerInfo.loanType === "FHA" ? "FHA Loan" : "Conventional Loan") } />
            {!props.offerInfo.buyerAgentUserId && <OfferReviewLine title={"Housewell Cash Back"} body={`${formatMoney(buyerSideCommissionDollars)}`}></OfferReviewLine>}
            {props.offerInfo.financingType != 'CASH' && <OfferReviewLine title={"Down Payment"} body={`${formatMoney(props.offerInfo.downPaymentAmt)} (${downPaymentPercent}%)`} />}
            <OfferReviewLine title={"Seller's Closing Contribution"} body={`${formatMoney(props.offerInfo.sellerClosingAmt)}`} />
            <OfferReviewLine title={"Earnest Money"} body={`${formatMoney(props.offerInfo.earnestMoneyAmt)}`} noBorder />
        </MOPSubcontainer>

        <MOPSubcontainer style={{ marginBottom: "48px"}}>
            <MOPHeader title={"Property Details"}/>

            <OfferReviewLine title={"Street Address"} body={`${props.propertyInfo.streetAddress}`} />
            <OfferReviewLine title={"Legal Description"} body={`${props.propertyInfo.legalDescription}`} />
            <OfferReviewLine title={"City"} body={`${props.propertyInfo.city}`} />
            <OfferReviewLine title={"State"} body={`${props.propertyInfo.state}`} />
            <OfferReviewLine title={"Zip Code"} body={`${props.propertyInfo.zip}`} />
            <OfferReviewLine title={"County"} body={`${props.propertyInfo.county}`} noBorder />
        </MOPSubcontainer>

        <MOPSubcontainer style={{ marginBottom: "48px"}}>
            <MOPHeaderBtnContainer>
                <MOPHeader title={"Contingencies"}/>
                {props.offerInfo.status === 'PREPARING' &&<MintParagraph size={"18"} weight={"medium"} style={{ color: colors.brandGreen, cursor: "pointer" }} onClick={() => props.setSelectedIndex(3)}>Edit</MintParagraph>}
            </MOPHeaderBtnContainer>

            {contingenciesChildren.length > 0 ? contingenciesChildren : <MintParagraph size={"18"} weight={"medium"}>No contingencies selected.</MintParagraph>}
        </MOPSubcontainer>

        <MOPSubcontainer style={{ marginBottom: "48px"}}>
            <MOPHeaderBtnContainer>
                <MOPHeader title={"Dates & Closing"}/>
                {props.offerInfo.status === 'PREPARING' &&<MintParagraph size={"18"} weight={"medium"} style={{ color: colors.brandGreen, cursor: "pointer" }} onClick={() => props.setSelectedIndex(4)}>Edit</MintParagraph>}
            </MOPHeaderBtnContainer>

            <OfferReviewLine title={"Due Diligence Days"} body={(props.offerInfo.dueDiligenceDays?.toString() || '0') + ' day(s)'} />
            <OfferReviewLine title={"Expected Closing Date"} body={closingDate.format('MM/DD/YYYY')} subBody={`${closingDate.startOf("day").diff(dayjs().startOf("day"), 'day')} transition day(s)`} />
            <OfferReviewLine title={"Possession Date & Time"} body={`${possessionDate.format('MM/DD/YYYY — hh:mmA z')}`} subBody={`${possessionDate.startOf("day").diff(dayjs().startOf("day"), 'day')} day(s)`} />
            <OfferReviewLine title={"Offer Expiration Date & Time"} body={`${expiryDate.format('MM/DD/YYYY — hh:mmA z')}`} subBody={`${expiryDate.startOf("day").diff(dayjs().startOf("day"), 'day')} day(s)`} noBorder />
        </MOPSubcontainer>

        <MOPSubcontainer style={{ marginBottom: "48px"}}>
            <MOPHeaderBtnContainer>
                <MOPHeader title={"Signatures"}/>
            </MOPHeaderBtnContainer>

            {signaturesChildren.length > 0 ? signaturesChildren : <MintParagraph size={"18"} weight={"medium"}>No signatues found.</MintParagraph>}
        </MOPSubcontainer>
    </div>
});

export default MakeOfferReviewPage;