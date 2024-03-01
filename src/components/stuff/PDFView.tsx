import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ file, currentPage }) => {
    const [numPages, setNumPages] = useState(0);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
  
    // Ensure currentPage is within the valid range
    const validCurrentPage = currentPage >= 1 && currentPage <= numPages ? currentPage : 1;
    console.log('validCurrentPage', validCurrentPage);
  
    return (
      <div>
        <Document
          
          file={file}
          onLoadSuccess={onDocumentLoadSuccess} 
          onLoadError={(e) => console.log('Error while loading document! ' + e.message)}
        >
          <Page
            pageNumber={validCurrentPage}
          />
        </Document>
      </div>
    );
  };
  
  export default PdfViewer;
