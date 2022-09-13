import Paths from "../../properties/Paths";
import DomainClass from "../../../library/reflection/DomainClass";
import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import DataType from "../../../library/data/dataObject/DataType";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";
import IdFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/IdFieldDescription";


export default class OrderSubjectType extends DomainClass<OrderSubjectType>{

    static readonly path = Paths.orderSubjectsTypes;

    static readonly id =   IdFieldDescription.create();
    static readonly Name = ObjectFieldDescription.label("Категория").setMain(true);

    static readonly objectDescription: ObjectDescription<OrderSubjectType> = new ObjectDescription<OrderSubjectType>(OrderSubjectType);

    constructor() {
        super(OrderSubjectType, OrderSubjectType.path)
    }

    public objectDescription():ObjectDescription<OrderSubjectType> {
        return OrderSubjectType.objectDescription;
    }
}