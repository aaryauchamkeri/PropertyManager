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
}