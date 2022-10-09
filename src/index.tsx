import React from 'react';
import ReactDOM from 'react-dom/client';
import './library/visual/appearance/themes/BasicAppTheme/index.css'
import './library/visual/appearance/layouts/BasicAppLayout/pages.css';
import {BasicLayoutApplication} from "./library/visual/appearance/layouts/BasicAppLayout/app/BasicLayoutApplication";
import PagesList from "./application/properties/PagesList";
import Pages from "./library/visual/pages/Pages";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BasicLayoutApplication
            pages={new Pages(PagesList)}
        />
    </React.StrictMode>
);
