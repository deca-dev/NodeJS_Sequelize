require('dotenv').config()

const config = {
    port: process.env.port || 9000,
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET,
    host: process.env.HOST || 'http://localhost:9000',
    db: {
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'root',
        dbName: process.env.DB_NAME
    }
}

module.exports = config