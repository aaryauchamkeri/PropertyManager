import { remDbConDynamic } from "../database/connection.js";


export default class UserService {

    id: number

    constructor(id: number) {
        this.id = id;
    }

    async getUserData() {
        let result = await remDbConDynamic('users').select('*').where({
            id: this.id
        });

        return result[0];
    }
}