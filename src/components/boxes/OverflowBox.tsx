import React,  {useState, useEffect, useRef} from "react";
import styled from "@emotion/styled";
import { MintParagraph } from "../Typography/Typography";
import { colors } from "../../styles/colors";
import Image from "next/image";

export type OverflowBoxProps = {
    text: string;
    onClick?: (event?: any) => void;
    style?: React.CSSProperties;
}

const StyledOverflowBox = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 1px solid ${colors.gray400};
  height: 60px;
  padding-left: 6px;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  padding: 6px;
  flex: 0 0 auto;

  &:hover {
    border-radius: 4px;
    background: ${colors.gray100};
  }
`;

const StyledText = styled(MintParagraph)<{ isExpanded: boolean }>`
  color: ${colors.gray700};
  flex: 1 1 auto;
  line-height: 1.2;
  overflow: ${props => props.isExpanded ? 'visible' : 'hidden'};
  text-overflow: ${props => props.isExpanded ? 'clip' : 'ellipsis'};
`;

function OverflowBox({text, onClick, style}: OverflowBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const boxRef = useRef(null);

  const handleDoubleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsExpanded(true);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !(boxRef.current as any).contains(event.target)) {
        setIsExpanded(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, []);
  const copyToClipBoardHandleClick = () => {
    navigator.clipboard.writeText(text);
  }

  return (
    <StyledOverflowBox ref={boxRef} onDoubleClick={handleDoubleClick} onClick={onClick} style={style}>
      <StyledText isExpanded={isExpanded} weight="regular" size="20">{text}</StyledText>
      <Button style={{marginLeft:'8px', marginRight:'20px'}} onClick={copyToClipBoardHandleClick}>
        <Image src={"/icon_svg/copy_clipboard.svg"} width={24} height={24} alt="Icon"/>
      </Button>
    </StyledOverflowBox>
  )
}

export default OverflowBox;
