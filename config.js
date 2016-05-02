module.exports = {
    db: {
        production: process.env.MONGODB_URI,
        development: "mongodb://localhost:27017/travelapi-dev",
        test: "mongodb://localhost:27017/travelapi-test",
    },
    authSecret: 'travel secret'
};
