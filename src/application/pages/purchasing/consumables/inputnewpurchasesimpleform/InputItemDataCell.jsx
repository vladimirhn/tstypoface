import React from 'react';

export default class InputItemDataCell extends React.Component {

    constructor(props) { //property{id,name}, selectedId
        super(props);
        this.state = {
            value : "",
            lastSelectedId : 0,
        };
    }

    returnInput = (input) => { //{id, value}
        if (this.props.returnInput) {
            let currId = this.props.property.id;
            this.props.returnInput(
                {
                    id : currId,
                    value : input
                }
            )
        }
    }

    componentDidMount() {}
    componentWillUnmount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedId !== this.state.lastSelectedId) {
            this.setState({
                value : "",
                lastSelectedId : this.props.selectedId
            });

        }
    }

    changeInput = (input) => {
        this.setState({value : input.target.value})
        this.returnInput(input.target.value)
    }

    render() {
        return <td>
            {this.props.property.name + ": "}
            <br/><input className="cell-input" value={this.state.value} onChange={this.changeInput}/>
        </td>
    }
}