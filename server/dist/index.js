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
const animelist = JSON.parse(animelistFile.toString());
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
const allAnime = JSON.parse(allAnimeFile.toString());
const animedict = {};
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
    let hours = res ? (res[1] ? parseInt(res[1].replace("\D", '')) : 0) : 0;
    let mins = res ? (res[2] ? parseInt(res[2].replace("\D", '')) : 0) : 0;
    let time = hours * 60 + mins;
    // let year = allAnime[id].aired.from;
    console.log(`${id}***${status}***${etitle}***${title}***${studio}***${type}***${eps}***${score}***${mem}***${rating}***${year}***${time}`);
}
;
;
//# sourceMappingURL=index.js.map