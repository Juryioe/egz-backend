const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const {dbConfig, jwtSecret} = require('./config');

async function executeQuery(sql, arguments = []) {
    let connection;

    try {
        // Sukuriame prisijungima i DB
        connection = await mysql.createConnection(dbConfig);

        // Pateiktos uzklausos vykdymas
        const [rows] = await connection.execute(sql, arguments);

        return [rows, null];
    } catch (error) {
        return [null, error];
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

function signJWTToken(data, expires = '1h') {
    if (!jwtSecret) throw new Error('JWT Secret not Provided');

    return jwt.sign(data, jwtSecret, {expiresIn: expires});
}

function parseJWTToken(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

module.exports = {
    executeQuery,
    signJWTToken,
    parseJWTToken
}
