export declare const PAGINATION_MODE: {
    GET_DATA: string;
    SEARCH: string;
    FILTER: string;
};
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
export declare class PaginationConfig {
    private _getDataFunc;
    private _searchFunc;
    private _filterFunc;
    private _getNumOfPageFunc;
    private _mapDataFunc;
    private _mode;
    private _page;
    private _perPage;
    private _skipMore;
    private _numOfPage;
    private _numOfRecord;
    private _loading;
    private _enableLoading;
    private _maxPageInPagination;
    private _enableMaxPageMode;
    mode: string;
    getDataFunc: PaginationFuncInterface;
    searchFunc: PaginationFuncInterface;
    readonly filterFunc: PaginationFuncInterface;
    filter: PaginationFuncInterface;
    mapDataFunc: MapDataFuncInterface;
    page: number;
    perPage: number;
    skipMore: number;
    numOfPage: number;
    readonly getNumOfPageFunc: GetNumOfPageFuncInterface;
    getNumOfPage: GetNumOfPageFuncInterface;
    numOfRecord: number;
    loading: boolean;
    enableLoading: boolean;
    maxPageInPagination: number;
    enableMaxPageMode: boolean;
    constructor(params?: PaginationConfigConstructerParamsInterface);
}
