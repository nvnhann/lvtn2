import jwt from "jsonwebtoken";
import * as CONSTANT from "../config/constant";
import { getObjectType, getPermissionType } from "./switch-router-permission";
// import { RoleService } from "permission/services";
// import { GroupService } from "user-management/services";

export const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, CONSTANT.JWT_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.user = decoded.payload;
        next();
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Access Token is not supplied"
    });
  }
};

// export const checkValidate = async (req, res, next) => {
//   let objectTypeCode = getObjectType(req.url);
//   let permissionTypeCode = getPermissionType(req.method);
//   if (objectTypeCode !== null && permissionTypeCode !== null) {
//     let rs = false;
//     let userInfo = req.user;
//     if (userInfo !== undefined && userInfo.username !== undefined) {
//       let groups = await GroupService.getByUser(userInfo.username);
//       let result = await RoleService.isAllowUser(
//         userInfo.username,
//         objectTypeCode,
//         permissionTypeCode
//       );
//       if (result) {
//         rs = true;
//       }
//       if (groups !== undefined && groups.length > 0) {
//         for (let index = 0; index < groups.length; index++) {
//           const element = groups[index];
//           let result2 = await RoleService.isAllowGroup(
//             element.groupName,
//             objectTypeCode,
//             permissionTypeCode
//           );
//           if (result2) {
//             rs = true;
//           }
//         }
//       }
//       if (rs) {
//         next();
//       } else {
//         return res.status(403).json({
//           success: false,
//           message: "Access denied"
//         });
//       }
//     } else {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied"
//       });
//     }
//   } else {
//     next();
//   }
// };

export default (req, res, next) => {
  const bypassUrl = [
    "/auth/login",
    "/auth/register",
    "/oauth2/authorize/facebook",
    "/auth/facebook/callback",
    "/auth/google",
    "/v1/rest/public/download"
  ];
  if (bypassUrl.includes(req.path)) {
    return next();
  } else {
    checkToken(req, res, next);
  }
};
