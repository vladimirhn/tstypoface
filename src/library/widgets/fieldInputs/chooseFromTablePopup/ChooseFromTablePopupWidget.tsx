import React, {FunctionComponent, useEffect, useReducer, useState} from "react";
import Popup from "../../popup/Popup";
import {ChooseFromTableResultWidget} from "./ChooseFromTableResultWidget";
import DropValueOptionWidget from "./DropValueOptionWidget";
import Repository from "../../../data/backend/Repository";
import TableConfig from "../../tables/dataSetTable/TableConfig";
import DataObject from "../../../data/dataObject/DataObject";
import ObjectFieldDescription from "../../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import Domain from "../../../../application/domain/Domain";
import {DataSetTable} from "../../tables/dataSetTable/DataSetTable";

interface properties {
    // repository:Repository<any>;
    config:TableConfig;
    exampleObject:DataObject<any>;
    fieldDescription:ObjectFieldDescription;
}

export const ChooseFromTablePopupWidget: FunctionComponent<properties> = ({ /*repository,*/ config, exampleObject, fieldDescription }) => {

    // const [dataSet,] = useState(DataSetManager.getNew(idFieldDescription.foreignDataSet));
    // const [, forceUpdate] = useReducer((x) => x + 1, 0, (a) => a);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(dataUpdateEffect(dataSet, forceUpdate), []);
    //
    // const [isFetching, setIsFetching] = useState(dataSet.isFetching);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(fetchingEffect(dataSet, setIsFetching));

    const [, forceUpdate] = useReducer((x) => x + 1, 0, (a) => a);
    const [repository, ] = useState<Repository<any>>(new Repository<any>(Domain.get(fieldDescription.foreignModel), forceUpdate));

    useEffect(() => {
        repository.fetchAll();
    }, [])


    let id:string = exampleObject.data?.getDefinedValueByField(fieldDescription) || "";
    let name = repository.dataSet.findMainFieldDataById(id);

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const applySelection = (entry:DataObject<any>) => {
        setIsOpen(false);
        exampleObject.data?.setValueByField(fieldDescription, entry.data?.id);
    }

    const dropSelection = () => {
        setIsOpen(false);
        exampleObject.data?.setValueByField(fieldDescription, undefined);
    }

    return <>

        <ChooseFromTableResultWidget
            label={fieldDescription.label}
            name={name}
            repository={repository}
            togglePopup={togglePopup}
            isInline={true}
        />

        {isOpen && <Popup
            content={<>
                {id && <DropValueOptionWidget
                    value={name}
                    dropFunct={dropSelection}
                />}
                <DataSetTable
                    repository={repository}
                    config={new TableConfig().inlineFilters()}
                />
            </>}
            handleClose={togglePopup}
        />}

    </>
}