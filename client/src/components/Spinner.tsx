import React from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  className?: string;
}

const Spinner: React.FC<Props> = ({ className }) => (
  <StyledSpinner className={className} />
);

const spin = keyframes`
    to { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: ${spin} 1s ease-in-out infinite;
`;

export default Spinner;
