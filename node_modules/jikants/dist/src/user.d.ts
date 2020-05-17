import { AnimeList, AnimeListTypes } from "./interfaces/user/AnimeList";
import { Friends } from "./interfaces/user/Friends";
import { History, Types } from "./interfaces/user/History";
import { MangaList, MangaListTypes } from "./interfaces/user/MangaList";
import { Profile } from "./interfaces/user/Profile";
declare const _default: {
    animeList: (username: string, type?: AnimeListTypes, page?: number) => Promise<AnimeList | undefined>;
    friends: (username: string, page?: number) => Promise<Friends | undefined>;
    history: (username: string, type?: Types) => Promise<History | undefined>;
    mangaList: (username: string, type?: MangaListTypes, page?: number) => Promise<MangaList | undefined>;
    profile: (username: string) => Promise<Profile | undefined>;
};
export default _default;
