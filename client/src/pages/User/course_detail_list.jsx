import React, { useState, useRef } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiFillPlusCircle } from "react-icons/ai";

const styleFile = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 4,
  p: 2,
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "size",
  "color",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
];

const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: ["small", false, "large", "huge"] }, { color: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      ["link", "image"],
      ["clean"],
    ],
  },
};

const dataFile = [
  {
    id: 1,
    value: "Tai lieu Tai lieuTai lieuTai lieuTai lieuTai lieuTai ",
  },
  {
    id: 2,
    value: "Tai lieu Tai lieuTai lieuTai lieuTai lieuTai lieuTai ",
  },
  {
    id: 3,
    value: "Tai lieu Tai lieuTai lieuTai lieuTai lieuTai lieuTai ",
  },
  {
    id: 4,
    value: "Tai lieu Tai lieuTai lieuTai lieuTai lieuTai lieuTai ",
  },
  {
    id: 5,
    value: "Tai lieu Tai lieuTai lieuTai lieuTai lieuTai lieuTai ",
  },
  {
    id: 6,
    value: "Tai lieu Tai lieuTai lieuTai lieuTai lieuTai lieuTai ",
  },
  {
    id: 7,
    value: "Tai lieu Tai lieuTai lieuTai lieuTai lieuTai lieuTai ",
  },
];

function CourseDetailList() {
  const [openEditor, setOpenEditor] = useState(false);
  const [data, setData] = useState(null);
  const params = useParams();

  const [openFile, setOpenFile] = useState(false);
  const handleOpenFile = () => setOpenFile(true);
  const handleCloseFile = () => setOpenFile(false);

  const openInputFile = () => {
    document.querySelector(".inputfile").click();
  };

  console.log(data);

  const handleChange = (value) => {
    setData(value);
  };

  return (
    <div className="flex gap-4">
      <div className="w-[75%]">
        <div className="flex justify-center align-middle  py-4  bg-[#2554A6] rounded-md">
          <p className="text-white text-[30px]">CT113-POLICE</p>
        </div>
        {!!openEditor ? (
          <div className=" my-5 p-4 bg-white  rounded-md">
            <p className="mb-2 text-[25px] text-center font-medium">
              Thêm bài viết
            </p>
            <div className="h-[15rem]">
              <ReactQuill
                theme="snow"
                className="h-[100%]"
                formats={formats}
                modules={modules}
                value={data}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-4 justify-between mt-16 font-medium text-[18px] text-gray-500">
              <div
                onClick={handleOpenFile}
                File
                className="flex items-center gap-2 cursor-pointer"
              >
                <FiUpload
                  onClick={() => openInputFile()}
                  className="hover:text-gray-800 duration-300"
                  size={25}
                />
                <p>Thêm tài liệu</p>
              </div>
              <Modal
                open={openFile}
                onClose={handleCloseFile}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={styleFile}>
                  <div className="flex gap-2 items-center">
                    <input
                      className="w-full py-1 px-4 outline-none rounded-md border border-slate-600"
                      type="text"
                      placeholder="Tìm kiếm tài liệu"
                    />

                    <AiFillPlusCircle
                      className="cursor-pointer"
                      size={25}
                      color="#2866c3"
                    />
                  </div>
                  {dataFile.map(({ id, value }, idx) => (
                    <div className="flex gap-2 my-4 p-2 bg-slate-300 rounded-md">
                      <input type="checkbox" name={id} value={id} />
                      <p>{value}</p>
                    </div>
                  ))}
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleCloseFile}
                      className="py-2 px-4 bg-gray-400 rounded-md text-white font-medium"
                    >
                      Hủy
                    </button>
                    <button className="py-2 px-4 bg-orange-400 rounded-md font-medium">
                      Thêm
                    </button>
                  </div>
                </Box>
              </Modal>

              <div>
                <button
                  className="hover:text-gray-800 duration-300"
                  onClick={() => setOpenEditor(false)}
                >
                  Hủy
                </button>
                <button className="ml-4 hover:text-gray-800 duration-300">
                  Đăng
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {!openEditor ? (
          <div
            onClick={() => setOpenEditor(true)}
            className=" my-4  flex items-center gap-5 p-2 bg-white rounded-md cursor-text"
          >
            <div className="w-[50px] h-[50px] rounded-full bg-slate-500"></div>
            <p className="text-slate-400">Thêm tài liệu của bạn</p>
          </div>
        ) : (
          <></>
        )}

        <div className=" ">
          <p>TEST EDITOR</p>
          <div id="editorText"></div>
        </div>

        <div className=" ">
          <p className="mt-4 mb-2 text-[18px] font-bold">
            Các file ôn tập cuối kỳ
          </p>
          <div className="grid grid-cols-2 gap-5">
            <Link to="/app/course/detail=id1/subject=id2">
              <div className="flex gap-4 p-3 bg-white rounded-md shadow-md">
                <div className="w-[80px] h-[80px] bg-slate-200 rounded-md"></div>
                <div>
                  <p>Chương 1</p>
                  <p>Giải thuật cây quyết định</p>
                  <p>PDF</p>
                </div>
              </div>
            </Link>
          </div>

          <p className="mt-4 mb-2 text-[18px] font-bold">Chương 1</p>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex gap-4 p-3 bg-white rounded-md shadow-md">
              <div className="w-[80px] h-[80px] bg-slate-200 rounded-md"></div>
              <div>
                <p>Chương 1</p>
                <p>Giải thuật cây quyết định</p>
                <p>PDF</p>
              </div>
            </div>
          </div>

          <p className="mt-4 mb-2 text-[18px] font-bold">Chương 2</p>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex gap-4 p-3 bg-white rounded-md shadow-md">
              <div className="w-[80px] h-[80px] bg-slate-200 rounded-md"></div>
              <div>
                <p>Chương 2</p>
                <p>Giải thuật cây quyết định</p>
                <p>PDF</p>
              </div>
            </div>
            <div className="flex gap-4 p-3 bg-white rounded-md shadow-md">
              <div className="w-[80px] h-[80px] bg-slate-200 rounded-md"></div>
              <div>
                <p>Chương 2</p>
                <p>Giải thuật cây quyết định</p>
                <p>PDF</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 w-[25%] bg-white rounded-md p-2">
        <div>
          <p className="mb-2 text-[20px] text-gray-800 font-medium text-center">
            Thành Viên
          </p>
          <div className="flex justify-center items-center gap-2 mb-2 p-2 bg-slate-200 rounded-md">
            <div className="w-[50px] h-[50px]  rounded-full bg-slate-300"></div>
            <p className="">Nguyễn Văn Nhẫn Nhẫn</p>
          </div>
          <div className="flex justify-center items-center gap-2 mb-2 p-2 bg-slate-200 rounded-md">
            <div className="w-[50px] h-[50px]  rounded-full bg-slate-300"></div>
            <p className="">Nguyễn Văn Nhẫn Nhẫn</p>
          </div>
          <div className="flex justify-center items-center gap-2 mb-2 p-2 bg-slate-200 rounded-md">
            <div className="w-[50px] h-[50px]  rounded-full bg-slate-300"></div>
            <p className="">Nguyễn Văn Nhẫn Nhẫn</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailList;
