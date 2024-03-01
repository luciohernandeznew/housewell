import {PropertyModel} from "../../slices/properties";
import {H3, MintParagraph} from "../Typography/Typography";
import React, {useImperativeHandle} from "react";
import {MOPHeader, MOPSubcontainer} from "./MakeOfferPageComponents";
import {colors} from "../../styles/colors";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import { OfferModel } from "../../models/offerModel";
import { makeAuthedApiRequest } from "../../utils/api/apiHelper";
const MakeOfferMap = dynamic(() => import("./MakeOfferMap"), {ssr: false});

const PropDetailsLineContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid ${colors.gray200};
`;

const PropDetailsLine = (props: { title: string, body: string }) => {
    return <PropDetailsLineContainer>
        <MintParagraph size={"18"} weight={"medium"} style={{ color: colors.gray700 }}>{props.title}</MintParagraph>
        <MintParagraph size={"18"} weight={"medium"} style={{ color: colors.gray1000 }}>{props.body}</MintParagraph>
    </PropDetailsLineContainer>
}

const MakeOfferPropDetailsPage = React.forwardRef((props: { propertyInfo: PropertyModel, offerInfo: OfferModel, setOfferInfo: (offer: OfferModel) => void; }, ref) => {
    MakeOfferPropDetailsPage.displayName = 'MakeOfferPropDetailsPage';
    const save = async () => {
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: `/v1/offer/updateOffer`,
            data: {
                id: props.offerInfo.id,
                updateData: { stepTwoComplete: true }
            }
        });
        props.setOfferInfo(response.data as OfferModel);
    }
    useImperativeHandle(ref, () => ({ save }));

    return <div>
        <H3 style={{ margin: "0 0 36px 0" }}>Confirm the property details</H3>

        <MOPSubcontainer  style={{ marginBottom: "48px"}}>
            <MOPHeader title={"Verify the property details"}/>
            <div style={{ height: "200px", margin: "12px 0 24px 0" }}>
                <MakeOfferMap propertyInfo={props.propertyInfo} />
            </div>
            <PropDetailsLine title={"Street Address"} body={`${props.propertyInfo.streetAddress}`} />
            <PropDetailsLine title={"Legal Description"} body={`${props.propertyInfo.legalDescription}`} />
            <PropDetailsLine title={"City"} body={`${props.propertyInfo.city}`} />
            <PropDetailsLine title={"State"} body={`${props.propertyInfo.state}`} />
            <PropDetailsLine title={"Zip Code"} body={`${props.propertyInfo.zip}`} />
            <PropDetailsLine title={"County"} body={`${props.propertyInfo.county}`} />
        </MOPSubcontainer>
    </div>
});

export default MakeOfferPropDetailsPage;