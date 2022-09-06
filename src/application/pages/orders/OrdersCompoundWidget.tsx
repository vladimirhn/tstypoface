import '../../../library/visual/appearance/layouts/BasicAppLayout/pages.css';

// import React, {useEffect, useReducer, useState} from 'react';
//
// import DataSetTable from "../../../library/widgets/tables/dataSetTable/DataSetTable";
// import ProcessOrderWidget from "./ProcessOrderWidget";
// import DataSetManager from "../../../library/data/dataSet/DataSetManager";
// import dataUpdateEffect from "../../../library/data/dataSet/events/DataUpdateEffect";
// import OrdersDataSet from "../../domain/orders/OrdersDataSet";
// import NewOrderSubWidget from "./NewOrderSubWidget";
// import TrueFalseButton from "../../../library/widgets/buttons/TrueFalseButton";
// import ProcessConsumablesSubWidget from "./ProcessConsumablesSubWidget";

export default function OrdersCompoundWidget() {

    // const [dataSet,] = useState(DataSetManager.getNew(OrdersDataSet));
    // const [, redraw] = useReducer((x) => x + 1, 0, (a) => a);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(dataUpdateEffect(dataSet, redraw), []);
    //
    // const [orderDetailSwVisible, setOrderDetailsSwVisible] = useState(false);
    // const [consumablesSwVisible, setConsumablesSwVisible] = useState(false);
    //
    // const toggleOrderDetailSwVisibility = () => {
    //     setOrderDetailsSwVisible(!orderDetailSwVisible);
    // }
    // const toggleConsumablesSwVisibility = () => {
    //     setConsumablesSwVisible(!consumablesSwVisible);
    // }
    //
    // const orderDetailSwButton = <TrueFalseButton
    //     toggleFunct={toggleOrderDetailSwVisibility}
    //     variable={orderDetailSwVisible}
    //     trueLabel={"Отмена"}
    //     falseLabel={"Новый заказ"}
    // />
    //
    // let afterSelectionWidget = null;
    // let newOrderWidget = null;
    //
    // if (dataSet.hasSelection) {
    //     afterSelectionWidget = consumablesSwVisible ?
    //         <ProcessConsumablesSubWidget
    //             dataSet={dataSet}
    //             toggleVisibilityFunct={toggleConsumablesSwVisibility}
    //         />
    //         :
    //     <ProcessOrderWidget
    //         dataSet={dataSet}
    //         redrawFunct={redraw}
    //         toggleConsumablesSwVisibility={toggleConsumablesSwVisibility}
    //     />
    //
    // } else {
    //
    //     if (!orderDetailSwVisible) {
    //         afterSelectionWidget =
    //             <DataSetTable
    //                 dataSet={dataSet}
    //                 noDel={true}
    //             />
    //     }
    //
    //     newOrderWidget =
    //         <>
    //             {orderDetailSwButton}
    //             {orderDetailSwVisible ?
    //                 <NewOrderSubWidget
    //                     dataSet={dataSet}
    //                     toggleVisibilityFunct={toggleOrderDetailSwVisibility}
    //                 />
    //                 : null}
    //
    //             <br/><br/>
    //         </>
    // }
    //
    // return <>
    //     {newOrderWidget}
    //     {afterSelectionWidget}
    // </>

    return <></>
}