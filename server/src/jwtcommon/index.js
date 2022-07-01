module.exports = (options) => {
    return {
        jwtUtil: require('./utils/jwtUtil').init(options),
        cookieUtil: require('./utils/cookieUtil')
    }
};
