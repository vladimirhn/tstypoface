import Paths from "../../properties/Paths";
import DomainClass from "../../../library/reflection/DomainClass";
import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import DataType from "../../../library/data/dataObject/DataType";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";
import ConsumableItem from "../consumables/ConsumableItem";


export default class PurchasingConsumables extends DomainClass<PurchasingConsumables>{

    static readonly path = Paths.purchasingConsumables;

    static readonly id =              ObjectFieldDescription.label("id").setVisible(false);
    static readonly purchasingDate =  ObjectFieldDescription.label("дата закупки").withType(DataType.DATE).setFilter(true);
    static readonly consumableId =    ObjectFieldDescription.label("расходник").withForeignModel(ConsumableItem).withType(DataType.FOREIGN_ID).setVisible(false).setFilter(true);
    static readonly consumableItem =  ObjectFieldDescription.label("расходник").withForeignModel(ConsumableItem).withType(DataType.FOREIGN_OBJECT);
    static readonly price =           ObjectFieldDescription.label("цена").withType(DataType.NUMERIC);
    static readonly amount =          ObjectFieldDescription.label("количество").withType(DataType.NUMERIC);
    static readonly capacity =        ObjectFieldDescription.label("кол-во в упаковке").withType(DataType.NUMERIC);
    static readonly legalEntityId =   ObjectFieldDescription.label("legalEntityId").setVisible(false);
    // static readonly legalEntity = ObjectFieldDescription.label("контрагент").withForeignModel(ConsumableItem).withType(DataType.OBJECT);

    static readonly objectDescription: ObjectDescription<PurchasingConsumables> = new ObjectDescription<PurchasingConsumables>(PurchasingConsumables);

    constructor() {
        super(PurchasingConsumables, PurchasingConsumables.path)
    }

    public objectDescription():ObjectDescription<PurchasingConsumables> {
        return PurchasingConsumables.objectDescription;
    }
}