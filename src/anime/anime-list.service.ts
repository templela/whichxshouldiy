import { MegaList } from "./anime-list.service.spec";
import { AnimeList } from "jikants/dist/src/interfaces/user/AnimeList";


export function getExcel (allAnime: MegaList, animelist: AnimeList) {


  const wstat = ['0_Zero', 'Watching', 'Completed', 'On Hold', 'Dropped', '5_?', 'Plan to Watch'];
  for (const anime of animelist.anime) {
      let id = anime.mal_id;

      let status = wstat[anime.watching_status];
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
      const sep = '\t';
      console.log(`${id}${sep}${status}${sep}${etitle}${sep}${title}${sep}${studio}${sep}${type}${sep}${eps}${sep}${score}${sep}${mem}${sep}${rating}${sep}${year}${sep}${time}`);
  }
}