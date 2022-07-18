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
import {TextInput} from "../../../library/widgets/fieldInputs/TextInput";
import {MainMenuEntry} from "../../../library/appearance/layouts/BasicAppLayout/menu/MainMenuEntry";
import {SimpleTextInput} from "../../../library/widgets/fieldInputs/SimpleTextInput";

interface properties {
    navigation:Array<ConsumablesSubPage>;
    updateNavigation: React.Dispatch<React.SetStateAction<ConsumablesSubPage[]>>;
}

export const AddNewConsumableTypeWidget: FunctionComponent<properties> = ({navigation, updateNavigation}) => {

    const [newType, updateNewType] = useState<Data<ConsumableType>>(Data.pure);
    useEffect(() => {
        newType.update = updateNewType;
        newType.setValueByField(ConsumableType.properties, []);
        }, [])

    const properties:Array<any> = newType.getValueByField(ConsumableType.properties) || [];

    const addProperty = () => {
        properties.push("");
        newType.setValueByField(ConsumableType.properties, properties);
    }

    const propsWidgets = properties.map((property, index) => {
        return <SimpleTextInput
            key={index}
            label={"Свойство №" + (index + 1)}
            value={property}
            setter={(newValue) => {property = newValue}}
        />;
    });

    const addPropButton = properties.length < 20 ? <button onClick={addProperty}>Добавить свойство</button> : null;

    return <>
        <button onClick={() => {updateNavigation(retreat(navigation))}}>
            Назад
        </button><br/><br/>

        <TextInput data={newType} field={ConsumableType.type} label={"Тип расходного материала: "}/>

        {propsWidgets}
        {addPropButton}
    </>;
}