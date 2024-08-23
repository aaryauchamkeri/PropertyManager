import knex, { Knex } from 'knex';
import mysql, { Connection, MysqlError } from 'mysql';

// var con: Connection = mysql.createConnection({
//     host: 'portfoliopms.cnmwkmu0qksp.us-east-2.rds.amazonaws.com',
//     port: 3306,
//     user: 'pillok',
//     password: '__________',
//     database: 'RealEstateManagement'
// });

var con: Connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '___________',
    database: 'RealEstateManagement'
});

// var knexCon = knex({
//     client: 'mysql',
//     connection: {
//         host: 'portfoliopms.cnmwkmu0qksp.us-east-2.rds.amazonaws.com',
//         port: 3306,
//         user: 'pillok',
//         password: '________',
//         database: 'RealEstateManagement'
//     }
// });

var knexCon = knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '_________',
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
