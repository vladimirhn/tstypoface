import '../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';

import React, {FunctionComponent} from 'react';
import OrdersCompoundWidget from "./OrdersCompoundWidget";


export const OrdersPage: FunctionComponent = () => {

    return <div>

        <h1>Заказы</h1>

        <OrdersCompoundWidget/>

    </div>
}