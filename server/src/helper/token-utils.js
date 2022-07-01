import * as CONSTANT from "../config/constant";
const jwtOptions = {
  signingKey: CONSTANT.JWT_TOKEN_SECRET,
  cookieName: "JWT-TOKEN",
  expires: "24h"
};
const jwtCommon = require("../jwtcommon")(jwtOptions);

export function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === CONSTANT.BEARER
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

export function createToken(user) {
  let data = jwtCommon.jwtUtil.generateToken(user);
  let token = {
    tokenType: CONSTANT.BEARER,
    accessToken: data
  };
  return token;
}

export const verifyToken = token => {
  return jwtCommon.jwtUtil.getSubject(token);
};
