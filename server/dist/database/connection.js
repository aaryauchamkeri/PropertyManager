import knex from 'knex';
import mysql from 'mysql';
// var con: Connection = mysql.createConnection({
//     host: 'portfoliopms.cnmwkmu0qksp.us-east-2.rds.amazonaws.com',
//     port: 3306,
//     user: 'pillok',
//     password: '3billionmrr',
//     database: 'RealEstateManagement'
// });
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'GSW30kdcurry',
    database: 'RealEstateManagement'
});
// var knexCon = knex({
//     client: 'mysql',
//     connection: {
//         host: 'portfoliopms.cnmwkmu0qksp.us-east-2.rds.amazonaws.com',
//         port: 3306,
//         user: 'pillok',
//         password: '3billionmrr',
//         database: 'RealEstateManagement'
//     }
// });
var knexCon = knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'GSW30kdcurry',
        database: 'RealEstateManagement'
    }
});
con.connect((err) => {
    if (err) {
        console.log(err.message + ' called from connection.ts');
    }
    else {
    }
});
export { con as remDbCon, knexCon as remDbConDynamic };
//# sourceMappingURL=connection.js.map