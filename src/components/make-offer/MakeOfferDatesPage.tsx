import {H3, MintParagraph} from "../Typography/Typography";
import {MOPHeader, MOPSubcontainer, MOPSubheader} from "./MakeOfferPageComponents";
import StatusMessage from "../stuff/StatusMessage";
import React, {useImperativeHandle, useState, useEffect} from "react";
import StyledDatetimeMultiInput, { StyledInput, StyledInputContainer, StyledLabel} from "../boxes/StyledDatetimeMultiInput";
import dayjs from "dayjs";
import {MakeOfferPageProps} from "./MakeOfferPage";
import {makeAuthedApiRequest} from "../../utils/api/apiHelper";
import {OfferModel} from "../../models/offerModel";
import {useDevice} from "../../contexts/DeviceContext";
import { colors } from "../../styles/colors";
import StyledInputWithSupertext from "../boxes/StyledInputWithSupertext";
import MultipleChoiceParent from "../stuff/MultipleChoiceParent";

const MakeOfferDatesPage = React.forwardRef((props: MakeOfferPageProps, ref) => {
    MakeOfferDatesPage.displayName = 'MakeOfferContiPage';
    const { isMobile} = useDevice();
    const [daysGap, setDaysGap] = useState<number>(0);
    const [closingDate, setClosingDate] = useState<Date>();
    const [possessionDate, setPossessionDate] = useState<Date>();
    const [dueDiligenceDays, setDueDiligenceDays] = useState<number>(props.offerInfo.dueDiligenceDays || 0);
    const [expiryDate, setExpiryDate] = useState<Date>(props.offerInfo.expiryDate || dayjs().add(7, "day").hour(18).minute(0).second(0).toDate());
    const [closingAttorney, setClosingAttorney] = useState<string>(props.offerInfo.closingAttorney || "");
    const [closingAttorneyAddress, setClosingAttorneyAddress] = useState<string>(props.offerInfo.closingAttorneyAddress || "");
    const [closingAttorneyPhone, setClosingAttorneyPhone] = useState<string>(props.offerInfo.closingAttorneyPhone || "");
    const [closingAttorneyEmail, setClosingAttorneyEmail] = useState<string>(props.offerInfo.closingAttorneyEmail || "");
    const [holderOfEarnestMoney, setHolderOfEarnestMoney] = useState<string>(props.offerInfo.holderOfEarnestMoney || "");
    const [closingAttorneyHolderIndex, setClosingAttorneyHolderIndex] = useState<number>(props.offerInfo.closingAttorneyAsHolderOfEarnestMoney ? 0 : 1);
    useEffect(() => {
        const initialDueDiligenceDays = props.offerInfo.dueDiligenceDays 
            ? props.offerInfo.dueDiligenceDays 
            : !!props.offerInfo.inspectionCont 
                ? 10 
                : 0;
        
        setDueDiligenceDays(initialDueDiligenceDays);
    }, [props.offerInfo.dueDiligenceDays, setDueDiligenceDays, props.offerInfo.inspectionCont]);  // Empty dependency array ensures this runs only once
    
    const choices = [{text: 'Closing Attorney'}, {text:'Other'}];

    const handleSetPossessionDate = (newPossessionDate: Date) => {
        const newClosingDate = dayjs(newPossessionDate).subtract(daysGap, "day").toDate();
        setClosingDate(newClosingDate);
        setPossessionDate(newPossessionDate);
    };
    
    const handleSetClosingDate = (newClosingDate: Date) => {
        setClosingDate(newClosingDate);
    };
    
    useEffect(() => {
        setDaysGap(Number(props.offerInfo.tempOccBuyerCont ? -(props.offerInfo.tempOccBuyerDays as number) : props.offerInfo.tempOccCont ? (props.offerInfo.tempOccDays as number) : 0));
    }, [props.offerInfo.tempOccBuyerDays, props.offerInfo.tempOccDays, props.offerInfo.tempOccBuyerCont, props.offerInfo.tempOccCont]);
    useEffect(() => {
        setClosingDate(props.offerInfo.closingDate || dayjs().add(30, "day").hour(12).minute(0).second(0).toDate());
    }, [props.offerInfo.closingDate]);
    useEffect(() => {
        const newPossessionDate = dayjs(closingDate).add(daysGap, "day").toDate();;
        setPossessionDate(newPossessionDate);
    }, [props.offerInfo.possessionDate, daysGap, closingDate]);
      
    const save = async () => {
        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: `/v1/offer/updateOffer`,
            data: {
                id: props.offerInfo.id,
                updateData: { closingDate, possessionDate, dueDiligenceDays, expiryDate, stepFourComplete: true, closingAttorney, closingAttorneyAddress, closingAttorneyPhone, closingAttorneyEmail, closingAttorneyAsHolderOfEarnestMoney: closingAttorneyHolderIndex === 0, holderOfEarnestMoney }
            }
        });
        props.setOfferInfo(response.data as OfferModel);
    }
    useImperativeHandle(ref, () => ({ save }));

    return <div>
        <H3 style={{ margin: "0 0 36px 0" }}>Fill in your dates & closing information</H3>

        <MOPSubcontainer  style={{ marginBottom: "40px"}}>
            <MOPHeader title={"Closing & Possession"}/> {/* todo: this says "closing & due diligence" in mockup, but DD is the next section? */}

            <MOPSubheader title={"Closing Date"}  info={"This is the date where closing occurs. This means the money is sent to the appropriate accounts by the closing attorney and the deed is transferred. If everything goes smoothly, after\ this date you will legally own the property"} />
            <StyledDatetimeMultiInput onlyDate={isMobile} setValue={handleSetClosingDate} value={closingDate as Date} style={{ marginBottom: "12px" }}
                                      data={{ dayInput: { label: "Days to close" }, dateInput: { label: "Expected closing date" } }} isSmall={isMobile}/>

            <MOPSubheader title={"Days between closing and possession"}  info={"This is when you actually get the keys and can move in to the property. Usually this is the same day as closing but this may be changed if you or the seller have a temporary occupancy agreement from the previous page."} />
            <StyledDatetimeMultiInput onlyDate={isMobile} setValue={handleSetPossessionDate} disabled value={possessionDate as Date} comparisonDate={closingDate} style={{ marginBottom: "12px", backgroundColor: colors.gray100 }}
                                      data={{ dayInput: { label: "Days" }, dateInput: { label: "Expected possession date" }, timeInput: { label: isMobile ? 'Time' : "Time of possession" } }} isSmall={isMobile}/>

            <StatusMessage hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>Time between closing and possession is set by any temporary occupancy agreements on the contingencies page</MintParagraph>
            </StatusMessage>
        </MOPSubcontainer>

        <MOPSubcontainer  style={{ marginBottom: "40px"}}>
            <MOPHeader title={"Due Diligence"}/>
            <MOPSubheader title={"Due Diligence Days"}  info={"You will have this many days after the contract is signed by both parties to do any inspections on the property. If you find anything wrong with the property before this time period ends, you can get your earnest money deposit back."} />
            <StyledInputContainer>
            <div style={{ display: "flex", flexDirection: "column", flex: "1", paddingBottom: "8px", paddingRight:'20px' }}>
                <StyledLabel htmlFor={`Due_Diligence_DaysInput`}>Due Diligence Days</StyledLabel>
                <StyledInput type="number"
                            isSmall={isMobile}
                            style={{width:'100%'}}
                            id={`Due_Diligence_DaysInput`}
                            min="0"
                            max="365"
                            value={dueDiligenceDays}
                            onChange={(event) => setDueDiligenceDays(parseInt(event.target.value))}
                            required
                />
            </div>
            </StyledInputContainer>
            <StatusMessage hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>We recommend 10-15 days to give you enough time to hire quality inspectors; however, a shorter time is more appealing to sellers</MintParagraph>
            </StatusMessage>
        </MOPSubcontainer>

        <MOPSubcontainer  style={{ marginBottom: "40px"}}>
            <MOPHeader title={"Offer Expiration"}/>

            <MOPSubheader title={"Expiration Date"}  info={"The date when the offer expires and the sellers can no longer accept. Often times people choose the evening of the upcoming Sunday or the evening of next week's Sunday. Default time is 6:00pm"} />
            <StyledDatetimeMultiInput setValue={setExpiryDate} value={expiryDate} style={{ marginBottom: "12px" }}
                                      onlyDate={isMobile} data={{ dayInput: { label: "Days" }, dateInput: { label: "Offer expiration date" }, timeInput: { label: "Expiration Time" } }} isSmall={isMobile}/>

        </MOPSubcontainer>

        <MOPSubcontainer  style={{ marginBottom: "48px"}}>
            <MOPHeader title={"Closing Attorney"}/>
            <StatusMessage hasIcon>
                <MintParagraph size={"14"} weight={"medium"}>Time between closing and possession is set by any temporary occupancy agreements on the contingencies page</MintParagraph>
            </StatusMessage>

            <MOPSubheader title={"Closing Attorney Name"}  info={"In this state, all closings are handled by an attorney to turn over the deed and disburse funds. You as the buyer have the right to choose your closing attorney; however, if you are using a mortgage the attorney actually represents the lender. We have pre-filled this information with a local firm that Housewell trusts."} />
            <StyledInputWithSupertext shortened={isMobile} label={"Closing Attorney Name"} value={`${closingAttorney}`} onChange={(event) => setClosingAttorney(event.target.value)}/>

            <MOPSubheader title={"Closing Attorney Address"}  info={"This is the address of the closing attorney's office."} />
            <StyledInputWithSupertext shortened={isMobile} label={"Closing Attorney Address"} value={`${closingAttorneyAddress}`} onChange={(event) => setClosingAttorneyAddress(event.target.value)} inputStyle={{width: isMobile ? '94%' : '97%'}}/>

            <MOPSubheader title={"Closing Attorney Phone"}  info={"This is the phone number of the closing attorney's office."} />
            <StyledInputWithSupertext shortened={isMobile} label={"Closing Attorney Phone"} value={`${closingAttorneyPhone}`} onChange={(event) => setClosingAttorneyPhone(event.target.value)}/>

            <MOPSubheader title={"Closing Attorney Email"}  info={"This is the email of the closing attorney's office."} />
            <StyledInputWithSupertext shortened={isMobile} label={"Closing Attorney Email"} value={`${closingAttorneyEmail}`} onChange={(event) => setClosingAttorneyEmail(event.target.value)}/>

            <MOPSubheader title={"Holder of Earnest Money"}  info={"Would you like the closing attorney to hold the earnest money or another trusted third party"} />
            <MultipleChoiceParent selectedIndex={closingAttorneyHolderIndex} onSelection={(index) => setClosingAttorneyHolderIndex(index)} choices={choices} buttonHeight="60px" useChecks></MultipleChoiceParent>

            {closingAttorneyHolderIndex === 1 && <StyledInputWithSupertext shortened={isMobile} label={"Holder of Earnest Money"} value={`${holderOfEarnestMoney}`} onChange={(event) => setHolderOfEarnestMoney(event.target.value)} style={{marginTop: '20px'}}/>}

        </MOPSubcontainer>
    </div>
});

export default MakeOfferDatesPage;