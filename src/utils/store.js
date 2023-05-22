import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/UserSlices';
export default configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});