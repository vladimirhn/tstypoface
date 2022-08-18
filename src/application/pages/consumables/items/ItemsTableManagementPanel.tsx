import React, {FunctionComponent} from 'react';
import proceed from "../../../../library/navigation/proceed";
import {ConsumablesSubPage} from "../ConsumablesSubPage";

interface properties {
    selectedItemId:string | undefined;
    navigationState:[Array<ConsumablesSubPage>, React.Dispatch<React.SetStateAction<ConsumablesSubPage[]>>];
}

export const ItemsTableManagementPanel: FunctionComponent<properties> = ({selectedItemId, navigationState}) => {

    const addButton = <button onClick={() => {navigationState[1](proceed(navigationState[0], ConsumablesSubPage.ADD_ITEM)) }}>создать расходник</button>
    const editButton = <button onClick={() => {navigationState[1](proceed(navigationState[0], ConsumablesSubPage.EDIT_ITEM)) }}>изменить расходник</button>;

    const button = selectedItemId ? editButton : addButton;

    return <div>
        {button}
    </div>
}