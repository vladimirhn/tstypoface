import '../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';

import React, {FunctionComponent} from 'react';
import {ManageOrderSubjectWidget} from "./ManageOrderSubjectWidget";


export const OrderSubjectsPage: FunctionComponent = () => {

    return <div>

        <h1>Продукция</h1>

        <ManageOrderSubjectWidget/>

    </div>;
}