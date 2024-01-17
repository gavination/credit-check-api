import { createActor } from 'xstate';
import {creditCheckMachine} from './machine';

(async () => {
  console.log('Starting the awesome media scanner thingy');

  const mediaScannerActor = createActor(creditCheckMachine);

  mediaScannerActor.subscribe((state) => {
    console.log({
      state: state.value,
      error: state.error,
      context: state.context,
    });
  });

  mediaScannerActor.start();
  mediaScannerActor.send({
    type: "Submit",
    SSN: "123456789",
    lastName: "Bauman",
    firstName: "Gavin"
});
})();
