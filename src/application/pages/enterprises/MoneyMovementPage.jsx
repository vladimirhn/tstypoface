import '../../../library/appearance/layouts/BasicAppLayout/pages.css';
import '../../../library/appearance/themes/common/size.css'

import React, {useEffect, useState, useReducer} from 'react';
import dataUpdateEffect from "../../../library/data/dataSet/events/DataUpdateEffect";
import MoneyMovementsDataSet from "../../domain/enterprises/MoneyMovementsDataSet";
import DomainClassTable from "../../../library/widgets/tables/dataSetTable/DomainClassTable";
import DataSetManager from "../../../library/data/dataSet/DataSetManager";

export default function MoneyMovementPage() {

    const [moneyMovementsDataSet,] = useState(DataSetManager.getNew(MoneyMovementsDataSet));

    const [, forceUpdate] = useReducer((x) => x + 1, 0, (a) => a);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(dataUpdateEffect(moneyMovementsDataSet, forceUpdate));

    const [deposit, setDeposit] = useState("");
    const [withdraw, setWithdraw] = useState("");

    const processPersistDeposit = () => {
        moneyMovementsDataSet.persistObject({amount: deposit});
        setDeposit("");
    }

    const processPersistWithdraw = () => {
        moneyMovementsDataSet.persistObject({amount: -withdraw});
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

            <DomainClassTable
                dataSet={moneyMovementsDataSet}
                noDel={false}
            />
        </div>
    );
}