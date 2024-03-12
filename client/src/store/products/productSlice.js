import { createSlice } from '@reduxjs/toolkit';
import { getNewProducts } from './asyncActions';
import { getFeatureProducts } from './asyncActions';
export const productSlice = createSlice({
  name: 'app',
  initialState: {
    newProducts: null,
    featureProducts: null,
    errorMessage: '',
    currentCart: [],
    dealDaily: null,
  },
  reducers: {
    getDealDaily: (state, action) => {
      state.dealDaily = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNewProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNewProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProducts = action.payload;
    });
    builder.addCase(getNewProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
    builder.addCase(getFeatureProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFeatureProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.featureProducts = action.payload;
    });
    builder.addCase(getFeatureProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});
export const { getDealDaily } = productSlice.actions;
export default productSlice.reducer;
