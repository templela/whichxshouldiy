
//https://github.com/Julien-Broyard/jikants
import * as fs from 'fs';
import { MegaList } from './anime/anime-list.service.spec';
import { AnimeList } from "jikants/dist/src/interfaces/user/AnimeList";
import { getExcel } from './anime/anime-list.service';
import { getAnimeListByUsername, getMegaList } from './anime/anime-api.service';


// getAnimeListByUsername('ztary');

const animelistFile = fs.readFileSync('Animelist.json');
const animelist = <AnimeList>JSON.parse(animelistFile.toString());

getMegaList(animelist);


const allAnimeFile = fs.readFileSync('ref/MegaAnimeList.json');
const allAnime = <MegaList>JSON.parse(allAnimeFile.toString());

// getExcel(allAnime, animelist);

export {};
