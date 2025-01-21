import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './app/store';
import { UploadDocProvider } from './pages/TestEditor/store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <UploadDocProvider>
            <App />
          </UploadDocProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
