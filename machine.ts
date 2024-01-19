import { createMachine, fromPromise, assign, setup } from "xstate";
import { userCredential, verifyCredentials } from "./services/machineLogicService";

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
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCuAbALgSwA7rAGEAnSbTQgCzAGMBrAOhtInKtsYFEA7TMY7NygACAJLcAZgHtiyAIY4p3AMQBlVACNk5ANoAGALqJQuKbHLYlxkAA9EAZgAcAVgYB2ACwAmAIyO3zgA0IACeiD5ueu4AbM7RXs4AvonBaFh4BCRkFNT0TCxsuYwAavzYEiGCIlkQYLzYcuiwyhBKYAyCAG5SdO1pOPhEBTkc+dnseaUCFVXCNXU4jbAIXVI0Cpbc+gbb1qbmitzWdggAnB6u0Y72zqf2AcFhCAC0jgz20W5+AcmpGAOZYYTRjMcZFBhTcqVIRzFgLBpNZT8YgyBj4BTSWQMfoZIZg0ag1gjSZlGYw+b1JYrbjddaHba7JAgfYWKxMk56R6IPS-EA4wY1QoEoHg4FVQWYVQ0GRwFptBiwTAKPr-XES4FjIkasVCCVSmWwRkmMyso7sxBeDyOaIMHweSJ3ZyODx6e5BUKIa42056Hx6f1WgI+ZweXn8wH4vKEoV5HVQPXS0jNVrcdqK5XY1UCkXCyOMOMJg06HxGJksw7HRDOYMMZzONw3K32bynK5cl63d7O4MfU6tvTOLynMNZiNa8HR4n5ori4b6pMMOOcACOqGwAHE5J1BIuZ0IAGIyTg2bCKqoAJTApmImDlqY6NJ67TAq43W8EABEAEIAQRomBkI1mRNCtzQQAJTneH1YjrPRvC8RxHHbHwELeFDLRuPsh1ONwR3SbM801GNpw4WdsnnOBd1IoQVzXTdt24Kj6CqQ9iGPU8cCES9r1vFN2lWXoGBfOj324b8-wA4hi1LY0Dk2StwM7exoLrZw4K8VDkI8F0GHiDDblObDcJSPlRzxcdcws2M93jOdE0opdX3onc41Y9izy4q8ZFvZFUXRTBMWQISnNE8T-0Aww9hA+SwIgqC9BgtT4MQ5CnXsd43H0rC+2Mv58LHYiiKnJi6DIokKNgEqqlot8GIYfcwEwGhKAvLybzvfjH0E4TasEBqmsoCSIpk4C5LZUATjtRxIM+J0fBQyIEjtLS9C8Wsbi8Nw3GtWbolDEzw3MwrJ21GzCwXRyRLq-rmtanikWIFFiDRdAMRkIKeuc7gbsG8KpMistovG2xwg8H13g8ewfCh6t5r0U53SeO063WvbTmdRxLW8PCASO4qTtFM67INKqhHogBVbhNlJqA3JPDyoG47yOofbpBKgLdKc2MLJKA8sYomxAAhtSI4kQvRHH9LxomiZDtp8d5m1uXsvD0SJctM-K8Y1AnRgLYmLpsimqaUGm6Y4u7mb41mnwYDnOi5pQecAksorGs1BcUkWByuSXJdWmXkLudLrguO5okMtW1ZxtUcyjOOSOY3UDYco3OZNxjXKPenOMZtqfMevzXoC967fT7nfz+vmgY9kGvfcH3xf96XZY9BBVbcG0nTDlWo6SA6zPVCcE5p87U+oqBjepn7Lfa62BPae3He+xrmqG-6Rv54HJo8WIGASZSfZ8c5zlbpHpsg4-ts8VsPHm4+Y4IqyQRH-XyPsyq4yn02Z88+7fOev5QKZcHYZx+uvau7sFJ2j3oZdCTpoiukHG4IOYN3DqzUtNPw9hLSPwKvjV+RN34ky-luXAZQ5CZxsubBmTM57ygXiA8hAhKHAggQDWSpoFLbSiHWXe-h4YS2Uu2barhLT+GwYhaa9Y8Ha2HoRN+5UP403oswhoVCJ40NznQ3iDCuqLzIRQ7gbCq6u0BlA2KktawhiuA6IRpx2x3DcO4QMkjEIIw1odIellCqKPIBVFRhiWEaKTrTbOFs-7MwAS9N6WJ7ZqNYUUdhm8a7cKsXw2xgjrgOLbn6KxYMJHXCkR42R3j44KKIUokhadOgJMYr-PO91576KYEUeiAAFIxyS3ZcLAsGOCto3CtgET6bJjiBkFK+EU9xMiB5azKS-CpE8x6fxqXU+qq8WqRPatEoBpdmocA6V0quHDRq9M9v0jwgzhl2LGW3BGCs+yFKcDMzxg8R66zyB+Rq-BtBUyEOIPgSZMDnmVAAeVwIcSq3ygV-KqAAWWwBACABAKIs0YQvZ4GgIAACt0DIEgecuuODMYMAuFDYMm0I53C8O2RCziGyQxwTcTKXgbilI+SPGFvzBBVEBfwOAILwWQs2JVBpoK+DJj0WzFU8zOWEW5bIXlALeACsVBKsAEKoUbIGheZUyxVh0k2AyU5W9a4nHuB8LsCFVpbWpTgul-h3DNnsMy+sGl2W8m4FIWo8AmReITj00CntnitnbM8NlVzVpPISq2aIrrhxzNxgsoqwIg0Czrs8K04aYEN0iJ8Y+jh5qtg5YRT5XBVUCBhOIQKGxgZmu4eleNCEUKI3CJ2eI-c8rJvlc-CEpJoTVDhJSJo6bt6IGiBEdwzhD6Trvkgjw7YWVkrgucSWkRXVg1LX28to8U5+s4cGuuCE1rkuDLBZKLh2w2PQfaH0Q4LhfG3cdQhyz900xql9Md5qHD2CiGe1S6lUJtoQChf07g+yDktOcK0m1n0EKWaElZH6Qp1SzmxHOs9MDfoUvcN4AGL0aUQiBnsziwaeEwoZHK8GdavqQ++y6vV6mbPFFIZAgw+A4b6ZlN4vo2W3CEQlHwyEbiuClnEKGRHZo0fkX2vxkplGMa+jq262zsPmKJZNaGM0PieH8CGTKCMtI1jdHBbBCRpYyZ8cVeTASlOiRU1s2mchsAEAgFxi5Xw1qqz8ChHu8bUqQ1tH4QcOFNo+D2l2zWPay10dKsnYhhsJ7f1rg2sCrqoidyLU3KWsQz7hAjlG+aVxfSOjiF4Kz5S5OVP8Ypmpy8zbhNofnDzxLtoxGy37XLcR2yqz-Q3BG4dI7q0q4s6rb7Evj1CSlxzrH2MEE4xpo9k0vhRDK1tBahkUG5OuOlAcvhI0JUK-tbtsdYuIfi7ZSbqzkvlx-ixtTrWtPHzJU4TK-p7h7QuEHCWtYJGQZhpB0bqbCYTaqUl6bd3mO6oPC5tzT3whef3r6ItlplbxCQrknCzibjNkZZ3U480KtJrOzuuLZVavVNu7UoxCOECuvSpaDSVp4ZUb2vYdsEdnGGSdJtLaLg9rRGB7u2zdXqfrPQ+5bRLWlsZotUW-e8EWfZXZ8hOC-6Ea720sy+a9hhfk4S+Dqbl3VFGNm7qNjHGwB04iEFzGrowOjOEW3a0jPXHTOkW8uV53xv0eu4EmnwTzeNO8jbu0kFvDfDDvYxx0NFfPOKbM07T8X0XYpwpqnkPA-qOD-uOHkAbcR1cK210A4gMpVya6SC4ipkvOkSd6LpPU99sVXClVQLBUaq1aKunCEGxkt8NaZB9raVty5wwXbD7-A4OwvrhVPylX-KgPy4FXeRVKGhQvtvUBEXItRfZXvcCB9+FiFSvsDqXdqX3i6t1rLPXJ-wbR+fsLlXL8rZ34V2rxX6rp82CODBoJLRbUR86V41r8mV+M78osA0fdCpW9X8V8P8+Bu8N8GANVYB2kURtxah3NZdx16ccJIJpohNh9z9R8ngMYADnRXVICPV+5kggA */
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
