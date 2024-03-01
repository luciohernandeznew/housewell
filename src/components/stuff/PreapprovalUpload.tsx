import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { MintParagraph, H4 } from "../Typography/Typography";
import styled from "@emotion/styled";
import SecondaryButton from "../buttons/SecondaryButton";
import BasicParentModal from "../boxes/modals/BasicParentModal";
import { makeAuthedApiRequest } from "../../utils/api/apiHelper";

const StyledDropzone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  height: 100px;
  width: 90%;
  margin: 16px;
`;

interface PreApprovalUploadProps {
    modalOpen: boolean;
    toggleModal: () => void;
    offerId: string;
    handlePreApprovalUploaded: () => void; 
}

const PreApprovalUpload: React.FC<PreApprovalUploadProps> = ({ modalOpen, toggleModal, offerId, handlePreApprovalUploaded }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string>('');

  const handleDrop = (acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      // Handle the first rejection for simplicity. You can expand this as needed.
      const { errors } = fileRejections[0];
      const errorMessages = errors.map((error: { code: string }) => {
        switch (error.code) {
          case 'file-too-large':
            return 'File is too large. Max size is 5MB.';
          case 'file-invalid-type':
            return 'File must be a PDF.';
          default:
            return 'Invalid file.';
        }
      });
      setUploadError(errorMessages.join(' '));
    } else {
      setSelectedFile(acceptedFiles[0]);
      setUploadError(''); // Clear any existing errors
    }
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('pdf', selectedFile, 'pre-approval.pdf'); // This will match the back-end expecting a 'pdf' field
      formData.append('offerId', offerId); 
      try {
        const response = await makeAuthedApiRequest({
          method: "post",
          urlExtension: "/v1/offer/uploadPreapproval", // Change this to your actual API endpoint for PDF upload
          data: formData,
          headers: {'Content-Type': 'multipart/form-data'}
        });
        
        if (response.status !== 200) {
          console.log('HTTP error:', response);
          return;
        }
        console.log('Upload success:', response);
        handlePreApprovalUploaded();
  
        toggleModal();  // Close the modal if upload is successful
      } catch (error) {
        console.log('Upload error:', error);
      }
    }
  };


  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {"application/pdf": []},
    maxSize: 5 * 1024 * 1024, // 5 MB
    multiple: false,
  });
  const files = acceptedFiles.map(file => (
    // @ts-ignore
    <MintParagraph size={"16"} weight={"medium"} key={file.path}>
      {/* @ts-ignore */}
      Current file: {file.path} - {file.size} bytes
    </MintParagraph>
  ));

  // Condition to check if the file is selected, is a PDF, and is less than 5 MB
  const shouldShowUploadButton = selectedFile && selectedFile.type === 'application/pdf' && selectedFile.size <= 5 * 1024 * 1024;

  return (
    <>
    {modalOpen && <BasicParentModal closeModal={toggleModal}>
      <H4>Upload Pre-Approval PDF</H4>
      <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "16px" }}>
        <StyledDropzone {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} accept="application/pdf" />
          {
            acceptedFiles.length > 0 ?
              <>
                {files}<br/>
                <MintParagraph size={"16"} weight="medium">
                  Drag and drop or click to replace file
                </MintParagraph>
              </>
              :
              <MintParagraph size={"16"} weight="medium">
                Drag and drop a PDF here, or click to select file
              </MintParagraph>
          }
                        {uploadError && <MintParagraph size={'16'} weight="medium" style={{ color: 'red' }}>{uploadError}</MintParagraph>}
        </StyledDropzone>
        {shouldShowUploadButton && <SecondaryButton type="submit" size='medium' isLight text={"Upload PDF"} />}
      </form>
      </BasicParentModal>}
    </>
  );
};

export default PreApprovalUpload;
