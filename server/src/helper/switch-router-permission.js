export const getObjectType = pathName => {
  if (pathName.includes("/rest/user")) {
    return "USER";
  }
  if (pathName.includes("/rest/group")) {
    return "GROUP";
  }
  if (pathName.includes("/rest/object-type")) {
    return "OBJECT-TYPE";
  }
  if (pathName.includes("/rest/permission-type")) {
    return "PERMISSION-TYPE";
  }
  if (pathName.includes("/rest/role")) {
    return "ROLE";
  }
  if (pathName.includes("/rest/history")) {
    return "HISTORY";
  }
  if (pathName.includes("/rest/file")) {
    return "FILE-MANAGEMENT";
  }
  if (pathName.includes("/comment")) {
    return "COMMENT";
  }
  if (pathName.includes("/v1/rest/menu")) {
    return "MENU-MANAGEMENT";
  }
  return null;
};

export const getPermissionType = methodName => {
  let permissionType = null;
  switch (methodName) {
    case "GET":
      permissionType = "VIEW";
      break;
    case "POST":
      permissionType = "CREATE";
      break;
    case "PUT":
      permissionType = "UPDATE";
      break;
    case "DELETE":
      permissionType = "DELETE";
      break;
  }
  return permissionType;
};
