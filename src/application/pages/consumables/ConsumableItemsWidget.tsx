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
import {ChooseConsumableTypeWidget} from "./ChooseConsumableTypeWidget";
import DataObject from "../../../library/data/dataObject/DataObject";

export const ManageConsumablesPage: FunctionComponent = () => {

    const [type, setType] = useState<DataObject<ConsumableType> | undefined>(undefined);

    return <>
        <div>
            <ChooseConsumableTypeWidget
                setter={setType}
            />
        </div>

        <div>

        </div>
    </>;
}