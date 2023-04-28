import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImages: [],
};

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setSelectedImagesInState: (state, action) => {
      state.selectedImages = action.payload;
    },
  },
});

export const { setSelectedImagesInState } = photoSlice.actions; // <-- export the action creator properly
export default photoSlice.reducer;
