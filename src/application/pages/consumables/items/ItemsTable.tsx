import '../../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';
import '../../../../library/visual/appearance/themes/common/size.css'

import React, {Dispatch, FunctionComponent, SetStateAction, useEffect, useState} from 'react';
import ConsumableType from "../../../domain/consumables/ConsumableType";
import DataObject from "../../../../library/data/dataObject/DataObject";
import Repository from "../../../../library/data/backend/Repository";
import ConsumablesView from "../../../domain/consumables/ConsumablesView";
import {TableWithPanel} from "../../../../library/visual/widgets/tables/abstractTable/TableWithPanel";
import {TableHeaderCell} from "../../../../library/visual/widgets/tables/abstractTable/TableHeaderCell";
import {TableHeaderRow} from "../../../../library/visual/widgets/tables/abstractTable/TableHeaderRow";
import {getFromObject} from "../../../../library/data/dataObject/vanila/VanilaObjects";
import {TableCell} from "../../../../library/visual/widgets/tables/abstractTable/TableCell";
import findByFieldInArray from "../../../../library/tools/arrays/findByFieldInArray";
import {TableRow} from "../../../../library/visual/widgets/tables/abstractTable/TableRow";
import {ItemsTableManagementPanel} from "./ItemsTableManagementPanel";
import {ConsumablesSubPage} from "../ConsumablesSubPage";

interface properties {
    type:DataObject<ConsumableType>;
    navigationState:[Array<ConsumablesSubPage>, React.Dispatch<React.SetStateAction<ConsumablesSubPage[]>>];
    selectedItemState:[any | undefined, Dispatch<SetStateAction<any | undefined>>];
    typeRepo:Repository<ConsumableType>
}

export const ItemsTable: FunctionComponent<properties> = ({type, typeRepo, navigationState, selectedItemState}) => {

    const [repository, setRepository] = useState<Repository<any>>(Repository.empty(ConsumablesView));

    useEffect(() => {
        Repository.empty(ConsumablesView).initialFetchFiltered(DataObject.withField(ConsumablesView.typeId, type?.data?.id), setRepository);
    }, [type, selectedItemState[0], typeRepo])

    const columnsMap = repository.dataSet.getFirst()?.data?.getValueByField(ConsumablesView.propertyIds);

    const headerCells:JSX.Element[] = [<TableHeaderCell key={-2} value={"Название"}/>];
    for (const field in columnsMap) {
        const index = Object.keys(columnsMap).indexOf(field);
        headerCells.push(
            <TableHeaderCell key={index} value={columnsMap[field]}/>
        )
    }

    const header = <TableHeaderRow lastCell={true} cells={headerCells} />

    const rows:JSX.Element[] = [];
    const items:[] | undefined = repository.dataSet.getFirst()?.data?.getValueByField(ConsumablesView.items);
    if (items) items.forEach((item, itemIndex) => {
        const props:[] | undefined = getFromObject(item, ConsumablesView.properties);

        const rowCells:JSX.Element[] = [<TableCell key={-3} value={getFromObject(item, ConsumablesView.itemName)}/>];
        for (const field in columnsMap) {

            const propIndex = Object.keys(columnsMap).indexOf(field);
            const propObject = findByFieldInArray(props, ConsumablesView.propertyId, field);

            rowCells.push(
                <TableCell key={propIndex} value={getFromObject(propObject, ConsumablesView.valueValue)}/>
            )
        }

        const itemId = getFromObject(item, ConsumablesView.itemId);
        const isSelected:boolean = itemId && itemId  === getFromObject(selectedItemState[0], ConsumablesView.itemId);

        const selectItem = () => selectedItemState[1](!isSelected ? item : undefined);
        const row = <TableRow lastCell={true} key={itemIndex} cells={rowCells} onClick={selectItem} isSelected={isSelected}/>

        rows.push(row);
    });


    const managementPanel = <ItemsTableManagementPanel selectedItemState={selectedItemState} navigationState={navigationState}/>

    return <TableWithPanel lastCell={true} header={header} rows={rows} topPanel={managementPanel}/>
}