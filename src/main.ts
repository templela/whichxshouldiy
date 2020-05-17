import jikan from 'jikants';
//https://github.com/Julien-Broyard/jikants
import * as fs from 'fs';
import { MegaList } from './anime/anime-list.service.spec';
import { AnimeList } from "jikants/dist/src/interfaces/user/AnimeList";
import { getExcel } from './anime/anime-list.service';


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

const allAnimeFile = fs.readFileSync('ref/MegaAnimeList.json');
const allAnime = <MegaList>JSON.parse(allAnimeFile.toString());

getExcel(allAnime, animelist);

export {};
