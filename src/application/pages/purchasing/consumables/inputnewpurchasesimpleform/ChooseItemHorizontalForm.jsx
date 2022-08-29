import '../../../../../library/appearance/layouts/BasicAppLayout/pages.css';

import React from 'react';
import ChooseItemTableBody from "./ChooseItemTableBody";


export default class ChooseItemHorizontalForm extends React.Component {

    constructor(props) { //type, userInput
        super(props);
        this.state = {

        };
    }

    returnUserInput = (ui) => {
        if (this.props.returnUserInput) {
            this.props.returnUserInput(ui);
        }
    }

    returnSelectedItemId = (id) => {
        if (this.props.returnSelectedItemId) {
            this.props.returnSelectedItemId(id);
        }
    }

    goBack = () => {
        this.returnSelectedItemId(0);
    }

    componentDidMount() {}
    componentWillUnmount() {}

    processNameCellInput = (input) => {

        let ui = this.props.userInput;
        ui.item = input.target.value;

        this.returnUserInput(ui);
    }

    render() {
        let inputRow = <tr className="widget-table">
            <td className="widget-table">
                {
                    this.props.selectedItemId === 0 ?
                        <b>Выберите расходник из списка:</b>
                        :
                    <button onClick={this.goBack}>Назад</button>
                        // <b>Введите цену и количество</b>
                }


                <br />
                <input className="first-cell-input"
                       onChange={this.processNameCellInput}
                       placeholder={"фильтр"}
                       hidden={this.props.selectedItemId !== 0}
                />
            </td>
        </tr>;

        return <table className="last-cell-table widget-table">
            <thead>{inputRow}</thead>
            <ChooseItemTableBody
                type={this.props.type}
                userInput={this.props.userInput}
                selectedItemId={this.props.selectedItemId}
                returnSelectedItemId={this.returnSelectedItemId}
            />
        </table>
    }
}