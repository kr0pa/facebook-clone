import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    // time: 3000,
    message: "",
  },
  reducers: {
    snackbarStatus: (state, action) => {
      state.open = action.payload.open;
      // state.time = action.payload.time;
      state.message = action.payload.message;
    },
  },
});

export const { snackbarStatus } = snackbarSlice.actions;

export const selectSnackbar = (state) => state.snackbar;

export default snackbarSlice.reducer;
