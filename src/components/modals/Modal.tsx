import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { hideModal } from "slices/modal";

interface Props {}

export const Modal: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  const closeModal = () => dispatch(hideModal());

  return (
    <StyledModal
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      }}
      isOpen
      onRequestClose={closeModal}
    >
      {children}
    </StyledModal>
  );
};

const StyledModal = styled(ReactModal)`
  display: flex;
  justify-content: center;

  padding: 2rem 5rem;

  background-color: white;
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;
