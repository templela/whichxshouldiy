import { Anime, Manga } from "./interfaces/genre/Genre";
declare const _default: {
    anime: (genreId: number, page?: number) => Promise<Anime | undefined>;
    manga: (genreId: number, page?: number) => Promise<Manga | undefined>;
};
export default _default;
