const jwtOptions = {
  signingKey: "signingKey",
  cookieName: "JWT-TOKEN",
  expires: "1h"
};
let jwtCommon = require("../utils/jwtUtil").init(jwtOptions);
let constants = require("../utils/constants");
let expect = require("chai").expect;

describe("Test jwt util", function() {
  it("Generate Token", function(done) {
    expect("").to.not.equal(
      jwtCommon.generateToken("sangln2", constants.JWT_SIGNING_KEY)
    );
    done();
  });
  it("Get Subject Token", function(done) {
    let token = jwtCommon.generateToken("sangln2", constants.JWT_SIGNING_KEY);
    expect("sangln2").to.equal(
      jwtCommon.getSubject(token, constants.JWT_SIGNING_KEY).userName
    );
    done();
  });
});
