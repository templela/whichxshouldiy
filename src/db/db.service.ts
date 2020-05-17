import * as mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;


export class db {
  // Connection URL
  url = 'mongodb://localhost:27017/myproject';
  // mongodb?: mongodb.MongoClient;

  constructor() {
  }

  public async getDB() {
    const mongo = await MongoClient.connect(this.url);
    const db = mongo.db();
    const admin = db.admin();
    console.log(await admin.listDatabases());

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
    // db.close();
  }

  // checkDb() {
  //   if (!this.mongodb) {
  //     console.log('Please remember to connect to the DB');
  //     throw('no DB');
  //   }
  // }
}