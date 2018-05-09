export const PAGINATION_MODE = {
    GET_DATA: 'GET_DATA',
    SEARCH: 'SEARCH',
    FILTER: 'FILTER'
}

export interface PaginationFuncInterface {
    (page: number, perPage: number): Promise<any>;
}

export interface GetNumOfPageFuncInterface {
    (): Promise<any>;
}

export interface MapDataFuncInterface {
    (data: any): Promise<any>;
}

export interface PaginationConfigConstructerParamsInterface {
    getDataFunc?: PaginationFuncInterface;
    searchFunc?: PaginationFuncInterface;
    filterFunc?: PaginationFuncInterface;
    getNumOfPageFunc?: GetNumOfPageFuncInterface;
    mapDataFunc?: MapDataFuncInterface;
    mode?: string;
    page?: number;
    perPage?: number;
    skipMore?: number;
    enableLoading?: boolean;
    maxPageInPagination?: number;
}


export class PaginationConfig {
    private _getDataFunc: PaginationFuncInterface;
    private _searchFunc: PaginationFuncInterface;
    private _filterFunc: PaginationFuncInterface;
    private _getNumOfPageFunc: GetNumOfPageFuncInterface;
    private _mapDataFunc: MapDataFuncInterface;

    private _mode: string = PAGINATION_MODE.GET_DATA;
    private _page: number = 1;
    private _perPage: number = 10;
    private _skipMore: number = 0;
    private _numOfPage: number = 0;
    private _numOfRecord: number = 0;
    private _loading: boolean = false;
    private _enableLoading: boolean = false;
    private _maxPageInPagination: number = 5;
    private _enableMaxPageMode: boolean = true;

    get mode(): string {
        return this._mode;
    }

    set mode(mode: string) {
        this._mode = mode;
    }

    get getDataFunc(): PaginationFuncInterface {
        return this._getDataFunc;
    }
    set getDataFunc(getDataFunc: PaginationFuncInterface) {
        this._getDataFunc = getDataFunc;
    }

    get searchFunc(): PaginationFuncInterface {
        return this._searchFunc;
    }
    set searchFunc(searchFunc: PaginationFuncInterface) {
        this._searchFunc = searchFunc;
    }

    get filterFunc(): PaginationFuncInterface {
        return this._filterFunc;
    }
    set filter(filterFunc: PaginationFuncInterface) {
        this._filterFunc = filterFunc;
    }

    get mapDataFunc(): MapDataFuncInterface {
        return this._mapDataFunc;
    }
    set mapDataFunc(mapDataFunc: MapDataFuncInterface) {
        this._mapDataFunc = mapDataFunc;
    }

    get page() {
        return this._page;
    }
    set page(value: number) {
        this._page = value;
    }

    get perPage() {
        return this._perPage;
    }
    set perPage(value: number) {
        this._perPage = value;
        this.numOfPage = Math.ceil(this.numOfRecord / this.perPage);
    }

    get skipMore() {
        return this._skipMore;
    }
    set skipMore(value: number) {
        this._skipMore = value;
    }

    get numOfPage() {
        return this._numOfPage;
    }
    set numOfPage(value: number) {
        this._numOfPage = value;
    }

    get getNumOfPageFunc() {
        return this._getNumOfPageFunc;
    }
    set getNumOfPage(value: GetNumOfPageFuncInterface) {
        this._getNumOfPageFunc = value;
    }

    get numOfRecord() {
        return this._numOfRecord;
    }
    set numOfRecord(value: number) {
        this._numOfRecord = value;
        this.numOfPage = Math.ceil(this.numOfRecord / this.perPage);
    }

    get loading() {
        return this._loading;
    }
    set loading(value: boolean) {
        this._loading = value;
    }

    get enableLoading() {
        return this._enableLoading;
    }
    set enableLoading(value: boolean) {
        this._enableLoading = value;
    }

    get maxPageInPagination() {
        return this._maxPageInPagination;
    }

    set maxPageInPagination(value: number) {
        this._maxPageInPagination = value;
    }

    get enableMaxPageMode() {
        return this._enableMaxPageMode;
    }
    set enableMaxPageMode(value: boolean) {
        this._enableMaxPageMode = value;
    }

    constructor(params?: PaginationConfigConstructerParamsInterface) {
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

}