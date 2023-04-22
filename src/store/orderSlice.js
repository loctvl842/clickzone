import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const orderAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.modified_at.localeCompare(a.modified_at),
});

const initialState = orderAdapter.getInitialState({
  status: "idle",
  error: null,
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderReset(state) {
      state.status = "idle";
      state.error = null;
      orderAdapter.removeAll(state);
    },
  },
  extraReducers(builder) {
    builder.addCase(addNewOrder.fulfilled, (state, action) => {
      state.status = "succeeded";
      orderAdapter.addOne(state, action.payload);
    });
    builder.addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
      const data = action.payload;
      const hash_orders = data.reduce((hash, item) => {
        const {
          id,
          total,
          created_at,
          modified_at,
          user_id,
          ...order_item_data
        } = item;
        if (!hash[item.id]) {
          hash[item.id] = {
            id,
            user_id,
            order_items: [],
            total,
            created_at,
            modified_at,
          };
        }
        hash[item.id].order_items.push(order_item_data);
        return hash;
      }, {});
      const orders = Object.values(hash_orders);
      orderAdapter.setAll(state, orders);
    });
  },
});

export default orderSlice.reducer;
export const { orderAdd, orderReset } = orderSlice.actions;

export const addNewOrder = createAsyncThunk(
  "order/addNewOrder",
  async ({ order_id, session_id, total }) => {
    const res = await axios.post("/api/order_items/create.php", {
      order_id,
      session_id,
    });
    return {
      id: order_id,
      order_items: res.data.order_items,
      total,
    };
  }
);

export const fetchOrdersByUserId = createAsyncThunk(
  "order/fetchOrdersByUserId",
  async (accessToken) => {
    const res = await axios.get("/api/order_details/get_by_userid.php", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return res.data.orders;
  }
);

// selectors
export const { selectAll: selectAllOrders } = orderAdapter.getSelectors(
  (state) => state.order
);
