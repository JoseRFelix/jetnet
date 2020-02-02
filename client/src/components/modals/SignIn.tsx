import React from "react";
import { Modal } from ".";
import styled from "styled-components";
import { Input } from "components";
import Button from "components/Button";
import { useForm } from "react-hook-form";
import { IUserSignInDTO } from "interfaces";
import { useDispatch } from "react-redux";
import { signIn } from "slices/auth";

interface Props {}

export const SignIn: React.FC<Props> = () => {
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (input: Record<string, any>) => {
    dispatch(signIn(input as IUserSignInDTO));
  };

  return (
    <Modal>
      <Wrapper>
        <Title>Welcome Back!</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormItem>
            <StyledInput
              ref={register({ required: true })}
              name="email"
              placeholder="Email"
            />
            {errors.email && (
              <ErrorMessage>This field is required</ErrorMessage>
            )}
          </FormItem>
          <FormItem>
            <StyledInput
              ref={register({ required: true })}
              type="password"
              name="password"
              placeholder="Password"
            />
            {errors.password && (
              <ErrorMessage>This field is required</ErrorMessage>
            )}
          </FormItem>
          <StyledButton type="submit">Log In</StyledButton>
        </Form>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem 0;

  & > *:first-child {
    margin-bottom: 3rem;
  }
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  align-items: center;

  & > *:not(:last-child) {
    margin-bottom: 2.5rem;
  }
`;

const FormItem = styled.div<{ error?: any }>`
  display: flex;
  flex-direction: column;

  width: 100%;
  border-radius: 2px;
`;

const StyledInput = styled(Input)`
  min-width: 30rem;
`;

const ErrorMessage = styled.span`
  color: rgba(255, 0, 0, 0.7);
  margin-top: 0.5rem;
`;

const StyledButton = styled(Button)`
  border-radius: 3px;
`;
