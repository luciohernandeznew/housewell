import React, {useState, useRef} from "react";
import styled from "@emotion/styled";
import {PropertyModel} from "../../slices/properties";
import {AzeretMonoParagraph, MintParagraph} from "../Typography/Typography";
import Image from "next/image";
import {colors} from "../../styles/colors";
import SecondaryButton from "../buttons/SecondaryButton";
import { useDevice } from "../../contexts/DeviceContext";
import {OfferModel} from "../../models/offerModel";
import { NavContainer } from "../headerFooter/AuthNav";
import { useRouter } from "next/router";
import BasicParentModal from "../boxes/modals/BasicParentModal";
import StatusMessage from "../stuff/StatusMessage";
import { makeAuthedApiRequest } from "../../utils/api/apiHelper";
import { useAppSelector } from "../../store";
import { canUserSignOffer } from "../../utils/helpers";

const StyledFrame = styled.div`
    display: flex;
    margin: 0 0;
    box-sizing: border-box;
    position: relative;
`;

const ListButton = styled.button`
    position: fixed;
    right: 0;
    top: 100px;
    border-radius: 24px 0px 0px 24px;
    border: 1px solid ${colors.gray400};
    border-right: none;
    background-color: white;
    display: inline-flex;
    z-index: 1;
    padding: 12px 12px 12px 20px;
    align-items: center;
    box-shadow: 0px 0px 0px 0px rgba(179, 185, 179, 0.08), 0px 3px 7px 0px rgba(179, 185, 179, 0.08), 0px 13px 13px 0px rgba(179, 185, 179, 0.07), 0px 29px 17px 0px rgba(179, 185, 179, 0.04), 0px 51px 20px 0px rgba(179, 185, 179, 0.01), 0px 80px 22px 0px rgba(179, 185, 179, 0.00);

    &:hover {
        cursor: pointer;
        background-color: ${colors.gray100};
    }
    &:active {
        background-color: ${colors.gray200};
    }

`;

export const Sidebar = styled.div<{ isOpen: boolean }>`
    width: ${(props) => (props.isOpen ? "85%" : "0")};
    height: 100%;
    position: fixed;
    z-index: 2;
    top: 0;
    right: 0;
    background-color: white;
    overflow-x: hidden;
    transition: 0.4s;
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
    display: ${(props) => (props.isOpen ? "block" : "none")};
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
`;


const StyledBody = styled.div<{isMidSize?: boolean}>`
    position: absolute;
    margin-top: ${props => props.isMidSize ? "0" : "40px"};
    left: ${props => props.isMidSize ? "0" : "12%"};
    width: ${props => props.isMidSize ? "100%" : "54%"};
    box-sizing: border-box;
    padding: ${props => props.isMidSize ? "10px" : "0"};
`;

const ButtonBar = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 12px 0 80px 0;
`;

const StyledSidebar = styled.div`
    position: fixed; 
    right: 10%;
    width: 20%;
    border-radius: 8px;
    max-height: 90vh;
    border: 1px solid rgba(0, 0, 0, 0.07);
    background: #FFF;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
`;

const StyledSidebarItem = styled.div`
    display: flex;
    padding: 12px 0;
    align-items: center;
`;

export type SidebarItemProps = {
    text: string,
    index: number,
    selectedIndex: number,
    setSelectedIndex: (i: number) => void
    completeStatuses?: (boolean | undefined)[]
    isPreparing?: boolean;
    closeSidebar?: () => void;
    save: () => void;
}

const sidebarItemList = [
    "Offer & Financing",
    "Property Details",
    "Contingencies",
    "Dates & Closing",
    "Review & Sign"
];

const SidebarItemNumber = (props: {index: number, disabled: boolean}) => {
    return <div style={{ height: "24px", width: "24px" }}>
        <div style={{ height: "20px", width: "20px", margin: "2px", backgroundColor: props.disabled ? colors.gray100 : colors.brandGreen, borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MintParagraph size={"12"} weight={"medium"} style={{ color: props.disabled ? colors.gray500 : colors.background, marginBottom: "1px" }}>{props.index}</MintParagraph>
        </div>
    </div>
}

const SidebarItem: React.FC<SidebarItemProps> = (props: SidebarItemProps) => {
    return <StyledSidebarItem style={props.selectedIndex === props.index ? { borderLeft: `4px solid ${colors.brandGreen}`, marginLeft: "-24px", paddingLeft: "20px" } : {}}>
        {props.selectedIndex > props.index ?
            <Image src="/icon_svg/check_dark.svg" alt='check dark' width={24} height={24} /> :
            (props.selectedIndex === props.index ?
                <SidebarItemNumber index={props.index} disabled={false} /> :
                    props.completeStatuses?.[props.index-1] ? <Image src="/icon_svg/check_dark.svg" alt='check dark' width={24} height={24} />  : <SidebarItemNumber index={props.index} disabled={true} />
            )
        }
        <MintParagraph size={"20"} weight={"medium"} style={{ marginLeft: "20px", color: props.selectedIndex < props.index ? colors.gray500 : colors.gray900 }}>{props.text}</MintParagraph>
        {(!!(props.selectedIndex > props.index || (props.completeStatuses && props.completeStatuses[props.index-1])) && props.isPreparing) && 
                <MintParagraph
                    size={"16"}
                    weight={"medium"}
                    style={{ marginLeft: "auto", color: colors.gray700, cursor: "pointer" }}
                    onClick={() => {
                        if (props.selectedIndex !== 5 ) {props.save();}
                        props.setSelectedIndex(props.index);
                        if (props.closeSidebar) {
                            props.closeSidebar();
                        }
                    }}
                >Edit</MintParagraph>
            }
    </StyledSidebarItem>
}

export type MakeOfferFrameProps = {
    children: React.ReactNode;
    propertyInfo: PropertyModel;
    selectedIndex: number;
    offerInfo: OfferModel;
    setSelectedIndex: (i: number) => void;
    setOfferInfo: (offerInfo: OfferModel) => void;
    save: () => void;
    scrollToTop: () => void;
}
const messageIcon = '/icon_svg/sms_edit.svg'
const editIcon = '/icon_svg/rename.svg'

const MakeOfferFrame: React.FC<MakeOfferFrameProps> = (props: MakeOfferFrameProps) => {
    const { windowSize, isMobile } = useDevice();
    const router = useRouter();
    const isMidSize = windowSize.width < 1100;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditWarningModalOpen, setIsEditWarningModalOpen] = useState(false);
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };
    const handleEditRescindClick = async () => {
        const response = await makeAuthedApiRequest({method: 'post', urlExtension: `/v1/offer/makeOfferEditable`, data: {offerId: props.offerInfo?.id}});
        props.setOfferInfo(response.data);
        setIsEditWarningModalOpen(false);
    };
    const user = useAppSelector((state) => state.userReducer.user);
    const isOfferExpired = () => {
        const currentDate = new Date();
        const expiryDate = new Date(props.offerInfo?.expiryDate as Date);
        return currentDate > expiryDate;
    };
    const isOfferSignable = props?.offerInfo?.status === 'PREPARING' || props?.offerInfo?.status === 'PENDING-BUYER-SIGNATURE' && !isOfferExpired();
    const canUserSign = canUserSignOffer(props.offerInfo, user?.id);



    const isCompleteItems = [props.offerInfo?.stepOneComplete, props.offerInfo?.stepTwoComplete, props.offerInfo?.stepThreeComplete, props.offerInfo?.stepFourComplete, props.offerInfo?.stepFiveComplete]
    return <StyledFrame>
              <Overlay isOpen={isSidebarOpen} onClick={closeSidebar} />
      <Sidebar isOpen={isSidebarOpen}>
        <NavContainer><SecondaryButton reverseArrow isLight text="Your Offer" size="medium" borderless hasArrow onClick={closeSidebar}></SecondaryButton></NavContainer>
            <div style={{ padding: "24px", borderBottom: `1px solid ${colors.gray200}` }}>
                <MintParagraph size={"18"} weight={"regular"} style={{ color: colors.gray800, marginBottom: "4px" }}>You&apos;re making an offer for</MintParagraph>
                <MintParagraph size={"18"} weight={"medium"}>{props.propertyInfo.streetAddress}</MintParagraph>
                {props.propertyInfo.address2 && <MintParagraph size={"18"} weight={"medium"}>{props.propertyInfo.address2}</MintParagraph>}
                <MintParagraph size={"18"} weight={"medium"}>{`${props.propertyInfo.city}, ${props.propertyInfo.state} ${props.propertyInfo.zip}`}</MintParagraph>
                <SecondaryButton size="medium" icon={messageIcon} iconHeight={20} iconWidth={20} iconSpacing="12px" onClick={() => {router.push({ pathname: '/messages', query: { groupId: props.propertyInfo.groupId }});}} isLight hasArrow text={"Message"} style={{ width: "100%", marginTop: '10px', boxSizing: 'border-box'}} reverseArrow/>

            </div>
            <div style={{ padding: "24px"}}>
                <AzeretMonoParagraph weight={"medium"} style={{ color: colors.gray800, fontSize: "14px", marginBottom: "16px" }}>YOUR OFFER</AzeretMonoParagraph>
                {sidebarItemList.map((value, index) => {
                    return <SidebarItem
                        index={index + 1}
                        text={value}
                        key={index}
                        completeStatuses={isCompleteItems}
                        selectedIndex={props.selectedIndex}
                        setSelectedIndex={props.setSelectedIndex}
                        closeSidebar={closeSidebar}
                        save={props.save}
                        isPreparing={props.offerInfo?.status === "PREPARING"}
                    />
                })}
                
            </div>

      </Sidebar>
        {isMidSize &&
            <ListButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <Image src="/icon_svg/list.svg" alt='list' width={24} height={24} />
                <MintParagraph size="16" weight="medium" style={{color:colors.gray1000, marginLeft:'12px'}}>Steps</MintParagraph>
            </ListButton>
        }
        <StyledBody isMidSize={isMidSize}>
            {props.children}
            {(props.selectedIndex === 5 && (props?.offerInfo?.status === 'PENDING-BUYER-SIGNATURE' || props?.offerInfo?.status === 'PENDING-SELLER-SIGNATURE')) &&
                    <div style={{display:'flex', justifyContent:'space-between'}}><div></div><SecondaryButton style={{marginTop: '12px', width: '120px'}} text={'Edit'} size={"medium"} isLight icon={editIcon} iconHeight={20} iconWidth={20} iconSpacing="10px" hasArrow reverseArrow onClick={() => {setIsEditWarningModalOpen(true)}}/></div>
            }
            <ButtonBar>
                {(props.selectedIndex > 1) &&
                    <SecondaryButton style={{backgroundColor: 'white'}} text={"Back"} disabled={props.offerInfo?.status !== 'PREPARING'} size={"medium"} isLight onClick={() => {props.scrollToTop(); props.setSelectedIndex(props.selectedIndex - 1);}}/>
                }

                    
                    <SecondaryButton size='medium' hasArrow
                                text={props.selectedIndex === 5 ? (!canUserSign || !isOfferSignable) ? isMobile ? 'View' : 'View Offer' : isMobile ? "Review" : "Review and Sign" : "Next"}
                                style={{ marginLeft: "auto" }}
                                onClick={props.selectedIndex === 5 ?
                                    () => {
                                        props.scrollToTop();
                                        props.save();
                                    } : () => {
                                        props.scrollToTop();
                                        props.save();
                                        props.setSelectedIndex(props.selectedIndex + 1);
                                        
                                    }
                                }
                    />
            </ButtonBar>
        </StyledBody>
        {!isMidSize && <StyledSidebar>
            {windowSize.height > 782 && <div style={{ width: "100%", height: "250px", position: "relative" }}>
                <Image
                    src={props.propertyInfo.coverImage || "/property_placeholder.png"}
                    alt="Dashboard Property"
                    fill
                    style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
                    />
            </div>}
            <div style={{ padding: "24px", borderBottom: `1px solid ${colors.gray200}` }}>
                <MintParagraph size={"18"} weight={"regular"} style={{ color: colors.gray800, marginBottom: "4px" }}>You&apos;re making an offer for</MintParagraph>
                <MintParagraph size={"18"} weight={"medium"}>{props.propertyInfo.streetAddress}</MintParagraph>
                {props.propertyInfo.address2 && <MintParagraph size={"18"} weight={"medium"}>{props.propertyInfo.address2}</MintParagraph>}
                <MintParagraph size={"18"} weight={"medium"}>{`${props.propertyInfo.city}, ${props.propertyInfo.state} ${props.propertyInfo.zip}`}</MintParagraph>
                <SecondaryButton size="medium" icon={messageIcon} iconHeight={20} iconWidth={20} iconSpacing="12px" onClick={() => {router.push({ pathname: '/messages', query: { groupId: props.propertyInfo.groupId }});}} isLight hasArrow text={"Message"} style={{ width: "100%", marginTop: '10px', boxSizing: 'border-box'}} reverseArrow/>
            </div>
            <div style={{ padding: "24px"}}>
                <AzeretMonoParagraph weight={"medium"} style={{ color: colors.gray800, fontSize: "14px", marginBottom: "16px" }}>YOUR OFFER</AzeretMonoParagraph>
                {sidebarItemList.map((value, index) => {
                    return <SidebarItem
                        index={index + 1}
                        text={value}
                        key={index}
                        completeStatuses={isCompleteItems}
                        selectedIndex={props.selectedIndex}
                        setSelectedIndex={props.setSelectedIndex}
                        save={props.save}
                        isPreparing={props.offerInfo?.status === "PREPARING"}
                    />
                })}
            </div>

        </StyledSidebar>}
        {isEditWarningModalOpen && <BasicParentModal closeModal={()=>{setIsEditWarningModalOpen(false)}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'flex-start', padding: '17px', }}>
            
            <MintParagraph size="32" weight="medium">Are you sure you want to edit this offer?</MintParagraph>

            <MintParagraph size='16' weight="regular" style={{ marginTop: "16px", marginBottom: "16px" }}>This offer has already been signed by at least one person, if you edit this offer it will rescind any completed signatures and you&apos;ll have to sign again. This cannot be undone.</MintParagraph>
            <StatusMessage style={{ margin: "8px 0 8px 0" }} hasIcon>
                        <MintParagraph size={"14"} weight={"medium"}>
                           Note: Once everyone has signed, editing or rescinding the offer is significantly more complicated.
                        </MintParagraph>
                    </StatusMessage>
            <ButtonBar style={{margin: '48px 0 0 0'}}> 
                <SecondaryButton size='medium' text={"Cancel"} style={{backgroundColor: 'white'}} isLight onClick={() => {setIsEditWarningModalOpen(false)}}/>
                <SecondaryButton size='medium' text={"Edit & Rescind"} onClick={handleEditRescindClick}/>
            </ButtonBar>
            </div>

            </BasicParentModal>
        }    </StyledFrame>
}

export default MakeOfferFrame;