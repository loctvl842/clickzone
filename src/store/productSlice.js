import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const productAdapter = createEntityAdapter();

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
  async ({ sort, page, category_id, search_query }) => {
    const pageSize = import.meta.env.VITE_PAGE_SIZE;
    const params = {
      sort,
      page,
      num: pageSize,
    };
    if (category_id) params.category_id = category_id;
    if (search_query) params.search_string = search_query;
    const res = await axios.get(`/api/product/get_by_page.php`, { params });
    return res.data;
  }
);

// selectors
export const { selectAll: selectAllProducts } = productAdapter.getSelectors(
  (state) => state.product
);
