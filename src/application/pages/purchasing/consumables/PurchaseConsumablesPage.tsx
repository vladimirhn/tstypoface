import '../../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';

import React, {FunctionComponent, useEffect, useState} from 'react';
import Repository from "../../../../library/data/backend/Repository";
import TableConfig from "../../../../library/visual/widgets/tables/dataSetTable/TableConfig";
import {DataSetTableWidget} from "../../../../library/visual/widgets/tables/dataSetTable/DataSetTableWidget";
import PurchasingConsumables from "../../../domain/purchasing/PurchasingConsumables";
import {ProcessPurchaseConsumableWidget} from "./inputnewpurchasesimpleform/ProcessPurchaseConsumableWidget";
import SharedServices from "../../../../library/SharedServices";

export const PurchaseConsumablesPage: FunctionComponent = () => {

    const [purchasingRepository, setRepository] = useState<Repository<PurchasingConsumables>>(Repository.empty(PurchasingConsumables));

    useEffect(() => {
        purchasingRepository.initialFetchAll(setRepository);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sharedServices:SharedServices = new SharedServices();
    sharedServices.repository = purchasingRepository;

    const tableConfig:TableConfig = new TableConfig()
        .processLinesWith(<ProcessPurchaseConsumableWidget sharedServices={sharedServices}/>)

    return <div>

        <h1>Закупка расходных материалов</h1>

        <DataSetTableWidget
            repository={purchasingRepository}
            config={tableConfig}
            sharedServices={sharedServices}
        />

    </div>;
}