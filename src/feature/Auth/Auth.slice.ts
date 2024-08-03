import { createSlice } from '@reduxjs/toolkit';

type UserSliceState = {
  user: null | { email: string; username: string; id: number };
};

const initialState: UserSliceState = {
  user: null,
};

export const authSlice = createSlice({
  reducerPath: 'auth',
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;
