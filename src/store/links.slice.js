import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  links: null,
};
const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    getLink: async (state, action) => {
       
    
    },
  },
});

export const { getLink } = linksSlice.actions;

const linksReducer = linksSlice.reducer;
export default linksReducer;
