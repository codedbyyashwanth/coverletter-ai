import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'sonner';

const App: React.FC = () => {
    return (
        <Provider store={store}>
        <BrowserRouter>
            <AppRoutes />
            <Toaster />
        </BrowserRouter>
        </Provider>
    );
};

export default App;