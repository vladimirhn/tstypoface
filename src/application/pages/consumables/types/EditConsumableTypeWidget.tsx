import '../../../../library/appearance/layouts/BasicAppLayout/pages.css';
import '../../../../library/appearance/themes/common/size.css'

import React, {useEffect, useState, FunctionComponent} from 'react';
import ConsumableType from "../../../domain/consumables/ConsumableType";
import {ConsumablesSubPage} from "../ConsumablesSubPage";
import Data from "../../../../library/data/dataObject/Data";
import Repository from "../../../../library/data/backend/Repository";
import DataObject from "../../../../library/data/dataObject/DataObject";
import ConsumableProperty from "../../../domain/consumables/ConsumableProperty";
import {ProcessConsumableTypeWidget} from "./ProcessConsumableTypeWidget";

interface properties {
    navigation:Array<ConsumablesSubPage>;
    updateNavigation: React.Dispatch<React.SetStateAction<ConsumablesSubPage[]>>;
    type:DataObject<ConsumableType> | undefined;
    repository:Repository<ConsumableType>;
}

export const EditConsumableTypeWidget: FunctionComponent<properties> = ({type, repository, navigation, updateNavigation}) => {

    const [typeData, setTypeData] = useState<Data<ConsumableType> | undefined>(type?.data);

    const propSetter = (properties:any) => {
        if (type && type.data) type.data.setValueByField(ConsumableType.properties, properties.data);
    }

    useEffect(() => {
        if (type && type.data) type.data.update = setTypeData;
        Repository.empty(ConsumableProperty).simplyFetchFiltered(DataObject.withField(ConsumableProperty.typeId, type?.data?.id), propSetter);
    }, [])

    return <ProcessConsumableTypeWidget navigation={navigation} updateNavigation={updateNavigation} type={typeData} repository={repository}/>
}