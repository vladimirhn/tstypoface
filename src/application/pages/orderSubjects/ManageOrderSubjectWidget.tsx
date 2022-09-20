import '../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';

import React, {FunctionComponent, useEffect, useState} from 'react';
import Repository from "../../../library/data/backend/Repository";
import OrderSubjectType from "../../domain/orderSubjects/OrderSubjectType";
import {ComboBoxFromRepository} from "../../../library/visual/widgets/fieldInputs/comboboxes/ComboBoxFromRepository";
import DataObject from "../../../library/data/dataObject/DataObject";
import {InlineLayout} from "../../../library/visual/widgets/layouts/InlineLayout";
import {OrderSubjectsSubPage} from "./OrderSubjectsSubPage";
import NavigationState from "../../../library/navigation/NavigationState";
import {ProcessLineWidget} from "../../../library/mechanics/lineProcessing/ProcessLineWidget";
import SharedServices from "../../../library/SharedServices";
import DataObjectState from "../../../library/data/dataObject/DataObjectState";
import Runnable from "../../../library/functions/interfaces/Runnable";
import RepositoryState from "../../../library/data/backend/RepositoryState";
import OrderSubject from "../../domain/orderSubjects/OrderSubject";
import TableConfig from "../../../library/visual/widgets/tables/dataSetTable/TableConfig";
import {DataSetTableWidget} from "../../../library/visual/widgets/tables/dataSetTable/DataSetTableWidget";


export const ManageOrderSubjectWidget: FunctionComponent = () => {

    const navigation:NavigationState<OrderSubjectsSubPage> = new NavigationState<any>(useState<Array<any>>([]));

    const itemRepositoryState:RepositoryState<OrderSubject> = new RepositoryState<any>(useState(Repository.empty(OrderSubject)));
    const selectedItemState:DataObjectState = new DataObjectState(useState<DataObject<any>>(DataObject.empty));
    useEffect(() => {
        selectedItemState.setDataObject(itemRepositoryState.repository.dataSet.oneSelectedEntry)
    }, [itemRepositoryState.repository.dataSet.oneSelectedEntry])

    const selectedTypeState:DataObjectState = new DataObjectState(useState<DataObject<any>>(DataObject.empty));
    const [typeRepository, setTypeRepository] = useState<Repository<OrderSubjectType>>(Repository.empty(OrderSubjectType));
    useEffect(() => {
        typeRepository.initialFetchAll(setTypeRepository);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (selectedTypeState.getId()) {
            itemRepositoryState.initialFetchFiltered(DataObject.withField(OrderSubject.orderSubjectTypeId, selectedTypeState.getId()))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTypeState.getId()])

    const updateSelectedType = (newType:DataObject<any> | undefined) => {
        selectedItemState.setDataObject(undefined);
        selectedTypeState.setDataObject(newType);
    }

    const deleteSelectedType = () => {
        typeRepository.delete(selectedTypeState.getValue(OrderSubjectType.id));
        updateSelectedType(undefined);
    }

    const chooseTypeWidget = <ComboBoxFromRepository
        consumeChoice={updateSelectedType}
        isInline={true}
        label={"Категория: "}
        repository={typeRepository}
        hideIfEmpty={true}
        selectedId={selectedTypeState.getId()}
    />

    const addButton = <button onClick={() => {navigation.proceed(OrderSubjectsSubPage.PROCESS_TYPE) }}>Добавить</button>
    const editButton = !selectedTypeState.isEmpty() ? <button onClick={() => {navigation.proceed(OrderSubjectsSubPage.PROCESS_TYPE) }}>Изменить</button> : null;
    const deleteButton = !selectedTypeState.isEmpty() ? <button onClick={deleteSelectedType}>Удалить</button> : null;

    const typeLine = [chooseTypeWidget, addButton, editButton, deleteButton];

    const onAddEditItemButtonFunc:Runnable = () => {
        navigation.proceed(OrderSubjectsSubPage.PROCESS_ITEM)
    }

    if (navigation.isHome()) {
        return <>
            <InlineLayout widgets={typeLine}/>

            {selectedTypeState.getId() ? <DataSetTableWidget
                repository={itemRepositoryState.repository}
                config={new TableConfig().onAddEditButtonFunc(onAddEditItemButtonFunc).noFilters()}
            /> : null}
        </>

    } else {
        switch (navigation.currentPage) {
            case OrderSubjectsSubPage.PROCESS_TYPE:
                return <ProcessLineWidget
                    sharedServices={SharedServices.create()
                        .withNavigation(navigation)
                        .withRepository(typeRepository)}
                    selectedEntryState={selectedTypeState}
                />;

            case OrderSubjectsSubPage.PROCESS_ITEM:
                return <ProcessLineWidget
                    sharedServices={SharedServices.create()
                        .withNavigation(navigation)
                        .withRepository(itemRepositoryState.repository)}
                    selectedEntryState={selectedItemState}
                    exampleObject={DataObject.withField(OrderSubject.orderSubjectTypeId, selectedTypeState.getId())}
                />

            default:
                return null;
        }
    }
}