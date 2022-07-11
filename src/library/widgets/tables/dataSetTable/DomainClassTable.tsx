import React, {FunctionComponent, useEffect, useReducer, useState} from 'react';
import {DataSetTable} from "./DataSetTable";
import Class from "../../../reflection/Class";
import DomainClass from "../../../reflection/DomainClass";
import TableConfig from "./TableConfig";
import Domain from "../../../../application/domain/Domain";
import Repository from "../../../data/backend/Repository";

interface properties {
    klass: Class<DomainClass<any>>;
    config: TableConfig;
}

export const DomainClassTable: FunctionComponent<properties> = ({klass, config}) => {

    const [, forceUpdate] = useReducer((x) => x + 1, 0, (a) => a);
    const [repository, ] = useState<Repository<any>>(new Repository<any>(Domain.get(klass), forceUpdate));

    useEffect(() => {
        repository.fetchAll();
    }, [])

    return <DataSetTable
        repository={repository}
        config={config}
    />
}