import { Collection } from "mongodb";
import getCollection from "./getCollection.js";

const refreshTokensCollection:Collection = getCollection('refreshTokens');
let tokens = [];


async function saveRefreshToken(tkn: string) {
    tokens.push(tkn);
    // refreshTokensCollection.insertOne({token: tkn});
}

async function hasRefreshToken(tkn: string): Promise<boolean> {
    let hasToken = false;
    tokens.forEach(token => {
        if(token === tkn) {
            hasToken = true;
        }
    })
    return hasToken;
}

async function deleteRefreshToken(tkn: string) {
    let found = tokens.find((elem) => elem === tkn);
    if (found) {
        tokens = tokens.splice(found, found);
    }
}

export {saveRefreshToken, hasRefreshToken, deleteRefreshToken};