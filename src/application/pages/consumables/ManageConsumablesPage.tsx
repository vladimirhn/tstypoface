import '../../../library/appearance/layouts/BasicAppLayout/pages.css';
import '../../../library/appearance/themes/common/size.css'

import React, {useEffect, useState, FunctionComponent, useReducer} from 'react';
import Domain from "../../domain/Domain";
import FinancialTransaction from "../../domain/enterprises/FinancialTransaction";
import DataSet from "../../../library/data/dataSet/DataSet";
import TableConfig from "../../../library/widgets/tables/dataSetTable/TableConfig";
import Repository from "../../../library/data/backend/Repository";
import {DataSetTable} from "../../../library/widgets/tables/dataSetTable/DataSetTable";
import ConsumableType from "../../domain/consumables/ConsumableType";

export const ManageConsumablesPage: FunctionComponent = () => {

    const [, forceUpdate] = useReducer((x) => x + 1, 0, (a) => a);
    const [consumableTypesRepository, ] = useState<Repository<any>>(new Repository<any>(Domain.get(ConsumableType), forceUpdate));

    useEffect(() => {
        consumableTypesRepository.fetchAll();
    }, [])

    return (
        <div>
            <DataSetTable
                repository={consumableTypesRepository}
                config={new TableConfig().noDelete()}
            />
        </div>
    );
}