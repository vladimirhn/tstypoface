import '../../../library/appearance/layouts/BasicAppLayout/pages.css';
import '../../../library/appearance/themes/common/size.css'

import React, {FunctionComponent, useEffect, useState} from 'react';
import ConsumableType from "../../domain/consumables/ConsumableType";
import {ChooseConsumableTypeWidget} from "./types/ChooseConsumableTypeWidget";
import DataObject from "../../../library/data/dataObject/DataObject";
import {ConsumableItemsWidget} from "./ConsumableItemsWidget";
import {ConsumablesSubPage} from "./ConsumablesSubPage";
import {AddNewConsumableTypeWidget} from "./types/AddNewConsumableTypeWidget";
import proceed from "../../../library/navigation/proceed";
import {InlineLayout} from "../../../library/widgets/layouts/InlineLayout";
import {EditConsumableTypeWidget} from "./types/EditConsumableTypeWidget";

export const ManageConsumablesPage: FunctionComponent = () => {

    const [navigation, updateNavigation] = useState<Array<ConsumablesSubPage>>([]);
    const [type, setType] = useState<DataObject<ConsumableType> | undefined>(undefined);

    const chooseConsumableTypeWidget = <ChooseConsumableTypeWidget setter={setType} selectedId={type?.data?.id}/>
    const addButton = <button onClick={() => {updateNavigation(proceed(navigation, ConsumablesSubPage.ADD_TYPE)) }}>Добавить</button>
    const editButton = type ? <button onClick={() => {updateNavigation(proceed(navigation, ConsumablesSubPage.EDIT_TYPE)) }}>Изменить</button> : null;

    const consumableItemsWidget = <ConsumableItemsWidget type={type}/>

    const typeLine = [chooseConsumableTypeWidget, editButton, addButton];

    if (navigation.length === 0) {
        return <>
            <InlineLayout widgets={typeLine}/>

            <div>
                {consumableItemsWidget}
            </div>
        </>;

    } else {
        switch (navigation[navigation.length-1]) {
            case ConsumablesSubPage.ADD_TYPE:
                return <AddNewConsumableTypeWidget navigation={navigation} updateNavigation={updateNavigation}/>;
            case ConsumablesSubPage.EDIT_TYPE:
                return <EditConsumableTypeWidget navigation={navigation} updateNavigation={updateNavigation} type={type}/>;
        }
    }
}