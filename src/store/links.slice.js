import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Alllinks: [],
};
const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    getLinks: (state, action) => {
        
      state.Alllinks = action.payload.links;
    },
  },
});

export const { getLinks } = linksSlice.actions;

const linksReducer = linksSlice.reducer;
export default linksReducer;
