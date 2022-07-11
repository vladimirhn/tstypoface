import Paths from "../../properties/Paths";
import DomainClass from "../../../library/reflection/DomainClass";
import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import DataType from "../../../library/data/dataObject/DataType";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";
import FinancialTransactionsTypes from "./FinancialTransactionsTypes";


export default class FinancialTransaction extends DomainClass<FinancialTransaction>{

    static readonly path = Paths.financialTransactions;

    static readonly transactionDate =    ObjectFieldDescription.label("дата").withType(DataType.DATE);
    static readonly moneyAmount =        ObjectFieldDescription.label("сумма").withType(DataType.NUMERIC);
    static readonly transactionType =    ObjectFieldDescription.label("тип движения").withValuesMap(FinancialTransactionsTypes).withType(DataType.MAP).setFilter(true);
    static readonly itemsAmount =        ObjectFieldDescription.label("количество").withType(DataType.NUMERIC);
    static readonly summary =            ObjectFieldDescription.label("предмет");

    static readonly objectDescription: ObjectDescription<FinancialTransaction> = new ObjectDescription<FinancialTransaction>(FinancialTransaction);

    constructor() {
        super(FinancialTransaction, FinancialTransaction.path)
    }

    public objectDescription():ObjectDescription<FinancialTransaction> {
        return FinancialTransaction.objectDescription;
    }
}