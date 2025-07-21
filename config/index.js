require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    databaseURL: process.env.MONGODB_URL,
    jwt: process.env.JWT_SECRET,
};