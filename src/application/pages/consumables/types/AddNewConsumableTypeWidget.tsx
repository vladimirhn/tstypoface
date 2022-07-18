import '../../../../library/appearance/layouts/BasicAppLayout/pages.css';
import '../../../../library/appearance/themes/common/size.css'

import React, {useEffect, useState, FunctionComponent} from 'react';
import ConsumableType from "../../../domain/consumables/ConsumableType";
import {ConsumablesSubPage} from "../ConsumablesSubPage";
import retreat from "../../../../library/navigation/retreat";
import Data from "../../../../library/data/dataObject/Data";
import {TextInput} from "../../../../library/widgets/fieldInputs/TextInput";
import {SimpleTextInput} from "../../../../library/widgets/fieldInputs/SimpleTextInput";

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
            setter={(newValue) => {
                properties[index] = newValue;
                newType.setValueByField(ConsumableType.properties, properties);
            }}
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