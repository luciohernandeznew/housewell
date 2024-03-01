import React from "react";
import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";
import {colors} from "../../styles/colors";

const Container = styled.div`
    background-color: #fff;
    position: relative;
    width: 100px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    border-radius: 0.5rem;
`;

const rotate = keyframes`
  from {
    transform: rotate(-30deg);
  }
  to {
    transform: rotate(330deg);
  }
`;

const UpperCircle = styled.circle`
    animation: ${rotate};
    animation-duration: 3s;
    animation-timing-function: cubic-bezier(0.7, 0, 0.3, 1.0);
    animation-iteration-count: infinite;
    transform-origin: center;
`

const Spinner = (props: {style?: React.CSSProperties}) => {
    return (
        <Container style={props.style}>
            <svg width="100%"  viewBox="0 0 276 276" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <g>
                    <circle
                        id="bottom"
                        cx="138"
                        cy="138"
                        r="114"
                        stroke={colors.gray300}
                        strokeWidth="18" />
                    <UpperCircle
                        id="upper"
                        cx="138"
                        cy="138"
                        r="115"
                        stroke={colors.orange1000}
                        strokeWidth="30"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="373 100" />
                </g>
            </svg>
        </Container>
    )
}

export default Spinner;