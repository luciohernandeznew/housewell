import React, {useState} from "react";
import styled from "@emotion/styled";
import SecondaryButton from "../buttons/SecondaryButton";
import PropertyListItem from "./PropertyListItem";
import {PropertyModel} from "../../slices/properties";
import {H4, H6, MintParagraph } from "../Typography/Typography";
import { makeAuthedApiRequest } from "../../utils/api/apiHelper";
import LoadingSpinner from "../stuff/LoadingSpinner";
import {colors} from "../../styles/colors";
import { useAppSelector, useAppDispatch} from "../../store";
import Image from "next/image";
import {useRouter} from "next/router";
import BasicParentModal from "../boxes/modals/BasicParentModal";
import { fetchUserGroups, GroupWithMembersModel } from "../../slices/groups";
import { useDevice } from "../../contexts/DeviceContext";
import he from "he";

import Select from "react-select";
import { customStyles } from "../../constants";
  
  
const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 64px;
`;

const InnerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 64px 0 0 0;
    flex-grow: 2;
`;

const PlaceholderContainer = styled.div`
    border: 1px solid ${colors.gray300};
    padding: 0 24px;
    border-radius: 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const DashboardPropertylist: React.FC<{properties: { [key: string]: PropertyModel }, status: string}> = (props: {properties: { [key: string]: PropertyModel }, status: string}) => {
    const groups = useAppSelector((state) => state.groupsReducer.groups);
    const router = useRouter();
    const { windowSize } = useDevice();
    const isMobile = windowSize.width < 1030;
    const [showCreateModal, setShowCreateModal] = useState(false);
    const dispatch = useAppDispatch();
    const [selectedGroup, setSelectedGroup] = useState<GroupWithMembersModel>();

    const groupOptions = groups.map((group: GroupWithMembersModel) => {
        return {
            value: group.group.id,
            label: `${he.decode(group.group.name)} (${group.members.length} ${group.members.length === 1 ? 'member' : 'members'})`
        }
    });

    const closeModal = () => {
        setShowCreateModal(false)
    }
    const modalCreateProperty = async () => {
        const createResponse = await makeAuthedApiRequest({method: 'post', urlExtension: '/v1/property/create', data: {groupId: selectedGroup?.group.id}});
        router.push(`/onboarding/property/part-1/search-address?propertyId=${createResponse.data.propertyId}`);
        setShowCreateModal(false);
    }
    const createProperty = async () => {
        await dispatch(fetchUserGroups({}));

        if (groups.length === 1) {
            const createResponse = await makeAuthedApiRequest({method: 'post', urlExtension: '/v1/property/create', data: {groupId: groups[0].group.id}});
            router.push(`/onboarding/property/part-1/search-address?propertyId=${createResponse.data.propertyId}`);
        } else {
            setShowCreateModal(true);
        }
    };
    return <Container>
        <InnerContainer style={{marginTop: isMobile ? '24px' : '64px'}}>
            {isMobile ? <H6>Your homes</H6> : <H4>Your homes</H4> }
            {Object.keys(props.properties).length === 0 ?
                <div></div> :
                <SecondaryButton size={isMobile ? 'small' :'medium'} onClick={createProperty} hasArrow isLight text={isMobile ? 'List another' : "Sell another home"} />
            }
        </InnerContainer>
        {props.status === "succeeded"  || props.status === "failed" ?
            Object.keys(props.properties).length === 0 ?
                <>
                <div style={{height:'24px', width:"100%"}}></div>
                <PlaceholderContainer style={{height: isMobile ? '400px' : '460px'}}>
                    <Image src='/home_placeholder.svg' alt="house placeholder image" width={165} height={164} />
                    <MintParagraph size="24" weight={"medium"} style={{textAlign:"center"}}>Sell your house, faster than ever</MintParagraph>
                    <MintParagraph size="16" weight={"medium"} style={{ marginTop: "12px", color: colors.gray800, textAlign:"center" }}>Reach more buyers, with less stress</MintParagraph>
                    <SecondaryButton onClick={createProperty} style={{ width:isMobile ? '205px' : "270px", height: isMobile ? '42px' : "64px", marginTop: "40px" }} size={isMobile ? 'medium' : "large"} hasArrow text={"Get started"} />
                </PlaceholderContainer>
                </>
                :
            Object.keys(props.properties).map(key => {
                const property = props.properties[key];

                return (
                <>
                    <div style={{height:'24px', width:"100%"}}></div>
                    <PropertyListItem
                        key={key}
                        property={property}
                    />
                </>
                )
            }) :
            // todo: better height for loading container?
            <div style={{ border:`1px solid ${colors.gray300}`, borderRadius: "12px", height: "287px" }}>
                <LoadingSpinner />
            </div>
        }
        {
        showCreateModal && <BasicParentModal closeModal={closeModal}>
            <MintParagraph size="32" weight="regular" style={{marginBottom: '24px', color: colors.gray900}}>Which group owns this property?</MintParagraph>
            <Select
                styles={customStyles}
                value={groupOptions.find((group) => selectedGroup?.group && selectedGroup.group.id === group.value)}
                isLoading={groups.length === 0}
                isSearchable={true}
                name="select-group-offer"
                options={groupOptions}
                onChange={(selectedOption) => setSelectedGroup(groups.find((group: GroupWithMembersModel) => group.group.id === selectedOption?.value))}
            />
            <SecondaryButton onClick={modalCreateProperty} style={{ width:isMobile ? '230px' : "270px", height: isMobile ? '58px' : "64px", marginTop: "40px" }} size={isMobile ? 'medium' : "large"} hasArrow text={"Get started"} />
        </BasicParentModal>
        }
    </Container>
}

export default DashboardPropertylist;