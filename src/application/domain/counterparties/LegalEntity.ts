import Paths from "../../properties/Paths";
import DomainClass from "../../../library/reflection/DomainClass";
import ObjectFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/ObjectFieldDescription";
import ObjectDescription from "../../../library/data/backend/ObjectDescription";
import IdFieldDescription from "../../../library/data/dataObject/objectFieldsDescriptions/IdFieldDescription";


export default class LegalEntity extends DomainClass<LegalEntity>{

    static readonly path = Paths.legalEntities;

    static readonly id =   IdFieldDescription.create();
    static readonly Name = ObjectFieldDescription.label("Название").setMain(true);
    static readonly phone = ObjectFieldDescription.label("Телефон");
    static readonly address = ObjectFieldDescription.label("Адрес");

    static readonly objectDescription: ObjectDescription<LegalEntity> = new ObjectDescription<LegalEntity>(LegalEntity);

    constructor() {
        super(LegalEntity, LegalEntity.path)
    }

    public objectDescription():ObjectDescription<LegalEntity> {
        return LegalEntity.objectDescription;
    }
}