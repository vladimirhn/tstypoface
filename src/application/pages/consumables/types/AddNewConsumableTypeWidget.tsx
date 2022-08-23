import '../../../../library/appearance/layouts/BasicAppLayout/pages.css';
import '../../../../library/appearance/themes/common/size.css'

import React, {useEffect, useState, FunctionComponent} from 'react';
import ConsumableType from "../../../domain/consumables/ConsumableType";
import {ConsumablesSubPage} from "../ConsumablesSubPage";
import Data from "../../../../library/data/dataObject/Data";
import {ProcessConsumableTypeWidget} from "./ProcessConsumableTypeWidget";
import Repository from "../../../../library/data/backend/Repository";

interface properties {
    navigation:Array<ConsumablesSubPage>;
    updateNavigation: React.Dispatch<React.SetStateAction<ConsumablesSubPage[]>>;
    repository:Repository<ConsumableType>;
}

export const AddNewConsumableTypeWidget: FunctionComponent<properties> = ({repository, navigation, updateNavigation}) => {

    const [newType, updateNewType] = useState<Data<ConsumableType>>(Data.pure);
    useEffect(() => {
        newType.update = updateNewType;
        newType.setValueByField(ConsumableType.properties, []);
        }, [])

    return <ProcessConsumableTypeWidget navigation={navigation} updateNavigation={updateNavigation} type={newType} repository={repository}/>
}