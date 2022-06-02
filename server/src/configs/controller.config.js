const { ControllerConstant } = require('../constants/api.constant');
const { HocPhanRouting } = require('../routers/HocPhan.routing');

const registerController = (expr) => {
    expr.use(ControllerConstant.HocPhan, HocPhanRouting);
}

module.exports = { registerController };

