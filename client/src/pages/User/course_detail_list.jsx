import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { FiUpload } from "react-icons/fi";

function CourseDetailList() {
  const [openEditor, setOpenEditor] = useState(false);
  const [file, setFile] = useState();

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      document.getElementById("editorText").innerHTML =
        editorRef.current.getContent();
      console.log(editorRef.current.getContent());
      setOpenEditor(false);
    }
  };

  const openInputFile = () => {
    document.querySelector(".inputfile").click();
  };

  return (
    <div>
      <div className="flex justify-center align-middle mx-auto py-4 w-[80%] bg-[#2554A6] rounded-md">
        <p className="text-white text-[30px]">CT113-POLICE</p>
      </div>
      {!!openEditor ? (
        <div className="mx-auto my-5 p-4 bg-white w-[80%] rounded-md">
          <p className="mb-2 text-[25px] text-center font-medium">
            Thêm tài liệu
          </p>
          <Editor
            apiKey="iua2jrzpm5a7inohthsln0q65h438eczwaxlna9z82jy8uls"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <div className="flex gap-4 justify-between mt-2 font-medium text-[18px] text-gray-500">
            <div>
              <FiUpload
                onClick={() => openInputFile()}
                className="hover:text-gray-800 duration-300 cursor-pointer"
                size={25}
              />
              <input
                className="inputfile hidden"
                onChange={(e) => setFile(e.target.value)}
                type="file"
              />
            </div>
            <div>
              <button
                className="hover:text-gray-800 duration-300"
                onClick={() => setOpenEditor(false)}
              >
                Hủy
              </button>
              <button
                className="ml-4 hover:text-gray-800 duration-300"
                onClick={log}
              >
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
          className="w-[80%] my-4 mx-auto flex items-center gap-5 p-2 bg-white rounded-md cursor-text"
        >
          <div className="w-[50px] h-[50px] rounded-full bg-slate-500"></div>
          <p className="text-slate-400">Thêm tài liệu của bạn</p>
        </div>
      ) : (
        <></>
      )}

      <div className="mx-auto w-[80%]">
        <p>TEST EDITOR</p>
        <div id="editorText"></div>
      </div>

      <div className="mx-auto w-[80%]">
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
  );
}

export default CourseDetailList;

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};
