import React from 'react'
import {MdDelete} from 'react-icons/md'
import {Link} from 'react-router-dom'
import DocumentSave from "./document_save";

function Document() {
  return (
    <div>
      <div className="mb-4 text-white font-bold">
        {/*<Link to="/app/document/save">*/}
        {/*  <button className="px-6 py-2 bg-[#F38E46] rounded-md">Đã lưu</button>*/}
        {/*</Link>*/}
        <Link to="/app/document/upload">
          <button className="ml-4 px-6 py-2 bg-[#F38E46] rounded-md">Tải lên</button>
        </Link>
      </div>
      <div>
        <DocumentSave />
      </div>
    </div>
  )
}

export default Document
