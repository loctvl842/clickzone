import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState({
  status: "idle",
  error: null,
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartReset(state) {
      state.status = "idle";
      state.error = null;
      cartAdapter.removeAll(state);
    },
    removeCartItem(state, action) {
      const cartItemId = action.payload;
      cartAdapter.removeOne(state, cartItemId);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
        cartAdapter.removeAll(state);
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        cartAdapter.setAll(state, action.payload);
      });
    builder.addCase(addCartItem.fulfilled, (state, action) => {
      cartAdapter.addOne(state, action.payload);
    });
    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      const updatedCartItem = { ...action.payload };
      cartAdapter.updateOne(state, {
        id: updatedCartItem.id,
        changes: updatedCartItem,
      });
    });
    builder.addCase(cleanCart.fulfilled, (state) => {
      cartAdapter.removeAll(state);
    });
  },
});

// reducers
export default cartSlice.reducer;

// actions
export const { removeCartItem, cartReset } = cartSlice.actions;
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (sessionId) => {
    const res = await axios.get(
      `/api/cart_item/get_by_sessionid.php?session_id=${sessionId}`
    );
    return res.data.cart_items;
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (data) => {
    const res = await axios.post("/api/cart_item/create.php", data);
    return res.data.cart_item;
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (data) => {
    const res = await axios.put("/api/cart_item/update.php", data);
    return res.data.cart_item;
  }
);

export const cleanCart = createAsyncThunk(
  "cart/cleanCart",
  async (sessionId) => {
    await axios.delete(
      `/api/cart_item/remove_by_sessionid.php?session_id=${sessionId}`
    );
  }
);

// selectors
export const {
  selectAll: selectAllCartItems,
  selectTotal: selectTotalCartItems,
} = cartAdapter.getSelectors((state) => state.cart);

export const selectCartItemByProductId = createSelector(
  [selectAllCartItems, (state, productId) => productId],
  (cartItems, productId) => {
    return cartItems.find((item) => item.product_id === productId);
  }
);
