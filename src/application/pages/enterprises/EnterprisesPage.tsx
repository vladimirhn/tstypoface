import '../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';
import '../../../library/visual/appearance/themes/common/size.css'

import React, {useEffect, useState, FunctionComponent, useReducer} from 'react';
import FinancialTransaction from "../../domain/enterprises/FinancialTransaction";
import DataSet from "../../../library/data/dataSet/DataSet";
import TableConfig from "../../../library/visual/widgets/tables/dataSetTable/TableConfig";
import {DataSetTableWidget} from "../../../library/visual/widgets/tables/dataSetTable/DataSetTableWidget";
import Repository from "../../../library/data/backend/Repository";

export const EnterprisesPage: FunctionComponent = () => {

    const [finTransRepository, setRepository] = useState<Repository<any>>(Repository.empty(FinancialTransaction));

    useEffect(() => {
        finTransRepository.initialFetchAll(setRepository);
    }, [])

    return (
        <div>
            <br/>
            <span>Баланс: {sum(finTransRepository.dataSet)}</span>

            <br/><br/>

            <DataSetTableWidget
                repository={finTransRepository}
                config={new TableConfig().noDelete().inlineFilters()}
            />
        </div>
    );
}

const sum = (data:DataSet<any> | undefined) => {

    if (!data) return 0;

    let sum = 0;

    for (let t of data.entriesArray) {
        sum += Number(t.data?.getValueByField(FinancialTransaction.moneyAmount) || 0);
    }

    return Math.round(sum * 100) / 100;
}