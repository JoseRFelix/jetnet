import React, { useState } from "react";
import styled from "styled-components";
import {
  Input,
  Button,
  UploadPicture,
  Select,
  Navbar,
  Footer
} from "components";
import { useForm } from "react-hook-form";

import { ReactComponent as CloseSVG } from "assets/svg/close.svg";
import { regex } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "slices";
import { editProfile } from "slices/user";
import { IUserEditProfileDTO } from "interfaces";

const EditProfile: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.user.isLoading);
  const user = useSelector((state: RootState) => state.user);

  const userBirthday = new Date(user.birthday);

  const initialForm = {
    ...user,
    ...user.address,
    question1: (user as any).securityQuestions[0].question,
    question1Answer: (user as any).securityQuestions[0].answer,
    question2: (user as any).securityQuestions[1].question,
    question2Answer: (user as any).securityQuestions[1].answer,
    question3: (user as any).securityQuestions[2].question,
    question3Answer: (user as any).securityQuestions[2].answer,
    month: `${userBirthday.getMonth() + 1}`.padStart(2, "0"),
    year: userBirthday.getFullYear(),
    day: userBirthday.getDay()
  };
  const { register, handleSubmit, errors } = useForm({
    defaultValues: initialForm as any
  });

  const [userImage, setUserImage] = useState<string | undefined>(
    user.picture ? user.picture : undefined
  );

  const onSubmit = async ({
    day,
    month,
    year,
    question1,
    question1Answer,
    question2,
    question2Answer,
    question3,
    question3Answer,
    street,
    city,
    zip,
    state,
    country,
    ...rest
  }: Record<string, any>) => {
    const securityQuestions = [
      { question: question1, answer: question1Answer },
      { question: question2, answer: question2Answer },
      { question: question3, answer: question3Answer }
    ];

    const birthday = new Date(`${month}/${day}/${year}`);

    const input = {
      birthday,
      ...(userImage !== user.picture && {
        picture: userImage ? userImage : null
      }),
      securityQuestions,
      address: { street, city, zip, state, country },
      ...rest
    };

    dispatch(editProfile(input as IUserEditProfileDTO));
  };

  return (
    <Wrapper>
      <Navbar isLoggedIn />
      <Title>Edit Profile</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {userImage ? (
          <UploadedPicture>
            <CloseSVG onClick={() => setUserImage(undefined)} />
            <UserImage src={userImage} alt="User profile picture" />
          </UploadedPicture>
        ) : (
          <UploadPicture setUserImage={setUserImage} />
        )}
        <Label>Pesonal Data</Label>
        <FormItem>
          <StyledInput
            ref={register({ required: true })}
            name="fullName"
            placeholder="Full name*"
          />
          {errors.fullName && (
            <ErrorMessage>This field is required</ErrorMessage>
          )}
        </FormItem>

        <FormItem>
          <StyledInput
            ref={register}
            type="password"
            name="password"
            placeholder="Password"
          />
          {errors.password && (
            <ErrorMessage>This field is required</ErrorMessage>
          )}
        </FormItem>
        <BirthdayBox>
          <Label>Date of Birth</Label>
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
                type="number"
                ref={register({
                  required: true,
                  pattern: {
                    value: regex.onlyNumber,
                    message: "Please input a number."
                  },
                  minLength: {
                    value: 1,
                    message: "Please enter a day of the month."
                  },
                  maxLength: {
                    value: 2,
                    message: "Please enter a day of the month."
                  },
                  min: {
                    value: 1,
                    message: "Please enter a value between 1 and 31."
                  },
                  max: {
                    value: 31,
                    message: "Please enter a value between 1 and 31."
                  }
                })}
                name="day"
                placeholder="Day*"
              />
            </FormItem>
            <FormItem error={errors.year}>
              <BirthdayYear
                type="number"
                ref={register({
                  required: true,
                  pattern: {
                    value: regex.onlyNumber,
                    message: "Please input a number."
                  },
                  min: {
                    value: 1905,
                    message: `Please enter a value between 1905 and ${new Date().getFullYear()}.`
                  },
                  max: {
                    value: new Date().getFullYear(),
                    message: `Please enter a value between 1905 and ${new Date().getFullYear()}.`
                  },
                  minLength: {
                    value: 4,
                    message: "Please enter a year."
                  },
                  maxLength: {
                    value: 4,
                    message: "Please enter a year."
                  }
                })}
                name="year"
                placeholder="Year*"
              />
            </FormItem>
          </BirthdayInputBox>
        </BirthdayBox>
        <Label>Address Data</Label>
        <FormItem>
          <StyledInput
            ref={register({ required: true })}
            name="country"
            placeholder="Country*"
          />
          {errors.country && (
            <ErrorMessage>This field is required</ErrorMessage>
          )}
        </FormItem>
        <FormItem>
          <StyledInput
            ref={register({ required: true })}
            name="street"
            placeholder="Street*"
          />
          {errors.street && <ErrorMessage>This field is required</ErrorMessage>}
        </FormItem>
        <FormItem>
          <StyledInput
            ref={register({ required: true })}
            name="city"
            placeholder="City*"
          />
          {errors.city && <ErrorMessage>This field is required</ErrorMessage>}
        </FormItem>
        <FormItem>
          <StyledInput
            ref={register({ required: true })}
            name="state"
            placeholder="State / Province / Region*"
          />
          {errors.state && <ErrorMessage>This field is required</ErrorMessage>}
        </FormItem>
        <FormItem>
          <StyledInput
            ref={register({
              required: "This field is required.",
              pattern: {
                value: regex.onlyNumber,
                message: "Please input a number."
              }
            })}
            type="number"
            name="zip"
            placeholder="Zip code*"
          />
          {errors.zip && (
            <ErrorMessage>{(errors.zip as any).message}</ErrorMessage>
          )}
        </FormItem>
        <FormItem>
          <StyledInput
            ref={register({ required: true })}
            name="phone"
            placeholder="Phone number*"
          />
          {errors.phone && <ErrorMessage>This field is required</ErrorMessage>}
        </FormItem>
        <Label>Security Questions</Label>
        <FormItem error={errors.question1}>
          <Select ref={register({ required: true })} name="question1">
            <option value="">Select one security question</option>
            <option value="What was the name of your first pet?">
              What was the name of your first pet?
            </option>
            <option value="What is your dream job?">
              What is your dream job?
            </option>
          </Select>
        </FormItem>
        <FormItem>
          <StyledInput
            ref={register({ required: true })}
            name="question1Answer"
            placeholder="Answer*"
          />
          {errors.question1Answer && (
            <ErrorMessage>This field is required</ErrorMessage>
          )}
        </FormItem>
        <FormItem error={errors.question2}>
          <Select ref={register({ required: true })} name="question2">
            <option value="">Select one security question</option>
            <option value="In what city did your parents meet?">
              In what city did your parents meet?
            </option>
            <option value="What is your favorite movie?">
              What is your favorite movie?
            </option>
          </Select>
        </FormItem>
        <FormItem>
          <StyledInput
            ref={register({ required: true })}
            name="question2Answer"
            placeholder="Answer*"
          />
          {errors.question2Answer && (
            <ErrorMessage>This field is required</ErrorMessage>
          )}
        </FormItem>
        <FormItem error={errors.question3}>
          <Select ref={register({ required: true })} name="question3">
            <option value="">Select one security question</option>
            <option value="What is your favorite cartoon?">
              What is your favorite cartoon?
            </option>
            <option value="What is your best friend's name?">
              What is your best friend's name?
            </option>
          </Select>
        </FormItem>
        <FormItem>
          <StyledInput
            ref={register({ required: true })}
            name="question3Answer"
            placeholder="Answer*"
          />
          {errors.question3Answer && (
            <ErrorMessage>This field is required</ErrorMessage>
          )}
        </FormItem>
        <StyledButton loading={loading} type="submit">
          Edit Profile
        </StyledButton>
      </Form>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem 2rem;

  & > *:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const Title = styled.h1`
  align-self: center;

  font-weight: 400;
  font-size: 3rem;
`;

const Form = styled.form`
  align-self: center;

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
  border: ${({ error }) => (error ? "1.2px rgba(255,0,0,0.6) solid" : "")};
  border-radius: 2px;
`;

const StyledInput = styled(Input)`
  min-width: 30rem;
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
  height: 14rem;
  width: 14rem;

  object-fit: cover;

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

const Label = styled.label`
  color: rgba(0, 0, 0, 0.6);
`;

const BirthdayInputBox = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }

  & > div {
    width: initial;

    &:first-child {
      flex: 1;
    }
  }
`;

const BirthdayMonth = styled(Select)`
  flex: 1;
`;

const BirthdayDay = styled(Input)`
  width: 7rem;
`;

const BirthdayYear = styled(Input)`
  width: 8rem;
`;

const StyledButton = styled(Button)`
  border-radius: 3px;
`;

export default EditProfile;
