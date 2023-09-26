import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slice/authSlice';
import { usersReducer } from './slice/usersSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});
