const cookieUtil = {

    getValue: (req, cookieName) => {
        return req.cookies[cookieName];
    },  
    create: (res, name, value, secure, maxAge, domain) => {
        res.cookie(name, value, {
            domain: domain,
            secure: secure,
            expires: new Date(Date.now() + maxAge),
            path: "/",
            httpOnly: true
        });
        return res;
    },
    clear: (res, name) => {
        res.cookie(name, null, {
            expires: 0,
            path: "/"
        });
        return res;
    },
    clearHaveDomain: (res, name, domain) => {
        res.cookie(name, null, {
            domain: domain,
            expires: 0,
            path: "/"
        });
        return res;
    }

}
module.exports = cookieUtil;