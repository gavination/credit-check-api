import { Snapshot, createActor } from "xstate";
import bodyParser from "body-parser";
import { collections, init } from "./dbService";
import express from "express";
import { creditCheckMachine } from "./machine";
import { generateActorId } from "./machineLogic";

const app = express();

app.use(bodyParser.json());

// Endpoint to start a new workflow instance
// - Generates a unique ID for the actor
// - Starts the actor
// - Persists the actor state
// - Returns a 201-Created code with the actor ID in the response
app.post("/workflows", async (req, res) => {
  const workflowId = generateActorId(); // generate a unique ID
  const actor = createActor(creditCheckMachine).start();
  // save persisted state to the db
  const persistedState = actor.getPersistedSnapshot();
  const result = await collections.machineStates?.insertOne({
    workflowId,
    persistedState,
  });

  if (!result) {
    return res.status(500).send("Error starting workflow");
  }
  res.status(201).send({ workflowId });
});

// Endpoint to send events to an existing workflow instance
// - Gets the actor ID from request params
// - Gets the persisted state for that actor
// - Starts the actor with the persisted state
// - Sends the event from the request body to the actor
// - Persists the updated state
// - Returns the updated state in the response
app.post("/workflows/:workflowId", async (req, res) => {
  const { workflowId } = req.params;

  // Hydrate the actor with the persisted state
  const restoredState = await collections.machineStates?.findOne({
    workflowId,
  });

  if (!restoredState) {
    return res.status(404).send("Actor not found");
  }

  console.log("snapshot", restoredState);

  const event = req.body;

  //todo: make this typing more concise
  const actor = createActor(creditCheckMachine, {
    state: restoredState?.persistedState,
  }).start();

  console.log("state", restoredState?.persistedState);

  actor.send(event);

  // @ts-ignore
  // Capture and save state after the event is sent and machine transitions
  const persistedState = actor.getPersistedSnapshot();
  const result = await collections.machineStates?.updateOne(
    {
      workflowId,
    },
    {
      $set: {
        persistedState,
      },
    }
  );
  actor.stop();

  // Ensure the state was persisted successfully
  if (!result?.acknowledged) {
    return res.status(500).send("Error sending event to workflow");
  }

  res.status(200).send("Event received. Issue a GET request to see the state");
});

// Endpoint to get the current state of an existing workflow instance
// - Gets the actor ID from request params
// - Gets the persisted state for that actor
// - Returns the persisted state in the response
app.get("/workflows/:workflowId", async (req, res) => {
  const { workflowId } = req.params;
  const persistedState = await collections.machineStates?.findOne({
    workflowId,
  });

  if (!persistedState) {
    return res.status(404).send("Actor not found");
  }

  res.json(persistedState);
});

app.get("/", (_, res) => {
  res.send(`
    <html>
      <body style="font-family: sans-serif;">
        <h1>Express Workflow</h1>
        <p>Start a new workflow instance:</p>
        <pre>curl -X POST http://localhost:4242/workflows</pre>
        <p>Send an event to a workflow instance:</p>
        <pre>curl -X POST http://localhost:4242/workflows/:workflowId -d '{"type":"TIMER"}'</pre>
        <p>Get the current state of a workflow instance:</p>
        <pre>curl -X GET http://localhost:4242/workflows/:workflowId</pre>
      </body>
    </html>
  `);
});

// Connect to the DB and start the server
init().then(() => {
  app.listen(4242, () => {
    console.log("Server listening on port 4242");
  });
});
