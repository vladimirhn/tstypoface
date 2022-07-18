import Consumer from "../../../../library/functions/interfaces/Consumer";
import React, {FunctionComponent} from "react";
import {InputLayout} from "../../../../library/widgets/fieldInputs/InputsLayout";

interface properties {
    label?:string;
    value:string;
    setter:Consumer<any>;
}

export const EditConsumableTypePropertiesSubWidget: FunctionComponent<properties> = ({label, value, setter}) => {

    let widget:JSX.Element = <input
        value={value || ""}
        onChange={(e) => {setter(e.target.value)}}
    />

    return <InputLayout label={label} widget={widget}/>
}