import { Filters, Search, SearchTypes } from "./interfaces/search/Search";
declare const _default: {
    search: (query: string, type: SearchTypes, page?: number, filters?: Filters | undefined) => Promise<Search | undefined>;
};
export default _default;
