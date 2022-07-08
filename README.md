# Tạo csdl name: lvtn2
# cd vào server: chạy lệnh yarn run server hoặc npm run server
# cd vào server: chạy lệnh yarn run seed:all hoặc npm seed:all

-----------------------------
# cd client: npm start hoặc yarn start
# cd server: npm run server hoặc yarn run server

# url server: ``` http://localhost:3000```

```javascipt
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
```
# Thí dụ:
* Lấy tất cả học phần (GET): ``` http://localhost:4000/api/hocphan/get-all```

* Lấy 1 học phần có id 12(GET): ``` http://localhost:4000/api/hocphan/12```

* Tạo mới 1 HP (POST): ``` http://localhost:4000/api/hocphan```

* Cập nhật HP có id 12 (PUT): ``` http://localhost:4000/api/hocphan/12```

* Xóa HP id 12 (DELETE): ``` http://localhost:4000/api/hocphan/12```




