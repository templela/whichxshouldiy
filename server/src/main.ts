
//https://github.com/Julien-Broyard/jikants
import * as fs from 'fs';
import { MegaList } from './anime/anime-list.service.spec';
import { AnimeList } from "jikants/dist/src/interfaces/user/AnimeList";
import { getExcel } from './anime/anime-list.service';
import { getAnimeListByUsername, getMegaList } from './anime/anime-api.service';
import { db } from './db/db.service';
import * as express from 'express';
import path = require('path');

const mongodb = new db();


var app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../whichxshouldiy-fe/dist/index.html'));
});

app.get('/users/', (req, res, next) => {

  next();
});


app.get('/users/:username', async (req, res, next) => {

  const username = req.params.username;

  // const user = {
  //     name: username,
  //     anime: await getAnimeListByUsername(username),
  // }
  // mongodb.insertUser(username);
  // mongodb.deleteUser(username);

  const user = await mongodb.getUser(username);
  console.log(user);

  if (user) {
    const allAnime = await getMegaList(user.anime);
    const excel = getExcel(allAnime, user.anime);
    res.status(200);
    res.set('content-type', 'application/json')
    res.send(allAnime);
  } else {
    res.status(404);
    res.send('Cannot find user');
  }
  next();
});


// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.raw({limit: '100mb'}));
// app.use(bodyParser.json());

const config = {
  PORT: 8080
}

var server = app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);

});

