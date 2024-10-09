import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};
const prifileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state, action) => {
      state.profile = action.payload.profile;
    },
  },
});

export const { getProfile } = prifileSlice.actions;

const profileReducer = prifileSlice.reducer;
export default profileReducer;
