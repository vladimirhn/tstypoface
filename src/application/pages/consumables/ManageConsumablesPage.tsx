import '../../../library/appearance/layouts/BasicAppLayout/pages.css';
import '../../../library/appearance/themes/common/size.css'

import React, {useState, FunctionComponent} from 'react';
import ConsumableType from "../../domain/consumables/ConsumableType";
import {ChooseConsumableTypeWidget} from "./types/ChooseConsumableTypeWidget";
import DataObject from "../../../library/data/dataObject/DataObject";
import {ConsumableItemsWidget} from "./ConsumableItemsWidget";
import {ConsumablesSubPage} from "./ConsumablesSubPage";
import {AddNewConsumableTypeWidget} from "./types/AddNewConsumableTypeWidget";
import proceed from "../../../library/navigation/proceed";

export const ManageConsumablesPage: FunctionComponent = () => {

    const [navigation, updateNavigation] = useState<Array<ConsumablesSubPage>>([]);
    const [type, setType] = useState<DataObject<ConsumableType> | undefined>(undefined);

    if (navigation.length === 0) {
        return <>
            <div>
                <ChooseConsumableTypeWidget
                    setter={setType}
                />
            </div>

            <div>
                <button onClick={() => {
                    updateNavigation(proceed(navigation, ConsumablesSubPage.ADD))
                }}>Добавить
                </button>
            </div>

            <div>
                <ConsumableItemsWidget
                    type={type}
                />
            </div>
        </>;

    } else {
        switch (navigation[0]) {
            case ConsumablesSubPage.ADD:
                return <AddNewConsumableTypeWidget navigation={navigation} updateNavigation={updateNavigation}/>
        }
    }
}