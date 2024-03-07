const dbConfig = {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

const jwtSecret = process.env.JWT_SECRET;

module.exports = {
    dbConfig,
    jwtSecret
}
