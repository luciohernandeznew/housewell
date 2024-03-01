import React, { useEffect, useState } from 'react';
import PropertyDetails from "../../src/components/property-listing/PropertyDetails";
import {GetServerSidePropsContext} from "next";
import {PropertyModel} from "../../src/slices/properties";
import PropertyOverviewCard from "../../src/components/property-listing/PropertyOverviewCard";
import SecondaryButton from "../../src/components/buttons/SecondaryButton";
import {makeAuthedApiRequest} from "../../src/utils/api/apiHelper";
import styled from "@emotion/styled";
import {useRouter} from "next/router";
import FullScreenImageViewer, { generateImageUrls } from '../../src/components/stuff/FullScreenImageViewer';
import { useDevice } from '../../src/contexts/DeviceContext';
import { useAppDispatch, useAppSelector } from '../../src/store';
import BasicParentModal from '../../src/components/boxes/modals/BasicParentModal';
import { H4, H6 } from '../../src/components/Typography/Typography';
import { colors } from '../../src/styles/colors';
import { deleteLikedProperty, fetchLikedProperties, likeProperty } from '../../src/slices/likedProperties';
import Footer from '../../src/components/reactPages/landingpage/how_works/Footer';

const Container = styled.div<{isMobile?: boolean}>`
    margin: ${props => props.isMobile ? '24px 30px' : '24px 20%'};
`;

const Body = styled.div<{isMobile?: boolean}>`
    display: flex;
    flex-direction: ${props => props.isMobile ? 'column-reverse' : 'row'};
`;
const LineDiv = styled.div`
    width: 100%;
    height: 2px;
    background-color: ${colors.gray400};
    flex: 1;
`;

export type PropertyListingPageProps = {
    property: PropertyModel
}

const ParentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    border-radius: 16px;
`;

const HorizantalParentDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const ImageContainer = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    padding-top: calc(2 / 3 * 100%);
    position: relative;

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
const ImageContainerWide = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    padding-top: calc(2 / 3 * 100%);

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;



const PropertyListingPage = (props: PropertyListingPageProps) => {
    const { property } = props;
    const { isMobile } = useDevice();
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
    const [shouldShowLoginModal, setShouldShowLoginModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();
    const imageUrls = generateImageUrls(property);
    const user = useAppSelector((state) => state.userReducer.user);
    const closeModal = () => {
        setShouldShowLoginModal(false)
    }
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchLikedProperties({}));
    }, [dispatch]);
    const likedProperties = useAppSelector((state) => state.likedPropertiesReducer.likedProperties);
    const isPropertyLiked = likedProperties.some(likedProperty => likedProperty.propertyId === property.id);
    return property ? <><Container isMobile={isMobile}>
        <div style={{ display: "flex", width: "100%", height: "fit-content" }}>
            <div style={{ flex: 1, flexBasis: "65%", flexGrow: 2, position: "relative", marginRight: "32px" }} >
                <ImageContainer>
                    <img src={imageUrls[currentIndex]} alt="Example" />
                    <SecondaryButton style={{position: 'absolute', bottom: '10px', right:'10px'}} onClick={() => {
                        if(property.imageCount) {
                            setIsImageViewerOpen(true);
                        }
                    }} size={isMobile ? 'small' : 'medium'} isLight text='View Photos'></SecondaryButton>
                </ImageContainer>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, flexBasis: "30%", flexGrow: 2 }} >
                <ImageContainerWide>
                    <img src={imageUrls[(currentIndex + 1) % imageUrls.length]} alt="Example" />
                </ImageContainerWide>
                <ImageContainerWide>
                    <img src={imageUrls[(currentIndex + 2) % imageUrls.length]} alt="Example" />
                </ImageContainerWide>
            </div>
        </div>
        <Body isMobile={isMobile}>
            <PropertyDetails property={property} style={{ flex: 1, flexBasis: "65%", marginRight: "32px" }} />
            <div style={{ flex: 1, flexBasis: "30%", marginTop: "24px", width: '100%' }}>
                <PropertyOverviewCard property={property} style={{ marginBottom: "24px" }} />
                <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
                    {isPropertyLiked ?
                    <SecondaryButton
                    size={isMobile ? 'medium' : 'large'}
                    style={{ marginBottom: isMobile ? '12px' : "24px" }}
                    text={"Remove From Favorites"}
                    onClick={() => { 
                        if (!user) {
                            setShouldShowLoginModal(true);
                            return;
                        }
                        dispatch(deleteLikedProperty(property.id));
                    }}
                />
                : <SecondaryButton
                        size={isMobile ? 'medium' : 'large'}
                        style={{ marginBottom: isMobile ? '12px' : "24px" }}
                        text={"Add to Favorites"}
                        onClick={() => { 
                            if (!user) {
                                setShouldShowLoginModal(true);
                                return;
                            }
                            dispatch(likeProperty(property.id));
                        }}
                    />}
                    <SecondaryButton
                        size={isMobile ? 'medium' : 'large'}
                        style={{ marginBottom: isMobile ? '12px' : "24px" }}
                        text={"Message Seller"}
                        onClick={() => { 
                            if (!user) {
                                setShouldShowLoginModal(true);
                                return;
                            }
                            router.push({ pathname: '/messages', query: { groupId: property.groupId }})
                        }}
                    />
                    <SecondaryButton
                        size={isMobile ? 'medium' : 'large'}
                        style={{ marginBottom: isMobile ? '12px' : "24px" }}
                        text={"Schedule Tour"}
                        onClick={() => {
                            if (!user) {
                                setShouldShowLoginModal(true);
                                return;
                            }
                            router.push({ pathname: '/schedule-event', query: { propertyId: property.id }})}}
                    />
                    <SecondaryButton
                        size={isMobile ? 'medium' : 'large'}
                        
                        text={"Make Offer"}
                        onClick={() => {
                            if (!user) {
                                setShouldShowLoginModal(true);
                                return;
                            }
                            router.push({ pathname: '/make-offer', query: { propertyId: property.id }})
                        }}
                    />
                </div>
            </div>
        </Body>
        {shouldShowLoginModal && <BasicParentModal closeModal={closeModal}>
                <H4 style={{color:colors.gray900}}>Sign up or login to continue</H4>
                <SecondaryButton size='medium' onClick={() => {router.push('/login')}} style={{width:"100%", marginTop: '88px'}} isLight text="Login" />
                <HorizantalParentDiv style={{marginTop:"32px", width: '100%', boxSizing: 'border-box'}}><LineDiv/><H6 style={{marginLeft:"16px", marginRight:"16px", fontSize:"18px", flex:"0", lineHeight:"28px"}}>or</H6><LineDiv/></HorizantalParentDiv>
                <SecondaryButton size='medium' onClick={() => {router.push('/signup')}} style={{width:"100%", marginTop: '32px'}} text="Sign up" />
            </BasicParentModal>}
        <FullScreenImageViewer
            isOpen={isImageViewerOpen}
            images={imageUrls}
            onClose={() => setIsImageViewerOpen(false)}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
        />

    </Container>
            <Footer removeUpperFooter></Footer></> :
        // todo: better blank page or 404/redirect
        <div style={{ textAlign: "center", marginTop: "200px" }}>
            <h1>No property selected. Please select a property to view!</h1>
        </div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const { req, res } = context;
        const { propertyId } = context.query;
        if (!propertyId) return {props: {}};

        const response = await makeAuthedApiRequest({
            method: 'post',
            urlExtension: `/v1/properties/public/propertyInfo`,
            data: {propertyId},
            isServer: true,
            req,
            res
        });

        return { props: { property: response.data.property as PropertyModel } }
    } catch(error) {
        console.log("ERROR", error);
        return { props: {} }
    }
}

export default PropertyListingPage;