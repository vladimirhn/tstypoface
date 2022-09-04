import React, {FunctionComponent, useEffect, useState} from 'react';
import {SimpleTextInput} from "../../../../library/widgets/fieldInputs/SimpleTextInput";
import ConsumablesView from "../../../domain/consumables/ConsumablesView";
import StateElement from "../../../../library/data/dataObject/StateElement";
import DataObject from "../../../../library/data/dataObject/DataObject";
import ConsumableType from "../../../domain/consumables/ConsumableType";
import Repository from "../../../../library/data/backend/Repository";
import VanillaStateMap from "../../../../library/data/dataObject/vanila/VanillaStateMap";
import ConsumablePropertyValue from "../../../domain/consumables/ConsumablePropertyValue";
import {SimpleNumericInput} from "../../../../library/widgets/fieldInputs/numeric/SimpleNumericInput";

interface properties {
    type:DataObject<ConsumableType>;
    itemState:StateElement<any>;
    propsState:VanillaStateMap<any>;
}

export const ProcessItemWidget: FunctionComponent<properties> = ({type, itemState, propsState}) => {

    const [repository, setRepository] = useState<Repository<any>>(Repository.empty(ConsumablesView));

    useEffect(() => {
        Repository.empty(ConsumablesView).initialFetchFiltered(DataObject.withField(ConsumablesView.typeId, type?.data?.id), setRepository);
    }, [type])

    const propertiesMapObject:any = repository.dataSet.getFirst()?.data?.getValueByField(ConsumablesView.propertyIds);

    const editNameSubWidget = <SimpleTextInput
        label={"Название"}
        value={itemState.getValue(ConsumablesView.itemName)}
        setter={(newVal) => {itemState.setValue(ConsumablesView.itemName, newVal)}}
    />

    const editCapacitySubWidget = <SimpleNumericInput
        label={"Ст. размер пачки"}
        value={itemState.getValue(ConsumablesView.packageCapacity)}
        setter={(newVal) => {itemState.setValue(ConsumablesView.packageCapacity, newVal)}}
    />

    const editPropertiesSubWidget:JSX.Element[] = [];
    let i = 0;

    for (let field in propertiesMapObject) {

        const editPropSubWidget = <SimpleTextInput
            key={++i}
            label={propertiesMapObject[field]}
            value={propsState.getValue(field, ConsumablePropertyValue.propertyValue)}
            setter={
                (newVal) => {
                    propsState
                        .setValue(field, ConsumablePropertyValue.propertyId, field)
                        .setValue(field, ConsumablePropertyValue.propertyValue, newVal)
                        .runSetter();
                }
            }
        />

        editPropertiesSubWidget.push(editPropSubWidget)
    }


    return <div>
        {editNameSubWidget}
        {editCapacitySubWidget}
        {editPropertiesSubWidget}
    </div>
}