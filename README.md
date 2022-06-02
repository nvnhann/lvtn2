# Click dô run-server.bat tải và chạy server

# url server: ``` http://localhost:4000```

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

* Lấy tất 1 học phần có id 12(GET): ``` http://localhost:4000/api/hocphan/12```

* Tạo mới 1 HP (POST): ``` http://localhost:4000/api/hocphan```

* Cập nhật HP có id 12 (PUT): ``` http://localhost:4000/api/hocphan/12```

* Xóa HP id 12 (DELETE): ``` http://localhost:4000/api/hocphan/12```




