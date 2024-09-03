import { createSlice } from '@reduxjs/toolkit';

const homesSlice = createSlice({
  name: 'homes',
  initialState: { homes: [] },
  reducers: {
    setHomes(state, action) {
      state.homes = action.payload;
    },
  },
});

export const { setHomes } = homesSlice.actions;
export default homesSlice.reducer;
