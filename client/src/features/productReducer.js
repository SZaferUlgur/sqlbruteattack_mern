import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_URL } from "./apiURL";
import axios from "axios";

const API_URL = SERVER_URL + "/products";

const initialState = {
  products: [],
  editProduct: {},
  isUpdate: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isEdit: false,
  message: "",
}
 
// getproducts
export const getProducts = createAsyncThunk(
  "genel/getProducts",
  async (_, thunkAPI) => {
    try {
      const headerConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          mode: "cors",
          crossDomain: true,
        },
      };
      const response = await axios.get(API_URL, headerConfig);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getproducts/:id
export const getProductById = createAsyncThunk(
  "genel/getProductById",
  async (id, thunkAPI) => {
    try {
      const headerConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          mode: "cors",
          crossDomain: true,
        },
      };
      const response = await axios.get(API_URL + `/${id}`, headerConfig);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// addproduct
export const createProduct = createAsyncThunk(
  "genel/createProduct",
  async (data, thunkAPI) => {
    try {
      const headerConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          mode: "cors",
          crossDomain: true,
        },
      };
      const response = await axios.post(API_URL, data, headerConfig);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// updateproduct
export const updateProduct = createAsyncThunk(
  "genel/updateProduct",
  async (data, thunkAPI) => {
    try {
      let id = data.id
      const headerConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          mode: "cors",
          crossDomain: true,
        },
      };
      const response = await axios.put(API_URL + `/${id}`, data, headerConfig);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// deleteProduct
export const deleteProduct = createAsyncThunk(
  "genel/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const headerConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          mode: "cors",
          crossDomain: true,
        },
      };
      const response = await axios.delete(API_URL + `/${id}`, headerConfig);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => {
      state.products= [];
      state.editProduct= {};
      state.isUpdate= false;
      state.isError= false;
      state.isSuccess= false;
      state.isLoading= false;
      state.isEdit= false;
      state.message= "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isUpdate = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.isEdit = false;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isEdit = true;
        state.editProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.bayiTable = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.bayiTable = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isUpdate = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isUpdate = true;
        state.bayiTable = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
    },  
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
