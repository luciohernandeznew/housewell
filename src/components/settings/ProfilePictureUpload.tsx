import React, {ChangeEvent, useRef, useState, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {H4, MintParagraph} from "../Typography/Typography";
import LoadingSpinner from "../stuff/LoadingSpinner";
import {colors} from "../../styles/colors";
import styled from "@emotion/styled";
import Image from 'next/image';
import BasicParentModal from "../boxes/modals/BasicParentModal";
import AvatarEditor from "react-avatar-editor";
import {useDropzone} from "react-dropzone";
import {makeAuthedApiRequest} from "../../utils/api/apiHelper";
import SecondaryButton from "../buttons/SecondaryButton";
import {fetchUser} from "../../slices/user";

const PictureContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    width: 103px;
    height: 103px;
    border-radius: 120px;
    background-color: ${colors.orange200};
    margin-right: 16px;
    
    &:hover {
        width: 97px;
        height: 97px;
        background-color: ${colors.orange400};
        border: 3px solid ${colors.orange1000};
        
        & > img {
            height: 97px;
        }
        
        & > div {
            opacity: 1;
            background: rgba(224, 101, 13, 0.2);
        }
    }
`;

const PictureOverlay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 120px;
    opacity: 0;
`;

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

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> { // chatgpt function to convert canvas -> blob
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Canvas to Blob conversion failed'));
            }
        });
    });
}
type ProfilePictureUploadProps = {
    isMobile?: boolean;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({isMobile}) => {
    const user = useAppSelector((state) => state.userReducer.user);
    const dispatch = useAppDispatch();
    const url = user?.profilePictureUrl;
    const [modalOpen, setModalOpen] = useState(false);
    const editor = useRef<AvatarEditor>(null);

    const [selectedFile, setSelectedFile] = useState();
    const [scale, setScale] = useState(1);
    const [isEditorReady, setIsEditorReady] = useState(false);

    useEffect(() => {
        if (editor.current) {
            setIsEditorReady(true);
        }
    }, [selectedFile]);

    const handleDrop = (dropped: any[]) => {
        setSelectedFile(dropped[0])
    }

    const handleScale = (e: ChangeEvent<HTMLInputElement>) => {
        const newScale = parseFloat(e.target.value)
        setScale(newScale);
    }

    const handleFormSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (!editor.current) return console.error("Editor ref is null");
        const canvas = editor.current.getImage() as HTMLCanvasElement;
        const blob = await canvasToBlob(canvas);

        const formData = new FormData();
        formData.append('picture', blob, 'pfp.png');

        try {
            const response = await makeAuthedApiRequest({
                method: "post",
                urlExtension: "/v1/user/uploadPicture",
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            })

            if (response.status !== 200) {
                console.log('http error:', response);
                return; // todo: display/handle error message
            }

            dispatch(fetchUser());  // todo: update profile picture in user slice instead of fetching again
            setModalOpen(false);

            // todo: invalidation can be slower than this takes to execute, investigate solutions
        } catch (error) {
            console.log('upload error:', error);
        }
    };

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        onDrop: handleDrop,
        accept: {"image/*": []}, //todo: check accept * is safe
        multiple: false
    });


    const files = acceptedFiles.map(file => (
        // @ts-ignore
        <MintParagraph size={"16"} weight={"medium"} key={file.path}>
            {/* @ts-ignore */}
            Current file: {file.path} - {file.size} bytes
        </MintParagraph>
    ));

    return user ? <div style={{ display: "flex", alignItems: "center" }}>
        {modalOpen && <BasicParentModal closeModal={() => setModalOpen(false)}>
            <div style={{  }}>
                <H4>Upload New Profile Image</H4>
                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "16px" }}>
                    {selectedFile && <>
                        <AvatarEditor image={selectedFile}
                                      ref={editor}
                                      width={250}
                                      height={250}
                                      border={5}
                                      borderRadius={200}
                                      scale={scale}
                                      color={[0, 0, 0, 0.6]}
                        />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "8px" }}>
                            <MintParagraph size={"16"} weight={"regular"} style={{ marginRight: "8px" }}>Zoom:</MintParagraph>
                            <input
                                name="scale"
                                type="range"
                                onChange={handleScale}
                                min="1"
                                max="2"
                                step="0.01"
                                defaultValue="1"
                            />
                        </div>
                    </>}

                    <StyledDropzone {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} accept="image/*" />
                        {
                            acceptedFiles.length > 0 ?
                                <>
                                    {files}<br/>
                                    <MintParagraph size={"16"} weight="medium" >
                                        Drag and drop or click to replace file
                                    </MintParagraph>
                                </>
                                :
                                <MintParagraph size={"16"} weight="medium" >
                                    Drag and drop a file here, or click to select file
                                </MintParagraph>
                        }
                    </StyledDropzone>

                    {editor.current && <SecondaryButton type="submit" size='medium' isLight text={"Upload Image"} />}
                </form>
            </div>
        </BasicParentModal>}
        <PictureContainer onClick={() => setModalOpen(true)}>
            {url ? <>
                    <Image width="103" height="103" src={url} alt={"Profile Picture"} style={{objectFit: "cover", borderRadius: "150px"}} />
                    <PictureOverlay>
                        <Image width="37" height="36" src="/icon_svg/Camera_light.svg" alt="me"/>
                    </PictureOverlay>
                </> :
                <Image width="37" height="36" src="/icon_svg/Camera.svg" alt="me"/>
            }
        </PictureContainer>
        <div>
            <MintParagraph size={"20"} weight={"medium"}>{user.firstName} {user.lastName}</MintParagraph>
            {!isMobile && <MintParagraph size={"14"} weight={"regular"} style={{color: colors.gray600, marginTop: "8px"}}>{user.email}</MintParagraph>}
        </div>
    </div> : <div><LoadingSpinner/></div>
}

export default ProfilePictureUpload;