import React, {FunctionComponent} from "react";
import DataObject from "../../../../data/dataObject/DataObject";

interface properties {
    entry:DataObject<any>
}

export const ComboBoxFromForeignOption: FunctionComponent<properties> = ({entry}) => {

    return <option value={entry.data?.id}>
        {entry.mainFieldData}
    </option>
 }