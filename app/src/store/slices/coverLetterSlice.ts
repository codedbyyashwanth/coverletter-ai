// src/store/slices/coverLetterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CoverLetterData, Template } from '../../types/coverLetter';
import type { RootState } from '../index';

interface CoverLetterState {
    currentCoverLetter: CoverLetterData | null;
    templates: Template[];
    selectedTemplateId: string | null;
    loading: boolean;
    error: string | null;
}

const initialTemplates: Template[] = [
    {
        id: 'modern',
        name: 'Modern',
        type: 'modern',
        previewUrl: '/assets/templates/modern.png',
    },
    {
        id: 'classic',
        name: 'Classic',
        type: 'classic',
        previewUrl: '/assets/templates/classic.png',
    },
    {
        id: 'creative',
        name: 'Creative',
        type: 'creative',
        previewUrl: '/assets/templates/creative.png',
    },
    {
        id: 'minimal',
        name: 'Minimal',
        type: 'minimal',
        previewUrl: '/assets/templates/minimal.png',
    },
];

const initialState: CoverLetterState = {
    currentCoverLetter: null,
    templates: initialTemplates,
    selectedTemplateId: 'modern',
    loading: false,
    error: null,
};

const coverLetterSlice = createSlice({
    name: 'coverLetter',
    initialState,
    reducers: {
        setCoverLetter: (state, action: PayloadAction<CoverLetterData>) => {
        state.currentCoverLetter = action.payload;
        state.error = null;
        },
        clearCoverLetter: (state) => {
        state.currentCoverLetter = null;
        },
        setSelectedTemplate: (state, action: PayloadAction<string>) => {
        state.selectedTemplateId = action.payload;
        },
        setCoverLetterLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
        },
        setCoverLetterError: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
        },
    },
});

export const {
  setCoverLetter,
  clearCoverLetter,
  setSelectedTemplate,
  setCoverLetterLoading,
  setCoverLetterError,
} = coverLetterSlice.actions;

// Selectors
export const selectCurrentCoverLetter = (state: RootState) => state.coverLetter.currentCoverLetter;
export const selectTemplates = (state: RootState) => state.coverLetter.templates;
export const selectSelectedTemplateId = (state: RootState) => state.coverLetter.selectedTemplateId;
export const selectCoverLetterLoading = (state: RootState) => state.coverLetter.loading;
export const selectCoverLetterError = (state: RootState) => state.coverLetter.error;

export default coverLetterSlice.reducer;