import '../../../library/appearance/layouts/BasicAppLayout/pages.css';
import '../../../library/appearance/themes/common/size.css'

import React, {useEffect, useState, FunctionComponent, useReducer} from 'react';
import Domain from "../../domain/Domain";
import FinancialTransaction from "../../domain/enterprises/FinancialTransaction";
import DataSet from "../../../library/data/dataSet/DataSet";
import TableConfig from "../../../library/widgets/tables/dataSetTable/TableConfig";
import Repository from "../../../library/data/backend/Repository";
import {DataSetTable} from "../../../library/widgets/tables/dataSetTable/DataSetTable";

export const EnterprisesPage: FunctionComponent = () => {

    const [, forceUpdate] = useReducer((x) => x + 1, 0, (a) => a);
    const [finTransRepository, ] = useState<Repository<any>>(new Repository<any>(Domain.get(FinancialTransaction), forceUpdate));

    useEffect(() => {
        finTransRepository.fetchAll();
    }, [])

    return (
        <div>
            <br/>
            <span>Баланс: {sum(finTransRepository.dataSet)}</span>

            <br/><br/>

            <DataSetTable
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