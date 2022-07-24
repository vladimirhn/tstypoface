import '../../../../library/appearance/layouts/BasicAppLayout/pages.css';
import '../../../../library/appearance/themes/common/size.css'

import React, {useEffect, useState, FunctionComponent} from 'react';
import ConsumableType from "../../../domain/consumables/ConsumableType";
import {ConsumablesSubPage} from "../ConsumablesSubPage";
import retreat from "../../../../library/navigation/retreat";
import Data from "../../../../library/data/dataObject/Data";
import {TextInput} from "../../../../library/widgets/fieldInputs/TextInput";
import {SimpleTextInput} from "../../../../library/widgets/fieldInputs/SimpleTextInput";
import {EditTypePropertySubWidget} from "./EditTypePropertySubWidget";
import validateConsumableType from "./validateConsumableType";
import Repository from "../../../../library/data/backend/Repository";
import optimizeConsumableType from "./optimizeConsumableType";
import DataObject from "../../../../library/data/dataObject/DataObject";
import ConsumableProperty from "../../../domain/consumables/ConsumableProperty";
import {getFromObject, setToObject} from "../../../../library/data/dataObject/VanilaObjects";

interface properties {
    navigation:Array<ConsumablesSubPage>;
    updateNavigation: React.Dispatch<React.SetStateAction<ConsumablesSubPage[]>>;
    type:Data<ConsumableType> | undefined;
}

export const ProcessConsumableTypeWidget: FunctionComponent<properties> = ({type, navigation, updateNavigation}) => {

    if (!type) {
        console.log("No ConsumableType passed to ProcessConsumableTypeWidget")
        return null;
    }

    const properties:Array<any> = getFromObject(type.getObject(), ConsumableType.properties) || [];

    const addProperty = () => {
        properties.push({});
        type.setValueByField(ConsumableType.properties, properties);
    }

    const propsWidgets = properties.map((property:Data<any>, index) => {
        return <EditTypePropertySubWidget
            key={index}
            index={index}
            value={getFromObject(property, ConsumableProperty.propertyName)}
            setter={(newValue) => {

                if (newValue === null) {
                    properties.splice(index, 1);
                } else {
                    setToObject(properties[index], ConsumableProperty.propertyName, newValue);
                }
                type.setValueByField(ConsumableType.properties, properties);
            }}
        />;
    });

    const addPropButton = properties.length < 20 ? <button onClick={addProperty}>Добавить свойство</button> : null;

    const submitMethod = () => {
        Repository.empty(ConsumableType).insertData(optimizeConsumableType(type));
        updateNavigation(retreat(navigation))
    }

    const submitButton = validateConsumableType(type) ?
        <button onClick={submitMethod}>Сохранить</button>
        : null;

    return <>
        <button onClick={() => {updateNavigation(retreat(navigation))}}>
            Назад
        </button><br/><br/>

        <TextInput data={type} field={ConsumableType.type} label={"Тип расходного материала: "}/>

        {propsWidgets}
        {addPropButton}
        <br/>
        {submitButton}
    </>;
}