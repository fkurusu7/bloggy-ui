import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // SIGN IN
    signinStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    signinFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // SIGN UP
    signupStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // SIGN OUT
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  signinStart,
  signinFailure,
  signinSuccess,
  signupFailure,
  signupStart,
  signupSuccess,
  signoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
