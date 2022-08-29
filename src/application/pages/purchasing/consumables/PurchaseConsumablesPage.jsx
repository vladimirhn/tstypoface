import '../../../../library/appearance/layouts/BasicAppLayout/pages.css';

import React, {useEffect, useReducer, useState} from 'react';
import InputNewPurchaseSimpleForm from "./inputnewpurchasesimpleform/InputNewPurchaseSimpleForm";
import PurchasingConsumablesTableWidget from "./PurchasingConsumablesTableWidget";
import PurchasingConsumablesDataSet from "../../../domain/purchasingConsumables/PurchasingConsumablesDataSet";
import DataSetManager from "../../../../library/data/dataSet/DataSetManager";
import dataUpdateEffect from "../../../../library/data/dataSet/events/DataUpdateEffect";

export default function PurchaseConsumablesPage() {

    const [dataSet, ] = useState(DataSetManager.getNew(PurchasingConsumablesDataSet));

    const [, forceUpdate] = useReducer((x) => x + 1, 0, (a) => a);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(dataUpdateEffect(dataSet, forceUpdate), []);

    return (
        <div>

            <h1>Закупка расходных материалов</h1>

            <InputNewPurchaseSimpleForm
                dataSet={dataSet}
            />

            <PurchasingConsumablesTableWidget
                dataSet={dataSet}
            />
        </div>
    );
}