import React, {FunctionComponent, useEffect, useState} from "react";
import Repository from "../../../library/data/backend/Repository";
import ConsumableType from "../../domain/consumables/ConsumableType";
import Consumer from "../../../library/functions/interfaces/Consumer";
import {ComboBoxFromRepository} from "../../../library/widgets/fieldInputs/comboboxes/ComboBoxFromRepository";
import DataObject from "../../../library/data/dataObject/DataObject";

interface properties {
    setter: Consumer<DataObject<any>>;
}
export const ChooseConsumableTypeWidget: FunctionComponent<properties> = ({setter}) => {

    const [consumableTypesRepository, setRepository] = useState<Repository<any>>(Repository.empty(ConsumableType));

    let updating = (repo:Repository<any>) => {
        setRepository(repo);
    }

    useEffect(() => {
        consumableTypesRepository.initialFetchAll(updating);
    }, [])

    return <>
        <ComboBoxFromRepository
            consumeChoice={setter}
            isInline={true}
            label={"Выбрать"}
            repository={consumableTypesRepository}
            hideIfEmpty={true}
        />
    </>
}