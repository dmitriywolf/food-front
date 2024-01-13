import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/appStore';
import { getCompanyDocs, createDoc, editDoc, deleteDoc } from './services';

import { IDoc } from '../types';

interface IDocsState {
  loading: boolean;
  error: string | null;
  myDocs: IDoc[];
  currentDoc: IDoc;
}

const DEFAULT_DOC = {
  _id: '',
  owner: '',
  url: '',
  title: '',
  filename: '',
  size: '',
  type: '',
  updatedAt: '',
};

const initialState: IDocsState = {
  loading: false,
  error: null,
  myDocs: [],
  currentDoc: DEFAULT_DOC,
};

const docsSlice = createSlice({
  name: '@@docs',
  initialState,
  reducers: {
    setCurrentDoc: (state, action) => {
      state.currentDoc = state.myDocs.find(
        (d) => d._id === action.payload,
      ) as IDoc;
    },
    resetCurrentDoc: (state) => {
      state.currentDoc = DEFAULT_DOC;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET DOCS
      .addCase(getCompanyDocs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyDocs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCompanyDocs.fulfilled, (state, action) => {
        state.loading = false;
        state.myDocs = action.payload;
      })
      // CREATE DOC
      .addCase(createDoc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDoc.fulfilled, (state, action) => {
        state.loading = false;
        state.myDocs.unshift(action.payload);
      })
      // EDIT DOC
      .addCase(editDoc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editDoc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editDoc.fulfilled, (state, action) => {
        state.loading = false;
        state.myDocs = state.myDocs.map((d) =>
          d?._id === action.payload._id ? action.payload : d,
        );
      })
      // DELETE DOC
      .addCase(deleteDoc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDoc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteDoc.fulfilled, (state, action) => {
        state.loading = false;
        state.myDocs = state.myDocs.filter((d) => d._id !== action.payload._id);
      });
  },
});

// Actions
export const { setCurrentDoc, resetCurrentDoc } = docsSlice.actions;

// Selectors
export const selectDocs = (state: RootState) => state.docs.myDocs;
export const selectCurrentDoc = (state: RootState) => state.docs.currentDoc;
export const selectIsLoading = (state: RootState) => state.docs.loading;
export const selectError = (state: RootState) => state.docs.error;

// Reducer
export default docsSlice.reducer;
