import React from "react";
import styled from "@emotion/styled";
import { useDevice } from "../../../contexts/DeviceContext";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    height: 100vh;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.6);
    overflow-y: auto;
    z-index: 1000;
`;

const ModalBox = styled.div<{ isMobile?: boolean }>`
    position: relative;
    background: white;
    border-radius: 20px;
    padding: ${({ isMobile }) => isMobile ? '8px' : '32px'};
    overflow-y: auto;
    width: ${({ isMobile }) => isMobile ? '93%' : '80%'};
    max-width: 579px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
    margin: auto; // This helps with the centering
    margin-top: 5vh;
    margin-bottom: ${({ isMobile }) => isMobile ? '12vh' : '5vh'};
    z-index: 1001;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 8px;  /* Provides a larger clickable area */
    
    svg {
        width: 24px;
        height: 24px;
        fill: #000; /* This is the color of the X. Adjust as needed */
        transition: transform 0.2s ease;
    }

    &:hover svg {
        transform: scale(1.1);  /* Slightly enlarge on hover */
    }

    &:active svg {
        transform: scale(1.2);   /* Slight downshift when active */
    }
`;

type ModalProps = {
    closeModal: () => void;
    children: React.ReactNode;
    nonClosable?: boolean; // New prop
}

const BasicParentModal: React.FC<ModalProps> = ({ closeModal, children, nonClosable = false }) => {
    const { isMobile } = useDevice();
    return (
        <Overlay onClick={nonClosable ? undefined : closeModal}>
            <ModalBox onClick={(e) => e.stopPropagation()} isMobile={isMobile}>
                {!nonClosable && <CloseButton onClick={closeModal}>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                            <path d="M12 10.586l4.293-4.293 1.414 1.414-4.293 4.293 4.293 4.293-1.414 1.414-4.293-4.293-4.293 4.293-1.414-1.414 4.293-4.293-4.293-4.293 1.414-1.414 4.293 4.293z"/>
                        </svg>
                    </CloseButton>
                }
                {children}
            </ModalBox>
        </Overlay>
    );
};

export default BasicParentModal;
