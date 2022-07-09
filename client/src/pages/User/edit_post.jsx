import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

function EditPost({ data }) {
  const [editFile, setEditFile] = useState("");
  const contentDataState = ContentState.createFromBlockArray(
    convertFromHTML(`${data.noidung}`)
  );
  const editorDataState = EditorState.createWithContent(contentDataState);
  const [editorEditPost, setEditorEditPost] = useState(editorDataState);

  const openAddFile = () => {
    document.querySelector(".addfile").click();
  };

  const onEditorStateChange = (editorStateData) => {
    setEditorEditPost(editorStateData);
  };

  const submitEdit = () => {
    console.log(draftToHtml(convertToRaw(editorEditPost.getCurrentContent())));
  };

  const deleteDocument = (idtl) => {
    console.log(idtl);
  };

  return (
    <div>
      <p className="mb-2 text-[25px] font-medium text-center">
        Chỉnh sửa bài viết
      </p>
      <div className="p-2 min-h-[250px] border border-gray-400 rounded-md">
        <Editor
          editorState={editorEditPost}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
        />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div
          onClick={() => openAddFile()}
          className="p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-slate-100 duration-300"
        >
          <div className="flex gap-3">
            <FiUpload size={25} />
            <p>Thêm tài liệu</p>
          </div>
          <input
            className="addfile hidden"
            onChange={(e) => setEditFile(e.target.files)}
            type="file"
          />
        </div>
        <button
          className="block ml-auto mr-0 p-2 w-[100px] bg-yellow-300 font-bold rounded-md active:opacity-80 duration-300 hover:opacity-70 shadow-md"
          onClick={() => submitEdit()}
        >
          Cập nhật
        </button>
      </div>

      <div className="mt-4">
        <div className="relative mb-2 px-4 py-4 w-[300px] text-white font-medium bg-[#175bda] rounded-md">
          <p>Bài giảng LTCB chương 1</p>
          <IoClose
            onClick={() => deleteDocument()}
            className="absolute right-1 top-3 cursor-pointer"
            size={30}
          />
        </div>
        <div className="relative mb-2 px-4 py-4 w-[300px] text-white font-medium bg-[#175bda] rounded-md">
          <p>Bài giảng LTCB chương 2</p>
          <IoClose
            onClick={() => deleteDocument()}
            className="absolute right-1 top-3 cursor-pointer"
            size={30}
          />
        </div>
      </div>
    </div>
  );
}

export default EditPost;
