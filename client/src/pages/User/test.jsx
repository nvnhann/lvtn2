import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

export default function Test() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

  return (
    <div>
      <p>Thêm bài viết</p>
      <div className="p-1 min-h-[400px] bg-white border border-gray-400 rounded-md">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </div>
      <button>akhkjds</button>
    </div>
  );
}
