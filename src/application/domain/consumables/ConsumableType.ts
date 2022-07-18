import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import IdFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/IdFieldDescription";
import DataType from "../../../library/data/dataObject/DataType";
import DomainClass from "../../../library/reflection/DomainClass";
import Paths from "../../properties/Paths";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";

export default class ConsumableType extends DomainClass<ConsumableType>{

    static readonly path = Paths.consumableTypes;

    static id = IdFieldDescription.create();
    static type = ObjectFieldDescription.label("тип").setMain(true);
    static deleted = ObjectFieldDescription.label("удалено").withType(DataType.BOOLEAN).setVisible(false);
    static properties = ObjectFieldDescription.label("").setVisible(false).withType(DataType.ARRAY)

    static readonly objectDescription: ObjectDescription<ConsumableType> = new ObjectDescription<ConsumableType>(ConsumableType);

    constructor() {
        super(ConsumableType, ConsumableType.path)
    }

    public objectDescription():ObjectDescription<ConsumableType> {
        return ConsumableType.objectDescription;
    }
}