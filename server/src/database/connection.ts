import mysql, { Connection, MysqlError } from 'mysql';

var con: Connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'GSW30kdcurry'
});

con.connect((err: MysqlError) => {
    if(err) {
        console.log(err.message);
    } else {
        console.log('Connected to mysql.');
    }
});

export {con as remDbCon};