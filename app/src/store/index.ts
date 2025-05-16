import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slices/resumeSlice';
import jobReducer from './slices/jobSlice';
import coverLetterReducer from './slices/coverLetterSlice';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    job: jobReducer,
    coverLetter: coverLetterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['coverLetter/setCoverLetter'],
        // Ignore these field paths in state
        ignoredPaths: ['coverLetter.currentCoverLetter.lastEdited'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;