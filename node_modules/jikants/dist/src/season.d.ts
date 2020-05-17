import { Season, Seasons } from "./interfaces/season/Season";
import { SeasonArchive } from "./interfaces/season/SeasonArchive";
import { SeasonLater } from "./interfaces/season/SeasonLater";
declare const _default: {
    anime: (year: number, season: Seasons) => Promise<Season | undefined>;
    archive: () => Promise<SeasonArchive | undefined>;
    later: () => Promise<SeasonLater | undefined>;
};
export default _default;
