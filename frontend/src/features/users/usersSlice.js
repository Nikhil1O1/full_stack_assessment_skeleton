import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: { selectedUser: null },
  reducers: {
    selectUser(state, action) {
      state.selectedUser = action.payload;
    },
  },
});

export const { selectUser } = usersSlice.actions;
export default usersSlice.reducer;
