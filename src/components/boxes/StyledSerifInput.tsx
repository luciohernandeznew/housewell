import styled from "@emotion/styled";
import { colors } from "../../styles/colors";
import { Austin } from "../Typography/Typography";

const StyledInput = styled.input`
    font-size: 20px; // Adjust this value based on your H5 component style
    font-weight: normal;
    background-color: transparent;
    border: 1px solid ${colors.gray300};
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 32px;
    line-height: 115%;
    font-family: ${Austin};
    font-weight: 300;
    letter-spacing: -0.015em;
    width: auto; // this makes the input size responsive
    min-width: 50px; // use this to ensure the input doesn't get too small
    max-width: 300px; // use this to ensure the input doesn't get too big
`;
type StyledSerifInputProps = {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    autoComplete?: string;
    placeholder?: string;
    id?: string;
    style?: React.CSSProperties;
}

function StyledSerifInputComponent({ placeholder, autoComplete, onChange, value, id, style }: StyledSerifInputProps) {
    return (
        <StyledInput
            id={id}
            type="text"
            placeholder={placeholder}
            autoComplete={autoComplete}
            size={value.length *.75}
            onChange={(event) => onChange(event)}
            value={value}
            style={style}
        />
    )
}
export default StyledSerifInputComponent;