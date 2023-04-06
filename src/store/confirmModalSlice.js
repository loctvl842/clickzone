import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  visible: false,
};

const confirmModalSlice = createSlice({
  name: "confirmModal",
  initialState,
  reducers: {
    confirmModalSetType(state, action) {
      state.type = action.payload;
      state.visible = true;
    },
    confirmModalClose(state) {
      state.visible = false;
    },
  },
});

export default confirmModalSlice.reducer;
export const { confirmModalClose, confirmModalSetType } = confirmModalSlice.actions;
