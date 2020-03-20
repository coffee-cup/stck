import styled from "@emotion/styled";
import css from "@styled-system/css";
import * as React from "react";
import { State as IState } from "stck";
import { Styled } from "theme-ui";
import Editor from "../components/Editor";
import Layout from "../components/Layout";
import Stack from "../components/Stack";
import { useStore } from "../store";
import { Error } from "../types";

const StyledPlayground = styled(Styled.div)(
  css({
    display: "flex",
    minHeight: props => `calc(100vh - ${props.sizes.header})`,
  }),
);

const Split = styled.div(
  css({
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
  }),
);

const EditorContainer = styled.div(
  css({
    width: ["100%", "50%"],
  }),
);

const ResultsContainer = styled.div(
  css({
    width: ["100%", "50%"],
  }),
);

const Results = styled.div(
  css({
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    color: "white",
    backgroundColor: "editor",
    height: "100%",
    p: 2,
    borderLeft: "solid 4px",
    borderColor: "primary",
  }),
);

const Stacks = styled.div(
  css({
    display: "flex",
    overflowX: "auto",
  }),
);

const State: React.FC<{ state: IState }> = props => {
  const stacks = props.state.stacks;
  const filtered = Object.keys(stacks).filter(
    key => stacks[key] != null && stacks[key].length > 0,
  );

  return (
    <Stacks>
      {filtered.map(name => (
        <Stack key={name} name={name} stack={stacks[name]} />
      ))}
    </Stacks>
  );
};

const formatError = (error: Error): string =>
  error.position != null
    ? `${error.position.line}:${error.position.column} ${error.message}`
    : error.message;

const Playground = () => {
  const { code, result, error, actions } = useStore();

  // trigger execution on first load
  React.useEffect(() => {
    actions.onCodeChange(code);
  }, []);

  const renderEditor = typeof window !== "undefined";

  return (
    <Layout title="Playground" description="Try Stck!">
      <StyledPlayground className="playground">
        <Split className="split">
          <EditorContainer>
            <Editor
              value={code}
              errors={error != null ? [error] : []}
              onChange={actions.onCodeChange}
            />
          </EditorContainer>

          <ResultsContainer>
            <Results>
              {result != null && <State state={result} />}
              {error != null && formatError(error)}
            </Results>
          </ResultsContainer>
        </Split>
      </StyledPlayground>
    </Layout>
  );
};

export default Playground;
