import React from "react";
import { SignIn, SignUp } from ".";
import { modalTypes } from "../../constants";
import { connect } from "react-redux";
import { RootState } from "slices";

const MODAL_COMPONENTS: Record<modalTypes, React.FC> = {
  [modalTypes.signIn]: SignIn,
  [modalTypes.signUp]: SignUp
};

interface Props {
  modalType: modalTypes | null;
  modalProps: Record<string, any>;
}

const ModalManager: React.FC<Props> = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />;
};

export default connect((state: RootState) => state.modal)(ModalManager);
