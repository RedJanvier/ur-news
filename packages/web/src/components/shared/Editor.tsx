import { EditorState, ContentState, convertToRaw } from 'draft-js';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from '../../styles/Editor.module.css';

const MyEditor: React.FC<{
  onChange: (value: string) => void;
  value: string;
}> = ({ onChange, value }) => {
  const [body, setBody] = useState<EditorState>();

  const changeHtmlToDraft = (html: string) => {
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  useEffect(() => {
    setBody(changeHtmlToDraft(value));
  }, [value]);

  const handleChange = (edState: EditorState) => {
    onChange(draftToHtml(convertToRaw(edState.getCurrentContent())));
  };

  return (
    <div className={styles.editor}>
      <Editor
        editorState={body}
        toolbarClassName='toolbarClassName'
        wrapperClassName='wrapperClassName'
        editorClassName='editorClassName'
        onEditorStateChange={handleChange}
        toolbar={{
          options: ['inline', 'blockType', 'list', 'link'],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['bold', 'italic', 'underline'],
          },
        }}
      />
    </div>
  );
};

export default MyEditor;
