import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "./editor-theme.css";

import "codemirror/addon/comment/comment";
import "codemirror/addon/display/placeholder";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";

export interface Props {
  value: string;
  onChange: (value: string) => void;
}

const codemirrorConfig = {
  mode: "text",
  indentUnit: 2,
  tabSize: 2,
  indentWithTabs: false,
  theme: "one-dark",
  lineNumbers: true,
  lineWrapping: false,
  autoCloseBrackets: true,
  placeholder: "Type some stuff!",
  gutters: ["CodeMirror-linenumbers"],
  matchBrackets: true,
  styleActiveLine: true,
  hintOptions: {
    completeSingle: false,
  },
};

const Editor: React.FC<Props> = props => (
  <EditorContainer>
    <CodeMirror
      value={props.value}
      detach={true}
      options={codemirrorConfig}
      onChange={(_editor, _data, value) => {
        props.onChange(value);
      }}
    />
  </EditorContainer>
);

export default Editor;

const EditorContainer = styled.div(
  css({
    flexGrow: 1,
    height: "100%",

    ".react-codemirror2": {
      width: "100%",
      minHeight: "100%",
      minWidth: "100%",
    },

    ".CodeMirror": {
      maxHeight: "100%",
      height: props => ["500px", `calc(100vh - ${props.sizes.header})`],
    },

    ".CodeMirror-line": {
      WebkitFontSmoothing: "auto",
      MozOsxFontSmoothing: "auto",
    },

    ".highlighted": {
      background: "#4b5263",
    },
  }),
);
