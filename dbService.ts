import * as mongoDB from "mongodb";

export const collections: { machineStates?: mongoDB.Collection } = {};

// Initialize Connection
export async function init() {
  try {
    //todo: replace this with a placeholder value
    const uri = "mongodb://localhost:27017/creditCheck";
    const client = new mongoDB.MongoClient(uri, {
      serverApi: mongoDB.ServerApiVersion.v1,
    });
    const db = client.db("creditCheck");
    collections.machineStates = db.collection("machineStates");

    await client.connect();
  } catch (err) {
    console.log("Error connecting to the db...", err);
    throw err;
  }
}
