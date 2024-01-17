import { z } from "zod";    

const userCredentialSchema = z.object({
    firstName: z.string().min(1).max(255),
    lastName: z.string().min(1).max(255),
    SSN: z.string().min(9).max(9),
    
});


export type userCredential = z.infer<typeof userCredentialSchema>;

// this would be a great place to lookup the user in a database and confirm they exist
// for now, we will just validate the input and return it
export async function verifyCredentials (credentials: userCredential) {
    try{

        userCredentialSchema.parse(credentials);
        return credentials;
    }
    catch (err) {
        const errorMessage = 'Invalid Credentials. Details: ' + err;
        console.log(errorMessage);
        throw new Error(errorMessage);
    }
}
// given an array of 3 scores, return the middle score
//remember, it's not production code, it's a sample!
export async function determineMiddleScore(scores: number[]) {
    scores.sort();
    return scores[1];

}

export async function checkReportsTable ({ssn, bureauName}: {ssn: string, bureauName: string}) {
    // this is where we would check the database to see if we have a report for this user
    // for now, we will just return a boolean
    return false;
}

// simulates a potentially long-running call to a bureau service
// returns a random number representing a credit score between 300 and 850
export async function checkBureauService ({ssn, bureauName}: {ssn: string, bureauName: string}) {


    switch (bureauName) {
        case 'GavUnion':
            await sleep(range({min: 1000, max: 10000}));
            return range({min: 300, max: 850});
        case 'EquiGavin':
            await sleep(range({min: 1000, max: 10000}));
            return range({min: 300, max: 850});
        case 'Gavperian':
            await sleep(range({min: 1000, max: 10000}));
            return range({min: 300, max: 850});
    }
}

// this can indeed be a very long-running service, typically one that won't be local to the application
export async function generateInterestRate (creditScore: number) {
    await sleep(range({min: 1000, max: 10000}));
    if (creditScore > 700) {
        return 3.5;
    } else if (creditScore > 600) {
        return 5;
    } else {
        return 200;
    }
}


function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

function range({min, max}: {min: number, max: number}) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }