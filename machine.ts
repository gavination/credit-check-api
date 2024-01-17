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
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCuAbALgSwA7rAGEAnSbTQgCzAGMBrAOhtInKtsYFEA7TMY7NygACAJLcAZgHtiyAIY4p3AMQBlVACNk5ANoAGALqJQuKbHLYlxkAA9EAZgAcAVgYB2ACwAmAIyO3zgA0IACeiD5ueu4AbM7RXs4AvonBaFh4BCRkFNT0TCxsuYwAavzYEiGCIlkQYLzYcuiwyhBKYAyCAG5SdO1pOPhEBTkc+dnseaUCFVXCNXU4jbAIXVI0Cpbc+gbb1qbmitzWdggAtD7Ojgz2AJyOHvYBwWEIlx7uNz7R9rGOenreZKpDADTLDCaMZjjIoMKblSpCOYsBYNJrKfjEGQMfAKaSyBj9DJDaGjKGsEaTMozRHzepLFbcbrrQ7bXZIED7CxWdknd6+fxBUIOPReBheRw3PTxJIpECEwY1Qqk8EwiFVRWYVQ0GRwFptBiwTAKPogokaiFjckWtVCDVanWwNkmMxco48xBeDw+PmxaXPRB-aIMHz2cU+BJAuWmhUq5UkvI2qB27WkZqtbjtQ3GgnRsHxyGxhNFdXDe2pnQ+IzszmHY6ITz2BjeHyfbz-NzRfz+hC3BjfMMR2XyvNWmFkpVFjgl7JluAMROcACOqGwAHE5J1BPPi0IAGIyTg2bCGqoAJTApmImD1GY6jJ67TAy7XG8EABEAEIAQRomBkTo5F1a3dBA3Hsd4AjcRxw0FF4YIgmVgXSGN80tCdGETZMHW3KchCXFd103bgcPoKp92IQ9jxwIRz0va903aVZegYJ8CNfbhPx-P9iArKtnQOTY61A8D3GcKCYO7b09DcMVEKjZCR3QtCKQwnck1LFM5wXZ9CK3RNyMok8aIvGRrwxLEcUwPFkBYnT2M439-0MPYgMEkCwIQ8SEkk5xnD0SNh2JUc42CydSNtDTsO0tiiIYXcwEwGhKDPEyrxvRj72Y1iXyI+LEsoLinL4wCBO5UATm9ETnBuR5YPCR4PAC3MgqU8cVJIuhp3JWdYA6qp8Jyrc8qSlK6PRYhMWIbF0FxGQbOy3TuGGgrHJ45zq1csrbHCB53mq2rJObBg5MC80x0LVTcPUmdNN6xNCIAVW4TY+r3A8jyMqBaNM9K726ZioA3J7Ngc7iAJrNzyvrewfFEry6oQCIvlkpqFJa9q2utNSsNTV6oEe56lDxgyPuor7Uvo-UmPaQHOmBpRQf-SsXNKt0oeE2HIOg7yhURxxO1E1HQXRi1MdVbHItx+6gcJ4j9PeqjRp+8ypss6yGFp+mOO-Vbwc2tnto5uHuYRrw9B8WGTuas6QqUzDJa0tSCZe5albShi-ofDWZc2ZbCrW4qIa2irvFcS59qeXm-HsMOhbNC7lKxq6ccdq7naJ13jLGlXptm-FNdlv3dfW-jXSE70EmOlwasjuDHEcew45Q0KC1Q+2bqip2N1wMo5DltSScVrOfo96nvc6HuBD7iF-b11mhICd4Te7NwapRodrYTsXRnb7rbrxwjJ4afursHz7vvdqnMpp7ve+4GfdeZjb5-c5wl4k3mbg8VwAibxSMYTrvcgPUD63ynifcKUAz5kwvmZCaFkZpWTmuPI+08iizxLiVMur9348zgnoeux0-4i3Om3CWHcpZdwnnfOKCURrD0vreMeSUOCEQAAp3wwYHfW5cPBQSbAdT+4YiEbzRjbPI28wqdQihQ1OkDD40MzuTbO8DVaIPViw+g7DOHF24S-dm3p+EPFrogG40R-KiOFuI1uLcGBvgSvwbQz0hDiD4KmTAp5jQAHlcCHF6vYtxTiqgAFlsAQAgAQWcv0x7U1OBoCAAArdAyA57YPZl4aIkR3DgUEXBJwMlf6WPjqhSRjAAmOMEFUVx-A4AeO8b4zYvUlGeL4GmK+-0TRiK3gncpshKkuN4DUw0LSwA+L8bQ-KZ5jTLFWMyTYrJMFBwNicGGno+zRA8FKPB9V-CC0jNwKQtR4DslOhdFmaTDanASO8W49xcmIHODHa4mS-CFKQlY7p+ZznAXZlcqU1w7jGIRqcPhDB+ZuFeVbLpJSE48DcbMcQ1kNhbSWQvRs-Zl5R2qn2Qc7zim2NKbCKkCJqjIjpE0b5kNDbRB8FECUdyTE9kyQwaSXhPjRA5ZyzJxDrGJ3FsnB2xzS4-MNgkGSjgzarIRr5PkUKPkwrIQK2Rd01IDUWpS4OwpXASr0FKySXwZK4vkvKglgDyF707ldNV7FiYK3PhTDVyyHDOEbDqvVWKATBiNachVtigGan3tFQaxElGECkMgQYfBHXl0yVEDwNx+SMpDKGPZeLm6tTNUqi1lCrV2Vis0h1z8LkVQIY2MSmK8kStTca-FGbFWQJTiq3NMUhp0OSnuOQ2ACAQGjSBA1caE2Qp8gQ6tPrTX1ukddbNcjJ3pwNqikC9g9DaslR-OC8QrhvJremgBE6urAMDVQrWtqKKkzdpgXt7MY6utXdsxGZjXDSh5Z8v15qD2WvkT7DObb1ThsjWAS9hsviXCbAyhGEQv7rzTf-UWmaG2CtAXTWWEz6HKNMoBktbgZJiV1Wu8I9xZXPt9XbN9AaP2zq-SGn9Hau2QAw+EX4oGgWSRuFk71m9iPtX9SA6W1DwH0Z7MusFt6EaRB-nK2tu7X1ZvfTmz9fHj4nsMjAwtwqqUrJdcJ3Dd7aXeBxRJndsG90yOnU2+TqCqOTNtH+ggUai0ioqhCq40kK0BghVB7dMHSHSfg8qxDFmUPtrQ1eATFsvDotXp2Rlg6PNjrrT5ydjb-OKOo1Azt3bQtOZZfDSSAJDUGa87bdqvSgkDLcbUkZYzGkCa8Bkzm2nwMtmw0R8dtiSv9KgNU9xlWGlKH8Q4vpzioChPCZEzSNWl03HcA1ySMcojseha1pS7WhtdYq-U8ZzTpk1ZcFcIdUcfiNgWya+Ly2Bulc64M7rG3GkMBGbANhmJNy1B7fZ9TDgfh7ac0m8CNxkjJCAA */
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

              onDone: 
                {
                  target: "CheckingCreditScores",
                  actions: {
                    type: "updateCredentialContext"
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