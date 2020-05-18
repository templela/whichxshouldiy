
import { AnimeById } from "jikants/dist/src/interfaces/anime/ById";
import { AnimeList } from "jikants/dist/src/interfaces/user/AnimeList";

export interface MegaList {
  [mal_id: string]: AnimeById;
}

export interface CustomAnime extends Anime {
  watching_status_plain: string;
  title_english: string;
  studio: string;
  score: number;
  members: number;
  year: string;
  duration_minutes: number;

  ranking_duration: number;
  ranking_score: number;
  ranking_members: number;
}





// Interfaces ripped from node_modules/jikants/dist/src/interfaces/user/AnimeList
// Unfortunatly they weren't exported and I'm not doing a PR for a single line change
interface Anime {
  readonly added_to_list: boolean;
  readonly airing_status: number;
  readonly days: number | null;
  readonly end_date: Date | null;
  readonly has_episode_video: boolean;
  readonly has_promo_video: boolean;
  readonly has_video: boolean;
  readonly image_url: string;
  readonly is_rewatching: boolean;
  readonly licensors: Licensor[];
  readonly mal_id: number;
  readonly priority: Priority;
  readonly rating: Rating;
  readonly score: number;
  readonly season_name: SeasonName;
  readonly season_year: number;
  readonly start_date: Date;
  readonly storage: null;
  readonly studios: Licensor[];
  readonly tags: any | null;
  readonly title: string;
  readonly total_episodes: number;
  readonly type: Type;
  readonly url: string;
  readonly video_url: string;
  readonly watch_end_date: Date | null;
  readonly watch_start_date: Date | null;
  readonly watched_episodes: number;
  readonly watching_status: number;
}
interface Licensor {
  readonly mal_id: number;
  readonly name: string;
}
declare enum Priority {
  High = "High",
  Low = "Low",
  Medium = "Medium"
}
declare enum Rating {
  G = "G",
  PG13 = "PG-13",
  R = "R",
  RatingR = "R+"
}
declare enum SeasonName {
  Fall = "Fall",
  Spring = "Spring",
  Summer = "Summer",
  Winter = "Winter"
}
declare enum Type {
  Movie = "Movie",
  Ona = "ONA",
  Ova = "OVA",
  Special = "Special",
  Tv = "TV"
}