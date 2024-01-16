import { z } from "zod";    

const userCredentialSchema = z.object({
    firstName: z.string().min(1).max(255),
    lastName: z.string().min(1).max(255),
    SSN: z.string().min(9).max(9),
    
});

export type userCredential = z.infer<typeof userCredentialSchema>;

export async function verifyCredentials (credentials: userCredential) {
    try{
        // this would be a great place to lookup the user in a database and confirm they exist
        // for now, we will just validate the input and return it
        userCredentialSchema.parse(credentials);
        console.log('did we get here?');
        return credentials;
    }
    catch (err) {
        const errorMessage = 'Invalid Credentials. Details: ' + err;
        console.log(errorMessage);
        throw new Error(errorMessage);
    }
}

export async function determineMiddleScore(scores: number[]) {
    // given an array of 3 scores, return the middle score

    // sort the array
    scores.sort();

    // return the middle score
    return scores[1];

}