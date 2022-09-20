import Paths from "../../properties/Paths";
import DomainClass from "../../../library/reflection/DomainClass";
import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import DataType from "../../../library/data/dataObject/DataType";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";
import Order from "./Order";
import ConsumableItem from "../consumables/ConsumableItem";


export default class OrderConsumables extends DomainClass<OrderConsumables>{

    static readonly path = Paths.orderConsumables;

    static id =               ObjectFieldDescription.label("id").setVisible(false);
    static orderId =          ObjectFieldDescription.label("Заказ").withForeignModel(Order).withType(DataType.FOREIGN_ID).setVisible(false).setFilter(true);
    static consumableItemId = ObjectFieldDescription.label("Расходник").withForeignModel(ConsumableItem).withType(DataType.FOREIGN_ID).setVisible(false).setFilter(true);
    static consumableItem =   ObjectFieldDescription.label("Расходник").withForeignModel(ConsumableItem).withType(DataType.FOREIGN_OBJECT);
    static qty =              ObjectFieldDescription.label("Количество").withType(DataType.NUMERIC);

    static readonly objectDescription: ObjectDescription<OrderConsumables> = new ObjectDescription<OrderConsumables>(OrderConsumables);

    constructor() {
        super(OrderConsumables, OrderConsumables.path)
    }

    public objectDescription():ObjectDescription<OrderConsumables> {
        return OrderConsumables.objectDescription;
    }
}