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
function saveRefreshToken(tkn) {
    return __awaiter(this, void 0, void 0, function* () {
        refreshTokensCollection.insertOne({ token: tkn });
    });
}
function hasRefreshToken(tkn) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield refreshTokensCollection.findOne({ token: tkn });
        if (token) {
            return true;
        }
        return false;
    });
}
function deleteRefreshToken(tkn) {
    return __awaiter(this, void 0, void 0, function* () {
        refreshTokensCollection.deleteOne({ token: tkn });
    });
}
export { saveRefreshToken, hasRefreshToken, deleteRefreshToken };
//# sourceMappingURL=saveRefreshToken.js.map