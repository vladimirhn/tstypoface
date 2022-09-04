import '../../../../library/appearance/layouts/BasicAppLayout/pages.css';

import React, {FunctionComponent, useEffect, useState} from 'react';
import Repository from "../../../../library/data/backend/Repository";
import TableConfig from "../../../../library/widgets/tables/dataSetTable/TableConfig";
import {DataSetTable} from "../../../../library/widgets/tables/dataSetTable/DataSetTable";
import PurchasingConsumables from "../../../domain/purchasing/PurchasingConsumables";
import {InsertPurchaseConsumablesWidget} from "./inputnewpurchasesimpleform/InsertPurchaseConsumablesWidget";

export const PurchaseConsumablesPage: FunctionComponent = () => {

    const [purchasingRepository, setRepository] = useState<Repository<PurchasingConsumables>>(Repository.empty(PurchasingConsumables));

    useEffect(() => {
        purchasingRepository.initialFetchAll(setRepository);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>

            <h1>Закупка расходных материалов</h1>

            <InsertPurchaseConsumablesWidget repository={purchasingRepository}/>

            <DataSetTable
                repository={purchasingRepository}
                config={new TableConfig().noDelete()}
            />
        </div>
    );
}