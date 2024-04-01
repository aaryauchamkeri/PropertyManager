import knex, { Knex } from 'knex';
import mysql, { Connection, MysqlError } from 'mysql';

var con: Connection = mysql.createConnection({
    host: 'portfoliopms.cnmwkmu0qksp.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'pillok',
    password: '3billionmrr',
    database: 'RealEstateManagement'
});

var knexCon = knex({
    client: 'mysql',
    connection: {
        host: 'portfoliopms.cnmwkmu0qksp.us-east-2.rds.amazonaws.com',
        port: 3306,
        user: 'pillok',
        password: '3billionmrr',
        database: 'RealEstateManagement'
    }
});

con.connect((err: MysqlError) => {
    if(err) {
        console.log(err.message + ' called from connection.ts');
    } else {
    }
});

export {con as remDbCon, knexCon as remDbConDynamic};