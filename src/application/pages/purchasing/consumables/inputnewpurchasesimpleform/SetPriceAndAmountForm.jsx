import '../../../../../library/appearance/layouts/BasicAppLayout/pages.css';

import React from 'react';
import Combobox from "../../../../../library/widgets/combobox/Combobox";

export default class SetPriceAndAmountForm extends React.Component {

    constructor(props) {//
        super(props);
        this.state = {

        };
    }

    returnPurchaseDetails = (purchaseDetails) => {
        if (this.props.returnPurchaseDetails) {
            this.props.returnPurchaseDetails(purchaseDetails);
        }
    }

    componentDidMount() {}
    componentWillUnmount() {}

    onPriceInput = (input) => {
        let price = input.target.value;
        let total = price * this.props.amount;

        this.returnPurchaseDetails({
            price : price,
            amount: this.props.amount,
            totalCost : total
        });
    }

    onAmountInput = (input) => {
        let amount = input.target.value;
        let total = amount * this.props.price;

        this.returnPurchaseDetails({
            price : this.props.price,
            amount: amount,
            totalCost : total
        });
    }

    render() {
        return <table className="last-cell-table widget-table">
            <tbody>
            <tr className="widget-row">
                <td className="widget-row">контрагент: </td>
                <td className="widget-row"><Combobox
                    isFirstEmpty={true}
                    selectedValue={this.props.selectedEntity}
                    data={this.props.legalEntities}
                    valueName={"name"}
                    processChoiceMethod={this.props.selectEntity}
                /></td>
                <td className="widget-row"/>
            </tr>
            <tr className="widget-row">
                <td className="widget-row">цена: </td>
                <td className="widget-row"><input style={{width:150}} value={this.props.price} onChange={this.onPriceInput}/></td>
                <td className="widget-row"/>
            </tr>
            <tr className="widget-row">
                <td className="widget-row">кол-во: </td>
                <td className="widget-row"><input style={{width:150}} value={this.props.amount} onChange={this.onAmountInput}/></td>
                <td className="widget-row"/>
            </tr>
            <tr className="widget-row">
                <td className="widget-row">итого: </td>
                <td className="widget-row">{this.props.total}</td>
                <td className="widget-row"/>
            </tr>
            </tbody>
        </table>
    }

}