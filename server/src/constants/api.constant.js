const BasePathConstant = '/api';

const ControllerConstant = {
    HocPhan: `${BasePathConstant}/hocphan`
}

const CommonMethodConstant = {
    GetAll: '/get-all',
    GetById: '/:id',
    Create: '/',
    Update: '/:id',
    Delete: '/:id',
}

module.exports = { 
    CommonMethodConstant,
    ControllerConstant
}