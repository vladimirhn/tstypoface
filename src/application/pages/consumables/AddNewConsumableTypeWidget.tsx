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
import {ConsumablesSubPage} from "./ConsumablesSubPage";
import Consumer from "../../../library/functions/interfaces/Consumer";
import retreat from "../../../library/navigation/retreat";
import Data from "../../../library/data/dataObject/Data";

interface properties {
    navigation:Array<ConsumablesSubPage>;
    updateNavigation: React.Dispatch<React.SetStateAction<ConsumablesSubPage[]>>;
}

export const AddNewConsumableTypeWidget: FunctionComponent<properties> = ({navigation, updateNavigation}) => {

    const [newType, updateNewType] = useState<Data<ConsumableType>>(Data.pure);
    useEffect(() => {newType.updater = updateNewType;}, [])

    return <>
        <button onClick={() => {updateNavigation(retreat(navigation))}}>
            Назад
        </button><br/><br/>

        <input
            value={newType.getValueByField(ConsumableType.type) || ""}
            onChange={(e) => {
                newType.setValueByField(ConsumableType.type, e.target.value)
                }
            }
        />
    </>;
}