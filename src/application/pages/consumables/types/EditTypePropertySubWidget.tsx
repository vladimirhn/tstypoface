import Consumer from "../../../../library/functions/interfaces/Consumer";
import React, {FunctionComponent} from "react";
import {InlineLayout} from "../../../../library/widgets/layouts/InlineLayout";

interface properties {
    index:number;
    value:string;
    setter:Consumer<any>;
}

export const EditTypePropertySubWidget: FunctionComponent<properties> = ({index, value, setter}) => {

    const label = "Свойство №" + (index + 1);
    const labelWidget = <>{label}</>

    const widget:JSX.Element = <input
        value={value || ""}
        onChange={(e) => {setter(e.target.value)}}
    />

    const removeButton =
        <button onClick={()=> setter(null)}>удалить</button>

    return <InlineLayout widgets={[labelWidget, widget, removeButton]}/>
}