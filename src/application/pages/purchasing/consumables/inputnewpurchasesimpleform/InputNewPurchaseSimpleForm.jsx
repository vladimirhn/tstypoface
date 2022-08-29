import '../../../../../library/appearance/layouts/BasicAppLayout/pages.css';

import React from 'react';
import Paths from "../../../../properties/Paths";
import SelectTypeWidget from "../../../nomenclature/consumables/addTypesAndItems/SelectTypeWidget";
import ChooseItemHorizontalForm from "./ChooseItemHorizontalForm";
import Fetcher from "../../../../../library/tools/Fetcher";
import SetPriceAndAmountForm from "./SetPriceAndAmountForm";

import './style.css'


export default class InputNewPurchaseSimpleForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            path : Paths.consumables,

            selectedType : {},
            selectedItemId : 0,
            price : "",
            amount : "",
            totalCost : "",

            legalEntities: null,
            selectedEntity: " ",

            userInput : {
                item : null,
                values : {}
            }
        };
    }

    componentDidMount() {}
    componentWillUnmount() {}

    updateSelectedType = (type) => {

        this.dropPurchaseDetails();
        this.getLegalEntities();

        if (type.id) {
            Fetcher.get(this.state.path + "/get_type_cascade/" + type.id)
                .then(result => {

                    type.data = result.data;
                    this.setState({selectedType: result});
                });
        } else {
            this.setState({selectedType: type});
        }
    }

    getLegalEntities = () => {
        if (this.state.legalEntities === null) {
            Fetcher.get("/u/legal_entities/get_all")
                .then(result => {
                    this.setState({legalEntities: result.data});
                });
        }
    }

    dropPurchaseDetails = () => {

        this.setState({
            selectedType : {},
            selectedItemId : 0,

            price : "",
            amount : "",
            totalCost : "",

            userInput : {
                item : null,
                values : {}
            }
        })
    }

    processSelectedItemId = (id) => {
        this.setState({selectedItemId : id});
    }

    updatePurchaseDetails = (details) => {
        this.setState(
            {
                price: details.price,
                amount: details.amount,
                totalCost: details.totalCost
            }
        );
    }

    updateUserInput = (ui) => {
        this.setState({userInput : ui});
    }

    selectEntity = (value) => {
        this.setState({selectedEntity: value})
    }

    processEnter = () => {
        if (this.state.selectedItemId !== 0) {
            this.saveNewPurchase(this.state.selectedItemId)
        }
    }
    
    saveNewPurchase = (itemId) => {

        if (Array.isArray(itemId)) {
            itemId = itemId[0];
        }

        const selectedEntity = this.state.selectedEntity === " " ? null : this.state.selectedEntity;

        const data = {
            consumableId: itemId,
            amount: this.state.amount,
            price: this.state.price,
            legalEntityId: selectedEntity
        };
        this.props.dataSet.persistObject(data);
        this.dropPurchaseDetails();

    }

    render() {

        return <div className="widget">
            <SelectTypeWidget
                returnSelectedType={this.updateSelectedType}
                selectedType={this.state.selectedType}
                showAddButton={false}
            />

            {this.getChooseItemHorizontalForm()}

            {this.getSetPriceAndAmountForm()}

            {this.getAcceptButton()}
        </div>
    }

    getChooseItemHorizontalForm = () => {

        if (this.state.selectedType.id)

        return <ChooseItemHorizontalForm
            returnUserInput={this.updateUserInput}
            returnSelectedItemId={this.processSelectedItemId}
            type={this.state.selectedType}
            userInput={this.state.userInput}
            selectedItemId={this.state.selectedItemId}
        />

        else return null;
    }

    getSetPriceAndAmountForm = () => {

        if (this.state.selectedType.id && this.state.selectedItemId)

        return <SetPriceAndAmountForm
            price={this.state.price}
            amount={this.state.amount}
            total={this.state.totalCost}
            returnPurchaseDetails={this.updatePurchaseDetails}
            legalEntities={this.state.legalEntities}
            selectedEntity={this.state.selectedEntity}
            selectEntity={this.selectEntity}
        />

        else return null;
    }

    getAcceptButton = () => {

        if (this.state.selectedType.id && this.state.selectedItemId) {

            let isEnabled =
                this.state.totalCost &&
                (this.state.selectedItemId !== 0/* || this.anyInput()*/);

            return <>
                <br/>
                <button disabled={isEnabled ? "" : "disabled"} onClick={this.processEnter}>ввести покупку расходного материала</button>
            </>;

        } else return null;
    }

    // anyInput = () => {
    //
    //     let itemInput = !!this.state.userInput.item;
    //     let hasPropsInput = false;
    //     for (let key in this.state.userInput.values) {
    //         if (this.state.userInput.values.hasOwnProperty(key)) {
    //             if (this.state.userInput.values[key]) {
    //                 hasPropsInput = true;
    //             }
    //         }
    //     }
    //
    //     return itemInput || hasPropsInput;
    //
    // }
}