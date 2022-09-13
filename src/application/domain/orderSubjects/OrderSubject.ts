import Paths from "../../properties/Paths";
import DomainClass from "../../../library/reflection/DomainClass";
import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import DataType from "../../../library/data/dataObject/DataType";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";
import IdFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/IdFieldDescription";
import OrderSubjectType from "./OrderSubjectType";


export default class OrderSubject extends DomainClass<OrderSubject>{

    static readonly path = Paths.orderSubjects;

    static readonly id =   IdFieldDescription.create();
    static readonly Name = ObjectFieldDescription.label("Продукт/услуга").setMain(true);
    static readonly orderSubjectTypeId =    ObjectFieldDescription.label("Категория").withForeignModel(OrderSubjectType).withType(DataType.FOREIGN_ID).setVisible(false).setFilter(true);
    static readonly orderSubjectType =  ObjectFieldDescription.label("Категория").withForeignModel(OrderSubjectType).withType(DataType.FOREIGN_OBJECT);

    static readonly objectDescription: ObjectDescription<OrderSubject> = new ObjectDescription<OrderSubject>(OrderSubject);

    constructor() {
        super(OrderSubject, OrderSubject.path)
    }

    public objectDescription():ObjectDescription<OrderSubject> {
        return OrderSubject.objectDescription;
    }
}