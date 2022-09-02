import Paths from "../../properties/Paths";
import DomainClass from "../../../library/reflection/DomainClass";
import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import DataType from "../../../library/data/dataObject/DataType";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";
import ForeignIdFieldDescription
    from "../../../library/data/dataObject/objectFieldsDescriptions/ForeignIdFieldDescription";
import Dates from "../../../library/tools/Dates";
import FinancialTransactionsTypes from "../enterprises/FinancialTransactionsTypes";
import OrderStatuses from "./OrderStatuses";
import ForeignFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ForeignFieldDescription";


export default class Order extends DomainClass<Order>{

    static readonly path = Paths.orders2;

    static id = ObjectFieldDescription.label("id").setVisible(false);
    // static orderSubjectId = ForeignIdFieldDescription.withForeignDataSet(OrderSubjectDataSet).withLabel("предмет заказа").setMandatory(true).setFilter(true);
    // static orderSubject = ForeignFieldDescription.withForeignModel(OrderSubject).withLabel("предмет заказа").setMain(true);
    // static legalEntityId = ForeignIdFieldDescription.withForeignDataSet(LegalEntitiesDataSet).withLabel("субподрядчик").setFilter(true);
    // static legalEntity = ForeignFieldDescription.withForeignModel(LegalEntity).withLabel("субподрядчик");
    static amount = ObjectFieldDescription.label("количество").withType(DataType.NUMERIC);
    static orderDate = ObjectFieldDescription.label("дата заказа").withType(DataType.DATE)
        .withDefault(Dates.getToday()).setMandatory(true).setFilter(true);
    static orderDeadline = ObjectFieldDescription.label("дедлайн").withType(DataType.DATE).setFilter(true);
    static status = ObjectFieldDescription.label("статус").withValuesMap(OrderStatuses).withType(DataType.MAP).setFilter(true);
    static confirmed = ObjectFieldDescription.label("подтверждено").withType(DataType.BOOLEAN).setFilter(true);
    static supplied = ObjectFieldDescription.label("отгружено").withType(DataType.BOOLEAN).setFilter(true);
    static moneyReceived = ObjectFieldDescription.label("оплаченная сумма").withType(DataType.NUMERIC);
    static comment = ObjectFieldDescription.label("комментарий");

    static readonly objectDescription: ObjectDescription<Order> = new ObjectDescription<Order>(Order);

    constructor() {
        super(Order, Order.path)
    }

    public objectDescription():ObjectDescription<Order> {
        return Order.objectDescription;
    }
}