import React, { useEffect, useState } from 'react';
import { H2, H4 } from '../../Typography/Typography';
import  StyledInput  from '../../boxes/StyledInput';
import OnboardingScreenFrame from '../../stuff/OnboardingScreenFrame';
import { useRouter } from 'next/router';
import { makeAuthedApiRequest } from '../../../utils/api/apiHelper';
import { useDevice } from "../../../contexts/DeviceContext";
import {useAppDispatch, useAppSelector} from "../../../store";
import {fetchUser} from "../../../slices/user";
import { formatPhoneNumber } from '../../../utils/helpers';
import SelectDropdown from '../../select/SelectDropdown';
import StyledDatetimeMultiInput from '../../boxes/StyledDatetimeMultiInput';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
import styled from '@emotion/styled';
import { colors } from '../../../styles/colors';


const DateStyledInputLabel = styled.label`
    display: block;
    font-size: 16px;
    color: ${colors.darkgreen1000};
    margin-bottom: 8px;
`;


export const DateStyledInput = styled.input<{ isSmall?: boolean }>`
    height: 64px;
    font-size: ${props => props.isSmall ? '16px' : '24px'};
    line-height: ${props => props.isSmall ? '18px' : '24px'};
    font-family: Mint Grotesk Medium;
    border: 1px solid ${colors.gray300};
    border-radius: 8px;
    padding: 0 16px;
    width: 100%;

    &:focus {
        outline: none;
        border: 2px solid ${colors.darkgreen1000};
        padding: 0 16px;
        box-sizing: border-box;
        border-radius: 8px;
    }
    
    ::placeholder {
        color: ${colors.gray700};
    }
    &:disabled {
        background-color: ${colors.gray100};
        color: ${colors.gray700};
    }
`;
const cleanPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/-/g, '');
};
const US_STATES = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];


const UserDetailsPage = () => {
    const router = useRouter();
    const currentDate = dayjs();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [addressLine1, setAddressLine1] = useState();
    const [stateOption, setStateOption] = useState<string>("GA");
    const [city, setCity] = useState();
    const [dob, setDob] = useState<string>();
    const [license, setLicense] = useState();
    const [isRightEnabled, setIsRightEnabled] = useState(!!lastName && !!firstName && !!phoneNumber);
    const { isMobile } = useDevice();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedNumber = formatPhoneNumber(e.target.value);
        setPhoneNumber(formattedNumber);
        updateEnabled(firstName, lastName, formattedNumber, addressLine1, city);
    };
    const onChangeDropdown = (option: string) => {
        setStateOption(option);
    };

    const user = useAppSelector((state) => state.userReducer.user);
    function updateEnabled(firstName?: string, lastName?:string, phoneNumber?:string, addressLine1?:string, city?:string) {
        setIsRightEnabled(!!lastName && !!firstName && !!phoneNumber && !!addressLine1 && !!city);
    }
    const handleNextSubmit = async () => {
        try {

            const cleanedPhone = cleanPhoneNumber(phoneNumber);

            if (cleanedPhone.length !== 10) {
                return;
            }
            const data = {
                firstName,
                lastName,
                phoneNumber: cleanedPhone,
                addressLine1,
                city,
                state: stateOption,
                dob,
                license,
            }
            await makeAuthedApiRequest({method: 'post', urlExtension: '/v1/user/updateUserDetails', data});
            router.push('/onboarding/user/collaborate');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <OnboardingScreenFrame prevStep={user?.userType === 'agent' ? '/onboarding/user/individual-or-business' : '/onboarding/user/buy-or-sell'} nextOnClick={handleNextSubmit} disabledRight={!isRightEnabled}>
                {!isMobile ? <H2 style={{maxWidth:"585px", width:"100%"}}>Please enter your details</H2>
                : <H4>Please enter your details</H4>}
                <div style={{maxWidth:"720px", marginTop:"32px", display:"flex", flexDirection:"row"}}>
                    <StyledInput
                        style={{width:"100%"}}
                        placeholder="First Name"
                        autoComplete="given-name"
                        onChange={(e) => {
                            setFirstName(e.target.value);
                            updateEnabled(e.target.value, lastName, phoneNumber, addressLine1, city); 
                        }}
                        value={firstName}
                    />
                    <div style={{width:"12px"}}/>
                    <StyledInput
                        style={{width:"100%"}}
                        placeholder="Last Name"
                        autoComplete="family-name"
                        onChange={(e) => {
                            setLastName(e.target.value); 
                            updateEnabled(firstName, e.target.value, phoneNumber, addressLine1, city); 
                        }}
                        value={lastName}
                    />
                </div>
                <StyledInput
                        style={{marginTop: '12px', width:"100%"}}
                        placeholder="Current Address"
                        autoComplete="address-line1"
                        onChange={(e) => {
                            setAddressLine1(e.target.value);
                            updateEnabled(firstName, lastName, phoneNumber, e.target.value, city); 
                        }}
                        value={addressLine1}
                    />
                <div style={{maxWidth:"720px", marginTop:"12px", display:"flex", flexDirection:"row"}}>
                <StyledInput
                        style={{}}
                        placeholder="City"
                        autoComplete="address-level2"
                        onChange={(e) => {
                            setCity(e.target.value); 
                            updateEnabled(firstName, lastName, phoneNumber, addressLine1, e.target.value); 
                        }}
                        value={city}
                    />

                <SelectDropdown defaultString={stateOption} style={{marginLeft: '8px'}} >
                        {US_STATES.map((state, index) => (
                            <div
                                key={index}
                                onClick={() => onChangeDropdown(state)}
                                className={`dropdown-item ${index === 0 ? 'rounded-t-lg' : ''} ${index === US_STATES.length - 1 ? 'rounded-b-lg' : ''} hover:bg-[#ddd] block px-4 py-3`}
                            >
                                {state}
                            </div>
                        ))}
                    </SelectDropdown>

                        
                </div>
                <div style={{marginTop: '12px'}}>
                <DateStyledInputLabel htmlFor="dateOfBirth">Date of Birth</DateStyledInputLabel>
                <DateStyledInput
                    id="dateOfBirth"
                    type="date"
                    max={currentDate.format('YYYY-MM-DD')}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                />
                </div>
                <StyledInput
                        style={{width:"100%", marginTop:"12px"}}
                        placeholder="Phone Number"
                        autoComplete="tel"
                        onChange={handlePhoneNumberChange}
                        value={phoneNumber}
                />
                {user?.userType === 'agent' && <StyledInput
                        style={{width:"100%", marginTop:"12px"}}
                        placeholder="License Number"
                        onChange={(e) => {
                            setLicense(e.target.value); 
                        }}
                        value={license}
                />}
        </OnboardingScreenFrame>
    )
}
export default UserDetailsPage;