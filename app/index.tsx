import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
// import {store} from './store/store.ts';
// import {Provider} from 'react-redux';
import './assets/styles/main.scss';

const container = document.getElementById("root");

if (container) {
    const root = createRoot(container);
    root .render(

            <App />

    )
} else {
    throw new Error("Root element with ID 'root' was not found in the document.")
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App/>)