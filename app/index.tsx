import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {store} from './store/store';
import {Provider} from 'react-redux';
import './assets/styles/main.scss';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById("root");

if (container) {
    const root = createRoot(container);
    root .render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    )
} else {
    throw new Error("Root element with ID 'root' was not found in the document.")
}
