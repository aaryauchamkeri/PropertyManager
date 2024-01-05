import knex, { Knex } from 'knex';
import mysql, { Connection, MysqlError } from 'mysql';

var con: Connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'GSW30kdcurry',
    database: 'RealEstateManagement'
});

var knexCon = knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'GSW30kdcurry',
        database: 'RealEstateManagement'
    }
});

con.connect((err: MysqlError) => {
    if(err) {
        console.log(err.message);
    } else {
        console.log('Connected to mysql.');
    }
});

export {con as remDbCon, knexCon as remDbConDynamic};