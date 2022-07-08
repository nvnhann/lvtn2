import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";

function EditPost({ data }) {
  console.log(data.noidung);
  const contentDataState = ContentState.createFromBlockArray(
    convertFromHTML(`${data.noidung}`)
  );
  const editorDataState = EditorState.createWithContent(contentDataState);
  const [editorEditPost, setEditorEditPost] = useState(editorDataState);

  const onEditorStateChange = (editorStateData) => {
    setEditorEditPost(editorStateData);
  };

  const submitEdit = () => {
    console.log(draftToHtml(convertToRaw(editorEditPost.getCurrentContent())));
  };

  return (
    <div>
      <div>
        <Editor
          editorState={editorEditPost}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
        />
      </div>
      <button
        className="block ml-auto mr-0 p-2 my-2 bg-gray-300 font-bold rounded-md"
        onClick={() => submitEdit()}
      >
        Sửa
      </button>
    </div>
  );
}

export default EditPost;
