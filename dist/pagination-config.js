"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAGINATION_MODE = {
    GET_DATA: 'GET_DATA',
    SEARCH: 'SEARCH',
    FILTER: 'FILTER'
};
class PaginationConfig {
    constructor(params) {
        this._mode = exports.PAGINATION_MODE.GET_DATA;
        this._page = 1;
        this._perPage = 10;
        this._skipMore = 0;
        this._numOfPage = 0;
        this._numOfRecord = 0;
        this._loading = false;
        this._enableLoading = false;
        this._maxPageInPagination = 5;
        this._enableMaxPageMode = true;
        // this.getDataFunc = ()=>{
        //     return Promise.resolve(true);
        // }
        // this.getDataFunc().then(function(){})
        if (params) {
            if (params.getDataFunc) {
                this._getDataFunc = params.getDataFunc;
            }
            if (params.searchFunc) {
                this._searchFunc = params.searchFunc;
            }
            if (params.filterFunc) {
                this._filterFunc = params.filterFunc;
            }
            if (params.getNumOfPageFunc) {
                this._getNumOfPageFunc = params.getNumOfPageFunc;
            }
            if (params.mapDataFunc) {
                this._mapDataFunc = params.mapDataFunc;
            }
            if (params.mode !== undefined) {
                this._mode = params.mode;
            }
            if (params.page !== undefined) {
                this._page = params.page;
            }
            if (params.perPage !== undefined) {
                this._perPage = params.perPage;
            }
            if (params.skipMore !== undefined) {
                this._skipMore = params.skipMore;
            }
            if (params.enableLoading !== undefined) {
                this._enableLoading = params.enableLoading;
            }
            if (params.maxPageInPagination !== undefined) {
                this._maxPageInPagination = params.maxPageInPagination;
            }
        }
    }
    get mode() {
        return this._mode;
    }
    set mode(mode) {
        this._mode = mode;
    }
    get getDataFunc() {
        return this._getDataFunc;
    }
    set getDataFunc(getDataFunc) {
        this._getDataFunc = getDataFunc;
    }
    get searchFunc() {
        return this._searchFunc;
    }
    set searchFunc(searchFunc) {
        this._searchFunc = searchFunc;
    }
    get filterFunc() {
        return this._filterFunc;
    }
    set filter(filterFunc) {
        this._filterFunc = filterFunc;
    }
    get mapDataFunc() {
        return this._mapDataFunc;
    }
    set mapDataFunc(mapDataFunc) {
        this._mapDataFunc = mapDataFunc;
    }
    get page() {
        return this._page;
    }
    set page(value) {
        this._page = value;
    }
    get perPage() {
        return this._perPage;
    }
    set perPage(value) {
        this._perPage = value;
        this.numOfPage = Math.ceil(this.numOfRecord / this.perPage);
    }
    get skipMore() {
        return this._skipMore;
    }
    set skipMore(value) {
        this._skipMore = value;
    }
    get numOfPage() {
        return this._numOfPage;
    }
    set numOfPage(value) {
        this._numOfPage = value;
    }
    get getNumOfPageFunc() {
        return this._getNumOfPageFunc;
    }
    set getNumOfPage(value) {
        this._getNumOfPageFunc = value;
    }
    get numOfRecord() {
        return this._numOfRecord;
    }
    set numOfRecord(value) {
        this._numOfRecord = value;
        this.numOfPage = Math.ceil(this.numOfRecord / this.perPage);
    }
    get loading() {
        return this._loading;
    }
    set loading(value) {
        this._loading = value;
    }
    get enableLoading() {
        return this._enableLoading;
    }
    set enableLoading(value) {
        this._enableLoading = value;
    }
    get maxPageInPagination() {
        return this._maxPageInPagination;
    }
    set maxPageInPagination(value) {
        this._maxPageInPagination = value;
    }
    get enableMaxPageMode() {
        return this._enableMaxPageMode;
    }
    set enableMaxPageMode(value) {
        this._enableMaxPageMode = value;
    }
}
exports.PaginationConfig = PaginationConfig;
