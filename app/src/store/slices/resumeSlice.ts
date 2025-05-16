import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ResumeData } from '../../types/resume';
import type { RootState } from '../index';

interface ResumeState {
  currentResume: ResumeData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResumeState = {
  currentResume: null,
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResume: (state, action: PayloadAction<ResumeData>) => {
      state.currentResume = action.payload;
      state.error = null;
    },
    clearResume: (state) => {
      state.currentResume = null;
    },
    setResumeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setResumeError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setResume, clearResume, setResumeLoading, setResumeError } = resumeSlice.actions;

// Selectors
export const selectCurrentResume = (state: RootState) => state.resume.currentResume;
export const selectResumeLoading = (state: RootState) => state.resume.loading;
export const selectResumeError = (state: RootState) => state.resume.error;

export default resumeSlice.reducer;