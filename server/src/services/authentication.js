const userService = require('./user');
const bcrypt = require('bcryptjs');

export const verifyUser = async (maso, pwd) => {
    console.log('maso', maso)
    let user = await userService.getByMaSo(maso);

    if (user !== undefined && user !== null) {
      let result = await bcrypt.compare(pwd, user.mat_khau);
      if (result) {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  
