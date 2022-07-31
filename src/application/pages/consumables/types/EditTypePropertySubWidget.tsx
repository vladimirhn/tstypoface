import Consumer from "../../../../library/functions/interfaces/Consumer";
import React, {FunctionComponent} from "react";
import {InlineLayout} from "../../../../library/widgets/layouts/InlineLayout";
import {getFromObject, setToObject} from "../../../../library/data/dataObject/VanilaObjects";
import ConsumableProperty from "../../../domain/consumables/ConsumableProperty";

interface properties {
    index:number;
    property:any
    setter:Consumer<any>;
}

export const EditTypePropertySubWidget: FunctionComponent<properties> = ({index, property, setter}) => {

    const label = "Свойство №" + (index + 1);
    const labelWidget = <>{label}</>

    const widget:JSX.Element = <input
        value={getFromObject(property, ConsumableProperty.propertyName) || ""}
        onChange={(e) => {setter(e.target.value)}}
    />

    const remove = () => {
        const id:string = getFromObject(property, ConsumableProperty.id);
        if (id) {
            setToObject(property, ConsumableProperty.id, "-" + id)
            setter(getFromObject(property, ConsumableProperty.propertyName));
        } else {
            setter(null);
        }
    }

    const removeButton =
        <button onClick={remove}>удалить свойство</button>

    return <InlineLayout widgets={[labelWidget, widget, removeButton]} defaultWidth={200}/>
}