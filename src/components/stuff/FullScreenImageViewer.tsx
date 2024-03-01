import React, { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "../../styles/colors";
import SecondaryButton from "../buttons/SecondaryButton";
import { useDevice } from "../../contexts/DeviceContext";
import { PropertyModel } from "../../slices/properties";
const FullScreenModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1.0);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageViewer = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageViewerImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Button = styled.button`
  margin: 10px;
`;

type FullScreenImageViewerProps = {
  isOpen: boolean;
  images: string[];
  onClose: () => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 15%;
  box-sizing: border-box;
  display: flex;
  z-index: 1000;
  justify-content: space-between;
  align-items: center;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2em;
  cursor: pointer;
  color: white;
`;
export const generateImageUrls = (property: PropertyModel) => {
  const baseUrl = "https://dyqpd3w9nj7ap.cloudfront.net/property-photos/";
  const imageUrls: string[] = [];

  if (property.imageCount) {
      for (let i = 1; i <= property.imageCount; i++) {
          const imageUrl = `${baseUrl}${property.id}/${i}.jpg`;
          imageUrls.push(imageUrl);
      }
  }

  return imageUrls;
}



const FullScreenImageViewer: React.FC<FullScreenImageViewerProps> = ({ isOpen, images, onClose, currentIndex, setCurrentIndex }) => {
    const { isMobile } = useDevice();
  
    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onClose();
    };
  
    const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
    };
  
    if (!isOpen) {
      return null;
    }
  
    return (
      <FullScreenModal onClick={handleClose}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ImageViewer onClick={handleImageClick}>
          <ImageViewerImage src={images[currentIndex]} alt={`view ${currentIndex}`} />
        </ImageViewer>
        <ButtonContainer onClick={handleImageClick}>
          <SecondaryButton size={isMobile ? 'small' : 'medium'} reverseArrow hasArrow isLight text='Previous' style={{marginBottom:'40px'}} onClick={(e) => { e.stopPropagation(); setCurrentIndex((currentIndex - 1 + images.length) % images.length); }}></SecondaryButton>
          <SecondaryButton size={isMobile ? 'small' : 'medium'} hasArrow isLight text='Next' style={{marginBottom:'40px'}} onClick={(e) => { e.stopPropagation(); setCurrentIndex((currentIndex + 1) % images.length); console.log(currentIndex);}}></SecondaryButton>
        </ButtonContainer>
      </FullScreenModal>
    );
  }

export default FullScreenImageViewer