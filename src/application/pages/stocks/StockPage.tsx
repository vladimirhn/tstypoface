import '../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';

import React, {FunctionComponent, useEffect, useState} from 'react';
import Repository from "../../../library/data/backend/Repository";
import Stock from "../../domain/stocks/Stock";
import {DataSetTableWidget} from "../../../library/visual/widgets/tables/dataSetTable/DataSetTableWidget";
import TableConfig from "../../../library/visual/widgets/tables/dataSetTable/TableConfig";


export const StockPage: FunctionComponent = () => {

    const [stockRepository, setRepository] = useState<Repository<Stock>>(Repository.empty(Stock));

    useEffect(() => {
        stockRepository.initialFetchAll(setRepository);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div>

        <h1>Склад</h1>

        <DataSetTableWidget
            repository={stockRepository}
            config={new TableConfig().noDelete()}
        />

    </div>;
}