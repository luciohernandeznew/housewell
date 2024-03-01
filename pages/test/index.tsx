import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import Draggable from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';
const PDFViewer = dynamic(() => import('../../src/components/stuff/PDFView'), { ssr: false });

const OverallPadding = styled.div`
  position: absolute;
  height: 800px;
`;

const InnerBorder = styled.div`
  border-bottom: 1px solid #000;
  height: 100%;
`;

const Box = styled.div<{ isCheckbox: boolean; width: number, fontSize: number }>` // Add width here
  position: absolute;
  width: ${({ width }) => `${width}px`}; // Use width prop
  height: ${({ fontSize }) => `${fontSize}px`};
  background-color: rgba(0, 0, 255, 0.5);
  cursor: move;
`;

const Sidebar = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: -2px 0 4px rgba(0,0,0,0.1);
  overflow-y: auto;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

interface BoxProps {
  name: string;
  fontSize: number;
  isCheckbox: boolean;
  position: { x: number, y: number };
  pdfPosition: { x: number, y: number };
  width: number;
  shouldWrap: boolean;
  shouldCenter: boolean;
  indent?: number;
}

interface BoxesByPage {
  [page: number]: { [boxId: string]: BoxProps };
}

const Test = () => {
  const [boxesByPage, setBoxesByPage] = useState<BoxesByPage>({});
  useEffect(() => {
    // Load the JSON data from the public folder
    fetch('/currentDoc.json')
      .then(response => response.json())
      .then(data => {
        setBoxesByPage(data);
      })
      .catch(error => console.error("Failed to load boxes data:", error));
  }, []);
  const [currentPage, setCurrentPage] = useState(1);


  const handleDrag = (boxId: string, e: any, ui: any) => {
    setBoxesByPage(prevState => {
      const pageBoxes = prevState[currentPage] || {};
      const box = pageBoxes[boxId];
      if (box) {
        const newPosition = {
          x: box.position.x + ui.deltaX,
          y: box.position.y + ui.deltaY,
        };
  
        const newPdfPosition = {
          x: newPosition.x, // x remains unchanged
          y: -(newPosition.y + box.fontSize), // Apply the specified transformation for y
        };
  
        const updatedBox = {
          ...box,
          position: newPosition,
          pdfPosition: newPdfPosition,
        };
  
        return {
          ...prevState,
          [currentPage]: {
            ...pageBoxes,
            [boxId]: updatedBox,
          },
        };
      }
      return prevState;
    });
  };
  const addBox = () => {
    const newBoxId = uuidv4();
    const initialPosition = { x: 0, y: 0 };
  
    const newBox: BoxProps = {
      name: 'New Box',
      fontSize: 10,
      isCheckbox: false,
      position: initialPosition,
      pdfPosition: { ...initialPosition, y: -(initialPosition.y + 10) },
      width: 100, // Default width
      shouldWrap: false,
      shouldCenter: true,
    };
  
    setBoxesByPage(prevState => ({
      ...prevState,
      [currentPage]: {
        ...prevState[currentPage],
        [newBoxId]: newBox,
      },
    }));
  };
  const updateBox = (boxId: string, updates: Partial<BoxProps>) => {
    setBoxesByPage(prevState => {
      const pageBoxes = prevState[currentPage] || {};
      const existingBox = pageBoxes[boxId];
      const updatedBox = { ...existingBox, ...updates };
      return {
        ...prevState,
        [currentPage]: {
          ...pageBoxes,
          [boxId]: updatedBox,
        },
      };
    });
  };
  const toggleCheckbox = (boxId: string) => {
    setBoxesByPage(prevState => {
      const pageBoxes = { ...prevState[currentPage] };
      const box = pageBoxes[boxId];
      
      // Toggle isCheckbox and adjust width accordingly
      const isCheckboxToggled = !box.isCheckbox;
      const updatedWidth = isCheckboxToggled ? 10 : 100; // Set width to 10 if checkbox, else default to 100
  
      const updatedBox = {
        ...box,
        isCheckbox: isCheckboxToggled,
        width: updatedWidth, // Update width based on isCheckbox state
      };
  
      return {
        ...prevState,
        [currentPage]: {
          ...pageBoxes,
          [boxId]: updatedBox,
        },
      };
    });
  };
  
  const deleteBox = (boxId: string) => {
    setBoxesByPage(prevState => {
      const pageBoxes = { ...prevState[currentPage] };
      delete pageBoxes[boxId];
      return {
        ...prevState,
        [currentPage]: pageBoxes,
      };
    });
  };



  const nextPage = () => {
    if (currentPage < 10) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const exportToJson = () => {
    const dataStr = JSON.stringify(boxesByPage, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileName = 'boxesByPage.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  };

  

  return (
    <OverallPadding>
        <PDFViewer file="SELLER_DISCLOSURE.pdf" currentPage={currentPage}/>
      {Object.entries(boxesByPage[currentPage] || {}).map(([boxId, box]) => (
        <Draggable
          key={boxId}

          onDrag={(e, ui) => handleDrag(boxId, e, ui)}
          position={{ x: box.position.x, y: box.position.y }}
        >
          <Box
            isCheckbox={box.isCheckbox}
            width={box.width} // Pass width here
            style={{ fontSize: `${box.fontSize}px` }}
            fontSize={box.fontSize}
          >
            {!box.isCheckbox && box.name}
          </Box>
        </Draggable>
      ))}
      <Sidebar>
        {/* Adding Prev and Next buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Button onClick={prevPage}>Prev</Button>
          <Button onClick={nextPage}>Next</Button>
        </div>
        {Object.entries(boxesByPage[currentPage] || {}).map(([boxId, box]) => (
          <div key={boxId}>
            <input
              type="text"
              value={box.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateBox(boxId, { name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="number"
              value={box.fontSize}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateBox(boxId, { fontSize: parseInt(e.target.value, 10) })}
              placeholder="Font Size"
            />
                <input
              type="number"
              value={box.width}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateBox(boxId, { width: parseInt(e.target.value, 10) || 100 })} // Ensure there's a fallback width
              placeholder="Width"
            />
            <input
                type="number"
                value={box.indent || 0} // Use 0 as default if indent is undefined
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateBox(boxId, { indent: parseInt(e.target.value, 10) || 0 })} // Ensure there's a fallback value
                placeholder="Indent"
              />
              <div>
                <label>
                  Wrap Content:
                  <input
                    type="checkbox"
                    checked={box.shouldWrap}
                    onChange={(e) => updateBox(boxId, { shouldWrap: e.target.checked })}
                  />
                </label>
              </div>
              <div>
                <label>
                  Center Content:
                  <input
                    type="checkbox"
                    checked={box.shouldCenter}
                    onChange={(e) => updateBox(boxId, { shouldCenter: e.target.checked })}
                  />
                </label>
              </div>
                        <Button onClick={() => toggleCheckbox(boxId)}>
              {box.isCheckbox ? 'Make Regular Box' : 'Make Checkbox'}
            </Button>
                        <Button onClick={() => deleteBox(boxId)}>Delete</Button>
            <div style={{height: '10px'}}></div>
          </div>
        ))}
        <Button onClick={addBox}>Add Box</Button>
        <Button onClick={exportToJson}>Export as JSON</Button>
        </Sidebar>
    </OverallPadding>
  );
};

export default Test;
