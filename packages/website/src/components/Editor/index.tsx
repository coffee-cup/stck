import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as React from "react";

let CodeMirror: React.ComponentType<any> | null = null;
if (typeof window !== "undefined") {
  // tslint:disable:no-var-requires
  CodeMirror = require("react-codemirror2").UnControlled;

  require("codemirror/lib/codemirror.css");
  require("./editor-theme.css");

  require("codemirror/addon/comment/comment");
  require("codemirror/addon/display/placeholder");
  require("codemirror/addon/edit/closebrackets");
  require("codemirror/addon/edit/matchbrackets");
  // tslint:enable
}

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
    {CodeMirror != null && (
      <CodeMirror
        value={props.value}
        detach={true}
        options={codemirrorConfig}
        onChange={(_editor, _data, value) => {
          props.onChange(value);
        }}
      />
    )}
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
