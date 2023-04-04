import { createSlice } from '@reduxjs/toolkit';

const poSlice = createSlice({
  name: 'po',
  initialState: [],
  reducers: {
    updatePO: (state, action) => {
      return action.payload;
    }
  }
});

export const { updatePO } = poSlice.actions;
export default poSlice.reducer;