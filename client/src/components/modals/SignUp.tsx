import React, { useState, useContext } from "react";
import { Modal } from ".";
import styled from "styled-components";
import { Input, Button, UploadPicture, Select } from "components";
import { useForm } from "react-hook-form";

import { ReactComponent as CloseSVG } from "assets/svg/close.svg";
import { regex } from "../../constants";
import { useDispatch } from "react-redux";
import { signUp } from "slices/auth";

const stepsTitles = ["Hello, Friend!", "Tell us about yourself", "Finally..."];

const initialFormData = {
  fullName: "",
  email: "",
  password: "",
  picture: "",
  phone: "",
  address: {
    street: "",
    city: "",
    zip: "",
    state: "",
    country: ""
  },
  birthday: new Date(),
  securityQuestions: [
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" }
  ]
};

interface StepContext {
  currentStep: number;
  _next: Function;
  submitRegister: Function;
}

const initialContext = {
  currentStep: 1,
  _next: () => null,
  submitRegister: () => null
};

const StepContext = React.createContext<StepContext>(initialContext);

export const SignUp: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();

  const submitRegister = (data: typeof initialFormData) => {
    dispatch(signUp(data));
  };

  const _next = (data: Partial<typeof initialFormData>) => {
    setFormData(form => ({ ...form, ...data }));

    if (currentStep === 3) {
      return submitRegister({ ...formData, ...data });
    }

    setCurrentStep(
      currentStep => (currentStep = currentStep >= 2 ? 3 : currentStep + 1)
    );
  };

  const contextValues = {
    currentStep,
    _next,
    submitRegister
  };

  return (
    <Modal>
      <Wrapper>
        <Title>{stepsTitles[currentStep - 1]}</Title>
        <StepContext.Provider value={contextValues}>
          <Step1 />
          <Step2 />
          <Step3 />
        </StepContext.Provider>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem 2rem;

  overflow: auto;
  max-height: 93vh;

  & > *:first-child {
    margin-bottom: 3rem;
  }
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 3rem;
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

const StepTrigger = ({ currentStep }: { currentStep: number }) => (
  <StyledButton type="submit">
    {currentStep === 3 ? "Create account" : "Next"}
  </StyledButton>
);

const StyledButton = styled(Button)`
  border-radius: 3px;
`;

const Step1: React.FC = () => {
  const { currentStep, _next } = useContext(StepContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ day, month, year, ...rest }: Record<string, any>) => {
    const birthday = new Date(`${month}/${day}/${year}`);

    _next({ birthday, ...rest });
  };

  if (currentStep !== 1) {
    return null;
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormItem>
        <StyledInput
          ref={register({ required: true })}
          name="fullName"
          placeholder="Full name"
        />
        {errors.fullName && <ErrorMessage>This field is required</ErrorMessage>}
      </FormItem>

      <FormItem>
        <StyledInput
          ref={register({
            required: true,
            pattern: regex.email
          })}
          name="email"
          placeholder="Email"
        />
        {errors.email && <ErrorMessage>This field is required</ErrorMessage>}
      </FormItem>

      <FormItem>
        <StyledInput
          ref={register({ required: true })}
          type="password"
          name="password"
          placeholder="Password"
        />
        {errors.password && <ErrorMessage>This field is required</ErrorMessage>}
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
              placeholder="Day"
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
              placeholder="Year"
            />
          </FormItem>
        </BirthdayInputBox>
      </BirthdayBox>
      <StepTrigger currentStep={currentStep} />
    </Form>
  );
};

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

const Step2: React.FC = () => {
  const { currentStep, _next } = useContext(StepContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({
    street,
    city,
    zip,
    state,
    country,
    ...rest
  }: Record<string, any>) => {
    _next({ address: { street, city, zip, state, country }, ...rest });
  };

  if (currentStep !== 2) {
    return null;
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormItem>
        <StyledInput
          ref={register({ required: true })}
          name="country"
          placeholder="Country"
        />
        {errors.country && <ErrorMessage>This field is required</ErrorMessage>}
      </FormItem>
      <FormItem>
        <StyledInput
          ref={register({ required: true })}
          name="street"
          placeholder="Street"
        />
        {errors.street && <ErrorMessage>This field is required</ErrorMessage>}
      </FormItem>
      <FormItem>
        <StyledInput
          ref={register({ required: true })}
          name="city"
          placeholder="City"
        />
        {errors.city && <ErrorMessage>This field is required</ErrorMessage>}
      </FormItem>
      <FormItem>
        <StyledInput
          ref={register({ required: true })}
          name="state"
          placeholder="State / Province / Region"
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
          placeholder="Zip code"
        />
        {errors.zip && (
          <ErrorMessage>
            {
              // @ts-ignore
              errors.zip.message
            }
          </ErrorMessage>
        )}
      </FormItem>
      <FormItem>
        <StyledInput
          ref={register({ required: true })}
          name="phone"
          placeholder="Phone number"
        />
        {errors.phone && <ErrorMessage>This field is required</ErrorMessage>}
      </FormItem>
      <StepTrigger currentStep={currentStep} />
    </Form>
  );
};

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

const Step3: React.FC = () => {
  const { currentStep, _next } = useContext(StepContext);
  const { register, handleSubmit, errors } = useForm();
  const [userImage, setUserImage] = useState<string | null>(null);

  const onSubmit = ({
    question1,
    question1Answer,
    question2,
    question2Answer,
    question3,
    question3Answer,
    ...rest
  }: Record<string, any>) => {
    const securityQuestions = [
      { question: question1, answer: question1Answer },
      { question: question2, answer: question2Answer },
      { question: question3, answer: question3Answer }
    ];

    _next({ ...rest, picture: userImage, securityQuestions });
  };

  if (currentStep !== 3) {
    return null;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {userImage ? (
        <UploadedPicture>
          <CloseSVG onClick={() => setUserImage(null)} />
          <UserImage src={userImage} alt="User profile picture" />
        </UploadedPicture>
      ) : (
        <UploadPicture setUserImage={setUserImage} />
      )}
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
          placeholder="Answer"
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
          placeholder="Answer"
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
          placeholder="Answer"
        />
        {errors.question3Answer && (
          <ErrorMessage>This field is required</ErrorMessage>
        )}
      </FormItem>
      <StepTrigger currentStep={currentStep} />
    </Form>
  );
};
