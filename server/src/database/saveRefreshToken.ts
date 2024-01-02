import { Collection } from "mongodb";
import getCollection from "./getCollection.js";

const refreshTokensCollection:Collection = getCollection('refreshTokens');

async function saveRefreshToken(tkn: string) {
    refreshTokensCollection.insertOne({token: tkn});
}

async function hasRefreshToken(tkn: string): Promise<boolean> {
    const token = await refreshTokensCollection.findOne({token: tkn});
    if(token) {
        return true;
    }
    return false;
}

async function deleteRefreshToken(tkn: string) {
    refreshTokensCollection.deleteOne({token: tkn});
}

export {saveRefreshToken, hasRefreshToken, deleteRefreshToken};