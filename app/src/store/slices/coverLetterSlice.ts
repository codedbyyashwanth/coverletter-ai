/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CoverLetterData, CoverLetterFields, Template } from '../../types/coverLetter';
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
        previewUrl: './modern.png',
    },
    {
        id: 'classic',
        name: 'Classic',
        type: 'classic',
        previewUrl: './classic.png',
    },
    {
        id: 'creative',
        name: 'Creative',
        type: 'creative',
        previewUrl: './creative.png',
    },
    {
        id: 'minimal',
        name: 'Minimal',
        type: 'minimal',
        previewUrl: './minimal.png',
    },
    {
        id: 'monogram',
        name: 'Monogram',
        type: 'monogram',
        previewUrl: './monogram.png',
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
        updateCoverLetterField: (state, action: PayloadAction<{
            field: keyof CoverLetterFields;
            value: string;
        }>) => {
            if (state.currentCoverLetter) {
                const { field, value } = action.payload;
                (state.currentCoverLetter.fields as any)[field] = value;
                state.currentCoverLetter.lastEdited = new Date();
            }
        },
        // New action for batch field updates
        updateCoverLetterFields: (state, action: PayloadAction<CoverLetterFields>) => {
            if (state.currentCoverLetter) {
                state.currentCoverLetter.fields = action.payload;
                state.currentCoverLetter.lastEdited = new Date();
            }
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
    updateCoverLetterField,
    updateCoverLetterFields, // New export
    setSelectedTemplate,
    setCoverLetterLoading,
    setCoverLetterError,
} = coverLetterSlice.actions;

// Selectors
export const selectCurrentCoverLetter = (state: RootState) => state.coverLetter.currentCoverLetter;
export const selectCoverLetterFields = (state: RootState) => state.coverLetter.currentCoverLetter?.fields;
export const selectTemplates = (state: RootState) => state.coverLetter.templates;
export const selectSelectedTemplateId = (state: RootState) => state.coverLetter.selectedTemplateId;
export const selectCoverLetterLoading = (state: RootState) => state.coverLetter.loading;
export const selectCoverLetterError = (state: RootState) => state.coverLetter.error;

export default coverLetterSlice.reducer;