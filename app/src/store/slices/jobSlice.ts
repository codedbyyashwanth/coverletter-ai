import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { JobData } from '../../types/job';
import type { RootState } from '../index';

interface JobState {
    currentJob: JobData | null;
    loading: boolean;
    error: string | null;
}

const initialState: JobState = {
    currentJob: null,
    loading: false,
    error: null,
};

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        setJob: (state, action: PayloadAction<JobData>) => {
        state.currentJob = action.payload;
        state.error = null;
        },
        clearJob: (state) => {
        state.currentJob = null;
        },
        setJobLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
        },
        setJobError: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
        },
    },
});

export const { setJob, clearJob, setJobLoading, setJobError } = jobSlice.actions;

// Selectors
export const selectCurrentJob = (state: RootState) => state.job.currentJob;
export const selectJobLoading = (state: RootState) => state.job.loading;
export const selectJobError = (state: RootState) => state.job.error;

export default jobSlice.reducer;