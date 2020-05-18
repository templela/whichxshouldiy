import { MegaList, CustomAnime } from "./anime-list.service.spec";
import { AnimeList } from "jikants/dist/src/interfaces/user/AnimeList";

const wstat = ['0_Zero', 'Watching', 'Completed', 'On Hold', 'Dropped', '5_?', 'Plan to Watch'];

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
      let time    = durationToMinutes(allAnime[id].duration, allAnime[id].episodes).toString();

      // let year = allAnime[id].aired.from;
      const sep = '\t';

      list.push([id, status, etitle, title, studio, type, eps, score, mem, rating, year, time]);
  }
  return(list);
}

export function getCustomList (allAnime: MegaList, animelist: AnimeList): CustomAnime[] {
  const customanime = [];

  const all_durations: number[] = [];
  const all_scores: number[] = [];
  const all_members: number[] = [];

  for (const anime of animelist.anime) {
    const id = anime.mal_id;
    all_durations.push(allAnime[id].episodes);
    all_scores  .push(allAnime[id].score);
    all_members .push(allAnime[id].members);
  }

  const sorted_durations  = all_durations.sort();
  const sorted_scores     = all_scores.sort();
  const sorted_members    = all_members.sort();

  for (const anime of animelist.anime) {
    const id = anime.mal_id;

    const time = durationToMinutes(allAnime[id].duration, allAnime[id].episodes);
    let customanimelistEntry: CustomAnime = {
      ...anime,
      watching_status_plain: wstat[anime.watching_status],
      title_english:    allAnime[id].title_english ? allAnime[id].title_english : allAnime[id].title,
      studio:           allAnime[id].studios ? (allAnime[id].studios[0] ? allAnime[id].studios[0].name : 'wtf') : 'N/A',
      score:            allAnime[id].score,
      members:          allAnime[id].members,
      year:             new Date(allAnime[id].aired.from).getFullYear().toString(),
      duration_minutes: time,

      ranking_duration: sorted_durations.indexOf(time),
      ranking_score:    sorted_scores.indexOf(allAnime[id].score),
      ranking_members:  sorted_members.indexOf(allAnime[id].members),
    };


    customanime.push(customanimelistEntry);
  }
  return(customanime);
}

function durationToMinutes(duration: string, episodes: number): number {
  // console.log(duration + " * " + episodes);
  let timere = /(\d+ hr)? ?(\d+ min)? ?(per ep)?/i;
  let res = timere.exec(duration);
  let hours = res ? (res[1] ? parseInt(res[1].replace("\D", '')): 0) : 0;
  let mins = res ? (res[2] ? parseInt(res[2].replace("\D", '')): 0) : 0;
  let perep = res ? res[3] : '';

  let time = hours * 60 + mins;
  if (perep && episodes && episodes > 1) {
    time = time * episodes;
  }
  // console.log(time);
  return time;

}
