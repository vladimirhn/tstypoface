
import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import DataType from "../../../library/data/dataObject/DataType";
import DomainClass from "../../../library/reflection/DomainClass";
import Paths from "../../properties/Paths";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";

export default class MoneyMovement extends DomainClass<MoneyMovement>{

    static readonly path = Paths.moneyMovements;

    static id = ObjectFieldDescription.label("id").setVisible(false);
    static movementDate = ObjectFieldDescription.label("дата").withType(DataType.DATE);
    static amount = ObjectFieldDescription.label("сумма").withType(DataType.NUMERIC);
    static type = ObjectFieldDescription.label("type").setVisible(false);

    static readonly objectDescription: ObjectDescription<MoneyMovement> = new ObjectDescription<MoneyMovement>(MoneyMovement);

    constructor() {
        super(MoneyMovement, MoneyMovement.path)
    }

    public objectDescription():ObjectDescription<MoneyMovement> {
        return MoneyMovement.objectDescription;
    }
}