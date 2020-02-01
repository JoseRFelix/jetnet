import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modalTypes } from "../constants";

interface ModalState {
  modalType: modalTypes | null;
  modalProps: Record<string, any>;
}

interface OpenModal {
  modalType: modalTypes;
  modalProps: Record<string, any>;
}

const initialState: ModalState = {
  modalType: null,
  modalProps: {}
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, { payload }: PayloadAction<OpenModal>) {
      const { modalType, modalProps } = payload;
      state.modalType = modalType;
      state.modalProps = modalProps;
    },
    hideModal(state) {
      return initialState;
    }
  }
});

export const { showModal, hideModal } = modal.actions;

export default modal.reducer;
