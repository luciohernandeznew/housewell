import {H3} from "../Typography/Typography";
import React, {useImperativeHandle, useState} from "react";
import {MOPHeader, MOPSubcontainer, MOPSubheader, TitleBodyCard} from "./MakeOfferPageComponents";
import InlineSelectionBox from "../boxes/InlineSelectionBox";
import StyledInputWithSupertext, {cleanNumericValue} from "../boxes/StyledInputWithSupertext";
import ParagraphStyledInputComponent from '../boxes/ParagraphStyledInput';
import {colors} from "../../styles/colors";
import {MakeOfferPageProps} from "./MakeOfferPage";
import {makeAuthedApiRequest} from "../../utils/api/apiHelper";
import {OfferModel} from "../../models/offerModel";
import { useDevice } from "../../contexts/DeviceContext";
import SecondaryButton from "../buttons/SecondaryButton";
import dayjs from "dayjs";
import Accordion from "../stuff/Accordion";
import MultipleChoiceParent from "../stuff/MultipleChoiceParent";


const MakeOfferContiPage = React.forwardRef((props: MakeOfferPageProps, ref) => {
    MakeOfferContiPage.displayName = 'MakeOfferContiPage';
    const [inspectionCont, setInspectionCont] = useState<boolean>(props.offerInfo.inspectionCont || true);
    const [financingCont, setFinancingCont] = useState<boolean>(props.offerInfo.financingCont || props.offerInfo.financingType !== 'CASH');
    const [daysToGetPreapproval, setDaysToGetPreapproval] = useState<number>(props.offerInfo.daysToGetPreapproval || 7);
    const [interestRate, setInterestRate] = useState<number>(props.offerInfo.interestRate || 8.00);
    const [appraisalCont, setAppraisalCont] = useState<boolean>(props.offerInfo.appraisalCont || false);
    const [appraisalContAmt, setAppraisalContAmt] = useState<number>(props.offerInfo.appraisalContAmt || 10000);
    const [tempOccCont, setTempOccCont] = useState<boolean>(props.offerInfo.tempOccCont || false);
    const [tempOccDays, setTempOccDays] = useState<number>(props.offerInfo.tempOccDays || 1);
    const [tempOccPenaltyAmt, setTempOccPenaltyAmt] = useState<number>(props.offerInfo.tempOccPenaltyAmt || 300);
    const [tempOccBuyerCont, setTempOccBuyerCont] = useState<boolean>(props.offerInfo.tempOccBuyerCont || false);
    const [tempOccBuyerDays, setTempOccBuyerDays] = useState<number>(props.offerInfo.tempOccBuyerDays || 1);
    const [tempOccBuyerDailyCost, setTempOccBuyerDailyCost] = useState<number>(props.offerInfo.tempOccBuyerDailyCost || 100);
    const [customCont, setCustomCont] = useState<boolean>(!!props.offerInfo.customCont);
    const [customContText, setCustomContText] = useState<string>(props.offerInfo.customContText || '');
    const defaultPercentOfPurchasePrice = () => {
        const offerAmt = props.offerInfo.offerAmt || 0; 
        const downPaymentAmt = props.offerInfo.downPaymentAmt || 0; 
    
        
        const loanAmt = offerAmt - downPaymentAmt;
    

        const percent = offerAmt > 0 ? (loanAmt / offerAmt) * 100 : 0;
    
        return percent.toFixed(0).toString();
    };
    const [loanTerm, setLoanTerm] = useState("30");
    const [percentOfPurchasePrice, setPercentOfPurchasePrice] = useState(defaultPercentOfPurchasePrice);
    const [lowAppraisalReductionTime, setLowAppraisalReductionTime] = useState('');
    const [loanTypeIndex, setLoanTypeIndex] = useState(-1);

    const loanTypeChoices = [{text: 'Fixed'}, { text:'Adjustable'}, {text: 'Interest Only'}]
    const { windowSize, isMobile } = useDevice();
    const isMidSize = windowSize.width < 1100;


    const accordionBodyContent = (
        <div style={{display: "flex", flexDirection: "column", }}>
            <StyledInputWithSupertext
                label="Loan Term (years)"
                value={loanTerm}
                onChange={(event) => setLoanTerm(cleanNumericValue(event.target.value))}
                disabled={!financingCont}
                style={{ backgroundColor: financingCont ? colors.background : colors.gray100, marginRight: "12px", marginBottom: isMidSize ? '12px': '0' }}

            />
            <StyledInputWithSupertext
                label="Percent of Purchase Price (%)"
                value={percentOfPurchasePrice}
                onChange={(event) => setPercentOfPurchasePrice(cleanNumericValue(event.target.value))}
                disabled={!financingCont}
                style={{ backgroundColor: financingCont ? colors.background : colors.gray100, marginRight: "12px", marginBottom: isMidSize ? '12px': '0' }}

            />
            <StyledInputWithSupertext
                label="Days for Low Appraisal Reduction Request"
                value={lowAppraisalReductionTime}
                onChange={(event) => setLowAppraisalReductionTime(cleanNumericValue(event.target.value))}
                disabled={!financingCont}
                style={{ backgroundColor: financingCont ? colors.background : colors.gray100, marginRight: "12px", marginBottom: isMidSize ? '12px': '0' }}

            />
            <MultipleChoiceParent isRow={!isMidSize} fontSize='18' useChecks style={{ width: '100%' }} selectedIndex={loanTypeIndex} onSelection={(index) => setLoanTypeIndex(index)} choices={loanTypeChoices}></MultipleChoiceParent>
        </div>
    );
    
    const save = async () => {
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: `/v1/offer/updateOffer`,
            data: {
                id: props.offerInfo.id,
                updateData: { inspectionCont, dueDiligenceDays: inspectionCont ? !!props.offerInfo.dueDiligenceDays ? props.offerInfo.dueDiligenceDays : 10 : 0, 
                    financingCont, appraisalCont, appraisalContAmt: cleanNumericValue(appraisalContAmt.toString()),
                    tempOccCont, tempOccDays: tempOccCont ? tempOccDays : 0, tempOccPenaltyAmt: cleanNumericValue(tempOccPenaltyAmt.toString()), tempOccBuyerCont, tempOccBuyerDays: tempOccBuyerCont ? tempOccBuyerDays : 0,
                    tempOccBuyerDailyCost: cleanNumericValue(tempOccBuyerDailyCost.toString()), stepThreeComplete: true, customCont, customContText,
                    possessionDate: props.offerInfo.closingDate ? tempOccCont ? dayjs(props.offerInfo.closingDate).add(tempOccDays, "day").toDate() : tempOccBuyerCont ? dayjs(props.offerInfo.closingDate).subtract(tempOccBuyerDays, "day").toDate() : props.offerInfo.possessionDate : undefined,
                    interestRate, daysToGetPreapproval,
                }
            }
        });
        props.setOfferInfo(response.data as OfferModel);
    }
    useImperativeHandle(ref, () => ({ save }));

    return <div>
        <H3 style={{ margin: "0 0 36px 0" }}>Choose your contingencies</H3>

        <MOPSubcontainer style={{ marginBottom: "48px"}}>
            <MOPHeader title={"Select all that apply"}/>
            <InlineSelectionBox selected={inspectionCont} onClick={() => setInspectionCont(!inspectionCont)}>
                <TitleBodyCard title={"Due Diligence Period"} subtitle={"Highly recommended"} body={"This allows buyers to have the home inspected and depending on the findings, ask for repairs, a price reduction, or even walk away from the deal if the problems are too significant. Waiving inspection can give an offer an edge, but comes at a high-risk especially for older homes."} />
            </InlineSelectionBox>
            <InlineSelectionBox selected={financingCont} onClick={() => setFinancingCont(!financingCont)}>
                <TitleBodyCard title={"Financing Contingency"} subtitle={"Recommended if you're getting a mortgage"} body={"This contingency allows buyers to back out if they’re unable to secure financing from a bank or other lending institution they can cancel the transaction and receive their earnest money. However, if the house does not appraise for the purchase price and Appraisal Gap Contingency (below) is included, the Appraisal Gap Contingency may prevent buyers from backing out and receiving earnest money."} />
                <MOPSubheader title={"Financing Contingency Details"} info={"The amount of days you will have to get pre-approved and the interest rate you will attempt to get pre-approved at if you are not already. If you are already pre-approved use the numbers from your pre-approval letter."} />
                <div onClick={(event => event.stopPropagation())} style={{ display: "flex", flexDirection: isMidSize ? 'column' : 'row'}}>
                    <StyledInputWithSupertext shortened={isMobile} label='Days to get pre-approved' value={`${daysToGetPreapproval}`}
                                              disabled={!financingCont}
                                              onChange={(event) => {
                                                  event.stopPropagation();
                                                  const sanitizedValue = Number(cleanNumericValue(event.target.value));
                                                    setDaysToGetPreapproval(sanitizedValue < 0 ? 0 : sanitizedValue);

                                              }}
                                              type={"number"}
                                              style={{ backgroundColor: financingCont ? colors.background : colors.gray100, marginRight: "12px", marginBottom: isMidSize ? '12px': '0' }}
                    />
                    <StyledInputWithSupertext shortened={isMobile} label='Max annual interest rate (%)' value={`${interestRate}`}
                                            disabled={!financingCont}
                                            onChange={(event) => {
                                                event.stopPropagation();
                                                const sanitizedValue = parseFloat(event.target.value);
                                                setInterestRate(sanitizedValue < 0 ? 0 : sanitizedValue);
                                              }}
                                              step={.1}
                                                type={"number"}
                                              style={{ backgroundColor: financingCont ? colors.background : colors.gray100 }}
                    />
                </div>
                <div onClick={(event => event.stopPropagation())}>
                <Accordion style={{width: "100%", color: colors.darkgreen1000, margin: "12px 0 0 0"}}
                            removePadding
                            isTransparent
                            transitionTime={300}
                           items={[{
                               header: "Advanced Options",
                               body: accordionBodyContent
                           }]}/>
                </div>

            </InlineSelectionBox>

            <InlineSelectionBox selected={appraisalCont} onClick={() => setAppraisalCont(!appraisalCont)}>
                <TitleBodyCard title={"Appraisal Gap Contingency"} subtitle={"Useful for some buyers"} body={"This contingency makes an offer stronger by protecting the sellers in the event of a low appraisal. If the home appraises for lower than the purchase price, the bank will not give a loan for more than the appraisal. If this contingency is included the buyers will have to either pay an extra down payment to bridge the gap between the purchase price and the appraisal or forfeit earnest money. The max gap a buyer would have to pay is listed below."} />
                <MOPSubheader title={"Appraisal Gap"} info={"The maximum amount a buyer would have to put up in cash to cover the appraisal gap"} />
                <div onClick={(event => event.stopPropagation())} style={{ display: "flex", flexDirection: isMidSize ? 'column' : 'row'}}>
                    <StyledInputWithSupertext shortened={isMobile} label='Max Amount' value={`${appraisalContAmt}`}
                                              disabled={!appraisalCont}
                                              onChange={(event) => {
                                                  event.stopPropagation();
                                                  setAppraisalContAmt(event.target.value);
                                              }}
                                              moneyFormat
                                              style={{ backgroundColor: appraisalCont ? colors.background : colors.gray100 }}
                    />
                </div>
            </InlineSelectionBox>
            <InlineSelectionBox selected={tempOccCont} onClick={() => { setTempOccCont(!tempOccCont); if(tempOccBuyerCont) setTempOccBuyerCont(false); }}>
                <TitleBodyCard title={"Temporary Occupancy Agreement (Seller)"} subtitle={"Allows sellers to stay in the home after closing"} body={"This contingency allows the sellers to stay in their home for a period of time after closing. Usually this is included to give the sellers time to purchase a new home. You can reach out to the seller to see if they need this contingency."} />
                <MOPSubheader title={"Temporary Occupancy Details"} info={"The amount of days after closing the sellers will stay in the property and the penalty they will pay per day if they overstay this amount of days."} />
                <div onClick={(event => event.stopPropagation())} style={{ display: "flex", flexDirection: isMidSize ? 'column' : 'row'}}>
                    <StyledInputWithSupertext shortened={isMobile} label='Number of days' value={`${tempOccDays}`}
                                              disabled={!tempOccCont}
                                              onChange={(event) => {
                                                  event.stopPropagation();
                                                  setTempOccDays(event.target.value < 0 ? 0 : event.target.value);
                                              }}
                                              max={120}
                                              min={1}
                                              type={"number"}
                                              style={{ backgroundColor: tempOccCont ? colors.background : colors.gray100, marginRight: "12px", marginBottom: isMidSize ? '12px': '0' }}
                    />
                    <StyledInputWithSupertext shortened={isMobile} label='Penalty per day' value={`${tempOccPenaltyAmt}`}
                                              disabled={!tempOccCont}
                                              onChange={(event) => {
                                                  event.stopPropagation();
                                                  setTempOccPenaltyAmt(event.target.value);
                                              }}
                                              moneyFormat
                                              style={{ backgroundColor: tempOccCont ? colors.background : colors.gray100 }}
                    />
                </div>
            </InlineSelectionBox>
            <InlineSelectionBox selected={tempOccBuyerCont} onClick={() => { setTempOccBuyerCont(!tempOccBuyerCont); if(tempOccCont) setTempOccCont(false); }}>
                <TitleBodyCard title={"Temporary Occupancy Agreement (Buyer)"} subtitle={"Allows buyers to move in before closing"} body={"If you as the buyer need to move in to the home before closing we  including this contingency. Note: many sellers will see this as a negative."} />
                <MOPSubheader title={"Temporary Occupancy Details"} info={"The number of days is how many days before closing you'll move in. The daily cost is the amount paid per day to stay. This also includes an additionnal required security deposit of $2000"} />
                <div onClick={(event => event.stopPropagation())} style={{ display: "flex", flexDirection: isMidSize ? 'column' : 'row'}}>
                    <StyledInputWithSupertext shortened={isMobile} label='Number of days' value={`${tempOccBuyerDays}`}
                                                disabled={!tempOccBuyerCont}
                                                onChange={(event) => {
                                                    event.stopPropagation();
                                                    setTempOccBuyerDays(event.target.value < 0 ? 0 : event.target.value);
                                                }}
                                                type={"number"}
                                                max={120}
                                                min={1}
                                                style={{ backgroundColor: tempOccBuyerCont ? colors.background : colors.gray100, marginRight: "12px", marginBottom: isMidSize ? '12px': '0' }}
                    />
                    <StyledInputWithSupertext shortened={isMobile} label='Daily cost' value={`${tempOccBuyerDailyCost}`}
                                                disabled={!tempOccBuyerCont}
                                                onChange={(event) => {
                                                    event.stopPropagation();
                                                    setTempOccBuyerDailyCost(event.target.value);
                                                }}
                                                moneyFormat
                                                style={{ backgroundColor: tempOccBuyerCont ? colors.background : colors.gray100 }}
                    />
                </div>

            </InlineSelectionBox>
            {customCont && <InlineSelectionBox selected={customCont}>
                <TitleBodyCard title={"Custom Contingency or Terms"} subtitle={"Add custom language to the Purchase and Sale Agreement"} body={"We do not verify the legality of any terms here. Make sure any terms are vetted by a legal professional before adding them"} />
                <MOPSubheader title={"Custom Terms"} info={"We do not verify the legality of any terms here. Make sure any terms are vetted by a legal professional before adding them"} />
                <div onClick={(event => event.stopPropagation())} style={{ display: "flex", flexDirection: isMidSize ? 'column' : 'row'}}>
                    <ParagraphStyledInputComponent
                        placeholder="Custom language..."
                        value={customContText}
                        onChange={(event) => {
                            event.stopPropagation();
                            setCustomContText(event.target.value);
                        }}
                    ></ParagraphStyledInputComponent>
                </div>
            </InlineSelectionBox>}
            <SecondaryButton text={customCont ? "Remove Custom Contingency" : "Add Custom Contingency"} size="medium" onClick={() => setCustomCont(!customCont)} isLight style={{width:'100%'}}></SecondaryButton>
        </MOPSubcontainer>
    </div>
});

export default MakeOfferContiPage;