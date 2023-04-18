import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  data: null,
  session: null,
  loading: true,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSet(state, action) {
      state.data = action.payload;
    },
    userReset(state, _) {
      state.data = null;
      state.session = null;
    },
    userFetchFinish(state) {
      state.loading = false;
    },
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
        state.session = action.payload;
      }
    });
  },
});

export default authSlice.reducer;
export const {
  userSet,
  userReset,
  userFetchFinish,
  sessionTotalAdd,
  sessionTotalSubtract,
} = authSlice.actions;

// actions
export const fetchShoppingSession = createAsyncThunk(
  "user/fetchShoppingSession",
  async (user_id) => {
    const res = await axios.get(
      `/api/shopping_session/get.php?user_id=${user_id}`
    );
    return res.data.shopping_session;
  }
);
