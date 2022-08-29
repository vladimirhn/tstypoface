import '../../../../library/appearance/layouts/BasicAppLayout/app/app.css'

import React from 'react';
import DataSetTable from "../../../../library/widgets/tables/dataSetTable/DataSetTable";


export default class PurchasingConsumablesTableWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            table: {data: []},
            selectedId: 0,
        };
    }

    componentDidMount() {}
    componentWillUnmount() {}
    
    render() {

        let data = JSON.parse(JSON.stringify(this.state.table.data))
        this.tmpProcCapacity(data)

        return <>
            <DataSetTable
                dataSet={this.props.dataSet}
                noDel={false}
            />
        </>
    }

    tmpProcCapacity = (data) => {

        if (data.length > 0) {

            for (let entry of data) {
                if (entry.capacity) {

                    let box = (entry.amount/* - entry.amount % entry.capacity*/) / entry.capacity;
                    // let rest = entry.amount % entry.capacity;
                    entry.amount = box + "📦 (по " + entry.capacity + ")";
                }
            }
        }

        return data;
    }
}