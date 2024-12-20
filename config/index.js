require('dotenv').config();

module.exports = {
    db: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME,
    },

    port: +process.env.PORT || 4000,

    auth: {
        accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
        refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
        accessTokenExpiresInSeconds:
            process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS,
        refreshTokenExpiresInSeconds:
            process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS,
    },
};
