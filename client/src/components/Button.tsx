import React from "react";
import styled from "styled-components";
import { lighten } from "polished";
import { Spinner } from "components";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  className,
  onClick,
  children,
  loading,
  ...props
}) => (
  <StyledButton disabled={loading} className={className} onClick={onClick} {...props}>
    {loading ? <Spinner /> : children}
  </StyledButton>
);

const StyledButton = styled.button`
  border: none;
  border-radius: 30px;

  padding: 1rem 4rem;

  cursor: pointer;

  text-transform: capitalize;

  font-size: 1.5rem;
  font-weight: 600;

  background-color: ${({ theme }) => theme.colors.main};

  transition: background-color 0.2s ease-out, transform 0.2s ease-out;

  &:hover {
    background-color: ${({ theme }) => lighten(0.1, theme.colors.main)};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
  }
`;

export default Button;
