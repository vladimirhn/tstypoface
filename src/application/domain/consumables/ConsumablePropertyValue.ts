import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import IdFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/IdFieldDescription";
import DataType from "../../../library/data/dataObject/DataType";
import DomainClass from "../../../library/reflection/DomainClass";
import Paths from "../../properties/Paths";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";

export default class ConsumablePropertyValue extends DomainClass<ConsumablePropertyValue>{

    static readonly path = Paths.consumablePropertyValues;

    static id = IdFieldDescription.create();
    static itemId = ObjectFieldDescription.label("").setVisible(false);
    static propertyId = ObjectFieldDescription.label("").setVisible(false);
    static propertyValue = ObjectFieldDescription.label("").setVisible(false);

    static readonly objectDescription: ObjectDescription<ConsumablePropertyValue> = new ObjectDescription<ConsumablePropertyValue>(ConsumablePropertyValue);

    constructor() {
        super(ConsumablePropertyValue, ConsumablePropertyValue.path)
    }

    public objectDescription():ObjectDescription<ConsumablePropertyValue> {
        return ConsumablePropertyValue.objectDescription;
    }
}