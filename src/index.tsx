import React from 'react';
import ReactDOM from 'react-dom/client';
import './library/appearance/themes/BasicAppTheme/index.css'
import './library/appearance/layouts/BasicAppLayout/pages.css';
import {BasicLayoutApplication} from "./library/appearance/layouts/BasicAppLayout/app/BasicLayoutApplication";
import Pages from "./application/properties/Pages";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BasicLayoutApplication
            pages={Pages}
        />
    </React.StrictMode>
);
