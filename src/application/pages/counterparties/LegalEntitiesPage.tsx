import '../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';

import React, {FunctionComponent, useEffect, useState} from 'react';
import Repository from "../../../library/data/backend/Repository";
import {DataSetTableWidget} from "../../../library/visual/widgets/tables/dataSetTable/DataSetTableWidget";
import RepositoryState from "../../../library/data/backend/RepositoryState";
import LegalEntity from "../../domain/counterparties/LegalEntity";
import NavigationState from "../../../library/navigation/NavigationState";
import {OrderSubjectsSubPage} from "../orderSubjects/OrderSubjectsSubPage";
import TableConfig from "../../../library/visual/widgets/tables/dataSetTable/TableConfig";

export const LegalEntitiesPage: FunctionComponent = () => {

    const legalEntityRepositoryState:RepositoryState<LegalEntity> = new RepositoryState<any>(useState(Repository.empty(LegalEntity)));

    useEffect(() => {
        legalEntityRepositoryState.initialFetchAll()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div>

        <h1>Юридические лица</h1>

        <DataSetTableWidget
            repository={legalEntityRepositoryState.repository}
            config={new TableConfig().useStandardLineProcessor()}
        />

    </div>;
}