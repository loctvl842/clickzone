import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: 0,
  loading: true,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    sessionTotalAdd(state, action) {
      state.data.total += action.payload;
    },
    sessionTotalSubtract(state, action) {
      state.data.total -= action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchShoppingSession.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.loading = false;
      }
    });
  },
});

export default sessionSlice.reducer;
export const { sessionTotalAdd, sessionTotalSubtract } = sessionSlice.actions;

// actions
export const fetchShoppingSession = createAsyncThunk(
  "session/fetchShoppingSession",
  async (user_id) => {
    const res = await axios.get(
      `/api/shopping_session/get.php?user_id=${user_id}`
    );
    return res.data.shopping_session;
  }
);
