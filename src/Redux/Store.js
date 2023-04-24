
import { configureStore } from '@reduxjs/toolkit';
import photoSlice from './photoSlice';

const store = configureStore({
  reducer: {
    photos: photoSlice,
  },
});

export default store;


