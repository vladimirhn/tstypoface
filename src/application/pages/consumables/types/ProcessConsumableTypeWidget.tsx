import '../../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';
import '../../../../library/visual/appearance/themes/common/size.css'

import React, {FunctionComponent} from 'react';
import ConsumableType from "../../../domain/consumables/ConsumableType";
import {ConsumablesSubPage} from "../ConsumablesSubPage";
import retreat from "../../../../library/navigation/retreat";
import Data from "../../../../library/data/dataObject/Data";
import {TextInput} from "../../../../library/visual/widgets/fieldInputs/text/TextInput";
import {EditTypePropertySubWidget} from "./EditTypePropertySubWidget";
import validateConsumableType from "./validateConsumableType";
import Repository from "../../../../library/data/backend/Repository";
import optimizeConsumableType from "./optimizeConsumableType";
import ConsumableProperty from "../../../domain/consumables/ConsumableProperty";
import {getFromObject, setToObject} from "../../../../library/data/dataObject/vanila/VanilaObjects";

interface properties {
    navigation:Array<ConsumablesSubPage>;
    updateNavigation: React.Dispatch<React.SetStateAction<ConsumablesSubPage[]>>;
    type:Data<ConsumableType> | undefined;
    repository:Repository<ConsumableType>;
}

export const ProcessConsumableTypeWidget: FunctionComponent<properties> = ({type, repository, navigation, updateNavigation}) => {

    if (!type) {
        console.log("No ConsumableType passed to ProcessConsumableTypeWidget")
        return null;
    }

    const properties:Array<any> = getFromObject(type.getObject(), ConsumableType.properties) || [];

    const addProperty = () => {
        properties.push({});
        type.setValueByField(ConsumableType.properties, properties);
    }

    const propsWidgets = properties.map((property:any, index) => {

        const id:string = getFromObject(property, ConsumableProperty.id);
        const noId:boolean = !id;
        const idNotToDelete = id && !id.startsWith('-');

        if (noId || idNotToDelete) {
            return <EditTypePropertySubWidget
                key={index}
                index={index}
                property={property}
                setter={(newValue) => {

                    if (newValue === null) {
                        properties.splice(index, 1);
                    } else {
                        setToObject(properties[index], ConsumableProperty.propertyName, newValue);
                    }
                    type.setValueByField(ConsumableType.properties, properties);
                }}
            />;
        } else return null;
    });

    const addPropButton = properties.length < 20 ? <button onClick={addProperty}>Добавить свойство</button> : null;

    const submitMethod = () => {
        if (type.id) {
            repository.updateData(optimizeConsumableType(type));
        } else {
            repository.insertData(optimizeConsumableType(type));
        }
        updateNavigation(retreat(navigation))
    }

    const submitButton = validateConsumableType(type) ?
        <button onClick={submitMethod}>Сохранить</button>
        : null;

    return <>
        <button onClick={() => {updateNavigation(retreat(navigation))}}>
            Отмена
        </button><br/><br/>

        <TextInput data={type} field={ConsumableType.type} label={"Тип расходного материала: "}/>

        {propsWidgets}
        {addPropButton}
        <br/><br/>
        {submitButton}
    </>;
}