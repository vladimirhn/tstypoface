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
import {ConsumableItemsWidget} from "./ConsumableItemsWidget";
import {ConsumablesSubPage} from "./ConsumablesSubPage";
import {AddNewConsumableTypeWidget} from "./AddNewConsumableTypeWidget";
import proceed from "../../../library/navigation/proceed";

export const ManageConsumablesPage: FunctionComponent = () => {

    const [navigation, updateNavigation] = useState<Array<ConsumablesSubPage>>([]);
    const [type, setType] = useState<DataObject<ConsumableType> | undefined>(undefined);

    if (navigation.length === 0) {
        return <>
            <div>
                <ChooseConsumableTypeWidget
                    setter={setType}
                />
            </div>

            <div>
                <button onClick={() => {
                    updateNavigation(proceed(navigation, ConsumablesSubPage.ADD))
                }}>Добавить
                </button>
            </div>

            <div>
                <ConsumableItemsWidget
                    type={type}
                />
            </div>
        </>;

    } else {
        switch (navigation[0]) {
            case ConsumablesSubPage.ADD:
                return <AddNewConsumableTypeWidget navigation={navigation} updateNavigation={updateNavigation}/>
        }
    }
}