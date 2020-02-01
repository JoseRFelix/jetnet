import React from "react";
import styled from "styled-components";

interface Props extends React.ComponentPropsWithRef<"input"> {}

const Input = React.forwardRef<HTMLInputElement, Props>(({ ...props }, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

const StyledInput = styled.input`
  padding: 1.5rem 1rem;

  border-radius: 2px;
  border: none;

  background-color: rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: Poppins, sand-serif;
    font-size: 1.4rem;

    color: rgba(0, 0, 0, 0.4);
  }
`;

export default Input;
