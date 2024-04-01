var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { remDbConDynamic } from "../database/connection.js";
export default class UserService {
    constructor() {
    }
    getUserData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let userData;
            // let usersInAccount = await remDbConDynamic('account_users').where({
            //     accountId: this.accountId
            // });
            // usersInAccount.forEach(async userAccount => {
            //     if(userAccount.userId == id) {
            // userData = await remDbConDynamic('users').select('*').where({
            //     id: id
            // })[0];
            //     }
            // })
            userData = yield remDbConDynamic('users').select('*').where({
                id: id
            });
            return userData[0];
        });
    }
    removeUserFromAccount(userId, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield remDbConDynamic('account_users').delete('*')
                .where({
                userId,
                accountId
            });
        });
    }
    getAllUsers(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let allUsers = yield remDbConDynamic('users')
                    .innerJoin('account_users', 'account_users.userId', '=', 'users.id')
                    .select(['accountId', 'email', 'first_name', 'id', 'isAdmin', 'last_name', 'userId', 'username'])
                    .where({
                    accountId: accountId
                });
                return allUsers;
            }
            catch (err) {
                return [];
            }
        });
    }
}
//# sourceMappingURL=UserService.js.map