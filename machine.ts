import { createMachine, fromPromise, assign } from "xstate";

export const machine = createMachine(
  {
    context: {
      SSN: "",
      FirstName: "",
      LastName: "",
      GavUnionScore: 0,
      EquiGavinScore: 0,
      GavperianScore: 0,
    },
    id: "multipleCreditCheck",
    initial: "creditCheck",
    states: {
      creditCheck: {
        initial: "Entering Information",
        states: {
          "Entering Information": {
            on: {
              Submit: {
                target: "Verifying Credentials",
                reenter: true,
              },
            },
          },
          "Verifying Credentials": {
            invoke: {
              input: {},
              src: "verifyCredentials",
              onDone: [
                {
                  target: "CheckingCreditScores",
                },
              ],
            },
          },
          CheckingCreditScores: {
            description:
              "Kick off a series of requests to the 3 American Credit Bureaus and await their results",
            states: {
              CheckingEquiGavin: {
                initial: "CheckingForExistingReport",
                states: {
                  CheckingForExistingReport: {
                    invoke: {
                      input: {},
                      src: "checkReportsTable",
                      id: "equiGavinDBActor",
                      onDone: [
                        {
                          target: "FetchingComplete",
                          guard: "report found",
                        },
                        {
                          target: "FetchingReport",
                        },
                      ],
                      onError: [
                        {
                          target: "FetchingFailed",
                        },
                      ],
                    },
                  },
                  FetchingComplete: {
                    entry: {
                      type: "saveResults",
                    },
                    type: "final",
                  },
                  FetchingReport: {
                    invoke: {
                      input: {},
                      src: "checkBureau",
                      id: "equiGavinFetchActor",
                      onDone: [
                        {
                          target: "FetchingComplete",
                        },
                      ],
                      onError: [
                        {
                          target: "FetchingFailed",
                        },
                      ],
                    },
                  },
                  FetchingFailed: {
                    entry: {
                      type: "updateErrorMessage",
                    },
                    type: "final",
                  },
                },
              },
              CheckingGavUnion: {
                initial: "CheckingForExistingReport",
                states: {
                  CheckingForExistingReport: {
                    invoke: {
                      input: {},
                      src: "checkReportsTable",
                      id: "gavUnionDBActor",
                      onDone: [
                        {
                          target: "FetchingComplete",
                          guard: "report found",
                        },
                        {
                          target: "FetchingReport",
                        },
                      ],
                      onError: [
                        {
                          target: "FetchingFailed",
                        },
                      ],
                    },
                  },
                  FetchingComplete: {
                    entry: {
                      type: "saveResults",
                    },
                    type: "final",
                  },
                  FetchingReport: {
                    invoke: {
                      input: {},
                      src: "checkBureau",
                      id: "gavUnionFetchActor",
                      onDone: [
                        {
                          target: "FetchingComplete",
                        },
                      ],
                      onError: [
                        {
                          target: "FetchingFailed",
                        },
                      ],
                    },
                  },
                  FetchingFailed: {
                    entry: {
                      type: "updateErrorMessage",
                    },
                    type: "final",
                  },
                },
              },
              CheckingGavperian: {
                initial: "CheckingForExistingReport",
                states: {
                  CheckingForExistingReport: {
                    invoke: {
                      input: {},
                      src: "checkReportsTable",
                      id: "gavperianCheckActor",
                      onDone: [
                        {
                          target: "FetchingComplete",
                          guard: "report found",
                        },
                        {
                          target: "FetchingReport",
                        },
                      ],
                      onError: [
                        {
                          target: "FetchingFailed",
                        },
                      ],
                    },
                  },
                  FetchingComplete: {
                    entry: {
                      type: "saveResults",
                    },
                    type: "final",
                  },
                  FetchingReport: {
                    invoke: {
                      input: {},
                      src: "checkBureau",
                      id: "checkGavPerianActor",
                      onDone: [
                        {
                          target: "FetchingComplete",
                        },
                      ],
                      onError: [
                        {
                          target: "FetchingFailed",
                        },
                      ],
                    },
                  },
                  FetchingFailed: {
                    entry: {
                      type: "updateErrorMessage",
                    },
                    type: "final",
                  },
                },
              },
            },
            type: "parallel",
            onDone: [
              {
                target: "DeterminingInterestRateOptions",
                guard: "allSucceeded",
                reenter: true,
              },
              {
                target: "Entering Information",
              },
            ],
          },
          DeterminingInterestRateOptions: {
            description:
              "After retrieving results, determine the middle score to be used in home loan interest rate decision",
            initial: "DeterminingMiddleScore",
            states: {
              DeterminingMiddleScore: {
                exit: {
                  type: "updateMiddleScore",
                },
                invoke: {
                  input: {},
                  src: "determineMiddleScore",
                  id: "invoke-bdjlm",
                  onDone: [
                    {
                      target: "FetchingRates",
                    },
                  ],
                },
              },
              FetchingRates: {
                invoke: {
                  input: {},
                  src: "generateInterestRates",
                  onDone: [
                    {
                      target: "RatesProvided",
                    },
                  ],
                },
              },
              RatesProvided: {
                entry: [
                  {
                    type: "emailUser",
                  },
                  {
                    type: "emailSalesTeam",
                  },
                ],
                type: "final",
              },
            },
          },
        },
      },
    },
    types: {
      events: {} as {
        type: "Submit";
        SSN: number;
        lastName: string;
        firstName: string;
      },
      context: {} as {
        SSN: string;
        LastName: string;
        FirstName: string;
        GavUnionScore: number;
        EquiGavinScore: number;
        GavperianScore: number;
      },
    },
  },
  {
    actions: {
      emailUser: function ({ context, event }, params) {
        // Add your action code here
      },
      saveResults: function ({ context, event }, params) {
        // Add your action code here
      },
      emailSalesTeam: function ({ context, event }, params) {
        // Add your action code here
      },
      updateMiddleScore: assign({
        // ...
      }),
      updateErrorMessage: assign({
        // ...
      }),
    },
    actors: {
      checkBureau: fromPromise(async () => {
        // ...
      }),
      checkReportsTable: fromPromise(async () => {
        // ...
      }),
      verifyCredentials: fromPromise(async () => {
        // ...
      }),
      determineMiddleScore: fromPromise(async () => {
        // ...
      }),
      generateInterestRates: fromPromise(async () => {
        // ...
      }),
    },
    guards: {
      allSucceeded: ({ context, event }, params) => {
        return false;
      },
      "report found": ({ context, event }, params) => {
        return false;
      },
    },
    delays: {},
  },
);
