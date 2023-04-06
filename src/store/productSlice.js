import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productAdapter = createEntityAdapter();

const initialState = productAdapter.getInitialState({
  pageSize: 0,
  status: "idle",
  error: null,
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProductsByPage.fulfilled, (state, action) => {
      const { pageSize, products } = action.payload;
      state.status = "succeeded";
      state.pageSize = pageSize;
      productAdapter.setAll(state, products);
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      const { product: newProduct } = action.payload;
      console.log(newProduct);
      productAdapter.addOne(state, newProduct);
    });
  },
});

// reducers
export default productSlice.reducer;

// actions
// export const { } = productSlice.actions;
export const fetchProductsByPage = createAsyncThunk("product/fetchProductsByPage", async (page_number) => {
  const res = await axios.get(`/api/product/get_by_page.php?page=${page_number}`);
  return res.data;
});

export const addProduct = createAsyncThunk("product/addProduct", async (productData) => {
  const res = await axios.post("/api/product/create.php", productData);
  return res.data;
});

// selectors
export const { selectAll: selectAllProducts } = productAdapter.getSelectors((state) => state.product);
