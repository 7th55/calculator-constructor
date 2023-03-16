import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Store
import { Provider } from 'react-redux';
import { store } from './app/store';
// React DnD
import { DndProvider } from 'react-dnd-multi-backend';
// Styles
import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';

// ...

<Global
  styles={css`
    ${emotionNormalize}
    html,
    body {
      padding: 0;
      margin: 0;
      background: white;
      min-height: 100%;
      font-family: Helvetica, Arial, sans-serif;
    }
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  `}
/>;

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <DndProvider options={HTML5toTouch}>
      <Provider store={store}>
        <App />
      </Provider>
    </DndProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
