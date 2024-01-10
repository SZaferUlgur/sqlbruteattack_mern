const mariadb = require("mariadb")

const connection = mariadb.createPool({
    host: "127.0.0.1",
    database: "productdb",
    user: "root",
    password: "123123123",
    port: 3306
});

const getConnection = () => {
    return connection;
};

module.exports = {
    getConnection
};
