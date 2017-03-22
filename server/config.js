module.exports = {
    implementations: {
        path: process.env.IMPLEMENTATIONS_PATH || '../implementations'
    },
    client: {
        path: process.env.CLIENT_PATH || '../client/public'
    },
    port: process.env.PORT || 8080
};
