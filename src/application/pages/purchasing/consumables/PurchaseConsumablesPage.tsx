import '../../../../library/appearance/layouts/BasicAppLayout/pages.css';

import React, {FunctionComponent, useEffect, useState} from 'react';
import {InputNewPurchaseSimpleForm} from "./inputnewpurchasesimpleform/InputNewPurchaseSimpleForm";
import Repository from "../../../../library/data/backend/Repository";
import TableConfig from "../../../../library/widgets/tables/dataSetTable/TableConfig";
import {DataSetTable} from "../../../../library/widgets/tables/dataSetTable/DataSetTable";
import PurchasingConsumables from "../../../domain/purchasing/PurchasingConsumables";

export const PurchaseConsumablesPage: FunctionComponent = () => {

    const [purchasingRepository, setRepository] = useState<Repository<PurchasingConsumables>>(Repository.empty(PurchasingConsumables));

    useEffect(() => {
        purchasingRepository.initialFetchAll(setRepository);
    }, [])

    return (
        <div>

            <h1>Закупка расходных материалов</h1>

            <InputNewPurchaseSimpleForm repository={purchasingRepository}/>

            <DataSetTable
                repository={purchasingRepository}
                config={new TableConfig().noDelete()}
            />
        </div>
    );
}