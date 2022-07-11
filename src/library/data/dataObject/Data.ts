import ObjectDescription from "../backend/ObjectDescription";
import ObjectFieldDescription from "./objectFieldsDescriptions/ObjectFieldDescription";

export default class Data<T> {

    private _obj:any;

    constructor(obj: any, objectDescription:ObjectDescription<T> | undefined) {

        this._obj = obj || {};

        if (objectDescription && objectDescription.defaultFieldsDescriptions) {
            for (let desc of objectDescription.defaultFieldsDescriptions) {
                if (!this.getValue(desc.field)) {
                    this.setValue(desc.field, desc.default);
                }
            }
        }
    }

    public getObject = ():any => {
        return this._obj;
    }

    public setObject = (obj:any) => {
        this._obj = obj;
    }

    public getValue = (fieldName:string):string => {
        return this._obj[fieldName];
    }

    public setValue = (fieldName:string, value:string|undefined):void => {
        this._obj[fieldName] = value;
    }

    public getValueByField = (field: ObjectFieldDescription|undefined):string|undefined => {

        let result;

        if (field) {
            let fieldName = field.field;
            result = this.getValue(fieldName);
        }
        else {
            console.log("Some ObjectFieldDescription was not found.")
        }

        return result;
    }

    public getDefinedValueByField = (field: ObjectFieldDescription|undefined):string => {
        return this.getValueByField(field) || "";
    }

    public setValueByField = (field:ObjectFieldDescription, value:string|undefined):void => {
        let fieldName = field.field;
        this.setValue(fieldName, value);
    }

    public nullifyDataFields = ():void => {
        for (let field in this._obj) {
            this._obj.setValue(field, undefined);
        }
    }

    public isDataFieldsEmpty = ():boolean => {
        for (let field in this._obj) {
            let value = this._obj[field];
            if (value !== null && value !== undefined && value !== "") return false;
        }
        return true;
    }

    get id():string {
        return this._obj.id;
    }

    set id(id:string) {
        this._obj.id = id;
    }
}