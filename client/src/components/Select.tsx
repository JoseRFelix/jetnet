import React from "react";
import styled from "styled-components";

interface Props extends React.ComponentPropsWithRef<"select"> {}

const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <StyledSelect ref={ref} {...props}>
        {children}
      </StyledSelect>
    );
  }
);

const StyledSelect = styled.select`
  padding: 1rem 1rem;

  font-family: Poppins, sand-serif;
  font-size: 1.4rem;

  border-radius: 2px;
  border: none;

  background-color: rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
  }
`;

export default Select;
