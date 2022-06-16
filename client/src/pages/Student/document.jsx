import React from "react";
import {MdDelete} from "react-icons/md";
import GoogleDocsViewer from "react-google-docs-viewer";
import lvtn from ".././../assets/files/lvtn.docx";

function Document() {
  return (
    <div className="w-full p-5 grid grid-cols-4 gap-2">
      <div className="bg-white p-3 rounded-md">
        <div className="mb-4 rounded-lg overflow-hidden">
          <GoogleDocsViewer width="100%" height="160px" fileUrl={lvtn} />
        </div>
        <p>
          <strong>Giải thuật cây quyết định</strong>
        </p>
        <span>
          tạo bởi <strong>Trần Nguyễn Minh Thư</strong>
        </span>
        <p>
          <span className="text-[12px] text-white bg-orange-500 rounded-full mr-2 px-[8px] py-1">Máy học</span>
          <span className="text-[12px] text-white bg-orange-500 rounded-full mr-2 px-[8px] py-1">ML</span>
        </p>

        <MdDelete size={30} color="#757575" className="ml-auto mr-0 cursor-pointer" />
      </div>
    </div>
  );
}

export default Document;
