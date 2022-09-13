import Paths from "../../properties/Paths";
import DomainClass from "../../../library/reflection/DomainClass";
import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import DataType from "../../../library/data/dataObject/DataType";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";


export default class Stock extends DomainClass<Stock>{

    static readonly path = Paths.stockBalance;

    static readonly itemId = ObjectFieldDescription.label("id").setVisible(false);
    static readonly item =   ObjectFieldDescription.label("расходник");
    static readonly sum =    ObjectFieldDescription.label("кол-во").withType(DataType.NUMERIC);

    static readonly objectDescription: ObjectDescription<Stock> = new ObjectDescription<Stock>(Stock);

    constructor() {
        super(Stock, Stock.path)
    }

    public objectDescription():ObjectDescription<Stock> {
        return Stock.objectDescription;
    }
}