import { createSlice } from '@reduxjs/toolkit';

const approvedPOSlice = createSlice({
  name: 'approvedPO',
  initialState: [],
  reducers: {
    updateApprovedPO: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateApprovedPO } = approvedPOSlice.actions;

export default approvedPOSlice.reducer;