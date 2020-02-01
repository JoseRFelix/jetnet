import React from "react";
import { Modal } from ".";
import styled from "styled-components";
import { Input } from "components";
import Button from "components/Button";

interface Props {}

export const SignIn: React.FC<Props> = () => {
  return (
    <Modal>
      <Wrapper>
        <Title>Welcome Back!</Title>
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <StyledButton>Log In</StyledButton>
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
  font-size: 3rem;
`;

const StyledButton = styled(Button)`
  border-radius: 3px;
`;
