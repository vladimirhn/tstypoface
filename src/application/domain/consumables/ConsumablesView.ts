import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import DataType from "../../../library/data/dataObject/DataType";
import DomainClass from "../../../library/reflection/DomainClass";
import Paths from "../../properties/Paths";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";

export default class ConsumablesView extends DomainClass<ConsumablesView>{

    static readonly path = Paths.consumables;

    static typeId = ObjectFieldDescription.label("");
    static typeName = ObjectFieldDescription.label("");
    static itemId = ObjectFieldDescription.label("");
    static itemName = ObjectFieldDescription.label("");
    static packageCapacity = ObjectFieldDescription.label("").withType(DataType.NUMERIC);
    static propertyId = ObjectFieldDescription.label("");
    static propertyName = ObjectFieldDescription.label("");
    static valueId = ObjectFieldDescription.label("");
    static valueValue = ObjectFieldDescription.label("");
    static items = ObjectFieldDescription.label("").withType(DataType.ARRAY)
    static properties = ObjectFieldDescription.label("").withType(DataType.ARRAY)
    static propertyIds = ObjectFieldDescription.label("").withType(DataType.MAP)

    static readonly objectDescription: ObjectDescription<ConsumablesView> = new ObjectDescription<ConsumablesView>(ConsumablesView);

    constructor() {
        super(ConsumablesView, ConsumablesView.path)
    }

    public objectDescription():ObjectDescription<ConsumablesView> {
        return ConsumablesView.objectDescription;
    }
}