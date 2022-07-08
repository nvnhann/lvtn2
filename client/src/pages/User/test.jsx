import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

var value = "<p>KHOA</p>";

const Test = () => {
  const contentDataState = ContentState.createFromBlockArray(
    convertFromHTML(`${value}`)
  );
  
  const editorDataState = EditorState.createWithContent(contentDataState);

  const [editorState, setEditorState] = useState(editorDataState);

  const onEditorStateChange = (editorStateData) => {
    setEditorState(editorStateData);
    console.log(draftToHtml(convertToRaw(editorStateData.getCurrentContent())));
  };

  return (
    <React.Fragment>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        toolbarClassName="toolbar-class"
        toolbar={{
          options: ["inline", "list", "textAlign"],
          inline: {
            options: ["bold", "italic", "underline"],
          },
          list: {
            options: ["unordered", "ordered", "indent", "outdent"],
          },
          textAlign: {
            options: ["left", "center", "right"],
          },
        }}
      />
    </React.Fragment>
  );
};

export default Test;
