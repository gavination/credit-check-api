import { createMachine, fromPromise, assign, setup } from "xstate";
import { userCredential, verifyCredentials } from "./machineLogic";

export const creditCheckMachine = setup({
  types: {
    events: {} as {
      type: "Submit";
      SSN: string;
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
      ErrorMessage: string;
    },
  },

  actors: {
    checkBureau: fromPromise(async () => {
      // ...
    }),
    checkReportsTable: fromPromise(async () => {
      console.log("Checking for an existing report....");
      return true;
      // ...
    }),
    verifyCredentials: fromPromise(
      async ({ input }: { input: userCredential }) =>
        await verifyCredentials(input)
    ),
    determineMiddleScore: fromPromise(async () => {
      // ...
    }),
    generateInterestRates: fromPromise(async () => {
      // ...
    }),
  },
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
  },
  guards: {
    allSucceeded: ({ context, event }, params) => {
      return false;
    },
    "report found": ({ context, event }, params) => {
      return false;
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCuAbALgSwA7rAGEAnSbTQgCzAGMBrAOhtInKtsYFEA7TMY7NygACAJLcAZgHtiyAIY4p3AMQBlVACNk5ANoAGALqJQuKbHLYlxkAA9EAZgAcAVgYB2ACwAmAIyO3zgA0IACeiD5ueu4AbM7RXs4AvonBaFh4BCRkFNT0TCxsuYwAavzYEiGCIlkQYLzYcuiwyhBKYAyCAG5SdO1pOPhEBTkc+dnseaUCFVXCNXU4jbAIXVI0Cpbc+gbb1qbmitzWdggAnB6u0Y72zqf2AcFhCAC0jgz20W5+AcmpGAOZYYTRjMcZFBhTcqVIRzFgLBpNZT8YgyBj4BTSWQMfoZIZg0ag1gjSZlGYw+b1JYrbjddaHba7JAgfYWKxMk56R6IPS-EA4wY1QoEoHg4FVQWYVQ0GRwFptBiwTAKPr-XES4FjIkasVCCVSmWwRkmMyso7sxBeDw+DwMLyxeJBUKIRx6aIMHz2LyOHwJXn8wH4vKEoV5HVQPXS0jNVrcdqK5XY1UCkXCwOMMMRg06HxGJksw7HRDOHyuZzONw3DzXbynK5cl63d6OK3OD6nWt6ZxeU5+pMBrXg4PE9NFcXDfVRhhhzgAR1Q2AA4nJOoIp6OhAAxGScGzYRVVABKYFMxEwctjHRpPXaYDni+XggAIgAhACCNEwMiNzJNBfNCArG0Ajcb0EnrH1nCApIUj5Ps8QHVMENDddw3HSM4DXDgqlneclxXbhMPoKot2IHc9xwIQjxPM8Y3aVZegYW9cIfbgX3fT9iGzXNjQOTZCwA+woJAiDwI8PQ3FtaC-nSZM001EMRyw3U0INQi6Gwu88NXMMSLI-dKOPGQz2RVF0UwTFkEYzSWLYj8v0MPZfz4-9APcctQMdJ4S2cHkYP9eCFPk4c1LHbIJww6drPwhgNzATAaEoQ9DNPc86KvBimPvfDYviyh2Ps7if14tlQBOa1BIYW57k88J7g8XsZP7QKh21FDM0nSLmOinKEqS6ikWIFFiDRdAMRkSzMq07geryuzOIcvMnJK2xwg8CqqoeJ0EGtXxKoagEAuClrRTalSOpQvCAFVuE2ELN23Xd9KgKijNSy9ugYqBl2uzZbI47982c0rEArHw3OEsCtoiHw3V9Py4PVQcU2QpTULC9DYDuqArpupQsd0x6KOe5KaPlej2i+zofqUP6vxzRzirNYGBLB4CPPAxwrjc-a1WRkE+ax9qIou77cYInSHvIvrXpM4azIshhKep1i3zmgGlqZlaWfB9mtq8PQfDBqTYMaw6NWO0YMzO4XUZx26ZullLaPe69FdFzYZvy+bCsB5ayu8UsXDuTavOuUsedkpD+bkq30dUsM7bxh2DP62WRrGrElbFz21YWnjTX4nbA42mrtsca4I6ao6BdjolwsxhPl1wMo5HFlCCallPXud8m3c6ZuBFb4EvfVxn+ICG1daeNw7kkyuzaRmPTrj87bablu29Rjunpep2yfSin18H7hh7V+nFrHlzIIYKfEHOVwfnh03EcQwLa-IeusbwgeGk3oj7tIoTR2xlBqmVGuZcafcf5DyKCPPORUC5X0niJKGehy57SfgdF+QYa7LzrhjL+R9f4xTir1Lue8Ly9wShwPCAAFDecCfYa0Lh4ECDA1ohzvj6DB0ksECwtijf+aN8HxxFv3DeJDcrAIGkNdOECsTUPoHQhhucmGX2ZtaNhHDS4dnntg6OUcGCPjivwbQN0hDiD4FGTAB5lQAHlcCHExsYqxZiqgAFlsAQAgAQcKb1e7k2eBoCAAArdAyBR6IOZnaSI7hBLVXAk4CSj9eG8zkgIxgLjTGCCqJY-gcAbH2McZsTGydnrKmjPvD6Kpn78IFlk2QOSLG8HyYqWxfAHFOMkWQ8pfBlirDpJsBk8DfaaxOPYH0NpojRDEg6RJ-hua8m4FIWo8AmT+X0QzKJWtni1nrM8LwFU9DdlOC6aItZoj2HsD2TBaTDEZK2X+Zmzwqz7OtG6SIkRPg+FOYbWsei6lyR4FY2Y4gLIbGWqM8e9gGCXK9CgryjYHQAvSQLSEZJqhwkpE0R5QMtbRAiG5a5rprQ+D0JWesNwJJiQ8OcF0kQrm0pRfc3BqMhZrPzk8rWCQJKOH1hMyGTwyxATcNEPQtKDaeFOF4ZlzVWVCPZVjHCWVBC4r9g4TsN9+UIvCDDalXhIicx8taFwbhZXVyXmy62DcULKqmvjSWO8SZqrGQ4VsWryU6u2j5G0EFzXm3lepZSK8bZCLtSxbpiVdRSGQIMPgLrC6fCiLS3w-hS4ek9Is1Jkc5WWoVdapVUVVxlN3pgBN-4yXXEqhDdNTgvBZpNnw1Feag3CI-gQzqKqCJlI3HIbABAIDlo0Um9h0rvjpp8m8FJja7m5sMe-SUHaxHKyHVrewmq+WesFeEeIbxpWGtiAbKs5Z-WL3nXg9toi15UzFg6wBndibUVXeM91m6BXptrJcOG2aq4BpbaFERq8hGJ27aQqN4YY1xrAM+ndzg3hVm0eBGeNpv0zpzRa89VqQ02uvcrSNwCYPbXEhJcsW703NhQ8bDZgLMP5uw4Qm99swPET7QOwjMM4PsObAkqGpxYmoeo822jrbFWN3EcfQj67XBvq9ZEVw+60GHpNSe256G-3CYA5eoDrbv4SIlvep1T6L7bJfTCmT26iPeFhQJhGNG34XsXVe4DRDW74ejbGgg8bjNcrKl8N44lb4IH8GDGztShP2aw4B0NOmXOgakeQst3m8VlR9DCz4tY031jHXPVTv6z0Rbo1FnDznxPEJ7axyA7G-MMAC16slrCcs-oXq-YKDS3HNKsQU9pYBOklMI14O0rMyPgR+byqstYEgwz0K6equXms4Lkm1ppUA8nWO671pQziTGNPMVATx3jfHoX6+u047hhtQxuFEULTaWWLe2+1lbLS1tFK6SWip-WXBvHHYky5jW0N5ZaxqJbu3VtdZeyUhg3XYC0JRCuWog6kvqoQFcrm0NMsXaZckRIQA */
  context: {
    SSN: "",
    FirstName: "",
    LastName: "",
    GavUnionScore: 0,
    EquiGavinScore: 0,
    GavperianScore: 0,
    ErrorMessage: "",
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
            input: ({ event }) => event,
            src: "verifyCredentials",
            onDone: {
              target: "CheckingCreditScores",
              actions: assign({
                SSN: ({ event }) => event.output.SSN,
                FirstName: ({ event }) => event.output.firstName,
                LastName: ({ event }) => event.output.lastName,
              }),
            },
            onError: [
              {
                target: "Entering Information",
                actions: assign({
                  ErrorMessage: ({
                    event,
                  }: {
                    context: any;
                    event: { error: any };
                  }) => "Failed to verify credentials. Details: " + event.error,
                }),
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
                    input: {
                      ssn: ({ context }: { context: { SSN: string } }) =>
                        context.SSN,
                      bureauName: "EquiGavin",
                    },
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
                    input: {
                      ssn: ({ context }: { context: { SSN: string } }) =>
                        context.SSN,
                      bureauName: "GavUnion",
                    },
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
                    input: {
                      ssn: ({ context }: { context: { SSN: string } }) =>
                        context.SSN,
                      bureauName: "Gavperian",
                    },
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
});
