import React, {FunctionComponent} from 'react';
import retreat from "../../../../library/navigation/retreat";
import {ConsumablesSubPage} from "../ConsumablesSubPage";

interface properties {
    selectedItem:any | undefined;
    navigationState:[Array<ConsumablesSubPage>, React.Dispatch<React.SetStateAction<ConsumablesSubPage[]>>];
}

export const EditItemWidget: FunctionComponent<properties> = ({selectedItem, navigationState}) => {

    const cancelButton = <button onClick={() => {navigationState[1](retreat(navigationState[0]))}}>Назад</button>

    console.log(selectedItem)

    return <div>
        {cancelButton}
    </div>
}