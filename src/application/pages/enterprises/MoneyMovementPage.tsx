import '../../../library/appearance/layouts/BasicAppLayout/pages.css';
import '../../../library/appearance/themes/common/size.css'

import React, {useEffect, useState, useReducer, FunctionComponent} from 'react';
import Repository from "../../../library/data/backend/Repository";
import Domain from "../../domain/Domain";
import MoneyMovement from "../../domain/enterprises/MoneyMovement";
import DataObject from "../../../library/data/dataObject/DataObject";
import {DataSetTable} from "../../../library/widgets/tables/dataSetTable/DataSetTable";
import TableConfig from "../../../library/widgets/tables/dataSetTable/TableConfig";

export const MoneyMovementPage: FunctionComponent = () => {

    const [, forceUpdate] = useReducer((x) => x + 1, 0, (a) => a);
    const [repository, ] = useState<Repository<any>>(new Repository<any>(Domain.get(MoneyMovement), forceUpdate));

    useEffect(() => {
        repository.fetchAll();
    }, [])

    const [deposit, setDeposit] = useState("");
    const [withdraw, setWithdraw] = useState("");

    const processPersistDeposit = () => {
        repository.insert(DataObject.withField(MoneyMovement.amount, deposit));
        setDeposit("");
    }

    const processPersistWithdraw = () => {
        repository.insert(DataObject.withField(MoneyMovement.amount, -withdraw));
        setWithdraw("");
    }

    return (
        <div>
            <br/>
            <div>
                <div className="inline-200-px">Зачислить на счёт:</div>
                <div className="inline-100-px">
                    <input type="number" placeholder="0.00" min="0" step="0.01"
                           className="five-em-input"
                           value={deposit}
                           onChange={e => setDeposit(e.target.value)}/>
                </div>

                <button style={{width: "100px"}} disabled={!deposit} onClick={processPersistDeposit}>Зачислить</button>
            </div>

            <div>
                <div className="inline-200-px">Списать со счёта:</div>
                <div className="inline-100-px">
                    <input type="number" placeholder="0.00" min="0" step="0.01"
                           className="five-em-input"
                           value={withdraw}
                           onChange={e => setWithdraw(e.target.value)}/>
                </div>

                <button style={{width: "100px"}} disabled={!withdraw} onClick={processPersistWithdraw}>Списать</button>

            </div>

            <br/><br/>

            <DataSetTable
                repository={repository}
                config={new TableConfig()}
            />
        </div>
    );
}