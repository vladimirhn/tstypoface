import '../../../../library/appearance/layouts/BasicAppLayout/pages.css';
import '../../../../library/appearance/themes/common/size.css'

import React, {useEffect, useState, FunctionComponent} from 'react';
import ConsumableType from "../../../domain/consumables/ConsumableType";
import {ConsumablesSubPage} from "../ConsumablesSubPage";
import retreat from "../../../../library/navigation/retreat";
import Data from "../../../../library/data/dataObject/Data";
import {TextInput} from "../../../../library/widgets/fieldInputs/TextInput";
import {SimpleTextInput} from "../../../../library/widgets/fieldInputs/SimpleTextInput";
import {EditTypePropertySubWidget} from "./EditTypePropertySubWidget";
import validateConsumableType from "./validateConsumableType";
import Repository from "../../../../library/data/backend/Repository";
import optimizeConsumableType from "./optimizeConsumableType";
import DataObject from "../../../../library/data/dataObject/DataObject";
import ConsumableProperty from "../../../domain/consumables/ConsumableProperty";
import {getFromObject, setToObject} from "../../../../library/data/dataObject/VanilaObjects";
import {ProcessConsumableTypeWidget} from "./ProcessConsumableTypeWidget";

interface properties {
    navigation:Array<ConsumablesSubPage>;
    updateNavigation: React.Dispatch<React.SetStateAction<ConsumablesSubPage[]>>;
}

export const AddNewConsumableTypeWidget: FunctionComponent<properties> = ({navigation, updateNavigation}) => {

    const [newType, updateNewType] = useState<Data<ConsumableType>>(Data.pure);
    useEffect(() => {
        newType.update = updateNewType;
        newType.setValueByField(ConsumableType.properties, []);
        }, [])

    return <ProcessConsumableTypeWidget navigation={navigation} updateNavigation={updateNavigation} type={newType}/>
}