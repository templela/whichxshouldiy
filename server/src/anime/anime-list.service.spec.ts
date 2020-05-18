
import { AnimeById } from "jikants/dist/src/interfaces/anime/ById";

export interface MegaList {
  [mal_id: string]: AnimeById;
}
