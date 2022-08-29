import '../../../../../library/appearance/layouts/BasicAppLayout/pages.css';

import React from 'react';
import ChooseItemTableRow from "./ChooseItemTableRow";

export default class ChooseItemTableBody extends React.Component {

    constructor(props) {//type, userInput
        super(props);
        this.state = {
            // selectedItemId: 0,
        };
    }

    returnSelectedItemId = (id) => {
        if (this.props.returnSelectedItemId) {
            this.props.returnSelectedItemId(id);
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    processItemChoice = (id) => {
        if (this.props.selectedItemId !== id) {
            this.returnSelectedItemId(id);
        } else {
            this.returnSelectedItemId(0);
        }
    }

    render() {

        let filteredData = this.filterData();

        let rows;

        if (this.props.selectedItemId === 0) {
            rows = filteredData.map((item, index) => {

                return <ChooseItemTableRow
                    key={index}
                    properties={this.props.type.properties}
                    item={item}
                    type={this.props.type}
                    userInput={this.props.userInput}
                    selectedItemId={this.props.selectedItemId}
                    returnSelectedItemId={this.processItemChoice}
                />
            });
        } else {
            rows = <ChooseItemTableRow
                properties={this.props.type.properties}
                item={this.findByItemId(this.props.type.data, this.props.selectedItemId)}
                type={this.props.type}
                userInput={this.props.userInput}
                selectedItemId={this.props.selectedItemId}
                returnSelectedItemId={this.processItemChoice}
            />
        }


        return <tbody>
        {rows}
        </tbody>
    }

    findByItemId = (data, itemId) => {
        for (let entry of data) {
            if (entry.itemId === itemId) {
                return entry;
            }
        }

        return null;
    }

    filterData = () => {

        let filteredData = [];

        for (let entry of this.props.type.data) {

            let entryFits = true;

            if (this.props.userInput.item &&
                entry.item.indexOf(this.props.userInput.item, 0) === -1) {
                entryFits = false;
            }


            for (let key in this.props.userInput.values) {
                if (this.props.userInput.values.hasOwnProperty(key)) {
                    let inputValue = this.makeStringTolerantlyComparable(this.props.userInput.values[key]);

                    let valueObj = entry.values[key];
                    let value = this.makeStringTolerantlyComparable(valueObj[Object.keys(valueObj)[0]]);

                    if (inputValue && value.indexOf(inputValue) === -1) {
                        entryFits = false;
                        break;
                    }
                }
            }

            if (entryFits) {
                filteredData.push(entry);
            }
        }

        return filteredData;
    }

    makeStringTolerantlyComparable = (str) => {
        str = str.toUpperCase();
        str = str.replace('A', 'А'); //en -> ru
        str = str.replace('X', 'Х');

        return str;
    }

}