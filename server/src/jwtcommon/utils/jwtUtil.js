let jwt = require("jsonwebtoken");
let cookieUtil = require("./cookieUtil");

module.exports.init = (options) => {
    return {
        generateToken: (user, signingKey, expires) => {
            return jwt.sign( {payload: user}, signingKey ? signingKey : options['signingKey'], {expiresIn: expires ? expires : options['expires']});
        },
        getSubject: (token, signingKey) => {
            try {
                return jwt.verify(token, signingKey ? signingKey : options['signingKey']);
            } catch(err) {
                console.log(err.message);
                return false;
            }
        },
        getSubjectFromHTTP: (res, cookieName, signingKey) => {
            let token = cookieUtil.getValue(res, cookieName ? cookieName : options['cookieName']);
            if (token == null) {
                return null;
            }
            return jwt.verify(token, signingKey ? signingKey : options['signingKey']);
        },
        getOptions: () => {
            return options;
        }
    };
};
