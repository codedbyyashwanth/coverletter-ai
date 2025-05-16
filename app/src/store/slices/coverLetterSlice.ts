// src/store/slices/coverLetterSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
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
        previewUrl: 'https://img.freepik.com/free-vector/cover-letter-template-design_742173-29424.jpg?t=st=1747391928~exp=1747395528~hmac=25ab01929b0eefadd70faeaf18c49e5719dbb715f243778243bdbdbb6b46ec65&w=1380',
    },
    {
        id: 'classic',
        name: 'Classic',
        type: 'classic',
        previewUrl: 'https://img.freepik.com/free-vector/simple-resignation-letter_23-2149291571.jpg?t=st=1747391946~exp=1747395546~hmac=448b3861c95d6cd618134822fbe5d7035993e58f00e913d6e9f8181db4a826c3&w=1380',
    },
    {
        id: 'creative',
        name: 'Creative',
        type: 'creative',
        previewUrl: 'https://img.freepik.com/free-vector/modern-simple-laura-copywriter-seo-letter_23-2149021340.jpg?t=st=1747391981~exp=1747395581~hmac=feb2c4bc29e93f526323962882170647f40cc02463653a336787efa2ca478cbf&w=1380',
    },
    {
        id: 'minimal',
        name: 'Minimal',
        type: 'minimal',
        previewUrl: 'https://img.freepik.com/free-vector/minimalist-duotone-sarah-construction-letter_23-2149007475.jpg?t=st=1747391994~exp=1747395594~hmac=a56dba90e9ac8f74ddc7c4ebbc79a764ca6b8397dd6715b3f17e7f67ab1fe306&w=1380',
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