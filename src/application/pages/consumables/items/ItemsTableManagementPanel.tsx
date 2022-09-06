import React, {Dispatch, FunctionComponent, SetStateAction} from 'react';
import proceed from "../../../../library/navigation/proceed";
import {ConsumablesSubPage} from "../ConsumablesSubPage";
import {InlineLayout} from "../../../../library/visual/widgets/layouts/InlineLayout";
import Repository from "../../../../library/data/backend/Repository";
import ConsumableItem from "../../../domain/consumables/ConsumableItem";
import {getFromObject} from "../../../../library/data/dataObject/vanila/VanilaObjects";
import ConsumablesView from "../../../domain/consumables/ConsumablesView";
import BackendInteraction from "../../../../library/data/backend/BackendInteraction";

interface properties {
    selectedItemState:[any | undefined, Dispatch<SetStateAction<any | undefined>>];
    navigationState:[Array<ConsumablesSubPage>, React.Dispatch<React.SetStateAction<ConsumablesSubPage[]>>];
}

export const ItemsTableManagementPanel: FunctionComponent<properties> = ({selectedItemState, navigationState}) => {

    const selectedItem = selectedItemState[0];

    const addButton = <button onClick={() => {navigationState[1](proceed(navigationState[0], ConsumablesSubPage.ADD_ITEM)) }}>создать расходник</button>
    const editButton = <button onClick={() => {navigationState[1](proceed(navigationState[0], ConsumablesSubPage.EDIT_ITEM)) }}>редактировать расходник</button>;

    const deleteEntry = () => {
        Repository.empty(ConsumableItem).delete(getFromObject(selectedItem, ConsumablesView.itemId));
        setTimeout(()=>{selectedItemState[1](undefined)}, BackendInteraction.WAIT_REQUEST);
    }

    const deleteButton = <button onClick={deleteEntry}>удалить расходник</button>;

    const editButtonWidget = selectedItem ? editButton : null;
    const deleteButtonWidget = selectedItem ? deleteButton : null;

    const buttons = [addButton, editButtonWidget, deleteButtonWidget];

    return <div>
        <InlineLayout widgets={buttons}/>
    </div>
}