import React from "react";
import { Modal } from ".";
import styled from "styled-components";
import { Input, Button } from "components";

interface Props {}

export const SignUp: React.FC<Props> = () => {
  const uploadImage = (e: any) => {
    console.log(e.target.files as FileList);
  };

  return (
    <Modal>
      <Wrapper>
        <Title>Hello, Friend!</Title>
        <UploadImage
          accept="image/png, image/jpeg"
          type="file"
          onChange={uploadImage}
        />
        <Input name="signup-email" placeholder="Email" />
        <Input name="signup-password" placeholder="Password" />
        <StyledButton>Create account</StyledButton>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem 0;

  & > *:not(:last-child) {
    margin-bottom: 2.5rem;
  }

  & > *:first-child {
    margin-bottom: 3rem;
  }
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 3.5rem;
`;

const UploadImage = styled.input``;

const StyledButton = styled(Button)`
  border-radius: 3px;
`;
