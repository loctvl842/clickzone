import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
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
    builder.addCase(fetchProductsByPage.fulfilled, (state, action) => {
      const { products } = action.payload;
      state.status = "succeeded";
      productAdapter.setAll(state, products);
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      const { product: newProduct } = action.payload;
      productAdapter.addOne(state, newProduct);
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      const productId = action.payload;
      productAdapter.removeOne(state, productId);
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      const { product: updatedProduct } = action.payload;
      productAdapter.updateOne(state, { id: updatedProduct.id, changes: updatedProduct });
    });
  },
});

// reducers
export default productSlice.reducer;

// actions
// export const { } = productSlice.actions;
export const fetchProductsByPage = createAsyncThunk("product/fetchProductsByPage", async (page_number) => {
  console.log('fetchProductsByPage')
  const pageSize = process.env.REACT_APP_PAGE_SIZE;
  const res = await axios.get(`/api/product/get_by_page.php?page=${page_number}&&num=${pageSize}`);
  return res.data;
});

export const addProduct = createAsyncThunk("product/addProduct", async (productData) => {
  const res = await axios.post("/api/product/create.php", productData);
  return res.data;
});

export const removeProduct = createAsyncThunk("product/removeProduct", async (productId) => {
  await axios.post("/api/product/remove.php", { productId });
  return productId;
});

export const editProduct = createAsyncThunk("product/editProduct", async (productData) => {
  const res = await axios.put("/api/product/edit.php", productData);
  return res.data;
});

// selectors
export const { selectAll: selectAllProducts } = productAdapter.getSelectors((state) => state.product);
