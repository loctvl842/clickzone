import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  total: 0,
  loading: true,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    sessionTotalAdd(state, action) {
      state.session.total += action.payload;
    },
    sessionTotalSubtract(state, action) {
      state.session.total -= action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchShoppingSession.fulfilled, (state, action) => {
      if (action.payload) {
        const shoppingSession = action.payload;
        state.total = shoppingSession.total;
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
