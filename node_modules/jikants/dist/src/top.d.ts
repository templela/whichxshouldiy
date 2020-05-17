import { Result, Types } from "./interfaces/top/Top";
declare const _default: {
    items: (type?: Types, page?: number, subType?: "manga" | "airing" | "upcoming" | "doujin" | "manhua" | "manhwa" | "movie" | "ova" | "special" | "tv" | "bypopularity" | "favorite" | "novels" | "oneshots" | undefined) => Promise<Result | undefined>;
};
export default _default;
