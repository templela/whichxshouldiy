import { MegaList } from "./anime-list.service.spec";
import { AnimeList } from "jikants/dist/src/interfaces/user/AnimeList";


export function getExcel (allAnime: MegaList, animelist: AnimeList): string {

  let excel = '';
  const sep = '\t';
  const datalist = getList(allAnime, animelist);
  for (const listentry of datalist) {
    excel += listentry.join(sep) + '\n';
  }
  return(excel);

}

export function getList (allAnime: MegaList, animelist: AnimeList): string[][] {
  let list = [];

  const wstat = ['0_Zero', 'Watching', 'Completed', 'On Hold', 'Dropped', '5_?', 'Plan to Watch'];
  for (const anime of animelist.anime) {
      let id = anime.mal_id.toString();

      let status  = wstat[anime.watching_status];
      let title   = allAnime[id].title;
      let etitle  = allAnime[id].title_english ? allAnime[id].title_english : title;
      let studio  = allAnime[id].studios ? (allAnime[id].studios[0] ? allAnime[id].studios[0].name : 'wtf') : 'N/A';
      let type    = allAnime[id].type;
      let eps     = (allAnime[id].episodes || '').toString();
      let score   = (allAnime[id].score || '').toString();
      let mem     = (allAnime[id].members || '').toString();
      let rating  = allAnime[id].rating;
      let year    = new Date(allAnime[id].aired.from).getFullYear().toString();

      let dur = allAnime[id].duration;
      let timere = /(\d+ hr)? ?(\d+ min)? ?(per ep)?/i;
      let res = timere.exec(dur);
      let hours = res ? (res[1] ? parseInt(res[1].replace("\D", '')): 0) : 0;
      let mins = res ? (res[2] ? parseInt(res[2].replace("\D", '')): 0) : 0;
      let time = (hours * 60 + mins).toString();

      // let year = allAnime[id].aired.from;
      const sep = '\t';

      list.push([id, status, etitle, title, studio, type, eps, score, mem, rating, year, time]);
  }
  return(list);

}