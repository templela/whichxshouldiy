
//https://github.com/Julien-Broyard/jikants
import * as fs from 'fs';
import { MegaList } from './anime/anime-list.service.spec';
import { AnimeList } from "jikants/dist/src/interfaces/user/AnimeList";
import { getExcel } from './anime/anime-list.service';
import { getAnimeListByUsername, getMegaList } from './anime/anime-api.service';
import { db } from './db/db.service';

const mongodb = new db();

async function main () {

    // const username = 'ztary';
    // const user = {
    //     name: username,
    //     anime: await getAnimeListByUsername('ztary'),
    // }
    // mongodb.insertUser(username);
    // mongodb.deleteUser(username);

    const user = await mongodb.getUser('ztary');
    console.log(user);

    if (user) {
        const allAnime = await getMegaList(user.anime);
        getExcel(allAnime, user.anime);
    }
}

main();
export {};
