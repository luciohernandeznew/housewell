import React from "react";
import SwitchButton from "../buttons/SwitchButton";
import { MintParagraph } from "../Typography/Typography";
import styled from "@emotion/styled";
import { updateUserSettings } from "../../slices/userSettings";
import LoadingSpinner from "../stuff/LoadingSpinner";
import { useAppDispatch, useAppSelector } from "../../store";
import { useDevice } from "../../contexts/DeviceContext";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const GridContainer = styled.div<{ mobile?: boolean }>`
    display: grid;
    grid-template-columns: ${props => props.mobile ? '1fr' : 'repeat(3, 1fr)'}; 
    row-gap: 24px;
    column-gap: 16px;
`;


const StyledSwitchContainer = styled.div`
    display: flex;
    align-items: center;
`;

const SwitchContainer = ({ label, checked, setChecked }: { label: string, checked: boolean, setChecked: () => void }) => {
    return (
        <StyledSwitchContainer>
            <SwitchButton checked={checked} setChecked={setChecked} />
            <MintParagraph size={"16"} weight={"regular"} style={{ marginLeft: "8px" }}>{label}</MintParagraph>
        </StyledSwitchContainer>
    );
}

const NotificationSettings: React.FC = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.userSettingsReducer.settings);
    const { isMobile } = useDevice();

    return (
        <Container>
            {settings ? (
                <GridContainer mobile={isMobile}>
                    <SwitchContainer label={"New Messages"} checked={settings.notifMessageEmail} setChecked={() => dispatch(updateUserSettings({ key: "notifMessageEmail", value: !settings.notifMessageEmail }))} />
                    <SwitchContainer label={"Offer Status Updates"} checked={settings.notifOfferUpdateEmail} setChecked={() => dispatch(updateUserSettings({ key: "notifOfferUpdateEmail", value: !settings.notifOfferUpdateEmail }))} />
                    <SwitchContainer label={"New Showings"} checked={settings.notifShowingEmail} setChecked={() => dispatch(updateUserSettings({ key: "notifShowingEmail", value: !settings.notifShowingEmail }))} />
                    <SwitchContainer label={"Showing Reminders"} checked={settings.notifShowingReminderEmail} setChecked={() => dispatch(updateUserSettings({ key: "notifShowingReminderEmail", value: !settings.notifShowingReminderEmail }))} />
                    <SwitchContainer label={"New Offers"} checked={settings.notifOfferEmail} setChecked={() => dispatch(updateUserSettings({ key: "notifOfferEmail", value: !settings.notifOfferEmail }))} />
                </GridContainer>
            ) : (
                <LoadingSpinner />
            )}
        </Container>
    );
}

export default NotificationSettings;
