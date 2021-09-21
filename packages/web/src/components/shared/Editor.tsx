import { ContentState, convertToRaw } from 'draft-js';
import React, { useEffect, useState } from 'react';
import { Editor, EditorState } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

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
    <Editor
      editorState={body}
      toolbarClassName='toolbarClassName'
      wrapperClassName='wrapperClassName'
      editorClassName='editorClassName'
      onEditorStateChange={handleChange}
      toolbar={{
        options: [
          'inline',
          'blockType',
          'fontSize',
          'list',
          'textAlign',
          'colorPicker',
          'link',
          'embedded',
          'history',
        ],
        inline: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
          ],
        },
      }}
    />
  );
};

export default MyEditor;
