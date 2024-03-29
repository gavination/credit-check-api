import { createActor } from "xstate";
import { creditCheckMachine } from "./machine";
import { MongoClient, ServerApiVersion } from "mongodb";

(async () => {
  console.log("Testing the credit check machine");

  console.log("Connecting to the db...");
  try {
    //DB setup & configuration logic
    const uri = "mongodb://localhost:27017/creditCheck";
    const client = new MongoClient(uri, {
      serverApi: ServerApiVersion.v1,
    });
    const db = client.db("creditCheck");
    const machineStateCollection = db.collection("machineStates");
    const options = { upsert: true };
    const stateFilter = {
      persistedState: { $exists: true },
      workflowId: { $exists: true },
    };

    await client.connect();

    // create the actor and a workflowId
    const creditCheckActor = createActor(creditCheckMachine);
    creditCheckActor.subscribe({
      next: async () => {
        // save persisted state to the db
        const persistedState = creditCheckActor.getPersistedSnapshot();
        const updateDoc = {
          $set: {
            workflowId,
            persistedState,
          },
        };

        const result = await machineStateCollection.replaceOne(
          stateFilter,
          updateDoc,
          options
        );

        // only log if the upsert occurred
        // uncomment this for debugging
        // if (result.modifiedCount > 0 || result.upsertedCount > 0) {
        //   console.log("persisted state saved to db. ", result);
        // }
      },
      error: (err) => console.log(err),
      complete: () => console.log("done"),
    });

    creditCheckActor.start();
    creditCheckActor.send({
      type: "Submit",
      SSN: "123456789",
      lastName: "Bauman",
      firstName: "Gavin",
    });
  } catch (err) {
    console.log("Error connecting to the db: " + err);
  }
})();
