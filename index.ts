import jikan from 'jikants';
//https://github.com/Julien-Broyard/jikants
import fs from 'fs';


// const z = jikan.User.animeList('ztary')
//     .then(b => {
//         console.log(JSON.stringify(b));
//         fs.open('Animelist.json', 'w+', (err, fd) => {
//             fs.write(fd, JSON.stringify(b, null, 2), () =>
//             {
//                 console.log('written animelist.json');
//             });
//         })
//     });



const animelistFile = fs.readFileSync('Animelist.json');
const animelist = <AnimeList>JSON.parse(animelistFile.toString());

// // console.log(b.anime[1]);
// let ap = new Promise<MegaList>(async (resolve, reject) => {

//     const totalAnimeList: MegaList = {};
//     let i = 0;

//     async function callAnime() {
//         for (const animei of animelist.anime) {
//             await jikan.Anime.byId(animei.mal_id)
//             .then((c) => {
//                 totalAnimeList[animei.mal_id] = c;
//                 // console.log(totalAnimeList);
//                 console.log(i + ' Finished query anime #' + animei.mal_id);
//                 console.log(Object.keys(totalAnimeList).length);
//                 i+=1;
//             });
//         }
//     }

//     await callAnime();
//     console.log('done foreach');
//     resolve(totalAnimeList);
// });

// const totalAnimeList = await ap;

// console.log(JSON.stringify('tot:' + JSON.stringify(totalAnimeList)));
// console.log('#:' + Object.keys(totalAnimeList));
// fs.writeFileSync('MegaAnimeList.json', JSON.stringify(totalAnimeList, null, 2));

// fs.writeFile('MegaAnimeList2.json', totalAnimeList, (err => {
//     console.log('coudln\'t write! see:' + err);
// }));

const allAnimeFile = fs.readFileSync('MegaAnimeList.json');
const allAnime = <MegaList>JSON.parse(allAnimeFile.toString());
const animedict: animeDict = {};

for (const anime of animelist.anime) {
    animedict[anime.mal_id] = anime;
}

const wstat = ['0_Zero', 'Watching', 'Completed', 'On Hold', 'Dropped', '5_?', 'Plan to Watch'];
for (const id of Object.keys(allAnime)) {
    let status = wstat[animedict[id].watching_status];
    let title = allAnime[id].title;
    let etitle = allAnime[id].title_english ? allAnime[id].title_english : title;
    let studio = allAnime[id].studios ? (allAnime[id].studios[0] ? allAnime[id].studios[0].name : 'wtf') : 'N/A';
    let type = allAnime[id].type;
    let eps = allAnime[id].episodes;
    let score = allAnime[id].score;
    let mem = allAnime[id].members;
    let rating = allAnime[id].rating;
    let year = new Date(allAnime[id].aired.from).getFullYear();

    let dur = allAnime[id].duration;
    let timere = /(\d+ hr)? ?(\d+ min)? ?(per ep)?/i;
    let res = timere.exec(dur);
    let hours = res ? (res[1] ? parseInt(res[1].replace("\D", '')): 0) : 0;
    let mins = res ? (res[2] ? parseInt(res[2].replace("\D", '')): 0) : 0;
    let time = hours * 60 + mins;

    // let year = allAnime[id].aired.from;
    console.log(`${id}***${status}***${etitle}***${title}***${studio}***${type}***${eps}***${score}***${mem}***${rating}***${year}***${time}`);
}

interface MegaList {
    [key: string]: AnimeById;
};

interface animeDict {
    [key:string]: Anime;
};

export declare type AnimeListTypes = "all" | "completed" | "dropped" | "onhold" | "plantowatch" | "ptw" | "watching";
export interface AnimeList {
    readonly anime: Anime[];
    readonly request_cache_expiry: number;
    readonly request_cached: boolean;
    readonly request_hash: string;
}
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

export interface AnimeById {
    readonly aired: Aired;
    readonly airing: boolean;
    readonly background: string;
    readonly broadcast: string;
    readonly duration: string;
    readonly ending_themes: string[];
    readonly episodes: number;
    readonly favorites: number;
    readonly genres: Genre[];
    readonly image_url: string;
    readonly licensors: Genre[];
    readonly mal_id: number;
    readonly members: number;
    readonly opening_themes: string[];
    readonly popularity: number;
    readonly premiered: string;
    readonly producers: Genre[];
    readonly rank: number;
    readonly rating: string;
    readonly related: Related;
    readonly request_cache_expiry: number;
    readonly request_cached: boolean;
    readonly request_hash: string;
    readonly score: number;
    readonly scored_by: number;
    readonly source: string;
    readonly status: string;
    readonly studios: Genre[];
    readonly synopsis: string;
    readonly title_english: string;
    readonly title_japanese: string;
    readonly title_synonyms: any[];
    readonly title: string;
    readonly trailer_url: string;
    readonly type: string;
    readonly url: string;
}
interface Aired {
    readonly from: Date;
    readonly prop: Prop;
    readonly string: string;
    readonly to: Date;
}
interface Prop {
    readonly from: From;
    readonly to: From;
}
interface From {
    readonly day: number;
    readonly month: number;
    readonly year: number;
}
interface Genre {
    readonly mal_id: number;
    readonly name: string;
    readonly type: Type;
    readonly url: string;
}
declare enum Type {
    Anime = "anime",
    Manga = "manga"
}
interface Related {
    readonly Adaptation: Genre[];
    readonly "Side story": Genre[];
    readonly Summary: Genre[];
}
export {};
