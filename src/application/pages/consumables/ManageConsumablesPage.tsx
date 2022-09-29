import '../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';
import '../../../library/visual/appearance/themes/common/size.css'

import React, {FunctionComponent} from 'react';
import {ManageConsumablesWidget} from "./ManageConsumablesWidget";

export const ManageConsumablesPage: FunctionComponent = () => {

    return <div>

        <h1>Расходные материалы</h1>

        <ManageConsumablesWidget/>

    </div>
}