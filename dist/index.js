"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_config_1 = require("./pagination-config");
exports.PaginationConfig = pagination_config_1.PaginationConfig;
exports.PAGINATION_MODE = pagination_config_1.PAGINATION_MODE;
class Pagination {
    constructor(config) {
        this._pageList = [];
        if (config) {
            this._config = config;
        }
    }
    get config() {
        return this._config;
    }
    set option(config) {
        this._config = config;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    get pageList() {
        return this._pageList;
    }
    set pageList(value) {
        this._pageList = value;
    }
    executeGetData() {
        this.config.mode = pagination_config_1.PAGINATION_MODE.GET_DATA;
        var self = this;
        return self.config.getDataFunc(self.config.page, self.config.perPage);
    }
    executeSearch() {
        this.config.mode = pagination_config_1.PAGINATION_MODE.SEARCH;
        var self = this;
        return self.config.searchFunc(self.config.page, self.config.perPage);
    }
    executeFilter() {
        this.config.mode = pagination_config_1.PAGINATION_MODE.FILTER;
        var self = this;
        return self.config.filterFunc(self.config.page, self.config.perPage);
    }
    executeGetNumOfPage(callback) {
        var self = this;
        return this.config.getNumOfPageFunc().then((count) => {
            self.config.numOfRecord = count;
            self.config.numOfPage = Math.ceil(count / self.config.perPage);
            self.makePageList();
            if (callback)
                callback();
        }).catch((err) => {
            console.log(err);
        });
    }
    // private getStartByPage(page?: number) {
    //     if (page) {
    //         return (page - 1) * this.perPage;
    //     } else {
    //         return (this.page - 1) * this.perPage;
    //     }
    // }
    executeData() {
        switch (this.config.mode) {
            case pagination_config_1.PAGINATION_MODE.GET_DATA: {
                return this.executeGetData();
            }
            case pagination_config_1.PAGINATION_MODE.SEARCH: {
                return this.executeSearch();
            }
            case pagination_config_1.PAGINATION_MODE.FILTER: {
                return this.executeFilter();
            }
            default: {
                return this.executeGetData();
            }
        }
    }
    // public makePageList() {
    //     if (this.enableMaxPageMode) {
    //         console.log(this.numOfPage);
    //         this.pageList = [];
    //         if (this.page <= Math.ceil(this.maxPageInPagination / 2)) {
    //             for (let i = 0; i < this.maxPageInPagination; i++) {
    //                 if (i < this.numOfPage)
    //                     this.pageList.push(i + 1);
    //             }
    //         } else if (this.numOfPage - this.page < Math.ceil(this.maxPageInPagination / 2)) {
    //             for (let i = this.numOfPage - 1; i >= this.numOfPage - this.maxPageInPagination; i--) {
    //                 if (i >= 0)
    //                     this.pageList.unshift(i + 1);
    //             }
    //         } else {
    //             for (let i = this.page - (Math.floor(this.maxPageInPagination / 2) + 1); i <= this.page + (Math.floor(this.maxPageInPagination / 2) - 1); i++) {
    //                 this.pageList.push(i + 1);
    //             }
    //         }
    //     } else {
    //         this.pageList = [];
    //         for (let i = 0; i < this.numOfPage; i++) {
    //             this.pageList.push(i + 1);
    //         }
    //     }
    // }
    makePageList() {
        if (this.config.enableMaxPageMode) {
            let pageList = [];
            for (let i = this.config.page - (Math.ceil(this.config.maxPageInPagination / 2) - 1); i <= this.config.page + (Math.ceil(this.config.maxPageInPagination / 2) - this.config.maxPageInPagination % 2); i++) {
                if (i >= 1 && i <= this.config.numOfPage) {
                    pageList.push(i);
                }
            }
            if (pageList.length < this.config.maxPageInPagination) {
                let fromPage = 0, toPage = 0;
                if (pageList[0] == 1) {
                    fromPage = pageList[pageList.length - 1] + 1;
                    toPage = pageList[pageList.length - 1] + (this.config.maxPageInPagination - pageList.length);
                    for (let i = fromPage; i <= toPage; i++) {
                        if (i >= 1 && i <= this.config.numOfPage && pageList.length < this.config.maxPageInPagination) {
                            pageList.push(i);
                        }
                    }
                }
                else if (pageList[pageList.length - 1] == this.config.numOfPage) {
                    toPage = pageList[0] - 1;
                    fromPage = pageList[0] - (this.config.maxPageInPagination - pageList.length);
                    for (let i = toPage; i >= fromPage; i--) {
                        if (i >= 1 && i <= this.config.numOfPage && pageList.length < this.config.maxPageInPagination) {
                            pageList.unshift(i);
                        }
                    }
                }
            }
            this.pageList = pageList;
        }
        else {
            this.pageList = [];
            for (let i = 0; i < this.config.numOfPage; i++) {
                this.pageList.push(i + 1);
            }
        }
    }
    getPage(page) {
        var self = this;
        if (this.config.loading)
            return Promise.resolve(null);
        this.config.page = page;
        if (this.config.enableLoading)
            this.config.loading = true;
        return this.executeData().then((res) => {
            self.config.loading = false;
            self.makePageList();
            if (self.config.mapDataFunc) {
                return self.config.mapDataFunc(res);
            }
            else {
                return res;
            }
        }).catch((err) => {
            self.config.loading = false;
            return Promise.reject(err);
        });
    }
    nextPage() {
        var self = this;
        if (this.config.loading)
            return Promise.resolve(null);
        this.config.page++;
        if (this.config.enableLoading)
            this.config.loading = true;
        return this.executeData().then((res) => {
            self.config.loading = false;
            self.makePageList();
            if (self.config.mapDataFunc) {
                return self.config.mapDataFunc(res);
            }
            else {
                return res;
            }
        }).catch((err) => {
            self.config.loading = false;
            return Promise.reject(err);
        });
    }
    prevPage() {
        var self = this;
        if (this.config.loading)
            return Promise.resolve(null);
        this.config.page--;
        if (this.config.enableLoading)
            this.config.loading = true;
        return this.executeData().then((res) => {
            self.config.loading = false;
            self.makePageList();
            if (self.config.mapDataFunc) {
                return self.config.mapDataFunc(res);
            }
            else {
                return res;
            }
        }).catch((err) => {
            self.config.loading = false;
            return Promise.reject(err);
        });
    }
    /**
     * @description get data for first page
     */
    firstPage() {
        var self = this;
        if (this.config.loading)
            return Promise.resolve(null);
        this.config.page = 1;
        if (this.config.enableLoading)
            this.config.loading = true;
        return this.executeData().then((res) => {
            self.config.loading = false;
            self.makePageList();
            if (self.config.mapDataFunc) {
                return self.config.mapDataFunc(res);
            }
            else {
                return res;
            }
        }).catch((err) => {
            self.config.loading = false;
            return Promise.reject(err);
        });
    }
    lastPage() {
        var self = this;
        if (this.config.loading)
            return Promise.resolve(null);
        this.config.page = self.config.numOfPage;
        if (this.config.enableLoading)
            this.config.loading = true;
        return this.executeData().then((res) => {
            self.config.loading = false;
            self.makePageList();
            if (self.config.mapDataFunc) {
                return self.config.mapDataFunc(res);
            }
            else {
                return res;
            }
        }).catch((err) => {
            self.config.loading = false;
            return Promise.reject(err);
        });
    }
}
exports.Pagination = Pagination;
