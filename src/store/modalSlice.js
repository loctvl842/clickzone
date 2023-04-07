import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  visible: false,
};

const modalSlice = createSlice({
  name: "confirmModal",
  initialState,
  reducers: {
    modalOpen(state, action) {
      state.type = action.payload;
      state.visible = true;
    },
    modalClose(state) {
      state.visible = false;
    },
  },
});

export default modalSlice.reducer;
export const { modalClose, modalOpen } = modalSlice.actions;
