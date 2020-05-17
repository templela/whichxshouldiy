import jikan from 'jikants';
import { AnimeList } from 'jikants/dist/src/interfaces/user/AnimeList';
import { MegaList } from './anime-list.service.spec';


export async function getAnimeListByUsername( username: string ) {

  const animeList = await jikan.User.animeList(username);

  // fs.open('Animelist.json', 'w+', (err, fd) => {
  //     fs.write(fd, JSON.stringify(b, null, 2), () =>
  //     {
  //         console.log('written animelist.json');
  //     });
  // })

  return(animeList);
}

export async function getMegaList(animelist: AnimeList) {


  const totalAnimeList: MegaList = {};
  let i = 0;

  for (const animei of animelist.anime) {
    const animeById = await jikan.Anime.byId(animei.mal_id);
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

  console.log('Completed:' + JSON.stringify(totalAnimeList));
  console.log('#:' + Object.keys(totalAnimeList));


  // fs.writeFileSync('MegaAnimeList.json', JSON.stringify(totalAnimeList, null, 2));

  // fs.writeFile('MegaAnimeList2.json', totalAnimeList, (err => {
  //     console.log('coudln\'t write! see:' + err);
  // }));

  return(totalAnimeList);

}