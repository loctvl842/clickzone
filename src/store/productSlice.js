import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const productAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.modified_at.localeCompare(a.modified_at),
});

const initialState = productAdapter.getInitialState({
  status: "idle",
  error: null,
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsByPage.pending, (state) => {
        productAdapter.removeAll(state);
        state.status = "loading";
      })
      .addCase(fetchProductsByPage.fulfilled, (state, action) => {
        const { products } = action.payload;
        state.status = "succeeded";
        productAdapter.setAll(state, products);
      });
  },
});

// reducers
export default productSlice.reducer;

// actions
// export const { } = productSlice.actions;
export const fetchProductsByPage = createAsyncThunk(
  "product/fetchProductsByPage",
  async ({ sort, page }) => {
    const pageSize = import.meta.env.VITE_PAGE_SIZE;
    const res = await axios.get(
      `/api/product/get_by_page.php?sort=${sort}&&page=${page}&&num=${pageSize}`
    );
    return res.data;
  }
);

// selectors
export const { selectAll: selectAllProducts } = productAdapter.getSelectors(
  (state) => state.product
);
