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
    <div className="bg-[#fff]">
      <div className="border border-gray-300 rounded-md">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={setEditorState}
        />
      </div>
    </div>
  );
}
