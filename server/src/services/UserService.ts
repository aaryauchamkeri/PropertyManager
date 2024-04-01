import { remDbConDynamic } from "../database/connection.js";


export default class UserService {

    accountId: string

    constructor() {
        
    }

    async getUserData(id: string) {
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

        userData = await remDbConDynamic('users').select('*').where({
            id: id
        });

        return userData[0];
    }

    async removeUserFromAccount(userId: string, accountId: string) {
        await remDbConDynamic('account_users').delete('*')
            .where({
                userId,
                accountId
            });
    }

    async getAllUsers(accountId: string) {
        try {
            let allUsers = await remDbConDynamic('users')
            .innerJoin('account_users', 'account_users.userId', '=', 'users.id')
            .select(['accountId', 'email', 'first_name', 'id', 'isAdmin', 'last_name', 'userId', 'username'])
            .where({
                accountId: accountId
            });
    
            return allUsers;
        } catch (err) {
            return [];
        }
    }
}