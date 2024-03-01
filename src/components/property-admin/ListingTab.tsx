import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {colors} from "../../styles/colors";
import { MintParagraph } from "../Typography/Typography";
import { MOPHeader, MOPSubcontainer } from "../make-offer/MakeOfferPageComponents";
import { PropertyModel } from "../../slices/properties";
import FullScreenImageViewer, { generateImageUrls } from "../stuff/FullScreenImageViewer";
import numeral from "numeral";
import SecondaryButton from "../buttons/SecondaryButton";
import { makeAuthedApiRequest } from "../../utils/api/apiHelper";


const OfferReviewLineContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
`;


const formatMoney = (value?: number) => {
    if (!value) return "$0"
    return numeral(value).format('$0,0');
}


const OfferReviewLine = (props: { title: string, body: string, subBody?: string, noBorder?: boolean }) => {
    return <OfferReviewLineContainer style={ props.noBorder ? {} : { borderBottom: `1px solid ${colors.gray200}`}} >
        <MintParagraph size={"18"} weight={"medium"} style={{ color: colors.gray700 }}>{props.title}</MintParagraph>
        <div style={{ textAlign: "right" }}>
            <MintParagraph size={"18"} weight={"medium"} style={{ color: colors.gray900 }}>{props.body}</MintParagraph>
            {props.subBody && <MintParagraph size={"18"} weight={"medium"} style={{ color: colors.gray700 }}>{props.subBody}</MintParagraph>}
        </div>
    </OfferReviewLineContainer>
}

const ListingTab = (props: { property: PropertyModel }): JSX.Element => {
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
    const [accessCode, setAccessCode] = useState<string>('Not Yet Complete');
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageUrls = generateImageUrls(props.property);

    useEffect(() => {
      const data = {
        propertyId: props.property.id,
      }
      async function fetchCode() {
        try {
          const res = await makeAuthedApiRequest({method: 'post', urlExtension: `/v1/igloo/getCodeForProperty`, data});
          if (res.status === 200) {
            setAccessCode(res?.data?.pin);
          }
        } catch (e) {
          console.log(e);
        }
      }
      fetchCode();

    })

  

  return (
    <MOPSubcontainer style={{borderTop:'none', marginBottom: "48px"}}>
      <MOPHeader title={"Property Details"}/>
      <div style={{display:"flex", padding:'12px 0', borderBottom: `1px solid ${colors.gray200}`, alignItems: 'center', justifyContent:'space-between'}}>
        <MintParagraph style={{ color: colors.gray700 }} size="18" weight="medium">Current Lockbox Access Code</MintParagraph>

        {accessCode ?
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
            <MintParagraph style={{ color: colors.gray900, textAlign: 'right', width: '100%' }} size="18" weight="medium">
              {accessCode}
            </MintParagraph>
            <MintParagraph style={{ color: colors.gray600, textAlign: 'right', width: '100%' }} size="12" weight="medium">
              Expires in 24 hours
            </MintParagraph>
          </div>
        : <MintParagraph style={{ color: colors.gray900 }} size="18" weight="medium">Not Yet Complete</MintParagraph>}

      </div>
      <OfferReviewLine title={"List Price"} body={`${formatMoney(props.property.listPrice)}`} />
      <OfferReviewLine title={"Size"} body={`${props.property.squareFeet} sq ft.`} />
      <OfferReviewLine title={"Street Address"} body={`${props.property.streetAddress}`} />
      <OfferReviewLine title={"City"} body={`${props.property.city}`} />
      <OfferReviewLine title={"State"} body={`${props.property.state}`} />
      <OfferReviewLine title={"Zip Code"} body={`${props.property.zip}`} />
      <OfferReviewLine title={"County"} body={`${props.property.county}`} />
      <div style={{display:"flex", marginTop:'12px', alignItems: 'center', justifyContent:'space-between'}}>
        <MintParagraph style={{ color: colors.gray700 }} size="18" weight="medium">Photography</MintParagraph>

        {props.property.imageCount ? <SecondaryButton isLight size='medium' text="View" onClick={() => setIsImageViewerOpen(true)}></SecondaryButton>
        : <MintParagraph style={{ color: colors.gray900 }} size="18" weight="medium">Not Yet Complete</MintParagraph>}

        </div>
    <FullScreenImageViewer
        isOpen={isImageViewerOpen}
        images={imageUrls}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </MOPSubcontainer>
  )
}
export default ListingTab;