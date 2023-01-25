import '@logseq/libs';

import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';

import { logError } from './shared/logError';

// @ts-expect-error
const css = (t, ...args) => String.raw(t, ...args);

function main() {
  const root = ReactDOM.createRoot(document.getElementById('app')!);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  function createModel() {
    return {
      show() {
        logseq.showMainUI();
      },
    };
  }

  logseq.provideModel(createModel());
  logseq.setMainUIInlineStyle({
    zIndex: 11,
  });

  const openIconName = 'template-plugin-open';

  logseq.provideStyle(css`
    .${openIconName} {
      opacity: 0.55;
      font-size: 20px;
      margin-top: 4px;
    }

    .${openIconName}:hover {
      opacity: 0.9;
    }
  `);

  logseq.App.registerUIItem('toolbar', {
    key: openIconName,
    template: `
      <div data-on-click="show" class="${openIconName}">⚙️</div>
    `,
  });
}

if (process.env.NODE_ENV === 'development') {
  const root = ReactDOM.createRoot(document.getElementById('app')!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

logseq.ready(main).catch(logError);
