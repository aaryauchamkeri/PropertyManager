var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getCollection from "./getCollection.js";
const refreshTokensCollection = getCollection('refreshTokens');
let tokens = [];
function saveRefreshToken(tkn) {
    return __awaiter(this, void 0, void 0, function* () {
        tokens.push(tkn);
        // refreshTokensCollection.insertOne({token: tkn});
    });
}
function hasRefreshToken(tkn) {
    return __awaiter(this, void 0, void 0, function* () {
        let hasToken = false;
        tokens.forEach(token => {
            if (token === tkn) {
                hasToken = true;
            }
        });
        return hasToken;
    });
}
function deleteRefreshToken(tkn) {
    return __awaiter(this, void 0, void 0, function* () {
        let found = tokens.find((elem) => elem === tkn);
        if (found) {
            tokens = tokens.splice(found, found);
        }
    });
}
export { saveRefreshToken, hasRefreshToken, deleteRefreshToken };
//# sourceMappingURL=saveRefreshToken.js.map