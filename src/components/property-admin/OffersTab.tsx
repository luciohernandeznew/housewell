import React from "react";
import styled from "@emotion/styled";
import SecondaryButton from "../buttons/SecondaryButton";
import Image from "next/image";
import dayjs from "dayjs";
import {colors} from "../../styles/colors";
import BulletPoint from "../Typography/BulletPoint";
import numeral from 'numeral';
import {useRouter} from "next/router";
import { MintParagraph, AzeretMonoParagraph } from "../Typography/Typography";
import DiffAndIcon from "../stuff/DiffAndIcon";
import { OfferModel } from "../../models/offerModel";
import { useDevice } from "../../contexts/DeviceContext";
import { useAppSelector } from "../../store";
import { PropertyModel } from "../../slices/properties";

const EmptyGreyContainer = styled.div`
    width: 100%;
    height: 230px;
    margin-top: 24px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid ${colors.gray200};
    background-color: ${colors.gray100};
`

const CardHeader = styled.div`
    display: flex;
    padding: 32px;
    padding-bottom: 24px;
    border: 1px solid #E0E5E0;
    border-radius: 20px 20px 0 0;
`;

const CardBody = styled.div`
    display: flex;
    border-radius: 0 0 20px 20px;
`;

const CardColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: left;
    background-color: ${colors.gray100};
    justify-content: flex-start;
    border-right: 1px solid #E0E5E0;
    border-bottom: 1px solid #E0E5E0;
    padding-left: 32px;
    &:nth-of-type(1) {
        border-left: 1px solid #E0E5E0;
        border-radius: 0 0 0 20px;
    }
    &:nth-of-type(3) {
        background-color: white;
        border-radius: 0 0 20px 0;
    }
`

const colorMapping = {
    "ALL CASH": "#7DFFB9",
    "CONVENTIONAL": "#1B311C",
    "FHA/VA": "#F9E9DA"
};

const fontColorMapping = {
    "ALL CASH": "black",
    "CONVENTIONAL": "white",
    "FHA/VA": "#E0650D"
};

export const OfferTypeBadge = styled.div<{type: "ALL CASH" | "CONVENTIONAL" | "FHA/VA"}>`
    background-color: ${props => colorMapping[props.type]};
    color: ${props => fontColorMapping[props.type]};
    font-family: 'Mint Grotesk Medium';
    padding: 6px 12px;
    border-radius: 38px;
    width: fit-content;
`;

function generateProsAndCons(offer: OfferModel, property: PropertyModel, type: "ALL CASH" | "CONVENTIONAL" | "FHA/VA") {
    const pros: string[] = [];
    const cons: string[] = [];
    const differenceBetweenOfferDateAndClosingDate = dayjs(offer.closingDate).diff(dayjs(offer.updatedAt), 'day');
    if (type === "ALL CASH") {
        pros.push("Cash offer");
        pros.push("No appraisal required");
    }
    if ((numeral(offer.offerAmt).value() as number) > (numeral(property.listPrice).value() as number)) {
        pros.push("Above asking");
    } else if ((numeral(offer.offerAmt).value() as number) < (numeral(property.listPrice).value() as number)) {
        cons.push("Below asking");
    }
    if (offer.tempOccBuyerCont) {
        cons.push("Have to move out before closing");
    }
    if (offer.tempOccCont) {
        pros.push("Move out after closing");
    }
    if (offer.financingCont) {
        cons.push("Offer dependent on buyer's financing");
    }

    if (differenceBetweenOfferDateAndClosingDate < 14) {
        pros.push("Quick closing");
    }
    if (differenceBetweenOfferDateAndClosingDate > 30) {
        cons.push("More than 30 days to close");
    }

    if (offer.offerType === "ESCALATION") {
        pros.push(`Escalating offer up to $${(numeral(offer.escalationMaxAmt).value() as number).toLocaleString('en-US', { maximumFractionDigits: 0 })}`);
    }
    if ((numeral(offer.sellerClosingAmt).value() as number) >= 5000) {
        cons.push(`$${offer.sellerClosingAmt} closing cost contribution`);
    }
    if (offer.appraisalCont) {
        pros.push(`Willing to cover appraisal gap up to $${(numeral(offer.appraisalContAmt).value() as number).toLocaleString('en-US', { maximumFractionDigits: 0 })}`);
    }
    if ((numeral(offer.earnestMoneyAmt).value() as number) >= 5000) {
        pros.push("Earnest money over $5,000");
    } else if ((numeral(offer.earnestMoneyAmt).value() as number) < 5000) {
        cons.push("Earnest money under $5,000");
    }
    if ((numeral(offer.dueDiligenceDays).value() as number) > 14 ) {
        cons.push("Long due diligence");
    } else if ((numeral(offer.dueDiligenceDays).value() as number) === 0) {
        pros.push("Forgos buyer due diligence");
    } else {
        pros.push(`${offer.dueDiligenceDays} day due diligence`);
    }
    return { pros, cons };
}


const OfferCard = (props: { offer: OfferModel, type: "ALL CASH" | "CONVENTIONAL" | "FHA/VA", listPrice: string}) => {
    const router = useRouter();
    const offerPrice = numeral(props.offer.offerAmt);
    const listingPrice = numeral(props.listPrice);
    const housewellFee = 1999;
    const realtorFee = offerPrice.value() as number * (props.offer.buyerSideCommission! / 100);
    const fmlsFee = offerPrice.value() as number * 0.0012;
    const closingCostContribution = numeral(props.offer.sellerClosingAmt).value() as number;
    const sumDeductions = housewellFee + realtorFee + fmlsFee + closingCostContribution;
    const netToSeller = (offerPrice.value() as number) - sumDeductions;
    const { propertyId } = router.query;
    const properties = useAppSelector((state) => state.propertiesReducer.properties);
    const property = properties[propertyId as string];
    const {pros, cons} = generateProsAndCons(props.offer, property, props.type);


    const { isMobile } = useDevice()

    return (
    <><CardHeader>
        {isMobile ? <div style={{display: 'flex', flexDirection: 'column'}}><div style={{}}>
            <OfferTypeBadge style={ isMobile ? {fontSize: '12px', padding: '3px 6px'} : {}} type={props.type}>{props.type}</OfferTypeBadge>
        </div>
        <div>
            <MintParagraph size={isMobile ? '18' : "32"} weight="medium" style={{ marginTop: '9px', paddingBottom: "12px" }}>
                ${parseFloat(props?.offer?.offerAmt?.toString() || '0').toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </MintParagraph>
            <DiffAndIcon offerPrice={offerPrice.value() as number} listingPrice={listingPrice.value() as number}/>
        </div></div> : <><div style={{ width: "256px" }}>
            <OfferTypeBadge style={ isMobile ? {fontSize: '12px', padding: '3px 6px'} : {}} type={props.type}>{props.type}</OfferTypeBadge>
        </div>
        <div>
            <MintParagraph size={isMobile ? '18' : "32"} weight="medium" style={{ margin: 0, paddingBottom: "12px" }}>
                ${parseFloat(props?.offer?.offerAmt?.toString() || '0').toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </MintParagraph>
            <DiffAndIcon offerPrice={offerPrice.value() as number} listingPrice={listingPrice.value() as number}/>
        </div></>}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginLeft: "auto", justifyContent: 'flex-end' }}>
            <SecondaryButton style={{ width: isMobile ? '140px' : '180px' }} size={isMobile ? 'small' : 'medium'} isLight hasArrow text={"View Offer"} onClick={() => router.push({ pathname: '/offer-details', query: { offerId: props.offer.id, propertyId }})} />
            <div style={{ marginTop: "auto", paddingTop: "8px", textAlign: "right" }}>
                <MintParagraph size='14' weight="medium">Expires: {dayjs(props.offer.expiryDate).format('MMMM D, YYYY h:mma')}</MintParagraph>
            </div>
        </div>

    </CardHeader>
    <>
        <CardBody style={{marginBottom:"40px"}}>
            {!isMobile && <><CardColumn>
                <AzeretMonoParagraph weight="medium" style={{fontSize:'14px', marginTop:'32px', marginBottom:'32px', color:colors.darkgreen1000}}>THE GOOD</AzeretMonoParagraph>
                {pros.map((pro, index) => (
                    <BulletPoint 
                    key={index} 
                    style={{marginBottom:'20.5px'}} 
                    centered 
                    passedSVGPath='/icon_svg/offers-screen/dark-check-bullet.svg' 
                    isBold
                    text={pro}
                    />
                ))}
            </CardColumn>
            <CardColumn>
                <AzeretMonoParagraph weight="medium" style={{fontSize:'14px', marginTop:'32px', marginBottom:'32px', color:colors.darkgreen1000}}>THE BAD</AzeretMonoParagraph>
                {cons.map((pro, index) => (
                    <BulletPoint 
                    key={index} 
                    style={{marginBottom:'20.5px'}} 
                    centered 
                    passedSVGPath='/icon_svg/offers-screen/light-x-bullet.svg' 
                    isBold
                    text={pro}
                    />
                ))}
            </CardColumn></>}
            <CardColumn style={{borderBottomRightRadius: '20px'}}>
                <AzeretMonoParagraph weight="medium" style={{fontSize:'14px', marginTop:'32px', marginBottom:'32px', color:colors.darkgreen1000}}>ESTIMATED COSTS</AzeretMonoParagraph>
                <div style={{display:'flex', justifyContent:'space-between', paddingBottom:'8px', marginRight:'24px', borderBottom:'1px solid #E0E5E0'}}>
                    <MintParagraph size='16' weight="medium">{`Housewell fee`}</MintParagraph>
                    <MintParagraph size='16' weight="medium">${housewellFee.toLocaleString('en-US', { maximumFractionDigits: 0 })}</MintParagraph>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', paddingBottom:'8px', paddingTop:'8px', marginRight:'24px', borderBottom:'1px solid #E0E5E0'}}>
                    <MintParagraph size='16' weight="medium">{`FMLS fee (0.12%)`}</MintParagraph>
                    <MintParagraph size='16' weight="medium">${fmlsFee.toLocaleString('en-US', { maximumFractionDigits: 0 })}</MintParagraph>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', paddingBottom:'8px', paddingTop:'8px', marginRight:'24px', borderBottom:'1px solid #E0E5E0'}}>
                    <MintParagraph size='16' weight="medium">{`Buyer's agent fee (${props.offer.buyerSideCommission}%)`}</MintParagraph>
                    <MintParagraph size='16' weight="medium">${realtorFee.toLocaleString('en-US', { maximumFractionDigits: 0 })}</MintParagraph>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', paddingBottom:'8px', paddingTop:'8px', marginRight:'24px'}}>
                    <MintParagraph size='16' weight="medium">{`Closing cost contribution`}</MintParagraph>
                    <MintParagraph size='16' weight="medium">${closingCostContribution.toLocaleString('en-US', { maximumFractionDigits: 0 })}</MintParagraph>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'30px', marginBottom:'22px', marginRight:'24px',}}>
                    <AzeretMonoParagraph style={{fontSize:'14px'}} weight="medium">{`ESTIMATED NET PROCEEDS`}</AzeretMonoParagraph>
                    <MintParagraph size='32' style={{color:colors.gray900}} weight="medium">${netToSeller.toLocaleString('en-US', { maximumFractionDigits: 0 })}</MintParagraph>
                </div>
            </CardColumn>
        </CardBody>
    </>
    </>
    )
}

export type OffersTabProps = {
    listPrice: string,
    offers: OfferModel[]
}

const OffersTab: React.FC<OffersTabProps> = (props: OffersTabProps) => {
    
    return <div>
        { (!props?.offers || props?.offers.length === 0) ?
            <EmptyGreyContainer>
                <MintParagraph size="24" weight="regular" style={{color:colors.gray600}}>No offers yet.</MintParagraph> 
            </EmptyGreyContainer> :
            props.offers.map((offer, i) => <div key={i}>
                <OfferCard offer={offer} type={offer.financingType === "CASH" ? "ALL CASH" : offer.loanType === "FHA" || offer.loanType === "VA" ? "FHA/VA" : "CONVENTIONAL"} listPrice={props.listPrice} />
            </div>)
        }
    </div>
}

export default OffersTab;