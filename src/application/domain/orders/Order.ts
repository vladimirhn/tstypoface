import Paths from "../../properties/Paths";
import DomainClass from "../../../library/reflection/DomainClass";
import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import DataType from "../../../library/data/dataObject/DataType";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";
import Dates from "../../../library/tools/Dates";
import OrderStatuses from "./OrderStatuses";
import OrderSubject from "../orderSubjects/OrderSubject";
import LegalEntity from "../counterparties/LegalEntity";


export default class Order extends DomainClass<Order>{

    static readonly path = Paths.orders2;

    static id =             ObjectFieldDescription.label("id").setVisible(false);
    static orderSubjectId = ObjectFieldDescription.label("Продукт/услуга").withForeignModel(OrderSubject).withType(DataType.FOREIGN_ID).setVisible(false).setFilter(true);
    static orderSubject =   ObjectFieldDescription.label("Продукт/услуга").withForeignModel(OrderSubject).withType(DataType.FOREIGN_OBJECT);
    static legalEntityId =  ObjectFieldDescription.label("контрагент").withForeignModel(LegalEntity).withType(DataType.FOREIGN_ID).setVisible(false).setFilter(true);
    static legalEntity =    ObjectFieldDescription.label("контрагент").withForeignModel(LegalEntity).withType(DataType.FOREIGN_OBJECT);
    static amount =         ObjectFieldDescription.label("количество").withType(DataType.NUMERIC).setMandatory(true);
    static orderDate =      ObjectFieldDescription.label("дата заказа").withType(DataType.DATE).withDefault(Dates.getToday()).setMandatory(true).setFilter(true);
    static orderDeadline =  ObjectFieldDescription.label("дедлайн").withType(DataType.DATE).setFilter(true);
    static status =         ObjectFieldDescription.label("статус").withValuesMap(OrderStatuses).withType(DataType.MAP).setFilter(true);
    static confirmed =      ObjectFieldDescription.label("подтверждено").withType(DataType.BOOLEAN).setFilter(true);
    static supplied =       ObjectFieldDescription.label("отгружено").withType(DataType.BOOLEAN).setFilter(true);
    static moneyReceived =  ObjectFieldDescription.label("оплаченная сумма").withType(DataType.NUMERIC);
    static comment =        ObjectFieldDescription.label("комментарий");

    static readonly objectDescription: ObjectDescription<Order> = new ObjectDescription<Order>(Order);

    constructor() {
        super(Order, Order.path)
    }

    public objectDescription():ObjectDescription<Order> {
        return Order.objectDescription;
    }
}