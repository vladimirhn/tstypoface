import FinancialTransaction from "./enterprises/FinancialTransaction";
import AbstractDomain from "../../library/data/schema/AbstractDomain";
import Class from "../../library/reflection/Class";
import DomainClass from "../../library/reflection/DomainClass";

export default class Domain {

    static init(){console.log("Init domain schema")} //Just mention this class

    static instance:AbstractDomain = new AbstractDomain(new Map<Class<any>, DomainClass<any>>(
        [
            [FinancialTransaction, new FinancialTransaction()]
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