import React, {useEffect, useImperativeHandle, useState} from 'react';
import {PropertyModel} from "../../slices/properties";
import {colors} from "../../styles/colors";
import {H3, MintParagraph} from "../Typography/Typography";
import numeral from "numeral";
import styled from "@emotion/styled";
import MultipleChoiceParent from "../stuff/MultipleChoiceParent";
import {UserModel} from "../../slices/user";
import {useAppDispatch, useAppSelector} from "../../store";
import {fetchUserGroups, GroupWithMembersModel} from "../../slices/groups";
import MultipleChoiceCards from "../stuff/MultipleChoiceCards";
import StyledInputWithSupertext, {cleanNumericValue} from "../boxes/StyledInputWithSupertext";
import StatusMessage from "../stuff/StatusMessage";
import {
    CLOSING_COST_ACCORDION_BODY,
    EARNEST_MONEY_ACCORDION_BODY, FINANCING_TYPES_OPTS,
    LOAN_TYPES_CARDS,
    OFFER_TYPES_CARDS
} from "./MakeOfferPageConstants";
import {MOPHeader, MOPSubcontainer, MOPSubheader, TextCardBody, TitleBodyCard} from "./MakeOfferPageComponents";
import Accordion from "../stuff/Accordion";
import {OfferModel} from "../../models/offerModel";
import {makeAuthedApiRequest} from "../../utils/api/apiHelper";
import Link from 'next/link';
import { useDevice } from '../../contexts/DeviceContext';
import SecondaryButton from '../buttons/SecondaryButton';
import Image from 'next/image';
import PreApprovalUpload from '../stuff/PreapprovalUpload';

export type MakeOfferPageProps = {
    propertyInfo: PropertyModel;
    offerInfo: OfferModel;
    setOfferInfo: (offer: OfferModel) => void;
}

const roundToThousand = (value: number) => {
    return Math.round(value / 1000) * 1000;
};


const TabNav = styled.div<{selected: boolean}>`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    
    font-family: 'Mint Grotesk Medium';
    font-weight: ${props => props.selected ? "bold" : "400"};
    font-size: 24px;
    cursor: pointer;
    
    margin-bottom: ${props => props.selected ? "0px" : "3px"};
    padding-bottom: 12px;
    
    color: ${props => props.selected ? "#202626" : "#303831"};
    border-bottom: ${props => props.selected ? "3px solid #202626" : "none"};
`;

// eslint-disable-next-line react/display-name
const MakeOfferPage = React.forwardRef((props: MakeOfferPageProps, ref) => {
    const dispatch = useAppDispatch();
    const { windowSize, isMobile } = useDevice();
    const isMidSize = windowSize.width < 1100;
    const [selectedUserIndex, setSelectedUserIndex] = useState(0);
    const [hasSecondUser, setHasSecondUser] = useState(!!props.offerInfo.secondBuyerUserId);
    const [selectedSecondUserIndex, setSelectedSecondUserIndex] = useState(-1);
    const [selectedOfferTypeIndex, setSelectedOfferTypeIndex] = useState(props.offerInfo.offerType ? OFFER_TYPES_CARDS.findIndex((card) => props.offerInfo.offerType === card.type) : 0);
    const [offerAmount, setOfferAmount] = useState(props.offerInfo.offerAmt || props.propertyInfo.listPrice as number);
    const [maxOfferAmt, setMaxOfferAmt] = useState(props.offerInfo.escalationMaxAmt || (props.offerInfo.offerAmt || props.propertyInfo.listPrice as number));
    const [escalationAmt, setEscalationAmt] = useState(props.offerInfo.escalationAmt || 3000);
    const [selectedFinancingTypeIndex, setSelectedFinancingTypeIndex] = useState(props.offerInfo.financingType ? FINANCING_TYPES_OPTS.findIndex((opt) => props.offerInfo.financingType === opt.type) : 0);
    const [selectedLoanTypeIndex, setSelectedLoanTypeIndex] = useState(props.offerInfo.loanType ? LOAN_TYPES_CARDS.findIndex((card) => props.offerInfo.loanType === card.type) : 0);
    const [downPayment, setDownPayment] = useState(
        props.offerInfo.downPaymentAmt 
        ? props.offerInfo.downPaymentAmt
        : roundToThousand(offerAmount * 0.2)
    );
    const [buyerAgentUserId, setBuyerAgentUserId] = useState(props.offerInfo.buyerAgentUserId || null);
    const [buyerSideCommission, setBuyerSideCommission] = useState(props.offerInfo.buyerSideCommission || props.propertyInfo.buyerSideCommission || 2.5);
    const [buyerSideCommissionDollars, setBuyerSideCommissionDollars] = useState(0);
    const [buyersAgentBrokerage, setBuyersAgentBrokerage] = useState(props.offerInfo.buyersAgentBrokerage || "");
    const [sellerClosingAmt, setSellerClosingAmt] = useState(props.offerInfo.sellerClosingAmt || 3000);
    const [earnestMoneyAmt, setEarnestMoneyAmt] = useState(props.offerInfo.earnestMoneyAmt || 10000);
    const [hasPreApproval, setHasPreApproval] = useState(props.offerInfo.hasPreApproval || false);
    const [isPreapprovalModalOpen, setIsPreapprovalModalOpen] = useState(false);

    const handlePreApprovalUploaded = () => {
        setHasPreApproval(true);
    };

    useEffect(() => {dispatch(fetchUserGroups({}))}, [dispatch]);
    const groups = useAppSelector((state) => state.groupsReducer.groups);
    const user = useAppSelector((state) => state.userReducer.user);
    const [selectedGroup, setSelectedGroup] = useState<GroupWithMembersModel>();
    useEffect(() => {
        if (props.offerInfo.buyerGroupId) {
            setSelectedGroup(groups.find((group: GroupWithMembersModel) => group.group.id === props.offerInfo.buyerGroupId))
        }
    }, [groups, props.offerInfo.buyerGroupId]);

    useEffect(() => {
        const sanitizedOffer = cleanNumericValue(offerAmount.toString());
        const dollarAmt = Number(sanitizedOffer) * (buyerSideCommission / 100);
        setBuyerSideCommissionDollars(dollarAmt);
    }, [offerAmount, buyerSideCommission]);

    const [groupMembers, setGroupMembers] = useState<UserModel[]>([]);

    useEffect(() => {
        const newGroupMembers = groups
            .filter(group => group.group.id === selectedGroup?.group.id)
            .reduce((acc: UserModel[], group: GroupWithMembersModel) => {
                group.members
                    .filter(newMember => newMember.firstName && newMember.lastName && newMember.email && newMember.phoneNumber)
                    .forEach(newMember => {
                        if (!acc.find(member => member.id === newMember.id)) {
                            acc.push(newMember);
                        }
                    });
                return acc;
            }, []);
        setGroupMembers(newGroupMembers);
    }, [groups, selectedGroup]);
    
    useEffect(() => {
        if (selectedGroup) {
            const agent = groupMembers.find((member: UserModel) => member.userType === 'agent')
            if (agent) {
                setBuyerAgentUserId(agent.id);
            }
        }
    }, [selectedGroup, groupMembers]);
    const groupMemberChoices = groupMembers.map((member: UserModel) => { return { text: `${member.firstName} ${member.lastName}` } });

    useEffect(() => {
        if (props.offerInfo.buyerUserId) {
            setSelectedUserIndex(groupMembers.findIndex((member: UserModel) => member.id === props.offerInfo.buyerUserId))
        }
        else {
            setSelectedUserIndex(groupMembers.findIndex((member: UserModel) => member.id === user.id))
        }
        if (props.offerInfo.secondBuyerUserId) {
            setSelectedSecondUserIndex(groupMembers.findIndex((member: UserModel) => member.id === props.offerInfo.secondBuyerUserId))
        }
    }, [groups, groupMembers, props.offerInfo.buyerUserId, props.offerInfo.secondBuyerUserId, user.id]);

    const offerTypeChoices = OFFER_TYPES_CARDS.map((value, i) => {
        return { children: <TextCardBody key={i} text={value.text} subtext={value.subtext}/>}
    });
    const loanTypeChoices = LOAN_TYPES_CARDS.map((value, i) => {
        return { children: <TitleBodyCard key={i} title={value.title} subtitle={''} body={value.body} topMargin={"24px"} />}
    });

    const save = async () => {
        try {
            const response = await makeAuthedApiRequest({
                method: 'post',
                urlExtension: `/v1/offer/updateOffer`,
                data: {
                    id: props.offerInfo.id,
                    updateData: { 
                        buyerUserId: groupMembers[selectedUserIndex]?.id, loanType: LOAN_TYPES_CARDS[selectedLoanTypeIndex].type,
                        offerType: OFFER_TYPES_CARDS[selectedOfferTypeIndex].type, financingType: FINANCING_TYPES_OPTS[selectedFinancingTypeIndex].type,
                        secondBuyerUserId: hasSecondUser ? groupMembers[selectedSecondUserIndex]?.id : undefined, buyerGroupId: selectedGroup?.group.id,
                        offerAmt: (cleanNumericValue(offerAmount.toString())), escalationMaxAmt: (cleanNumericValue(maxOfferAmt.toString())),
                        escalationAmt: (cleanNumericValue(escalationAmt.toString())), downPaymentAmt: (cleanNumericValue(downPayment.toString())),
                        sellerClosingAmt:  (cleanNumericValue(sellerClosingAmt.toString())), earnestMoneyAmt:  (cleanNumericValue(earnestMoneyAmt.toString())),
                        stepOneComplete: true, hasPreApproval, buyerAgentUserId, buyerSideCommission, buyersAgentBrokerage
                    }
                }
            });
            props.setOfferInfo(response.data as OfferModel);
        } catch (e) {
            console.log(e);
        }
    }
    useImperativeHandle(ref, () => ({ save }));

    const Separator = () => <div style={{height: "8px"}}/>; //todo: change for mobile

    return (
        <div>
            <H3>What is your offer?</H3>
            <MintParagraph size={"20"} weight={"medium"} style={{ margin: "12px 0 36px 0" }}>{`Asking price for this property is ${numeral(props.propertyInfo.listPrice).format('$0,0')}`}</MintParagraph>

            <MOPSubcontainer style={{marginBottom: groupMembers.length === 1 ? '64px' : `0`}}>
                <MOPHeader title={"Who is buying the property"}/>
                {buyerAgentUserId && <StatusMessage style={{ margin: "12px 0 24px 0" }} hasIcon> <MintParagraph size='12' weight='medium'>{`Please make sure all buyers party to this transaction are signed up, have joined ${selectedGroup?.group.name}, and are on this offer before anyone signs the offer.`}</MintParagraph> </StatusMessage>}
                {hasSecondUser && <MintParagraph size={"20"} weight={"medium"} style={{ margin: "36px 0 0 0" }}>{`First buyer:`}</MintParagraph>}
                <MultipleChoiceParent fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={groupMemberChoices} selectedIndex={selectedUserIndex} onSelection={(index) => setSelectedUserIndex(index)}/>

                { hasSecondUser && <div>
                    <MintParagraph size={"20"} weight={"medium"}>{`Second buyer:`}</MintParagraph>
                    <MultipleChoiceParent fontSize='20' useChecks style={{ margin: "24px 0 36px 0" }} choices={groupMemberChoices} selectedIndex={selectedSecondUserIndex} onSelection={(index) => setSelectedSecondUserIndex(index)}/>
                </div>}

                <MintParagraph size={"20"} weight={"medium"}
                               style={{margin: "-24px 0 36px 0", color: colors.brandGreen, cursor: "pointer" }}
                               onClick={() => setHasSecondUser(!hasSecondUser)}
                >{!hasSecondUser ? groupMembers.length === 1 ? '': `+ Add a second buyer` : '- Remove second buyer'}</MintParagraph>
            </MOPSubcontainer>

            <MOPSubcontainer style={{borderTop: groupMembers.length === 1 ? 'none' : `1px solid ${colors.gray200}`,}}>
                <MOPHeader title={"Your Offer"}/>
                <MultipleChoiceCards style={{ margin: "36px 0 12px 0", flexDirection: isMidSize ? 'column': 'row' }} choices={offerTypeChoices} selectedIndex={selectedOfferTypeIndex} onSelection={(index) => setSelectedOfferTypeIndex(index)}/>
                    { selectedOfferTypeIndex == 1 && <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                        <MintParagraph size={"14"} weight={"medium"}>If you chose this option you&apos;re submitting an escalating offer — this means you&apos;re telling the sellers you are willing to beat other offers. The sellers have to show you an official offer higher than your current offer for the escalation to take effect. At that point your offer escalates to the highest offer + the escalation amount</MintParagraph>
                    </StatusMessage>}
                <StyledInputWithSupertext shortened={isMobile} label={selectedOfferTypeIndex == 1 ? 'Starting offer amount' : 'Offer amount'}
                                          value={`${offerAmount}`} onChange={(event) => {setOfferAmount(event.target.value)}} moneyFormat/>
                { selectedOfferTypeIndex == 1 && <>
                    <Separator/>
                    <StyledInputWithSupertext shortened={isMobile} label='Escalation amount' value={`${escalationAmt}`} onChange={(event) => {setEscalationAmt(event.target.value)}} moneyFormat />
                </>}

            </MOPSubcontainer>

            <MOPSubcontainer>
                <MOPHeader title={"Financing Information"}/>

                <div style={{ display: "flex", width: "100%", alignItems: "stretch", textAlign: 'center', justifyContent: "stretch", borderBottom: `1px solid ${colors.gray300}` }}>
                    {FINANCING_TYPES_OPTS.map(((value, i) => {
                        const flexValue = (i === 2) ? "0.7" : "1";
                        
                        return (
                            <div 
                                key={i} 
                                onClick={() => setSelectedFinancingTypeIndex(i)} 
                                style={{ 
                                    display: "flex", 
                                    flex: flexValue, 
                                    justifyContent: "center" 
                                }}
                            >
                                <TabNav selected={selectedFinancingTypeIndex === i}>
                                    <MintParagraph size={"18"} weight={selectedFinancingTypeIndex === i ? "medium" : "regular"}>{value.text}</MintParagraph>
                                </TabNav>
                            </div>
                        )
                    }))}
                </div>


                <StatusMessage style={{ margin: "12px 0 24px 0" }} hasIcon>
                    <div>
                        {selectedFinancingTypeIndex === 1 ? <MintParagraph size={"14"} weight={"medium"}>If your offer is accepted you will need to submit proof of funds later through bank statements or another format. Additionally, when you use cash, you can no longer have a financing contengency</MintParagraph> 
                            : hasPreApproval ?
                            <div style={{display:'flex', alignItems: 'center', justifyContent: 'flex-start'}}><Image src="/icon_svg/check_dark.svg" alt='check dark' width={24} height={24} /> <MintParagraph style={{marginLeft: '14px'}} size='14' weight='medium'>Pre-Approval Uploaded</MintParagraph></div>
                            :
                            <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <MintParagraph size={"14"} weight={"medium"}>Upload your pre-approval letter either from Housewell or another lending institution. If you haven&apos;t already, you can apply for a mortgage through Housewell in as little as 5 minutes <Link href={'/buy/mortgage'} target="_blank" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>here</Link></MintParagraph>
                                <SecondaryButton text='Upload' size='small' isLight style={{paddingLeft:'20px', paddingRight:'20px'}} onClick={() => setIsPreapprovalModalOpen(true)}></SecondaryButton>
                            </div>
                            }
                    </div>
                </StatusMessage>
                {selectedFinancingTypeIndex != 2 && <><MultipleChoiceCards style={{ margin: "24px 0 12px 0", flexDirection: isMidSize ? 'column': 'row'}} choices={loanTypeChoices} selectedIndex={selectedLoanTypeIndex} onSelection={(index) => setSelectedLoanTypeIndex(index)}/></>}

                {!buyerAgentUserId ? <><MOPSubheader title={"Housewell Rebate"}  info={"You receive this as a closing credit because you're using Housewell. This is the amount of comission that would typically go to a buyers agent."} />
                <StyledInputWithSupertext shortened={isMobile} style={{backgroundColor: colors.gray100}} label={"Your Housewell Rebate at Close"} disabled value={`${buyerSideCommissionDollars}`} onChange={() => (null)} moneyFormat/></> 
                :
                 <><MOPSubheader title={"Buyers Agent Commission"}  info={"The % of commission the buyer's agent will receive"} />
                    <StyledInputWithSupertext shortened={isMobile} label='Buyer agent commission as (%) of sales price' value={`${buyerSideCommission}`}
                        onChange={(event) => {
                            event.stopPropagation();
                            const sanitizedValue = parseFloat(event.target.value);
                            setBuyerSideCommission(sanitizedValue < 0 ? 0 : sanitizedValue);
                        }}
                        step={.1}
                        type={"number"}
                        inputStyle={{ width: isMidSize ? '93%' : "97%" }}
                    />
                    <MOPSubheader title={"Buyer's Agent Brokerage"}  info={"The brokerage that the buyer's agent represents"} />
                    <StyledInputWithSupertext shortened={isMobile} label={"Buyer's agent brokerage"} value={`${buyersAgentBrokerage}`} onChange={(event) => setBuyersAgentBrokerage(event.target.value)}/></>
                }

                {selectedFinancingTypeIndex != 2 && <><MOPSubheader title={"Your down payment"} info={"The amount you pay towards the property at closing. This combines with your loan to equal the purchase price"} />
                <StyledInputWithSupertext shortened={isMobile} label={"Down payment"} value={`${downPayment}`} onChange={(event) => {setDownPayment(event.target.value)}} moneyFormat/></>}



                <MOPSubheader title={buyerAgentUserId ? "Closing Costs" : "Other Closing Contribution"}  info={"The amount of additional money the seller contributes to closing costs."} />
                <StyledInputWithSupertext shortened={isMobile} label={"Seller's contribution amount"} value={`${sellerClosingAmt}`} onChange={(event) => {setSellerClosingAmt(event.target.value)}} moneyFormat/>
                <Accordion style={{width: "100%", color: colors.darkgreen1000, margin: "12px 0 36px 0"}}
                           items={[{
                               header: "How much should a seller contribute to closing costs?",
                               body: CLOSING_COST_ACCORDION_BODY
                           }]}/>

                <MOPSubheader title={"Earnest Money"}  info={"This is the amount of money the buyer puts up to demonstrate his/her's serious intent to purchase the property. This is held in an escrow account and may be paid out to the sellers if the buyers default on the purchase agreement."} />
                <StyledInputWithSupertext shortened={isMobile} label={"Earnest money"} value={`${earnestMoneyAmt}`} onChange={(event) => {setEarnestMoneyAmt(event.target.value)}} moneyFormat/>
                <Accordion
                    style={{width: "100%", color: colors.darkgreen1000, margin: "12px 0 36px 0"}}
                    items={[{
                        header: "What’s the right amount of earnest money?",
                        body: EARNEST_MONEY_ACCORDION_BODY
                    }]}/>
            </MOPSubcontainer>
            {isPreapprovalModalOpen && <PreApprovalUpload handlePreApprovalUploaded={handlePreApprovalUploaded} offerId={props.offerInfo.id} modalOpen={isPreapprovalModalOpen} toggleModal={() => setIsPreapprovalModalOpen(!isPreapprovalModalOpen)}/>}
        </div>
    )
});

export default MakeOfferPage;