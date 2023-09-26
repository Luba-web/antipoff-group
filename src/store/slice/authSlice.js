import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUserAPI, registerUserAPI } from '../../utils/api';
import { deleteCookie, getCookie } from '../../utils/cookies';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData) => {
    return registerUserAPI(userData);
  }
);

export const loginUser = createAsyncThunk('auth/login', async (userData) => {
  return loginUserAPI(userData);
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  return deleteCookie('token');
});

const initialState = {
  isAuth: getCookie('token') ? true : false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuth = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAuthentication } = authSlice.actions;

export const authReducer = authSlice.reducer;
