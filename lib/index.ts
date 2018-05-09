import { PaginationConfig, PAGINATION_MODE, PaginationConfigConstructerParamsInterface, GetNumOfPageFuncInterface, PaginationFuncInterface, MapDataFuncInterface } from './pagination-config'

export class Pagination {
    private _config: PaginationConfig
    private _data: any;
    private _pageList: Array<number> = [];

    get config() {
        return this._config;
    }
    set option(config: PaginationConfig) {
        this._config = config;
    }

    get data() {
        return this._data;
    }
    set data(value: any) {
        this._data = value;
    }

    get pageList() {
        return this._pageList;
    }
    set pageList(value: Array<number>) {
        this._pageList = value;
    }

    constructor(config?: PaginationConfig) {
        if (config) {
            this._config = config;
        }
    }

    private executeGetData(): Promise<any> {
        this.config.mode = PAGINATION_MODE.GET_DATA;
        var self = this;
        return self.config.getDataFunc(self.config.page, self.config.perPage);
    }

    private executeSearch(): Promise<any> {
        this.config.mode = PAGINATION_MODE.SEARCH;
        var self = this;
        return self.config.searchFunc(self.config.page, self.config.perPage);
    }

    private executeFilter(): Promise<any> {
        this.config.mode = PAGINATION_MODE.FILTER;
        var self = this;
        return self.config.filterFunc(self.config.page, self.config.perPage);
    }

    public executeGetNumOfPage(callback?: Function) {
        var self = this;
        return this.config.getNumOfPageFunc().then((count: number) => {
            self.config.numOfRecord = count;
            self.config.numOfPage = Math.ceil(count / self.config.perPage);
            // self.makePageList();
            if (callback) callback();
        }).catch((err: any) => {
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

    private executeData() {
        switch (this.config.mode) {
            case PAGINATION_MODE.GET_DATA: {
                return this.executeGetData();
            }
            case PAGINATION_MODE.SEARCH: {
                return this.executeSearch();
            }
            case PAGINATION_MODE.FILTER: {
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

    public getPage(page: number) {
        var self = this;
        if (this.config.loading) return Promise.resolve(null);
        this.config.page = page;
        if (this.config.enableLoading) this.config.loading = true;
        return this.executeData().then((res: any) => {
            self.config.loading = false;
            // self.makePageList();
            if (self.config.mapDataFunc) {
                return self.config.mapDataFunc(res);
            } else {
                return res;
            }
        }).catch((err: any) => {
            self.config.loading = false;
            return Promise.reject(err);
        });
    }

    public nextPage() {
        var self = this;
        if (this.config.loading) return Promise.resolve(null);
        this.config.page++;
        if (this.config.enableLoading) this.config.loading = true;
        return this.executeData().then((res: any) => {
            self.config.loading = false;
            // self.makePageList();
            if (self.config.mapDataFunc) {
                return self.config.mapDataFunc(res);
            } else {
                return res;
            }
        }).catch((err: any) => {
            self.config.loading = false;
            return Promise.reject(err);
        });
    }

    public prevPage() {
        var self = this;
        if (this.config.loading) return Promise.resolve(null);
        this.config.page--;
        if (this.config.enableLoading) this.config.loading = true;
        return this.executeData().then((res: any) => {
            self.config.loading = false;
            // self.makePageList();
            if (self.config.mapDataFunc) {
                return self.config.mapDataFunc(res);
            } else {
                return res;
            }
        }).catch((err: any) => {
            self.config.loading = false;
            return Promise.reject(err);
        });
    }

    /**
     * @description get data for first page
     */
    public firstPage() {
        var self = this;
        if (this.config.loading) return Promise.resolve(null);
        this.config.page = 1;
        if (this.config.enableLoading) this.config.loading = true;
        return this.executeData().then((res: any) => {
            self.config.loading = false;
            // self.makePageList();
            if (self.config.mapDataFunc) {
                return self.config.mapDataFunc(res);
            } else {
                return res;
            }
        }).catch((err: any) => {
            self.config.loading = false;
            return Promise.reject(err);
        });
    }

    public lastPage() {
        var self = this;
        if (this.config.loading) return Promise.resolve(null);
        this.config.page = self.config.numOfPage;
        if (this.config.enableLoading) this.config.loading = true;
        return this.executeData().then((res: any) => {
            self.config.loading = false;
            // self.makePageList();
            if (self.config.mapDataFunc) {
                return self.config.mapDataFunc(res);
            } else {
                return res;
            }
        }).catch((err: any) => {
            self.config.loading = false;
            return Promise.reject(err);
        });
    }
}

export { PaginationConfig, PAGINATION_MODE, PaginationConfigConstructerParamsInterface, GetNumOfPageFuncInterface, PaginationFuncInterface, MapDataFuncInterface }