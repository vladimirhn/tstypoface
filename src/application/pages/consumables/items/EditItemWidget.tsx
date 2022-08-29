import React, {FunctionComponent, useEffect, useState} from 'react';
import retreat from "../../../../library/navigation/retreat";
import {ConsumablesSubPage} from "../ConsumablesSubPage";
import DataObject from "../../../../library/data/dataObject/DataObject";
import ConsumableType from "../../../domain/consumables/ConsumableType";
import StateElement from "../../../../library/data/dataObject/StateElement";
import VanillaStateElement from "../../../../library/data/dataObject/vanila/VanillaStateElement";
import {getFromObject, setToObject} from "../../../../library/data/dataObject/vanila/VanilaObjects";
import ConsumableItem from "../../../domain/consumables/ConsumableItem";
import ConsumablesView from "../../../domain/consumables/ConsumablesView";
import Repository from "../../../../library/data/backend/Repository";
import BackendInteraction from "../../../../library/data/backend/BackendInteraction";
import {ProcessItemWidget} from "./ProcessItemWidget";
import VanillaStateMap from "../../../../library/data/dataObject/vanila/VanillaStateMap";
import Data from "../../../../library/data/dataObject/Data";
import ConsumablePropertyValue from "../../../domain/consumables/ConsumablePropertyValue";

interface properties {
    type:DataObject<ConsumableType> | undefined;
    selectedItemState:[any | undefined, React.Dispatch<React.SetStateAction<any | undefined>>];
    navigationState:[Array<ConsumablesSubPage>, React.Dispatch<React.SetStateAction<ConsumablesSubPage[]>>];
}

export const EditItemWidget: FunctionComponent<properties> = ({type, selectedItemState, navigationState}) => {

    const selectedItem:any | undefined = selectedItemState[0];

    const itemState:StateElement<any> = new VanillaStateElement<any>(useState<any>(selectedItem || {}));
    const propsState:VanillaStateMap<Map<any,any>> = new VanillaStateMap<Map<any,any>>(useState<any>(new Map()));

    useEffect(() => {

            for (let property of getFromObject(selectedItem, ConsumablesView.properties) || []) {
                const propDatum: Data<ConsumablesView> = Data.from(property);
                const propertyId = propDatum.getValueByField(ConsumablesView.propertyId);
                const itemId = getFromObject(selectedItem, ConsumablesView.itemId);

                propsState
                    .setValue(propertyId, ConsumablePropertyValue.id, propDatum.getValueByField(ConsumablesView.valueId))
                    .setValue(propertyId, ConsumablePropertyValue.itemId, itemId)
                    .setValue(propertyId, ConsumablePropertyValue.propertyId, propertyId)
                    .setValue(propertyId, ConsumablePropertyValue.propertyValue, propDatum.getValueByField(ConsumablesView.valueValue))
                    .runSetter();
            }
    }, [selectedItem])

    if (!type) return null;

    const cancelButton = <button onClick={() => {navigationState[1](retreat(navigationState[0]))}}>Назад</button>

    const save = () => {
        const item:{} = {};
        setToObject(item, ConsumableItem.id, getFromObject(itemState.getObject(), ConsumablesView.itemId))
        setToObject(item, ConsumableItem.item, getFromObject(itemState.getObject(), ConsumablesView.itemName));
        setToObject(item, ConsumableItem.packageCapacity, getFromObject(itemState.getObject(), ConsumablesView.packageCapacity));
        setToObject(item, ConsumableItem.typeId, type.data?.id);

        setToObject(item, ConsumableItem.propertyValues, propsState.getArray());
        Repository.empty(ConsumableItem).updateObject(item);

        const afterSave = () => {
            selectedItemState[1](undefined);
            navigationState[1](retreat(navigationState[0]));
        }
        setTimeout(afterSave, BackendInteraction.WAIT_REQUEST);

    }

    const saveButton = <button onClick={save} disabled={!itemState.getValue(ConsumablesView.itemName)}>Сохранить</button>
    return <div>

        {cancelButton}
        <ProcessItemWidget type={type} itemState={itemState} propsState={propsState}/>
        {saveButton}
    </div>
}