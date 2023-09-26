import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsersAPI } from '../../utils/api';
import { getCookie } from '../../utils/cookies';

export const getUsers = createAsyncThunk('/users', async () => {
  return getUsersAPI();
});

const initialState = {
  users: [],
  isAuth: getCookie('token') ? true : false,
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAuthentication } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
