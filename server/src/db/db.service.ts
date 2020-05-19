import * as mongodb from 'mongodb';
import { User } from '../user/user.spec';
import { AnimeById } from 'jikants/dist/src/interfaces/anime/ById';

const MongoClient = mongodb.MongoClient;


export class db {
  // Connection URL
  url = 'mongodb://localhost:27017/myproject';
  // mongodb?: mongodb.MongoClient;
  dbclient: mongodb.MongoClient | undefined;

  constructor() {

  }

  public async getDB() {
    this.dbclient = await MongoClient.connect(this.url);
    const db = this.dbclient.db();
    const admin = db.admin();
    // console.log(await admin.listDatabases());

    return(db);
  }

  private connectCallback() {
    // Use connect method to connect to the server
    MongoClient.connect(this.url, (err, db) => {
      console.log("Connected successfully to server");

      if (err) {
        console.log("An error occured: " + err);
      }

      db.close();
    });
  }


  async insertDocuments(docs: any) {
    try {
      const db = await this.getDB();
      // Get the documents collection

      var collection = db.collection('documents');

      // console.log(collection);

      // Insert some documents
      // const insertresp  = await collection.insertMany([ {a : 1}, {a : 2}, {a : 3} ])

      // console.log("Inserted 3 documents into the collection");

    } catch (ex) {
      console.log('Issue Inserting: ' + ex);
    }
    if (this.dbclient) this.dbclient.close();
  }

  async insertUser(user: User) {
    try {
      const db = await this.getDB();
      const users = db.collection('users');
      const existingUsers = await users.find({name: user.name}).toArray();
      if (existingUsers.length > 0) {
        console.log(existingUsers);
        throw('User Already Exists')
      } else {
        console.log(`Successful Insert: ${user}`);
        users.insertOne(user);
      }

    } catch (ex) {
      console.log('Issue Inserting: ' + ex);
    }
    if (this.dbclient) this.dbclient.close();
  }

  async deleteUser(user: string) {
    try {
      const db = await this.getDB();
      const users = db.collection('users');
      await users.deleteOne({name: user});
      // console.log(await users.find().toArray());
    } catch (ex) {
      console.log('Issue Deleting: ' + ex);
    }
    if (this.dbclient) this.dbclient.close();
  }

  async getUser(user: string) {
    try {
      const db = await this.getDB();
      const users = db.collection('users');
      const existingUsers = <User[]> await users.find({name: user}).toArray();
      if (existingUsers.length == 0 ) {
        throw("User DNE")
      } else if (existingUsers.length > 1) {
        console.log(existingUsers);
        throw("Mutliple Users have this username!?");
      } else {
        console.log(`Successful Get: ${existingUsers[0]}`)
        return existingUsers[0];
      }
    } catch (ex) {
      console.log(ex);
    }
    if (this.dbclient) this.dbclient.close();
  }



  async insertAnime(anime: AnimeById) {
    try {
      const db = await this.getDB();
      const animes = db.collection('animes');
      const existingAnimes = await animes.find({mal_id: anime.mal_id}).toArray();
      if (existingAnimes.length > 0) {
        console.log(existingAnimes);
        throw('Anime Already Exists')
      } else {
        await animes.insertOne(anime);
        console.log(`Successful Insert: ${anime}`)
      }

    } catch (ex) {
      console.log('Issue Inserting: ' + ex);
    }
    if (this.dbclient) this.dbclient.close();
  }

  async deleteAnime(id: number) {
    try {
      const db = await this.getDB();
      const animes = db.collection('animes');
      await animes.deleteOne({mai_id: id});
      // console.log(await animes.find().toArray());
    } catch (ex) {
      console.log('Issue Deleting: ' + ex);
    }
    if (this.dbclient) this.dbclient.close();
  }

  async getAnime(id: number) {
    try {
      const db = await this.getDB();
      const animes = db.collection('animes');
      const existingAnimes = <AnimeById[]> await animes.find({mal_id: id}).toArray();
      if (existingAnimes.length == 0 ) {
        throw("Anime DNE")
      } else if (existingAnimes.length > 1) {
        console.log(existingAnimes);
        throw("Mutliple Animes have this id!?");
      } else {
        console.log(`Successful Query ${existingAnimes[0]}`)
        return existingAnimes[0];
      }
    } catch (ex) {
      console.log(ex);
    }
    if (this.dbclient) this.dbclient.close();
  }


  // checkDb() {
  //   if (!this.mongodb) {
  //     console.log('Please remember to connect to the DB');
  //     throw('no DB');
  //   }
  // }
}