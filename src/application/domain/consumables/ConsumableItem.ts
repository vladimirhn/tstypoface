import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import IdFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/IdFieldDescription";
import DataType from "../../../library/data/dataObject/DataType";
import DomainClass from "../../../library/reflection/DomainClass";
import Paths from "../../properties/Paths";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";

export default class ConsumableItem extends DomainClass<ConsumableItem>{

    static readonly path = Paths.consumableItems;

    static id = IdFieldDescription.create();
    static typeId = ObjectFieldDescription.label("").setVisible(false);
    static item = ObjectFieldDescription.label("название");
    static packageCapacity = ObjectFieldDescription.label("коробка").withType(DataType.NUMERIC);
    static deleted = ObjectFieldDescription.label("удалено").withType(DataType.BOOLEAN).setVisible(false);
    static propertyValues = ObjectFieldDescription.label("").withType(DataType.ARRAY)

    static readonly objectDescription: ObjectDescription<ConsumableItem> = new ObjectDescription<ConsumableItem>(ConsumableItem);

    constructor() {
        super(ConsumableItem, ConsumableItem.path)
    }

    public objectDescription():ObjectDescription<ConsumableItem> {
        return ConsumableItem.objectDescription;
    }
}