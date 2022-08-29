import '../../../../../library/appearance/layouts/BasicAppLayout/pages.css';

import React from 'react';

export default class ChooseItemTableRow extends React.Component {

    constructor(props) {//properties, item, type, userInput
        super(props);
        this.state = {

        };
    }

    returnSelectedItemId = () => {
        if (this.props.returnSelectedItemId) {
            this.props.returnSelectedItemId(this.props.item.itemId);
        }
    }

    componentDidMount() { }
    componentWillUnmount() {}

    render() {

        return <tr className={this.props.selectedItemId === this.props.item.itemId ? "selected" : "unselected"} onClick={this.returnSelectedItemId}>
            <td key={0}>{this.props.item.item}</td>
        </tr>
    }

    isInputEqualsLine = (line) => {

        if (Object.keys(this.props.type.properties).length !== Object.keys(this.props.userInput.values).length) {
            return false;
        }

        let inputEquals = true;

        if (this.props.userInput.item &&
            line.item !== this.props.userInput.item) {
            inputEquals = false;
        }

        for (let key in this.props.userInput.values) {
            if (this.props.userInput.values.hasOwnProperty(key)) {
                let inputValue = this.makeStringTolerantlyComparable(this.props.userInput.values[key]);

                let valueObj = line.values[key];
                let value = this.makeStringTolerantlyComparable(valueObj[Object.keys(valueObj)[0]]);

                if (!inputValue || value !== inputValue) {
                    inputEquals = false;
                    break;
                }
            }
        }

        return inputEquals;
    }

    makeStringTolerantlyComparable = (str) => {
        str = str.toUpperCase();
        str = str.replace('A', 'А'); //en -> ru
        str = str.replace('X', 'Х');

        return str;
    }
}