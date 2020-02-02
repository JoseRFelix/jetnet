import React, { useRef, useState } from "react";
import styled from "styled-components";

import { ReactComponent as ArrowDownwardSVG } from "assets/svg/arrow-downward.svg";
import { ReactComponent as CameraSVG } from "assets/svg/camera.svg";

function getBase64(img: any): Promise<string | ArrayBuffer | null> {
  const reader = new FileReader();

  return new Promise(resolve => {
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(img);
  });
}

interface Props {
  className?: string;
  setUserImage: Function;
}

const UploadPicture: React.FC<Props> = ({ setUserImage, className }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [highlight, setHighlight] = useState(false);

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const onDragOver = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setHighlight(true);
  };

  const onDragLeave = () => {
    setHighlight(false);
  };

  const onDrop = async (e: any) => {
    e.preventDefault();

    if (e.dataTransfer.files) {
      const file = e.dataTransfer.files[0] as File;
      const isLessThan2MB = file.size / 1024 / 1024 < 2;

      if (!isLessThan2MB) return alert("Image must smaller than 2MB!");

      const imageURL = await getBase64(file);
      setUserImage(imageURL);
    }

    setHighlight(false);
  };

  const uploadImage = async (e: any) => {
    if (e.target.files) {
      const file = e.target.files[0] as File;
      const isLessThan2MB = file.size / 1024 / 1024 < 2;

      if (!isLessThan2MB) return alert("Image must smaller than 2MB!");

      const imageURL = await getBase64(file);
      setUserImage(imageURL);
    }
  };

  return (
    <Dropzone
      highlight={highlight}
      onClick={openFileDialog}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={className}
    >
      {highlight ? (
        <>
          <DropIcon />
          <UploadText>Drop Here.</UploadText>
        </>
      ) : (
        <>
          <CameraIcon />
          <UploadText>Click to add profile picture.</UploadText>
        </>
      )}
      <UploadImage
        ref={fileInputRef}
        accept="image/png, image/jpeg"
        type="file"
        onChange={uploadImage}
      />
    </Dropzone>
  );
};

const Dropzone = styled.div<{ highlight: Boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  cursor: pointer;

  height: 14rem;
  width: 14rem;

  background-color: #fff;

  border: 2px dashed rgb(187, 186, 186);
  border-radius: 50%;

  font-size: 1.6rem;

  background-color: ${({ highlight }) =>
    highlight ? "rgb(0, 0, 0, 0.01)" : ""};

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const CameraIcon = styled(CameraSVG)`
  width: 4rem;
  fill: rgba(0, 0, 0, 0.2);
`;

const DropIcon = styled(ArrowDownwardSVG)`
  width: 4rem;
  fill: rgba(0, 0, 0, 0.2);
`;

const UploadText = styled.p`
  text-align: center;

  font-size: 1.2rem;

  color: rgba(0, 0, 0, 0.4);
`;

const UploadImage = styled.input`
  display: none;
`;

export default UploadPicture;
