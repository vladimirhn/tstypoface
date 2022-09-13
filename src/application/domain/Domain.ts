import FinancialTransaction from "./enterprises/FinancialTransaction";
import AbstractDomain from "../../library/data/schema/AbstractDomain";
import Class from "../../library/reflection/Class";
import DomainClass from "../../library/reflection/DomainClass";
import MoneyMovement from "./enterprises/MoneyMovement";
import ConsumableType from "./consumables/ConsumableType";
import ConsumableProperty from "./consumables/ConsumableProperty";
import ConsumablesView from "./consumables/ConsumablesView";
import ConsumableItem from "./consumables/ConsumableItem";
import ConsumablePropertyValue from "./consumables/ConsumablePropertyValue";
import PurchasingConsumables from "./purchasing/PurchasingConsumables";
import Stock from "./stocks/Stock";
import OrderSubjectType from "./orderSubjects/OrderSubjectType";
import OrderSubject from "./orderSubjects/OrderSubject";

export default class Domain {

    static init(){console.log("Init domain schema")} //Just mention this class

    static instance:AbstractDomain = new AbstractDomain(new Map<Class<any>, DomainClass<any>>(
        [
            [FinancialTransaction, new FinancialTransaction()],
            [MoneyMovement, new MoneyMovement()],
            [ConsumableType, new ConsumableType()],
            [ConsumableProperty, new ConsumableProperty()],
            [ConsumablesView, new ConsumablesView()],
            [ConsumableItem, new ConsumableItem()],
            [ConsumablePropertyValue, new ConsumablePropertyValue()],
            [PurchasingConsumables, new PurchasingConsumables()],
            [Stock, new Stock()],
            [OrderSubjectType, new OrderSubjectType()],
            [OrderSubject, new OrderSubject()],
        ]
    ));

    public static get(klass: Class<any> | undefined): DomainClass<any> {
        return Domain.instance.get(klass);
    }

    public static getAll(): DomainClass<any>[] {
        return Domain.instance.getAll();
    }

    public static getByPath(path:string): DomainClass<any> {
        return Domain.instance.getByPath(path);
    }
}