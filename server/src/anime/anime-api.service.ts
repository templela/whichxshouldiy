import jikan from 'jikants';
import { AnimeList } from 'jikants/dist/src/interfaces/user/AnimeList';
import { MegaList } from './anime-list.service.spec';
import { db } from '../db/db.service';


export async function getAnimeListByUsername( username: string ) {
  return new Promise<AnimeList>(async (resolve, reject) => {
    const animeList = await jikan.User.animeList(username);

    if (animeList) {
      resolve(animeList);
    } else {
      reject('Couldn\'t build an Animelist');
    }
  });
}

export async function getMegaList(animelist: AnimeList) {


  const totalAnimeList: MegaList = {};
  let i = 0;

  for (const animei of animelist.anime) {
    const animeById = await getAnime(animei.mal_id);
    // const animeById = await jikan.Anime.byId(animei.mal_id);
    if (animeById) {
      totalAnimeList[animei.mal_id] = animeById;
    } else {
      console.error('Could\'t find Anime with ID: ' + animei.mal_id);
    }
    1
    console.log(`Finished query ${i} anime # ${animei.mal_id}`);
    // console.log(Object.keys(totalAnimeList).length);
    i += 1;
  }

  // console.log('Completed:' + JSON.stringify(totalAnimeList));
  console.log('Completed Ids : [' + Object.keys(totalAnimeList) + ']');


  // fs.writeFileSync('MegaAnimeList.json', JSON.stringify(totalAnimeList, null, 2));

  // fs.writeFile('MegaAnimeList2.json', totalAnimeList, (err => {
  //     console.log('coudln\'t write! see:' + err);
  // }));

  return(totalAnimeList);

}

export async function getAnime(mal_id: number) {

  const mongodb = new db();
  const animeDB = await mongodb.getAnime(mal_id);
  if (!animeDB) {
    console.log(`DB miss on ${mal_id}`);
    const animeById = await jikan.Anime.byId(mal_id);
    if (animeById) {
      mongodb.insertAnime(animeById);
      return animeById;
    } else {
      console.log(`Couldn't find anime in Jikan`);
      // throw();
    }
  } else {
    return animeDB;
  }
}