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
    verifyCredentials: fromPromise(async ({ input }: {input: userCredential}) => {
      await verifyCredentials(input);
    }),
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
  }
}).createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCuAbALgSwA7rAGEAnSbTQgCzAGMBrAOhtInKtsYFEA7TMY7NygACAJLcAZgHtiyAIY4p3AMQBlVACNk5ANoAGALqJQuKbHLYlxkAA9EAZgAcAVgYB2ACwAmAIyO3zgA0IACeiD5ueu4AbM7RXs4AvonBaFh4BCRkFNT0TCxsuYwAavzYEiGCIlkQYLzYcuiwyvzEMgz4CtKyDGk4+EQFORz52ex5pQIVVcI1dTiNsAiCAG5SNAqW3PoGO9am5orc1nYIHgy+-kGhDnpeF44AnHrxSSkgfRmDY0WjrMN5cZ0Ko1ciqGgyODKCBKMAMWCYBRwz4DUEAxjMH4jIEgobgyGwPZIEAHCxWYmnLweHznLyxV7BMIIRwvBg+exeRw+BLJVIYfqZIZAv6FbFFXHZfGkZow7hwhFI3r8r5o4WY-7CnFCNFSuA6HxGYmko4nRCeewMbw+R40rx6PRuaL+RkOR4MaIcrk894owVYvLq0WA8XavEQ6UMLVQTgAR1Q2AA4nIVoJIyGoAAxGScGzYBFVABKYFMxEw0NhDFWUjocLAccTycEABEAEIAQRomBkRJMZjJxwpZvs5wCbi91yZ3OcI7efPSqKFv0D6LTHAl-11sFX9CqsfjSZT3G3wKEWeIObzOCERZLZdlcKrNYYdf3je4rY7XeI+sNvcOW1NBA3GHdxnDHKcXQQGkHQuWcPmVBd-QxRcxTXUNJXDOBj13esD1TKMzwvfNr2LGQy1adpOkwbpkGfXC3w-Ttu0MfY+xNQcgJA0dx0gnxnGcPReXg+c-Q1JcUODNCoB1TCtyjPcG0PBgMzATAaEoQtSNLcs5Urbg1ifF9FMEFS1MoT9mN-Ek2IAjiaRA5xHnsAJeOcjwhN9b4xJGZdNXTGSCWwoQFLwo9TPUzTbxaYg2mIDp0C6GRaKM0LwvMpjvxYo0bPJUBTns85HOcidwitBg4M81VxKQoLpLDQKowPABVbgtlqwjc2IqAbzInSH306s4SgZMWq2Rivx7az-1y2whx8UDwISXi3B8aJYI8hDRKDZCaqjAKI0akbWqUdrs06q9uq0u8K0fIajrG9sMp-VjpoHPK5oWnibigxwnVAjaRK87aRRXPb6oO9NmuOo8CLOy9It6ii4qomiGGGlZRqUcbLJe-tAOA+buIg767R8eaKs2oGV1834wYwhrIfuk60oR7T7z0gy7ox6G0oszKrONWz3qg7xXGcFwnJc76-HsMWAYFKm1Qkxg6Y3WTaqhtqWZIqKkfixKenRzHuF5p6sr-PG7NF8qJeK3jHEcex5ZVZWQb8qT9qww6VlwMo5Bh9MOvhnXevZ260eTX2BH9oE+cmwWZtOAJzi+pk3Cc9afUpqqfNd1WwXV72o4aAOpKDrqerZm6BqfdHi5joo44NXH2OF5OGFTxBHg8VwAmdxDvIDPP-PBr3GZ9v3S53U84Yrq7oti-XqKSiOJ+j7hY7NgWcre2agOnDvicnPQHfK-utup4ePdHuTx-rsLVIikOq908P1I4A8AAVJ7j82pst4WNIxyWjtt9G09wKaAxzkPXaI96YQykgee+ylH4aWfuRGKlEErLx6O-egX8f5bxbkLPeQDHAgKlkyR40RBJZyga7GmIwmyqX4NoVqQhxB8GlJgAsSIADyuAjhbmYVwthVQACy2AIAQAILqPqHNBoKJrAAWg0BAAAVugZA8cd6ATpJEdww5QGTicG4f6dCFbQJ2oPRgIjWGCCqJw-gcAeH8MEVsLc2tupIhlNXTmSp6E1UYXkOxsgHEcN4M4hEvC+ACKESgsyhYfHLAGhsI4OwdGvUAvYbk5xojRA8C8Ja0tTHmPeNwKQtR4DEkqsrYhidEDKJtO4TuCBlHslcHodkJ97D2EeI7O0-hz6K2qjY+pu9TjKI8BaRaJU2keDMdEZ4HSPAeBtDQ1ZwyrFu1+DwLhMxxA0U2DNBOEyhzuk9EfcIjl3TejnJYhhrtJjlEqEIWYLB5gNCaOMwC0QfBRCeI4aZlCHDRDMQ6Lw6z8nQrBVsx5sDr7wLgD8jiCQzGODtDk4pTJ+IjkdHxJymKXhOwsS7IJV9p51SRbfKSIU3wouFvYPQrgMV6CxXMsmYLLR0nWZCx4bg6SODheShFlLPY0spXSpSsNzznVZpgBle9ZYWlZey3iAlzhTmFTYnZqExU31qlK1MXjCBSGQAMPgir8pgqiGsy4IKoK9PuH3UlA9gbBJVnAtWDNaX0SUl4yuCrspZLsj08qszXIYvMfcslOqPW1XFYav1xrUFVAzHIbABAIBWvCDay0jx7UcoEuQl1Ma3WX1FSeKl3qEGUs1ic3RHEmUssxVcqC8RyEFpWs8ewHpIXuVdRfJWlb1wFx9XWpmU8q3lwuoGnNCBlUd1bdi8I1DXCvG1e6ilVbE3e2Ngkp+0kzUWrAPO1a4tLRAuMeEdOtJIEPJFTq-OmBNwa0nQetBl1bxnodGYsCbK21+FWZnMtQ7RnA2fa+vd0MP1pozVms9sRyEeCvQ660Bi7nCQfXG7do6X2FzvpPedzal0AZXUBZlDAu3WjZX2pyjxN0VqfV6sdtaq1IMnqdWVwcv1kWI84FVy6OV6G8Lc+9sat0jvQjWseiDI6cZNcegglrg0ANIStchDpWn+Hmph2pj6IMsfw+O9j8n16wfQWe7kFowXUKuJBAtunxPluHcxxFMmJWmbXiXCzmZ4OQDPRphgWnAMibMXp7O8KdWhLERErhLiYlgDiR4+dXg6SEzIxy9DHcUMYv4vanujHXPAxi+EqATjuGJeS0oYRLCwnsKgJI6RsjMKpaZW6SIaqSkCRA1hiTTGSt1di+VyJlW3HxIDT41LLhyF+DQ72i0EXAk4ZqqVhrFWEvjY8QwRLsBP5tBTLUbNqnW5Kt7bNjT821nJGSEAA */
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
              }
            },
          },

          "Verifying Credentials": {
            invoke: {
              input: ({event}) => event,
              src: "verifyCredentials",

              onError: [{
                target: "Entering Information",
              }],

              onDone: {
                target: "CheckingCreditScores",
                actions: {
                  type: "updateCredentialContext",
                  params: ({context, event }) => {
                    
                  }
                }
              }
            }
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
  },
);