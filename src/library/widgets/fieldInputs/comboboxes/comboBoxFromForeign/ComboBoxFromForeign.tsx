import React, {FunctionComponent, useEffect, useReducer, useState} from "react";
import ComboBoxFromForeignOption from "./ComboBoxFromForeignOption";
import ComboBoxEmptyOption from "../ComboBoxEmptyOption";
import Symbols from "../../../../misc/Symbols";
import DataObject from "../../../../data/dataObject/DataObject";
import ObjectFieldDescription from "../../../../data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import Runnable from "../../../../functions/interfaces/Runnable";
import Repository from "../../../../data/backend/Repository";
import {DataState} from "../../../../data/dataSet/DataState";
import Class from "../../../../reflection/Class";

interface properties {
    exampleObject:DataObject<any>;
    fieldDescription:ObjectFieldDescription;
    isInline:boolean;
    onChoice:Runnable;
}

export const ComboBoxFromForeign: FunctionComponent<properties> = ({ exampleObject, fieldDescription, isInline, onChoice }) => {

    const dataObjectClass = (fieldDescription as unknown as Class<any>).foreignModel;

    const [, forceUpdate] = useReducer((x) => x + 1, 0, (a) => a);
    const [foreignRepository, ] = useState<Repository<any>>(new Repository<any>(dataObjectClass, forceUpdate));

    useEffect(() => {
        foreignRepository.fetchAll();
    }, [])

    const options = [];
    let i = 0;

    options.push(<ComboBoxEmptyOption key={-1}/>)

    for (let entry of foreignRepository.dataSet.entriesArray) {
        options.push(
            <ComboBoxFromForeignOption
                key={i++}
                entry={entry}
            />
        )
    }

    const processChoice = (e: React.ChangeEvent<HTMLSelectElement>) => {
        exampleObject.data?.setValueByField(fieldDescription, e.target.value);
        if (onChoice) onChoice();
    }

    let comboBoxWidget = <select
        onChange={processChoice}
        value={exampleObject.data?.getValueByField(fieldDescription) || undefined}
        style={{minWidth: '200px'}}>
        {options}
    </select>

    let fetchingWidget = null;

    if (foreignRepository.dataState === DataState.UNFETCHED) fetchingWidget = <span>загрузка данных</span>;

    return <div className={isInline ? "inline" : ""}>
        <div className={isInline ? "inline" : "inline-200-px"}>{fieldDescription.label}{Symbols.SPACE}️</div>
        <div className={isInline ? "inline" : "inline-200-px"}>
            {fetchingWidget || comboBoxWidget}
        </div>
    </div>
}