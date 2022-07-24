import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import IdFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/IdFieldDescription";
import DataType from "../../../library/data/dataObject/DataType";
import DomainClass from "../../../library/reflection/DomainClass";
import Paths from "../../properties/Paths";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";

export default class ConsumableProperty extends DomainClass<ConsumableProperty>{

    static readonly path = Paths.consumableProperties;

    static id = IdFieldDescription.create();
    static typeId = ObjectFieldDescription.label("").setVisible(false);
    static propertyName = ObjectFieldDescription.label("свойство");

    static readonly objectDescription: ObjectDescription<ConsumableProperty> = new ObjectDescription<ConsumableProperty>(ConsumableProperty);

    constructor() {
        super(ConsumableProperty, ConsumableProperty.path)
    }

    public objectDescription():ObjectDescription<ConsumableProperty> {
        return ConsumableProperty.objectDescription;
    }
}