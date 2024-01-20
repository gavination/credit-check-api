import { createMachine, fromPromise, assign, setup } from "xstate";
import {
  checkReportsTable,
  determineMiddleScore,
  generateInterestRate,
  saveCreditProfile,
  saveCreditReport,
  userCredential,
  verifyCredentials,
} from "./services/machineLogicService";
import CreditProfile from "./models/creditProfile";

export const creditCheckMachine = setup({
  types: {
    events: {} as {
      type: "Submit";
      SSN: string;
      lastName: string;
      firstName: string;
    },
    context: {} as CreditProfile,
  },

  actors: {
    checkBureau: fromPromise(async () => {
      // ...
    }),
    checkReportsTable: fromPromise(
      async ({ input }: { input: { ssn: string; bureauName: string } }) =>
        await checkReportsTable(input)
    ),
    verifyCredentials: fromPromise(
      async ({ input }: { input: userCredential }) =>
        await verifyCredentials(input)
    ),
    determineMiddleScore: fromPromise(
      async ({ input }: { input: number[] }) =>
        await determineMiddleScore(input)
    ),
    generateInterestRates: fromPromise(
      async ({ input }: { input: number }) => await generateInterestRate(input)
    ),
  },
  actions: {
    emailUser: function ({ context, event }, params) {
      console.log(
        "emailing user with their interest rate options: ",
        context.InterestRateOptions
      );
    },
    saveCreditReport: async function ({ context }, params) {
      console.log("saving report to the database...");
      await saveCreditReport({
        ssn: context.SSN,
        bureauName: params?.bureauName ?? "",
        creditScore: context.EquiGavinScore,
      });
    },
    saveCreditProfile: async function ({ context, event }, params) {
      console.log("saving results to the database...");
      await saveCreditProfile(context);
    },
    emailSalesTeam: function ({ context, event }, params) {
      console.log(
        'emailing sales team with the user"s information: ',
        context.FirstName,
        context.LastName,
        context.InterestRateOptions,
        context.MiddleScore
      );
    },
  },
  guards: {
    allSucceeded: ({ context }, params) => {
      return (
        context.EquiGavinScore > 0 &&
        context.GavUnionScore > 0 &&
        context.GavperianScore > 0
      );
    },
    gavUnionReportFound: ({ context }) => {
      return context.GavUnionScore > 0;
    },
    equiGavinReportFound: ({ context }) => {
      return context.EquiGavinScore > 0;
    },
    gavperianReportFound: ({ context }) => {
      return context.GavperianScore > 0;
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCuAbALgSwA7rAGEAnSbTQgCzAGMBrAOhtInKtsYFEA7TMY7NygACAJLcAZgHtiyAIY4p3AMQBlVACNk5ANoAGALqJQuKbHLYlxkAA9EAZgAcAVgYB2ACwAmAIyO3zgA0IACeiD5ueu4AbM7RXs4AvonBaFh4BCRkFNT0TCxsuYwAavzYEiGCIlkQYLzYcuiwyhBKYAyCAG5SdO1pOPhEBTkc+dnseaUCFVXCNXU4jbAIXVI0Cpbc+gbb1qbmitzWdggAnB6u0Y72zqf2AcFhCAC0jgz20W5+AcmpGAOZYYTRjMcZFBhTcqVIRzFgLBpNZT8YgyBj4BTSWQMfoZIZg0ag1gjSZlGYw+b1JYrbjddaHba7JAgfYWKxMk56R6IPS-EA4wY1QoEoHg4FVQWYVQ0GRwFptBiwTAKPr-XES4FjIkasVCCVSmWwRkmMyso7sxBeDz+BgeU7OG56DwePTOZwuLkIa7RBiOFynPT2QNuaL2U6OXn8wH4vKEoV5HVQPXS0jNVrcdqK5XY1UCkXC6OMBNJg06HxGJksw7HRDOHyuV1uG5W+zeU5XD3PW7vRweOsfU5tl1eU4RnNRrXg2PEwtFcXDfUphgJzgAR1Q2AA4nJOoIl7OhAAxGScGzYRVVABKYFMxEwcvTHRpPXaYDXm+3ggAIgAhACCNEwGQjWZE0q3NBAAlOd5-ViV1HS8LxfQ9HxELeFDLRuAdh1ONxR3SXMC01OMZw4OdsgXOA91IoRV3XLcd24Kj6CqI9iBPM8cCEK8bzvNN2lWXoGFfOiP24H9-0A4hS3LY0Dk2asIK7UM9Fg5x4NQ5CnSieIMNuU5sNwlI+THPEJ3zMz433RN52TSjlzfejdwTVj2PPLjrxkO9kVRdFMExZAhIc0TxIAoDDD2UD5PAyDoJU101O8DTQnCN17HeNxdKwgdDL+fDx2IojpyYugyKJCjYGKqpaPfBiGAPMBMBoShLw829734p9BOEmrBHqxrKAksKZJAuS2VAE4fCtKDPjdHwUMiBJJs0vQvAYe1nC8Nw3EcaIZuiDw8IBUyCqnbUrOLRd7JE2q+qalqeKRYgUWINF0AxGQAu6xzuFugbQqk8KK0isbbHCW0ohbewfCh2s5r0O1NNdNaPltHtHEtbxDrVPMYxxkjmN1GyDUqoR6IAVW4TYSagFzTzcqBuM89rH26QSoG3CnNhCyTgMrKLxsQAJvUiOJfT0Rw9BW3bkO2nx3hbW5+y8PRIhy4y8uOorTtFc6icuqzycppRqdpjj7qZviWefBh2c6TmlG5oCywi0azQFxThZdK4JYlqXomQu40uuC47mifSVZVrGCIskE8epi67INjmjcY5zjzpziGdarynp8t6-I+m3k65v9-t54G3dBj33C9sXfa8aXkoQZXgzWntFbDluXSj-Ktbjos9cT6ioENqnfvNtrLYE9pbftn6GqawaAeGvmQYmjxYgYBJlLiHxznOf2m78AcGD37bPDbXs5pHIzI01jVtdGAfyNsiqE1H43x-ch7vJe3z-KLnbFOv0l7l1dgpSam99LoTdNEAMG03AB1tO4VWalHCnD8PYS0Pd76Tn7rrF+xN37blwGUOQqcrKm3pozSe8pp6ANIQIchwJQGA1kqaBS20oiug3v4eG4tQwem2q4S0-hMG+nQc4NWd91R4MIs-Mqr9qb0UYQ0Chw8qGZxobxOhnUZ4kLIdwFhZdnZA3AdFCWa1nC8MiP6a4pwPR3DcO4K0XxrgSLtNIkysjzIFQUeQcqyiDFMPUQTGm6czbfyZr-V670sS21UcwoorCV4VwgUOBg8MPj2D0D4XJUMVbIRVqtFsvZcnw1tF4D4OCfG43kQQxRRCk6dESYxL+WcHpTz0UwIo9EAAKhiUkuw4eBOsjpT5uDbHwuxgim7+g8DaMMbinC+k8TUuOj9LLDwTm-ZprS6oL2alEtqMT-6Fyahwfpgyy5sJGiM92YyFkRCmbYgRDi5m1gYAOMR7jVlSPWYRTZjBPwNX4NoSmQhxB8BTJgC8yoADyuBDgVRBdC8FVQACy2AIAQAIBRZm9Dp7PA0BAAAVugZAYD7lVywZ8BgYddqIVyT4K4h8ng7VcJLJxsD-A7WiACmOhUNSorBYIKoUL+BwFhQipFmwKrtLhXwVMujWYqg1rU2OhERWyDFZC3gkrFSKrAIi5FBz+qXmVMsVYdJNgMluavSuJx7h73pREFwLYcIYw9L6ZxjYPCBiqVIhCNxkhGW4FIWo8AmQyLxsMsC7tnhtg7FUtKUiWW7WDsrdG9gBUnVjWY6lJxnhWg7JAm0W1-Ti3FiywMObb7eI2XHHg0LZjiH8hsEGDrOFpRDIhFCQQj5dniEket6rG2EUhGSaocJKRNDjfzKu0QIjuHtDBSaeSmwehuM450torQR0DLaXNfd6nbMHlG9h8aq59vlk4KpG87T6RuB6axO6l11nDp8VWx6H74LPYQ-Ww9qrfXnWvBww5b3ZofbcQNyFlZyxWhyvJe7YheB-XIwV-jJRKKuj1UJJVDwROodnUDjqHBbUg-esOMHn2DvuD6T1dYrQoV3eh3xRUsOBNw99M1d1dRSGQIMPgpGIEZTeLkwNMyVI+GQjcTlK04hQwQjtH4o6joaqFTrf9jTANhOA6JXjRyOmeRE6M6G00PieH8K+4cA6njrtcPcBKmCEgNzY3UzDDSAk4asvpm6hyWJyGwAQCApmHlfFWvBxwLGO72GQtYtKc0XDDgyl8faI7crqfHZ57T3mmnDw-pXLt4FAxRGDNFuuksG5xGQmHBZloq3+CtKu9zmqcthJ2UEoBVM05sQzhPTAYWaXbRiBVn2VXYhsotAGVaKkviNhVnEEMrXNNPy89h-LYTCuGfFAJoTYAhsTS+FEO4DYIuTM2sha4aUhwoRbCpOrB01PY0BX+jr56utzx28cwbBar0TWvjaJwGVJb3H2hcAO4s25fAHPaD9doVtAvjh94h3XP4BcPEFkLh3wgRa3rk6LloO6IQDhRm4LY-XBgwShRHb2CPWQA0PLbwS1E44QLWreiV91ZX2nFpuYc0LWMDk6e0IYb6ZZe4KpHnGfMFZZ+Qk2RGtEkb+wup10XOcIW5-pS+fP7OOiiLaax4OsFQ2hrT0973Ge7Lly0wx33Ex7YIMJ1XYGEARH9T6ZWSn+H2O9SGTnPyVmSK8WO17lv6eddR-shVKvL1q-CJNKC3hvghzeY46GgflkeP+c96OeaI+lTy7p+nKj7ftIPFjyAbOWV2lPgkAMLp1JISPgGKCojs9-KexL-PJ7BXavRXq6FUqjUmrlWzxCcR6VxAwXpDKToPQC63v6W4q+PiOh8Bb-voKdUQqgBKmFo-ZVKBRTvwfUAsU4rxbZCf8zp9h3h-Pjw3q1Jb0hqboNgat8FQH7q-f+rD8ZVTUFVLU2cFZEtexhx4ZPUF8m4do0p70A1t1g0Mt1Ystw9t80U-8D8R8gC5UGAjVYA+kUQdxahQtXcyN2c2xEsEhdo58vU4CrQvkewkDP8Q1Q0gA */
  context: {
    SSN: "",
    FirstName: "",
    LastName: "",
    GavUnionScore: 0,
    EquiGavinScore: 0,
    GavperianScore: 0,
    ErrorMessage: "",
    MiddleScore: 0,
    InterestRateOptions: [],
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
                    input: ({ context: { SSN } }) => ({
                      bureauName: "EquiGavin",
                      ssn: SSN,
                    }),
                    src: "checkReportsTable",
                    id: "equiGavinDBActor",
                    onDone: [
                      {
                        actions: assign({
                          EquiGavinScore: ({ event }) =>
                            event.output?.creditScore ?? 0,
                        }),
                        target: "FetchingComplete",
                        guard: "equiGavinReportFound",
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
                  type: "final",
                  entry: [
                    {
                      type: "saveCreditProfile",
                      params: {
                        bureauName: "EquiGavin",
                      },
                    },
                  ],
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
                  type: "final",
                },
              },
            },
            CheckingGavUnion: {
              initial: "CheckingForExistingReport",
              states: {
                CheckingForExistingReport: {
                  invoke: {
                    input: ({ context: { SSN } }) => ({
                      bureauName: "GavUnion",
                      ssn: SSN,
                    }),
                    src: "checkReportsTable",
                    id: "gavUnionDBActor",
                    onDone: [
                      {
                        actions: assign({
                          GavUnionScore: ({ event }) =>
                            event.output?.creditScore ?? 0,
                        }),
                        target: "FetchingComplete",
                        guard: "gavUnionReportFound",
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
                  type: "final",
                  entry: [
                    {
                      type: "saveCreditProfile",
                      params: {
                        bureauName: "GavUnion",
                      },
                    },
                  ],
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
                  type: "final",
                },
              },
            },
            CheckingGavperian: {
              initial: "CheckingForExistingReport",
              states: {
                CheckingForExistingReport: {
                  invoke: {
                    input: ({ context: { SSN } }) => ({
                      bureauName: "Gavperian",
                      ssn: SSN,
                    }),
                    src: "checkReportsTable",
                    id: "gavperianCheckActor",
                    onDone: [
                      {
                        actions: assign({
                          GavperianScore: ({ event }) =>
                            event.output?.creditScore ?? 0,
                        }),
                        target: "FetchingComplete",
                        guard: "gavperianReportFound",
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
                  type: "final",
                  entry: [
                    {
                      type: "saveCreditProfile",
                      params: {
                        bureauName: "Gavperian",
                      },
                    },
                  ],
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
              invoke: {
                input: ({
                  context: { EquiGavinScore, GavUnionScore, GavperianScore },
                }) => [EquiGavinScore, GavUnionScore, GavperianScore],
                src: "determineMiddleScore",
                id: "invoke-bdjlm",
                onDone: [
                  {
                    actions: assign({
                      MiddleScore: ({ event }) => event.output,
                    }),
                    target: "FetchingRates",
                  },
                ],
              },
            },
            FetchingRates: {
              invoke: {
                input: ({ context: { MiddleScore } }) => MiddleScore,
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
