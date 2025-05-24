import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CoverLetterData, Template } from '../../types/coverLetter';
import type { RootState } from '../index';

interface CoverLetterState {
    currentCoverLetter: CoverLetterData | null;
    templates: Template[];
    editedContent: string | null;
    selectedTemplateId: string | null;
    loading: boolean;
    error: string | null;
}

const initialTemplates: Template[] = [
    {
        id: 'modern',
        name: 'Modern',
        type: 'modern',
        previewUrl: 'https://img.freepik.com/free-vector/cover-letter-template-design_742173-29424.jpg',
    },
    {
        id: 'classic',
        name: 'Classic',
        type: 'classic',
        previewUrl: 'https://img.freepik.com/free-vector/simple-resignation-letter_23-2149291571.jpg',
    },
    {
        id: 'creative',
        name: 'Creative',
        type: 'creative',
        previewUrl: 'https://img.freepik.com/free-vector/modern-simple-laura-copywriter-seo-letter_23-2149021340.jpg',
    },
    {
        id: 'minimal',
        name: 'Minimal',
        type: 'minimal',
        previewUrl: 'https://img.freepik.com/free-vector/minimalist-duotone-sarah-construction-letter_23-2149007475.jpg',
    },
    {
        id: 'monogram',
        name: 'Monogram',
        type: 'monogram',
        previewUrl: 'https://img.freepik.com/free-vector/minimalist-duotone-sarah-construction-letter_23-2149007475.jpg',
    },
];

const initialState: CoverLetterState = {
    currentCoverLetter: null,
    templates: initialTemplates,
    editedContent: null,
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
        state.editedContent = null;
        state.error = null;
        },
        clearCoverLetter: (state) => {
        state.currentCoverLetter = null;
        },
        updateEditedContent: (state, action: PayloadAction<string>) => {
            state.editedContent = action.payload;
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
  updateEditedContent,
  setSelectedTemplate,
  setCoverLetterLoading,
  setCoverLetterError,
} = coverLetterSlice.actions;

// Selectors
export const selectEditedContent = (state: RootState) => state.coverLetter.editedContent;
export const selectCurrentCoverLetter = (state: RootState) => state.coverLetter.currentCoverLetter;
export const selectTemplates = (state: RootState) => state.coverLetter.templates;
export const selectSelectedTemplateId = (state: RootState) => state.coverLetter.selectedTemplateId;
export const selectCoverLetterLoading = (state: RootState) => state.coverLetter.loading;
export const selectCoverLetterError = (state: RootState) => state.coverLetter.error;

export default coverLetterSlice.reducer;