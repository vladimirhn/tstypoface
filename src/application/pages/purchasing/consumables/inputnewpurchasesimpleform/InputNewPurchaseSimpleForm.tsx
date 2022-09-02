import '../../../../../library/appearance/layouts/BasicAppLayout/pages.css';

import React, {FunctionComponent} from 'react';

import Repository from "../../../../../library/data/backend/Repository";
import PurchasingConsumables from "../../../../domain/purchasing/PurchasingConsumables";

interface properties {
    repository:Repository<PurchasingConsumables>;
}

export const InputNewPurchaseSimpleForm: FunctionComponent<properties>= ({repository}) => {

    return <div>
        </div>
}