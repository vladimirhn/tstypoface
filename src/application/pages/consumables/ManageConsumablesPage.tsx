import '../../../library/appearance/layouts/BasicAppLayout/pages.css';
import '../../../library/appearance/themes/common/size.css'

import React, {FunctionComponent, useState} from 'react';
import ConsumableType from "../../domain/consumables/ConsumableType";
import {ChooseConsumableTypeWidget} from "./types/ChooseConsumableTypeWidget";
import DataObject from "../../../library/data/dataObject/DataObject";
import {ConsumablesSubPage} from "./ConsumablesSubPage";
import {AddNewConsumableTypeWidget} from "./types/AddNewConsumableTypeWidget";
import proceed from "../../../library/navigation/proceed";
import {InlineLayout} from "../../../library/widgets/layouts/InlineLayout";
import {EditConsumableTypeWidget} from "./types/EditConsumableTypeWidget";
import PrimitiveState from "../../../library/data/dataObject/vanila/PrimitiveState";
import {ItemsTable} from "./items/ItemsTable";
import {AddNewItemWidget} from "./items/AddNewItemWidget";
import {EditItemWidget} from "./items/EditItemWidget";

export const ManageConsumablesPage: FunctionComponent = () => {

    const navigationState = useState<Array<ConsumablesSubPage>>([]);
    const [type, setType] = useState<DataObject<ConsumableType> | undefined>(undefined);
    const selectedItemState = useState<any | undefined>(undefined);
    const typeLineVisibilityState:PrimitiveState<boolean> = new PrimitiveState<boolean>(useState<boolean>(true));

    const chooseConsumableTypeWidget = <ChooseConsumableTypeWidget setter={setType} selectedId={type?.data?.id}/>
    const addButton = <button onClick={() => {navigationState[1](proceed(navigationState[0], ConsumablesSubPage.ADD_TYPE)) }}>Добавить</button>
    const editButton = type ? <button onClick={() => {navigationState[1](proceed(navigationState[0], ConsumablesSubPage.EDIT_TYPE)) }}>Изменить</button> : null;

    const typeLine = [chooseConsumableTypeWidget, editButton, addButton];

    if (navigationState[0].length === 0) {
        return <>
            {typeLineVisibilityState.getValue() ? <InlineLayout widgets={typeLine}/> : null}
            {type ? <ItemsTable type={type} navigationState={navigationState} selectedItemState={selectedItemState}/> : null}
        </>;

    } else {
        const last:number = navigationState[0].length - 1;
        const navigation = navigationState[0];
        switch (navigation[last]) {
            case ConsumablesSubPage.ADD_TYPE:
                return <AddNewConsumableTypeWidget navigation={navigation} updateNavigation={navigationState[1]}/>;
            case ConsumablesSubPage.EDIT_TYPE:
                return <EditConsumableTypeWidget navigation={navigation} updateNavigation={navigationState[1]} type={type}/>;
            case ConsumablesSubPage.ADD_ITEM:
                return <AddNewItemWidget type={type} navigationState={navigationState}/>
            case ConsumablesSubPage.EDIT_ITEM:
                return <EditItemWidget selectedItem={selectedItemState[0]} navigationState={navigationState}/>
            default:
                return null;
        }
    }
}