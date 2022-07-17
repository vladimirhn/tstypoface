import Fetcher from "../../tools/Fetcher";
import ObjectDescription from "./ObjectDescription";
import Consumer from "../../functions/interfaces/Consumer";
import {RepositoryState} from "./RepositoryState";
import DataSet from "../dataSet/DataSet";
import DomainClass from "../../reflection/DomainClass";
import Runnable from "../../functions/interfaces/Runnable";
import {DataState} from "../dataSet/DataState";
import DataObject from "../dataObject/DataObject";
import Domain from "../../../application/domain/Domain";
import Class from "../../reflection/Class";

export default class Repository2<T> {

    static empty(klass: Class<any>):Repository2<any> {
        return new Repository2<any>(Domain.get(klass));
    }

    private readonly _domainClass:DomainClass<T> | undefined;
    private readonly _path:string;
    private readonly _objectDescription?:ObjectDescription<T>;
    public dataSet:DataSet<T> = DataSet.empty();
    public _rerender:Runnable = () => {
        if (this._repoSetter) {
            this._repoSetter(this.duplicate());
        }
    };
    public _repoSetter:Consumer | undefined;

    private readonly _defaultOrderBy:string | undefined;

    private _state:RepositoryState = RepositoryState.NOT_INITIATED;
    private _dataState:DataState = DataState.UNFETCHED;

    constructor(domainClass:DomainClass<T> | undefined) {

        this._domainClass = domainClass;
        this._path = domainClass?.path || "";
        this._objectDescription = domainClass?.objectDescription();

        this._defaultOrderBy = this._objectDescription?.orderByField;
    }

    get objectDescription(): ObjectDescription<T> | undefined {
        return this._objectDescription;
    }

    get state():RepositoryState {
        return this._state;
    }

    get dataState():DataState {
        return this._dataState;
    }

    initialFetchAll = (repoSetter:Consumer) => {
        this._repoSetter = repoSetter;
        this.fetchAll();
    }

    duplicate():Repository2<any> {
        let duplicate:Repository2<any> = new Repository2(this._domainClass);
        duplicate.dataSet = this.dataSet;
        duplicate._state = this._state;

        return duplicate;
    }

    fetchAll = () => {

        let path = this._path + "/get_all";
        if (this._defaultOrderBy) path += "/" + this._defaultOrderBy[0] + "/" + this._defaultOrderBy[1];

        this._state = RepositoryState.FETCHING_DATA;

        Fetcher.get(path)
            .then((result:any) => {
                this._state = RepositoryState.DATA_FETCHED;
                this._dataState = DataState.FETCHED_ALL;
                this.dataSet.setUpDataSet(this._objectDescription, this._path, result, this._rerender);

                if (this._rerender) this._rerender();
            });
    }

    fetchFiltered = (example:DataObject<T>) => {

        if (example.data?.isDataFieldsEmpty()) {
            this.fetchAll();
            return;
        }

        this._state = RepositoryState.FETCHING_DATA;

        Fetcher.postForJson(example.data?.getObject(), this._path + "/get_filtered")
            .then(result => {

                this._state = RepositoryState.DATA_FETCHED;
                this._dataState = DataState.FILTERED;
                this.dataSet.setUpDataSet(this._objectDescription, this._path, result, this._rerender);
                this._rerender();
            });
    }

    insert(example:DataObject<T>) {
        Fetcher.postForText(example.data?.getObject(), this._path + "/insert")
            .then(result => {

                alert("Сохранено");

                this.fetchAll();
            });
    }

    insertAll(data:any, callback: Consumer) {

        Fetcher.postForText(data, this._path + "/insert_all")
            .then(result => {

                alert("Сохранено");

                if (callback) {
                    callback(result);
                }
            });
    }

    delete = (id:string) => {
        Fetcher.getText(this._path + "/delete/" + id)
            .then(result => {

                alert("Удалено");
                this.fetchAll();
            });
    }

    deleteSelected = () => {
        const selectedId = this.dataSet.oneSelectedEntry?.data?.id;
        if (selectedId) {
            this.delete(selectedId);
        } else {
            console.log("Попытка удалить запись, но запись либо не выбрана, либо не содержить поля id.")
        }
    }

    update(data:any, callback: Consumer) {

        console.log("Обновляется: " + JSON.stringify(data));

        Fetcher.postForText(data,this._path + "/update")
            .then(result => {

                alert("Обновлено");

                if (callback) {
                    callback(result);
                }
            });
    }
}