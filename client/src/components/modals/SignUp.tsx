import React, { useState } from "react";
import { Modal } from ".";
import styled from "styled-components";
import { Input, Button, UploadPicture, Select } from "components";
import { useForm } from "react-hook-form";

import { ReactComponent as CloseSVG } from "assets/svg/close.svg";

export const SignUp: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: Record<string, any>) => {
    console.log(data);
  };

  return (
    <Modal>
      <Wrapper>
        <Title>Hello, Friend!</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {userImage ? (
            <UploadedPicture>
              <CloseSVG onClick={() => setUserImage(null)} />
              <UserImage src={userImage} alt="User profile picture" />
            </UploadedPicture>
          ) : (
            <UploadPicture setUserImage={setUserImage} />
          )}
          <FormItem>
            <Input
              ref={register({ required: true })}
              name="email"
              placeholder="Email"
            />
            {errors.email && (
              <ErrorMessage>This field is required</ErrorMessage>
            )}
          </FormItem>

          <FormItem>
            <Input
              ref={register({ required: true })}
              name="password"
              placeholder="Password"
            />
            {errors.password && (
              <ErrorMessage>This field is required</ErrorMessage>
            )}
          </FormItem>
          <BirthdayBox>
            <BirthdayLabel>Date of Birth</BirthdayLabel>
            <BirthdayInputBox>
              <FormItem error={errors.month}>
                <BirthdayMonth ref={register({ required: true })} name="month">
                  <option value="">Month</option>
                  <option value="01">Jan</option>
                  <option value="02">Feb</option>
                  <option value="03">Mar</option>
                  <option value="04">Apr</option>
                  <option value="05">May</option>
                  <option value="06">Jun</option>
                  <option value="07">Jul</option>
                  <option value="08">Aug</option>
                  <option value="09">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </BirthdayMonth>
              </FormItem>
              <FormItem error={errors.day}>
                <BirthdayDay
                  ref={register({ required: true })}
                  name="day"
                  placeholder="Day"
                />
              </FormItem>
              <FormItem error={errors.year}>
                <BirthdayYear
                  ref={register({ required: true })}
                  name="year"
                  placeholder="Year"
                />
              </FormItem>
            </BirthdayInputBox>
          </BirthdayBox>
          <FormItem>
            <Input
              ref={register({ required: true })}
              name="phone"
              placeholder="Phone number"
            />
            {errors.phone && (
              <ErrorMessage>This field is required</ErrorMessage>
            )}
          </FormItem>
          <FormItem>
            <Input
              ref={register({ required: true })}
              name="address"
              placeholder="Address"
            />
            {errors.address && (
              <ErrorMessage>This field is required</ErrorMessage>
            )}
          </FormItem>
          <StyledButton type="submit">Create account</StyledButton>
        </Form>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem 0;

  height: 90vh;
  overflow: auto;

  & > *:first-child {
    margin-bottom: 3rem;
  }
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 4rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:not(:last-child) {
    margin-bottom: 2.5rem;
  }

  & > input,
  & > button {
    width: 100%;
  }
`;

const FormItem = styled.div<{ error?: any }>`
  display: flex;
  flex-direction: column;

  width: 100%;
  border: ${({ error }) => (error ? "0.5px rgba(255,0,0,0.4) solid" : "")};
  border-radius: 2px;
`;

const ErrorMessage = styled.span`
  color: rgba(255, 0, 0, 0.7);
  margin-top: 0.5rem;
`;

const UploadedPicture = styled.div`
  position: relative;

  svg {
    width: 3rem;

    position: absolute;
    top: 0;
    right: 10px;

    visibility: hidden;
    opacity: 0;

    transition: 0.2s ease-out;

    cursor: pointer;

    color: rgba(0, 0, 0, 0.8);

    &:hover {
      color: rgba(0, 0, 0, 1);
    }
  }

  &:hover {
    svg {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const UserImage = styled.img`
  height: 15rem;
  width: 15rem;

  border-radius: 50%;
`;

const BirthdayBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  & > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const BirthdayLabel = styled.label`
  color: rgba(0, 0, 0, 0.6);
`;

const BirthdayInputBox = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const BirthdayMonth = styled(Select)`
  flex: 1;
`;

const BirthdayDay = styled(Input)`
  width: 6rem;
`;

const BirthdayYear = styled(Input)`
  width: 8rem;
`;

const StyledButton = styled(Button)`
  border-radius: 3px;
`;
