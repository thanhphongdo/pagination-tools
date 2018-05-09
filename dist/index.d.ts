import { PaginationConfig, PAGINATION_MODE, PaginationConfigConstructerParamsInterface, GetNumOfPageFuncInterface, PaginationFuncInterface, MapDataFuncInterface } from './pagination-config';
export declare class Pagination {
    private _config;
    private _data;
    private _pageList;
    readonly config: PaginationConfig;
    option: PaginationConfig;
    data: any;
    pageList: Array<number>;
    constructor(config?: PaginationConfig);
    private executeGetData();
    private executeSearch();
    private executeFilter();
    executeGetNumOfPage(callback?: Function): Promise<void>;
    private executeData();
    getPage(page: number): Promise<any>;
    nextPage(): Promise<any>;
    prevPage(): Promise<any>;
    /**
     * @description get data for first page
     */
    firstPage(): Promise<any>;
    lastPage(): Promise<any>;
}
export { PaginationConfig, PAGINATION_MODE, PaginationConfigConstructerParamsInterface, GetNumOfPageFuncInterface, PaginationFuncInterface, MapDataFuncInterface };
