import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';

type UserType = {
  firstName: string;
  lastName: string;
  email: string;
};

interface IAuthState {
  status: string;
  error: string | null;
  user: UserType | null;
}

const initialState: IAuthState = {
  status: 'idle',
  error: null,
  user: null,
};

export const signup = createAsyncThunk(
  '@@auth/signup',
  (signupData, { rejectWithValue, extra: api }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return api.signup(signupData);
    } catch (err) {
      return rejectWithValue('Failed to fetch all todos.');
    }
  },
);

const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.rejected, (state) => {
        state.status = 'idle';
        state.error = 'Something went wrong!';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { setUser } = authSlice.actions;

// Reducer
export default authSlice.reducer;

// selectors
export const selectAuthUser = (state: RootState) => state.auth.user;
export const isAuth = (state: RootState) => !!state.auth.user;
