import React, {useState} from "react";
import styled from "@emotion/styled";
import { Overlay, Sidebar } from "../make-offer/MakeOfferFrame";
import UserIcon from "../stuff/UserIcon";
import { useAppDispatch, useAppSelector } from "../../store";
import { MintParagraph } from "../Typography/Typography";
import GearIconButton from "../buttons/GearIconButton";
import Link from "next/link";
import { colors } from "../../styles/colors";
import { useRouter } from "next/router";
import { selectUnreadMsgNotifications, selectUnreadNonMsgNotifications, selectNonMsgNotifications, NotificationModel, selectUnreadNotifications, readAllNonMessageNotifications } from "../../slices/notifications";
import Image from "next/image";
import { NotificationTile, redirect } from "../notifications/NotificationPopover";

const ParentDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    justify-content: flex-start;
`;

const StyledHamburger = styled.svg`
    path {
        transition: transform 0.3s;
        transform-origin: left center;
    }
    &:hover {
        cursor: pointer;
    }

    &:active #lineMiddle {
        transform: scaleX(2.111);
    }

    &:active #lineBottom {
        transform: scaleX(1.357);
    }
`;

const MessageBadge = styled(MintParagraph)<{selected: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 7px;
    height: 17px;
    padding: 3px 7px;
    margin-left: 12px;
    
    background: ${props => props.selected ? "#E0650D" : "#CACFCA"};
    color: ${props => props.selected ? "white" : "black"};
    border-radius: 38px;
`;
const MobileIconSvg = () => (
    <svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 10.8589L2 2.72811" stroke="#E0650D" stroke-width="2.92375"/>
        <mask id="mask0_2845_26705" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="2" y="1" width="24" height="28">
        <path d="M2 9.61045L13.6505 1.5L25.301 9.61045V28.4535H2V9.61045Z" fill="black"/>
        </mask>
        <g mask="url(#mask0_2845_26705)">
        <path d="M32.7734 26.3456C30.6552 25.004 25.6419 22.6562 19.7107 22.6562C12.2968 22.6562 9.47238 27.3518 2.7645 27.3518C-3.94338 27.3518 -6.76775 24.6686 -6.76775 24.6686" stroke="#E0650D" stroke-width="2.92375"/>
        <path d="M32.7734 16.9315C30.6552 15.5899 25.6419 13.2422 19.7107 13.2422C12.2968 13.2422 9.47238 17.9377 2.7645 17.9377C-3.94338 17.9377 -6.76775 15.2546 -6.76775 15.2546" stroke="#E0650D" stroke-width="2.92375"/>
        <path d="M-6.0625 22.6569C-4.41495 21.0918 0.362943 17.9614 6.29412 17.9614C13.7081 17.9614 16.5325 22.6569 23.2403 22.6569C29.9482 22.6569 33.4787 19.9738 33.4787 19.9738" stroke="#E0650D" stroke-width="2.92375"/>
        <path d="M-6.0625 22.6569C-4.41495 21.0918 0.362943 17.9614 6.29412 17.9614C13.7081 17.9614 16.5325 22.6569 23.2403 22.6569C29.9482 22.6569 33.4787 19.9738 33.4787 19.9738" stroke="#E0650D" stroke-width="2.92375"/>
        </g>
        <path d="M2 10.7179L13.6505 2.66846L25.301 10.7179V29.5H2V10.7179Z" stroke="#E0650D" stroke-width="2.92375"/>
        </svg>
);

const IconSvg = () => (
    <svg width="218" height="39" viewBox="0 0 218 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12.9824L2 2.57198" stroke="#E0650D" strokeWidth="3.7435" />
        <mask id="mask0_150_1095" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="2" y="1" width="30" height="35">
            <path d="M2 11.3844L16.9171 1L31.8341 11.3844V35.5106H2V11.3844Z" fill="black" />
        </mask>
        <g mask="url(#mask0_150_1095)">
            <path d="M41.4015 32.8116C38.6893 31.0939 32.2704 28.0879 24.6763 28.0879C15.1836 28.0879 11.5673 34.0999 2.97869 34.0999C-5.60993 34.0999 -9.22619 30.6645 -9.22619 30.6645" stroke="#E0650D" strokeWidth="3.7435" />
            <path d="M41.4015 20.7579C38.6893 19.0402 32.2704 16.0342 24.6763 16.0342C15.1836 16.0342 11.5673 22.0462 2.97869 22.0462C-5.60993 22.0462 -9.22619 18.6108 -9.22619 18.6108" stroke="#E0650D" strokeWidth="3.7435" />
            <path d="M-8.32108 28.0892C-6.21159 26.0852 -0.0940818 22.0771 7.50007 22.0771C16.9927 22.0771 20.609 28.0892 29.1976 28.0892C37.7862 28.0892 42.3066 24.6537 42.3066 24.6537" stroke="#E0650D" strokeWidth="3.7435" />
            <path d="M-8.32022 28.0892C-6.21074 26.0852 -0.0932274 22.0771 7.50092 22.0771C16.9936 22.0771 20.6099 28.0892 29.1985 28.0892C37.7871 28.0892 42.3074 24.6537 42.3074 24.6537" stroke="#E0650D" strokeWidth="3.7435" />
        </g>
        <path d="M2 12.8024L16.9171 2.49609L31.8341 12.8024V36.8506H2V12.8024Z" stroke="#E0650D" strokeWidth="3.7435" />
        <path d="M64.2009 36.2336H75.9496V35.2171C72.7394 35.0153 72.0605 34.7686 72.0605 31.6818V12.3461C72.0605 9.21438 72.7394 9.01258 75.9496 8.81077V7.80176H64.2009V8.81825C67.4111 9.02005 68.0901 9.22185 68.0901 12.3535V20.478H54.5702V12.3461C54.5702 9.21438 55.2491 9.01258 58.4594 8.81077V7.80176H46.7106V8.81825C49.9209 9.02005 50.5998 9.22185 50.5998 12.3535V31.6893C50.5998 34.7761 49.9209 35.0227 46.7106 35.2245V36.241H58.4594V35.2245C55.2491 35.0227 54.5702 34.7761 54.5702 31.6893V22.3017H68.0901V31.6893C68.0901 34.7761 67.4111 35.0227 64.2009 35.2245V36.241V36.2336Z" fill="#0A0806" />
        <path d="M85.0834 17.3018C79.47 17.3018 75.7253 21.5247 75.7253 27.0481C75.7253 32.5715 79.47 36.8393 85.0834 36.8393C90.6968 36.8393 94.4855 32.6164 94.4855 27.0481C94.4855 21.4798 90.7041 17.3018 85.0834 17.3018ZM85.0834 35.2548C81.0602 35.2548 79.5506 31.7643 79.5506 27.0481C79.5506 22.3319 81.0675 18.8863 85.0834 18.8863C89.0993 18.8863 90.6602 22.3394 90.6602 27.0481C90.6602 31.7568 89.1066 35.2548 85.0834 35.2548Z" fill="#0A0806" />
        <path d="M124.573 24.8208C121.366 24.1332 119.229 23.5203 119.229 21.4873C119.229 19.985 120.544 18.8489 122.428 18.8489C127.286 18.8489 127.137 22.6234 130.216 22.6234H130.806C130.806 19.9626 129.887 17.3018 123.048 17.3018C118.585 17.3018 116.06 19.701 116.06 22.6234C116.06 26.4801 119.573 27.4592 123.026 28.2664C126.232 28.954 129.072 29.5669 129.072 31.9661C129.072 34.3653 126.591 35.2548 124.438 35.2548C118.414 35.2548 120.993 29.8135 116.785 29.8135H115.679C115.679 34.1635 118.594 36.8393 124.565 36.8393C128.706 36.8393 132.069 34.5298 132.069 30.8674C132.069 26.8014 128.138 25.7027 124.565 24.8133L124.573 24.8208Z" fill="#0A0806" />
        <path d="M137.84 25.1048H151.039C151.039 20.1046 147.788 17.3018 143.034 17.3018C137.309 17.3018 133.856 21.5247 133.856 27.0481C133.856 32.5715 137.354 36.8393 143.849 36.8393C147.706 36.8393 150.307 34.5223 151.727 31.1514L150.224 30.4638C149.006 33.3488 146.734 35.1352 144.088 35.1352C139.417 35.1352 137.75 31.7643 137.75 27.0481C137.75 26.3978 137.787 25.7476 137.832 25.0973L137.84 25.1048ZM138.041 23.4829C138.572 20.6801 139.947 18.8938 143.079 18.8938C145.56 18.8938 147.429 20.5157 147.429 23.4829H138.041Z" fill="#0A0806" />
        <path d="M186.018 25.1048H199.225C199.225 20.1046 195.974 17.3018 191.22 17.3018C185.495 17.3018 182.042 21.5247 182.042 27.0481C182.042 32.5715 185.532 36.8393 192.035 36.8393C195.892 36.8393 198.493 34.5223 199.913 31.1514L198.41 30.4638C197.192 33.3488 194.912 35.1352 192.274 35.1352C187.603 35.1352 185.936 31.7643 185.936 27.0481C185.936 26.3978 185.973 25.7476 186.018 25.0973V25.1048ZM186.22 23.4829C186.751 20.6801 188.126 18.8938 191.258 18.8938C193.732 18.8938 195.6 20.5157 195.6 23.4829H186.22Z" fill="#0A0806" />
        <path d="M200.458 36.2341H209.517V35.2177C207.32 35.0159 206.796 34.5674 206.796 33.1025V7.18945C206.796 7.18945 206.131 7.18945 205.541 7.18945C205.541 7.18945 201.14 9.97546 200.466 10.3585V11.1732H201.968C202.865 11.1732 203.224 11.5394 203.224 12.5111V33.1099C203.224 34.5749 202.693 35.0158 200.458 35.2251V36.241V36.2341Z" fill="#0A0806" />
        <path d="M166.824 23.7221L172.064 36.2339H174.5L178.058 25.8747C178.835 23.9837 179.882 20.7997 182.827 18.1763V17.9147H175.151C174.471 20.2691 178.477 19.7907 177.423 22.4665L174.216 31.8541L170.195 22.4665C169.216 19.9477 169.179 19.133 172.064 18.9312V17.9147H162.841V18.9312C164.38 19.0508 165.113 19.7459 165.845 21.3678L162.071 31.7644L158.05 22.459C157.078 19.9776 157.078 19.1255 159.956 18.9237V17.9072H150.979V18.9237C152.885 19.1255 153.251 20.0224 154.186 22.459L159.993 36.2339H162.392L166.817 23.7221H166.824Z" fill="#0A0806" />
        <path d="M163.932 17.915H158.409V18.9764H163.932V17.915Z" fill="#0A0806" />
        <path d="M208.942 36.2341H218V35.2177C215.803 35.0159 215.28 34.5674 215.28 33.1025V7.18945C215.28 7.18945 214.614 7.18945 214.024 7.18945C214.024 7.18945 209.624 9.97546 208.949 10.3585V11.1732H210.451C211.348 11.1732 211.707 11.5394 211.707 12.5111V33.1099C211.707 34.5749 211.176 35.0158 208.942 35.2251V36.2416V36.2341Z" fill="#0A0806" />
        <path d="M106.647 17.96V18.969L107.976 19.1884C108.989 19.3928 109.359 19.6182 109.359 20.5898V33.013C107.725 34.0668 106.009 34.7619 104.177 34.7619C102.344 34.7619 101.032 33.7454 101.032 31.3462V17.96H99.8368L94.8593 17.9749V18.9615L96.2961 19.1884C97.1847 19.3285 97.5276 19.4623 97.5276 20.4414V31.3537C97.5276 35.9055 100.834 36.8398 103.187 36.8398C105.335 36.8398 107.805 35.8233 109.359 34.8516C109.778 36.4127 110.486 36.7202 112.255 36.7202H113.673V36.1221C112.873 36.1221 112.871 35.472 112.871 33.1027V17.96H106.654H106.647Z" fill="#0A0806" />
        <rect x="114.683" y="35.9492" width="0.547652" height="0.640488" fill="white" />
    </svg>
);

const CarotSvg: React.FC<{ isOpen?: boolean }> = ({ isOpen }) => (
    <svg 
        width="8" 
        height="14" 
        viewBox="0 0 8 14" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
        }}
    >
        <path d="M1 13L7 7L0.999999 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


type HamburgerProps = {
    onClick: () => void;
}
const LinkText = styled(MintParagraph)<{selected: boolean}>`
    color: ${props => props.selected ? colors.typographyBlack : colors.gray700};
    border-bottom: ${props => props.selected ? `3px solid ${colors.typographyBlack}` : "none"};
    padding:  ${props => props.selected ? "8px 0 5px 0" : "8px 0"};
    
    &:hover {
        color: ${colors.gray900};
    }
`;




const Hamburger: React.FC<HamburgerProps> = ({ onClick }) => (
    <StyledHamburger 
        width="20" 
        height="14" 
        viewBox="0 0 20 14" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <path id="lineTop" d="M1 1H19" stroke="#0E150E" strokeWidth="2" strokeLinecap="square" />
        <path id="lineMiddle" d="M1 7H9" stroke="#0E150E" strokeWidth="2" strokeLinecap="square" />
        <path id="lineBottom" d="M1 13H14" stroke="#0E150E" strokeWidth="2" strokeLinecap="square" />
    </StyledHamburger>
);


function MobileNavOptionsButton() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [areNotifsOpen, setAreNotifsOpen] = useState(false);
    const user = useAppSelector((state) => state.userReducer.user);
    const sellRoutes = ['/dashboard', '/property-admin', 'onboarding/property'];

    const unreadMessages = useAppSelector(selectUnreadMsgNotifications);
    const unreadNonMessages = useAppSelector(selectUnreadNonMsgNotifications);
    const notifs = useAppSelector(selectNonMsgNotifications);
    const unreadNotifs = useAppSelector(selectUnreadNotifications);
    const hasNotifs = unreadNonMessages.length > 0;
    const handleOpenNotifs = () => {
        if (!areNotifsOpen) {
            setAreNotifsOpen(true);
            return;
        }
        setAreNotifsOpen(!areNotifsOpen)
        setTimeout(() => {
            dispatch(readAllNonMessageNotifications());
        }, 4000);
    };
    

    const sellIsSelected = sellRoutes.some(route => router.pathname.includes(route));
    const name = user ? user.firstName && user.lastName ? user.firstName.charAt(0) + user.lastName.charAt(0) : user.id.substring(0,2) : '';
    return (
        <>
            <ParentDiv>
                <Hamburger onClick={() => setIsOpen(!isOpen)} />
                {unreadNotifs && unreadNotifs.length > 0 && <MessageBadge onClick={() => setIsOpen(!isOpen)} selected={unreadNotifs.length > 0} size={"14"} weight={"medium"} style={{position:'absolute', top: '-14px', right: '-13px'}}>{unreadNotifs.length}</MessageBadge>}
            </ParentDiv>

            <Sidebar isOpen={isOpen}>{ user ?
                <div style={{padding: '10px 20px', display: 'flex', justifyContent: 'flex-start', flexDirection:'column'}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', }}>
                        <div style={{display:'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <div style={{height: "44px", width: "44px"}}>
                                <UserIcon user={user} showUserInfo={false} />
                            </div>
                            <MintParagraph size="16" weight="medium" style={{marginLeft: '10px'}}>{user.firstName} {user.lastName}</MintParagraph>
                        </div>
                        <GearIconButton onClick={() => setIsOpen(false)} />       
                    </div>
                    <div onClick={() => handleOpenNotifs()} style={{display:'flex', marginTop:'20px', cursor: 'pointer', justifyContent:'space-between', alignItems:'center', borderRadius: '20px', borderBottomLeftRadius: areNotifsOpen ? '0' : '20px', borderBottomRightRadius: areNotifsOpen ? '0' : '20px', width: '100%', boxSizing: 'border-box', padding:'10px', backgroundColor: hasNotifs ? colors.orange100 : colors.gray100}}>
                            {
                                hasNotifs ?
                                    <Image height={28} width={28} src="/icon_svg/orange_bell.svg" alt="me"/>
                                    : <Image height={28} width={28} src="/icon_svg/grey_bell.svg" alt="me"/>
                            }
                            <MintParagraph size="16" weight="medium" style={{marginLeft: '10px'}}>Notifications</MintParagraph>
                            <div style={{display:'flex', alignItems: 'center'}}>
                                <MessageBadge selected={hasNotifs} size={"14"} weight={"medium"} style={{marginRight:'10px'}}>{unreadNonMessages.length}</MessageBadge>
                                <CarotSvg isOpen={areNotifsOpen} />
                                
                            </div>
                    </div>
                    <div style={{display:'flex', flexDirection: 'column', position: 'relative', justifyContent:'flex-start', alignItems:'center', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', maxHeight: '40vh', overflow:'auto', backgroundColor: hasNotifs ? colors.orange100 : colors.gray100}}>

                        { areNotifsOpen && notifs.map((notif: NotificationModel, index: number) => (
                            <NotificationTile style={{borderBottom: 'none', borderBottomLeftRadius: index === notifs.length - 1 ? '20px' : '0', borderBottomRightRadius: index === notifs.length - 1 ? '20px': '0'}} notif={notif} key={index} 
                            onClick={() => {
                                redirect(notif.id, notif.notifType, notif.objectId, router);
                                setIsOpen(false);
                            }} />
                        )) }
                    </div>
                    <Link href="/dashboard" style={{width:'56px', marginTop:'38px'}} onClick={() => setIsOpen(false)}>
                        <LinkText size={"32"} weight={"medium"} selected={sellIsSelected}>Sell</LinkText>
                    </Link>
                    <Link href="/buy" style={{width:'56px'}} onClick={() => setIsOpen(false)}>
                        <LinkText size={"32"} weight={"medium"}  selected={router.pathname.includes("buy")}>Buy</LinkText>
                    </Link>
                    <Link href="/messages" onClick={() => setIsOpen(false)}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <LinkText size={"32"} weight={"medium"} style={{}} selected={router.pathname.includes("messages")}>Messages</LinkText>
                            <MessageBadge selected={unreadMessages.length > 0} size={"14"} weight={"medium"} >{unreadMessages.length}</MessageBadge>
                        </div>
                    </Link>
                </div> : <><div style={{padding: '10px 20px', display: 'flex', justifyContent: 'flex-start', flexDirection:'column'}}>
                    <IconSvg></IconSvg>
                    <Link href="/signup" style={{width:'180px', marginTop:'35px'}} onClick={() => setIsOpen(false)}>
                        <LinkText size={"32"} weight={"medium"} selected={false}>Sign up</LinkText>
                    </Link>
                    <Link href="/login" style={{width:'56px', marginTop:'12px'}} onClick={() => setIsOpen(false)}>
                        <LinkText size={"32"} weight={"medium"}  selected={false}>Login</LinkText>
                    </Link></div></>}
                <div style={{position:'absolute', bottom:'15px', left:'25px'}}>
                    <MobileIconSvg />
                </div>
            </Sidebar>


            <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} /> 
        </>
    );
}

export default MobileNavOptionsButton;
