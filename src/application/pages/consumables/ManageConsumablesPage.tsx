import '../../../library/appearance/layouts/BasicAppLayout/pages.css';
import '../../../library/appearance/themes/common/size.css'

import React, {FunctionComponent, useEffect, useState} from 'react';
import ConsumableType from "../../domain/consumables/ConsumableType";
import {ChooseConsumableTypeWidget} from "./types/ChooseConsumableTypeWidget";
import DataObject from "../../../library/data/dataObject/DataObject";
import {ConsumablesSubPage} from "./ConsumablesSubPage";
import {AddNewConsumableTypeWidget} from "./types/AddNewConsumableTypeWidget";
import proceed from "../../../library/navigation/proceed";
import {InlineLayout} from "../../../library/widgets/layouts/InlineLayout";
import {EditConsumableTypeWidget} from "./types/EditConsumableTypeWidget";
import {ItemsTable} from "./items/ItemsTable";
import {AddNewItemWidget} from "./items/AddNewItemWidget";
import {EditItemWidget} from "./items/EditItemWidget";
import Repository from "../../../library/data/backend/Repository";

export const ManageConsumablesPage: FunctionComponent = () => {

    const navigationState = useState<Array<ConsumablesSubPage>>([]);
    const selectedItemState = useState<any | undefined>(undefined);
    const [selectedType, setSelectedType] = useState<DataObject<ConsumableType> | undefined>(undefined);
    const updateSelectedType = (newType:DataObject<ConsumableType> | undefined) => {
        selectedItemState[1](undefined);
        setSelectedType(newType);
    }

    const [consumableTypesRepository, setRepository] = useState<Repository<any>>(Repository.empty(ConsumableType));
    useEffect(() => {
        consumableTypesRepository.initialFetchAll(setRepository);
    }, [])

    const chooseConsumableTypeWidget = <ChooseConsumableTypeWidget setter={updateSelectedType} selectedId={selectedType?.data?.id} consumableTypesRepository={consumableTypesRepository}/>
    const addButton = <button onClick={() => {navigationState[1](proceed(navigationState[0], ConsumablesSubPage.ADD_TYPE)) }}>Добавить</button>
    const editButton = selectedType ? <button onClick={() => {navigationState[1](proceed(navigationState[0], ConsumablesSubPage.EDIT_TYPE)) }}>Изменить</button> : null;

    const typeLine = [chooseConsumableTypeWidget, addButton, editButton];

    if (navigationState[0].length === 0) {
        return <>
            <InlineLayout widgets={typeLine}/>
            {selectedType ? <ItemsTable type={selectedType} navigationState={navigationState} selectedItemState={selectedItemState}/> : null}
        </>;

    } else {
        const last:number = navigationState[0].length - 1;
        const navigation = navigationState[0];
        switch (navigation[last]) {
            case ConsumablesSubPage.ADD_TYPE:
                return <AddNewConsumableTypeWidget navigation={navigation} updateNavigation={navigationState[1]}/>;
            case ConsumablesSubPage.EDIT_TYPE:
                return <EditConsumableTypeWidget navigation={navigation} updateNavigation={navigationState[1]} type={selectedType}/>;
            case ConsumablesSubPage.ADD_ITEM:
                return <AddNewItemWidget type={selectedType} navigationState={navigationState}/>
            case ConsumablesSubPage.EDIT_ITEM:
                return <EditItemWidget type={selectedType} selectedItem={selectedItemState[0]} navigationState={navigationState}/>
            default:
                return null;
        }
    }
}